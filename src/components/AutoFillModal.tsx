import { useState, useCallback, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button_v2 } from "@/components/shared/Button";
import { InputBlock, Input } from "@/components/shared/TextInput";
import { Upload, FileText, Globe, PenSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

interface Item {
  name: string;
  price: number;
  description?: string;
}

interface ExtractedData {
  businessName?: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmailAddress?: string;
  businessCategory?: string;
  businessOpenHours?: string;
  businessOpenDays?: string;
  businessWebsite?: string;
  extra_information?: string;
  faqs?: FAQ[];
  items?: Item[];
}

interface AutoFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted: (data: ExtractedData) => void;
}

type InputMode = "none" | "file" | "url" | "text";

export default function AutoFillModal({
  isOpen,
  onClose,
  onDataExtracted,
}: AutoFillModalProps) {
  const [inputMode, setInputMode] = useState<InputMode>("none");
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessText, setBusinessText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const resetModal = useCallback(() => {
    setInputMode("none");
    setWebsiteUrl("");
    setBusinessText("");
    setSelectedFile(null);
    setIsLoading(false);
  }, []);

  const extractDataFromGrok = useCallback(
    async (content: string, type: "text" | "url" | "file") => {
      setIsLoading(true);
      try {
        // Call Groq API to extract business data
        const response = await fetch("/api/extract-business-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            type,
            fileName: type === "file" ? selectedFile?.name : undefined,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to extract data");
        }

        const data = await response.json();

        // Pass extracted data to parent component
        onDataExtracted(data.extractedData);

        // Reset and close modal
        resetModal();
        onClose()
      } catch (error) {
        console.error("Error extracting data:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Failed to extract data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [selectedFile, onDataExtracted, resetModal]
  );

  const handleSubmit = useCallback(async () => {
    if (inputMode === "url" && websiteUrl) {
      await extractDataFromGrok(websiteUrl, "url");
    } else if (inputMode === "text" && businessText) {
      await extractDataFromGrok(businessText, "text");
    } else if (inputMode === "file" && selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      // Read file as text
      const reader = new FileReader();

      reader.onerror = () => {
        alert("Failed to read file. Please try again.");
        setIsLoading(false);
      };

      reader.onload = async () => {
        try {
          let textContent = "";
          const result = reader.result as string;

          // Handle different file types
          if (selectedFile.type.startsWith("image/")) {
            // For images, include the base64 with a note
            textContent = `[Image file: ${selectedFile.name}]\nNote: This is an image file. Extract any visible text, business information, or details from the image.\n\nImage data: ${result}`;
          } else if (selectedFile.type === "application/pdf") {
            // For PDFs, note that we're sending base64
            textContent = `[PDF file: ${selectedFile.name}]\nNote: This is a PDF document. Extract all business information from it.\n\nPDF data: ${result}`;
          } else {
            // For text files, use the content directly
            textContent = result;
          }

          await extractDataFromGrok(textContent, "file");
        } catch (error) {
          console.error("Error processing file:", error);
          alert("Failed to process file. Please try again.");
          setIsLoading(false);
        }
      };

      // Read file based on type
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        reader.readAsDataURL(selectedFile);
      } else {
        reader.readAsText(selectedFile);
      }
    }
  }, [inputMode, websiteUrl, businessText, selectedFile, extractDataFromGrok]);

  

  const handleClose = useCallback(() => {
    resetModal();
    onClose();
  }, [resetModal, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-black flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7DD3C0]" />
            Auto-Fill Business Information
          </DialogTitle>
          <DialogDescription className="text-gray-900">
            Let AI extract your business information from various sources
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {inputMode === "none" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setInputMode("url")}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors group"
              >
                <Globe className="w-8 h-8 text-gray-900  mb-2" />
                <span className="text-sm text-gray-900 text-center">
                  Enter Website URL
                </span>
              </button>

              <button
                onClick={() => setInputMode("text")}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors group"
              >
                <PenSquare className="w-8 h-8 text-gray-900  mb-2" />
                <span className="text-sm text-gray-900 text-center">
                  Write About Business
                </span>
              </button>
              <button
                onClick={() => setInputMode("file")}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors group"
              >
                <Upload className="w-8 h-8 text-gray-900  mb-2" />
                <span className="text-sm text-gray-900 text-center">
                  Upload Document
                </span>
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {inputMode === "file" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                    <input
                      type="file"
                      accept=".txt,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <span className="text-blue-500 hover:text-blue-400">
                      Click to upload
                    </span>
                    <p className="text-sm text-gray-900 mt-2">
                      TXT, DOC, or DOCX files only (Max 10MB)
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 For images/PDFs, use the &quot;Write About
                      Business&quot; option instead
                    </p>
                    {selectedFile && (
                      <div className="mt-4">
                        <p className="text-sm text-green-500">
                          ✓ Selected: {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-900">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    )}
                  </div>
                </label>
                <Button_v2
                  onClick={() => {
                    setInputMode("none");
                    setSelectedFile(null);
                  }}
                  variant="ghost"
                  className="w-full mt-4"
                >
                  Back
                </Button_v2>
              </motion.div>
            )}

            {inputMode === "url" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <p className="mb-2 text-gray-900">Website URL</p>
                  <InputBlock variant="neubrutalism" size="lg">
                    <Input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="outline-none border-none focus:outline-none focus:ring-0"
                    />
                  </InputBlock>
                  <p className="text-xs text-gray-900 mt-2">
                    Enter your business website URL to extract information
                  </p>
                </div>
                <Button_v2
                  onClick={() => setInputMode("none")}
                  variant="ghost"
                  className="w-full"
                >
                  Back
                </Button_v2>
              </motion.div>
            )}

            {inputMode === "text" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <p className="mb-2 text-gray-900">Describe Your Business</p>
                  <textarea
                    placeholder="Tell us about your business... Include details like name, description, address, phone, email, operating hours, services/products, FAQs, etc."
                    value={businessText}
                    onChange={(e) => setBusinessText(e.target.value)}
                    className="w-full h-48 p-4 border-2 border-gray-700 rounded-lg resize-none"
                  />
                  <p className="text-xs text-gray-900 mt-2">
                    Provide as much detail as possible for better extraction
                  </p>
                </div>
                <Button_v2
                  onClick={() => setInputMode("none")}
                  variant="ghost"
                  className="w-full"
                >
                  Back
                </Button_v2>
              </motion.div>
            )}
          </AnimatePresence>

          {inputMode !== "none" && (
            <div className="flex gap-4">
              <Button_v2
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  (inputMode === "url" && !websiteUrl) ||
                  (inputMode === "text" && !businessText) ||
                  (inputMode === "file" && !selectedFile)
                }
                className="flex-1"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Extracting...
                  </div>
                ) : (
                  "Extract Information"
                )}
              </Button_v2>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-900">AI is analyzing your data...</p>
              <p className="text-sm text-gray-900 mt-2">
                This may take a few moments
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
