"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Search, X } from "lucide-react";
import { useAuthService } from "@/services/authService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputBlock } from "@/components/shared/TextInput";
import { Button } from "@/components/ui/button";
import { Button_v2 } from "@/components/shared/Button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [conversationState, setConversationState] = useState<string | null>(
    null,
  );
  const [awaitingBusiness, setAwaitingBusiness] = useState(false);
  const [allBusinesses, setAllBusinesses] = useState<
    Array<{
      business_id: string;
      name: string;
      description: string;
    }>
  >([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<
    Array<{
      business_id: string;
      name: string;
      description: string;
    }>
  >([]);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const authService = useAuthService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize session with 12-hour expiry check
  useEffect(() => {
    const initSession = () => {
      const savedSession = localStorage.getItem("chatSession");
      const savedTimestamp = localStorage.getItem("chatSessionTimestamp");
      const savedBusinessName = localStorage.getItem("businessName");

      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

      // Check if session is expired (older than 12 hours)
      if (savedSession && savedTimestamp) {
        const timestamp = parseInt(savedTimestamp, 10);
        if (now - timestamp < twelveHours) {
          // Session is still valid
          setSessionId(savedSession);
          if (savedBusinessName) {
            setBusinessName(savedBusinessName);
          }

          // Load persisted messages
          const savedMessages = localStorage.getItem("chatMessages");
          if (savedMessages) {
            try {
              const parsed = JSON.parse(savedMessages);
              // Convert timestamp strings back to Date objects
              const messagesWithDates = parsed.map(
                (msg: { timestamp: string }) => ({
                  ...msg,
                  timestamp: new Date(msg.timestamp),
                }),
              );
              setMessages(messagesWithDates);
            } catch (error) {
              console.error("Failed to parse saved messages:", error);
            }
          }
          return;
        }
      }

      // Create new session if expired or doesn't exist
      const newSession = crypto.randomUUID();
      setSessionId(newSession);
      localStorage.setItem("chatSession", newSession);
      localStorage.setItem("chatSessionTimestamp", now.toString());
      localStorage.removeItem("chatMessages");
      localStorage.removeItem("businessName");
    };

    initSession();
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  // Persist business name to localStorage
  useEffect(() => {
    if (businessName) {
      localStorage.setItem("businessName", businessName);
    }
  }, [businessName]);

  // Fetch all businesses on mount
  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoadingBusinesses(true);
      try {
        const response = await authService.getAllBusinesses();
        setAllBusinesses(response.businesses);
        setFilteredBusinesses(response.businesses);
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
      } finally {
        setIsLoadingBusinesses(false);
      }
    };

    fetchBusinesses();
  }, []);

  // Filter businesses based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBusinesses(allBusinesses);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allBusinesses.filter(
      (business) =>
        business.name.toLowerCase().includes(query) ||
        business.description.toLowerCase().includes(query),
    );
    setFilteredBusinesses(filtered);
  }, [searchQuery, allBusinesses]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleFocus = () => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 300);
    };

    inputRef.current?.addEventListener("focus", handleFocus);

    return () => {
      inputRef.current?.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleReset = () => {
    // Clear all data and start fresh session
    setMessages([]);
    setBusinessName(null);
    setConversationState(null);
    setIsBusinessModalOpen(false);
    setSearchQuery("");
    const newSession = crypto.randomUUID();
    setSessionId(newSession);
    localStorage.setItem("chatSession", newSession);
    localStorage.setItem("chatSessionTimestamp", Date.now().toString());
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("businessName");
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isSending || !sessionId) return;

    const userMessage = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await authService.webChat(userMessage, sessionId);
      console.log({ response });

      // Check if session should be reset
      if (response.session_reset) {
        handleReset();
        return;
      }

      // Update conversation state
      if (response.state) {
        setConversationState(response.state);
      }

      // Update business name if provided
      if (response.business_name) {
        setBusinessName(response.business_name);
      }

      // Add bot response to messages
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.answer,
        sender: "bot",
        timestamp: new Date(),
      };
      

      setMessages((prev) => [...prev, botMessage]);

      // Open business modal if state is AWAITING_BUSINESS
      if (response.state === "AWAITING_BUSINESS") {
        setAwaitingBusiness(true);
        setIsBusinessModalOpen(true);
        setFilteredBusinesses(allBusinesses);
        setSearchQuery("");
      }
    } catch (err) {
      console.log(err);
      // Display error message in chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error, Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBusinessSelect = async (
    business_id: string,
    businessName: string,
  ) => {
    // Add user message showing selected business
    const userMessage: Message = {
      id: Date.now().toString(),
      text: businessName,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Close modal
    setIsBusinessModalOpen(false);
    setSearchQuery("");
    setIsTyping(true);

    try {
      // Send business_id to backend
      const response = await authService.webChat(business_id, sessionId);
      console.log({ response });

      // Check if session should be reset
      if (response.session_reset) {
        handleReset();
        return;
      }

      // Update conversation state
      if (response.state) {
        setConversationState(response.state);
      }

      // Update business name if provided
      if (response.business_name) {
        setBusinessName(response.business_name);
      }

      // Add bot response to messages
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.answer,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log(err);
      // Display error message in chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setAwaitingBusiness(false);
    }
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] flex flex-col border-2 border-slate-200 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-50 to-slate-100"
      >
        {/* Header with Business Name and Reset Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-t-3xl px-6 py-4 flex items-center justify-between border-b border-slate-200"
        >
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {businessName || "AI Assistant"}
              </h2>
              <p className="text-xs text-slate-500">Always here to help</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleReset();
              setAwaitingBusiness(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            New Chat
            {/* <span className="hidden sm:inline">New Chat</span> */}
          </motion.button>
        </motion.div>

        {/* Messages Container */}
        <div className="flex-1  overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-slate-700 to-slate-900"
                        : "bg-gradient-to-br from-slate-700 to-slate-900"
                    } `}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </motion.div>

                  {/* Message Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[75%] md:max-w-[70%] lg:max-w-[60%] ${
                      message.sender === "user"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } rounded-3xl px-4 md:px-5 py-3 md:py-3.5 `}
                  >
                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        message.sender === "user" ? "text-white" : "text-black"
                      }`}
                    >
                      {message.text}
                    </p>
                    <span
                      className={`text-xs mt-2 block ${
                        message.sender === "user" ? "text-indigo-100" : ""
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center ">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className=" rounded-3xl px-5 py-4 ">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                          className="w-2 h-2 rounded-full bg-slate-400"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        {
          !awaitingBusiness ? (

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-b-3xl p-4 md:p-6"
            >
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  />
              </InputBlock>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={
                !inputValue.trim() || isTyping || isSending || !sessionId
              }
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center  transition-all duration-200 ${!inputValue.trim() || isTyping || isSending || !sessionId ? "opacity-50 cursor-not-allowed" : ""}`}
              >
              <motion.div
                animate={{
                  rotate: inputValue.trim() && !isTyping ? 0 : -45,
                }}
                transition={{ duration: 0.2 }}
                >
                <Send className={`w-5 h-5 md:w-6 md:h-6 text-black`} />
              </motion.div>
            </motion.button>
          </div>

          {/* Quick Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-4"
            >
            {["Help me get started", "What can you do?", "Tell me more"].map(
              (suggestion, i) => (
                <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInputValue(suggestion);
                  inputRef.current?.focus();
                }}
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors "
                >
                  {suggestion}
                </motion.button>
              ),
            )}
          </motion.div>
        </motion.div>
            ) :  (
              <div className="p-6 text-center">
                <p className="text-lg">Please select a business to continue the conversation.</p>
                <Button_v2
                
                onClick={() => setIsBusinessModalOpen(true)}
                
                >
                
                    Select Business
                </Button_v2>
              </div>
            )
          }
      </motion.div>

      {/* Business Selection Modal */}
      <Dialog open={isBusinessModalOpen} onOpenChange={setIsBusinessModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]  overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold ">
              Select a Business
            </DialogTitle>
            <DialogDescription className="">
              Choose a business to continue the conversation
            </DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <div className="relative mt-4">
            <InputBlock variant="neubrutalism" size="lg">
              <Input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputBlock>
          </div>

          {/* Business List */}
          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            {isLoadingBusinesses ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className=" border-zinc-800 animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-zinc-800 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <p className=" text-lg">No businesses found</p>
                <p className=" text-sm mt-2">Try adjusting your search</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {filteredBusinesses.map((business, index) => (
                    <motion.div
                      key={business.business_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card
                        className=" border-zinc-800 cursor-pointer transition-all duration-200 group"
                        onClick={() =>
                          handleBusinessSelect(
                            business.business_id,
                            business.name,
                          )
                        }
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold  text-lg mb-1  transition-colors">
                            {business.name}
                          </h3>
                          <p className=" text-sm line-clamp-2">
                            {business.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
