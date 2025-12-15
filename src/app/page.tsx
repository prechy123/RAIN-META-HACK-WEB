"use client";

import AnimatedText from "@/components/AnimatedText";
import Particles from "../components/Particles";
import ClickSpark from "../components/ClickSpark";
import MultilayerCardV_3 from "@/components/shared/CardLayer3";
import { motion, AnimatePresence } from "framer-motion";
import { Button_v2 } from "@/components/shared/Button";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Step1 from "@/components/form-steps/Step1";
import Step2 from "@/components/form-steps/Step2";
import Step3 from "@/components/form-steps/Step3";
import Step4 from "@/components/form-steps/Step4";
import Step5 from "@/components/form-steps/Step5";
import Step6 from "@/components/form-steps/Step6";
import { showErrorToast } from "@/libs/utils/showToast";
import { useAuthService } from "@/services/authService";

interface FAQ {
  question: string;
  answer: string;
}

interface Item {
  name: string;
  price: number;
  description?: string;
}

interface BusinessData {
  email: string;
  password: string;
  businessName: string;
  business_id: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessCategory: string;
  businessOpenHours: string;
  businessOpenDays: string;
  businessWebsite: string;
  businessPicture: string;
  extra_information: string;
  faqs: FAQ[];
  items: Item[];
}

// Memoized static components
const MemoizedParticles = memo(Particles);
const MemoizedAnimatedText = memo(AnimatedText);

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const AUTH = useAuthService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize state from URL params
  const getInitialFormData = useCallback((): BusinessData => {
    const urlData = searchParams.get("data");
    if (urlData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(urlData));
        return {
          email: decoded.email || "",
          password: decoded.password || "",
          businessName: decoded.businessName || "",
          business_id: decoded.business_id || "",
          businessDescription: decoded.businessDescription || "",
          businessAddress: decoded.businessAddress || "",
          businessPhone: decoded.businessPhone || "",
          businessEmailAddress: decoded.businessEmailAddress || "",
          businessCategory: decoded.businessCategory || "",
          businessOpenHours: decoded.businessOpenHours || "",
          businessOpenDays: decoded.businessOpenDays || "",
          businessWebsite: decoded.businessWebsite || "",
          businessPicture: "", // Don't restore base64 from URL
          extra_information: decoded.extra_information || "",
          faqs: decoded.faqs || [{ question: "", answer: "" }],
          items: decoded.items || [{ name: "", price: 0, description: "" }],
        };
      } catch (e) {
        console.error("Error parsing URL data:", e);
      }
    }
    return {
      email: "",
      password: "",
      businessName: "",
      business_id: "",
      businessDescription: "",
      businessAddress: "",
      businessPhone: "",
      businessEmailAddress: "",
      businessCategory: "",
      businessOpenHours: "",
      businessOpenDays: "",
      businessWebsite: "",
      businessPicture: "",
      extra_information: "",
      faqs: [{ question: "", answer: "" }],
      items: [{ name: "", price: 0, description: "" }],
    };
  }, [searchParams]);

  const getInitialStep = useCallback((): number => {
    const stepParam = searchParams.get("step");
    return stepParam ? parseInt(stepParam, 10) : 1;
  }, [searchParams]);

  const [currentStep, setCurrentStep] = useState(getInitialStep);
  const [formData, setFormData] = useState<BusinessData>(getInitialFormData);

  // Update URL whenever formData or currentStep changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("step", currentStep.toString());

    // Create a copy of formData without the base64 image
    const { businessPicture, ...dataWithoutImage } = formData;
    console.log(businessPicture);
    params.set("data", encodeURIComponent(JSON.stringify(dataWithoutImage)));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [formData, currentStep, router]);

  const totalSteps = 6;

  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.email) {
          showErrorToast("Email is required");
          return false;
        }
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          showErrorToast("Please enter a valid email address");
          return false;
        }
        if (!formData.password) {
          showErrorToast("Password is required");
          return false;
        }
        if (formData.password.length < 6) {
          showErrorToast("Password must be at least 6 characters long");
          return false;
        }
        return true;

      case 2:
        if (!formData.businessName) {
          showErrorToast("Business name is required");
          return false;
        }
        if (!formData.businessDescription) {
          showErrorToast("Business description is required");
          return false;
        }
        if (!formData.businessCategory) {
          showErrorToast("Business category is required");
          return false;
        }
        return true;

      case 3:
        if (!formData.businessAddress) {
          showErrorToast("Business address is required");
          return false;
        }
        if (!formData.businessPhone) {
          showErrorToast("Business phone is required");
          return false;
        }
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.businessPhone)) {
          showErrorToast("Please enter a valid phone number");
          return false;
        }
        if (!formData.businessEmailAddress) {
          showErrorToast("Business email address is required");
          return false;
        }
        // Validate business email
        // const businessEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!businessEmailRegex.test(formData.businessEmailAddress)) {
        //   showErrorToast("Please enter a valid business email address");
        //   return false;
        // }
        if (!formData.businessWebsite) {
          showErrorToast("Business website is required");
          return false;
        }
        // URL validation (basic)
        // const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        // if (!urlRegex.test(formData.businessWebsite)) {
        //   showErrorToast("Please enter a valid website URL");
        //   return false;
        // }
        return true;

      case 4:
        if (!formData.businessOpenHours) {
          showErrorToast("Business open hours are required");
          return false;
        }
        if (!formData.businessOpenDays) {
          showErrorToast("Business open days are required");
          return false;
        }
        // if (!formData.businessPicture) {
        //   showErrorToast("Business picture is required");
        //   return false;
        // }
        if (!formData.extra_information) {
          showErrorToast("Extra information is required");
          return false;
        }
        return true;

      case 5:
        if (!formData.faqs.every((faq) => faq.question && faq.answer)) {
          showErrorToast("All FAQs must have a question and an answer");
          return false;
        }
        return true;

      case 6:
        if (!formData.items.every((item) => item.name && item.price > 0)) {
          showErrorToast(
            "All items must have a name and a price greater than 0"
          );
          return false;
        }
        return true;

      default:
        return true;
    }
  }, [currentStep, formData]);

  const handleInputChange = useCallback(
    (field: keyof BusinessData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addFAQ = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }, []);

  const updateFAQ = useCallback(
    (index: number, field: "question" | "answer", value: string) => {
      setFormData((prev) => {
        const updatedFAQs = [...prev.faqs];
        updatedFAQs[index][field] = value;
        return { ...prev, faqs: updatedFAQs };
      });
    },
    []
  );

  const removeFAQ = useCallback(
    (index: number) => {
      if (formData.faqs.length > 1) {
        setFormData((prev) => ({
          ...prev,
          faqs: prev.faqs.filter((_, i) => i !== index),
        }));
      }
    },
    [formData.faqs.length]
  );

  const addItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", price: 0, description: "" }],
    }));
  }, []);

  const updateItem = useCallback(
    (index: number, field: keyof Item, value: string | number) => {
      setFormData((prev) => {
        const updatedItems = [...prev.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        return { ...prev, items: updatedItems };
      });
    },
    []
  );

  const removeItem = useCallback(
    (index: number) => {
      if (formData.items.length > 1) {
        setFormData((prev) => ({
          ...prev,
          items: prev.items.filter((_, i) => i !== index),
        }));
      }
    },
    [formData.items.length]
  );

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps && validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const startOver = useCallback(() => {
    const resetData: BusinessData = {
      email: "",
      password: "",
      businessName: "",
      business_id: "",
      businessDescription: "",
      businessAddress: "",
      businessPhone: "",
      businessEmailAddress: "",
      businessCategory: "",
      businessOpenHours: "",
      businessOpenDays: "",
      businessWebsite: "",
      businessPicture: "",
      extra_information: "",
      faqs: [{ question: "", answer: "" }],
      items: [{ name: "", price: 0, description: "" }],
    };
    setFormData(resetData);
    setCurrentStep(1);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const res = await AUTH.register(formData);
      if (res.message === "Business registered successfully") {
        localStorage.setItem("businessData", JSON.stringify(res.business));

        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            email={formData.email}
            password={formData.password}
            onEmailChange={(value) => handleInputChange("email", value)}
            onPasswordChange={(value) => handleInputChange("password", value)}
          />
        );

      case 2:
        return (
          <Step2
            businessName={formData.businessName}
            businessDescription={formData.businessDescription}
            businessCategory={formData.businessCategory}
            onBusinessNameChange={(value) =>
              handleInputChange("businessName", value)
            }
            onBusinessDescriptionChange={(value) =>
              handleInputChange("businessDescription", value)
            }
            onBusinessCategoryChange={(value) =>
              handleInputChange("businessCategory", value)
            }
          />
        );

      case 3:
        return (
          <Step3
            businessAddress={formData.businessAddress}
            businessPhone={formData.businessPhone}
            businessEmailAddress={formData.businessEmailAddress}
            businessWebsite={formData.businessWebsite}
            onBusinessAddressChange={(value) =>
              handleInputChange("businessAddress", value)
            }
            onBusinessPhoneChange={(value) =>
              handleInputChange("businessPhone", value)
            }
            onBusinessEmailAddressChange={(value) =>
              handleInputChange("businessEmailAddress", value)
            }
            onBusinessWebsiteChange={(value) =>
              handleInputChange("businessWebsite", value)
            }
          />
        );

      case 4:
        return (
          <Step4
            businessOpenHours={formData.businessOpenHours}
            businessOpenDays={formData.businessOpenDays}
            businessPicture={formData.businessPicture}
            extra_information={formData.extra_information}
            onBusinessOpenHoursChange={(value) =>
              handleInputChange("businessOpenHours", value)
            }
            onBusinessOpenDaysChange={(value) =>
              handleInputChange("businessOpenDays", value)
            }
            onBusinessPictureChange={(value) =>
              handleInputChange("businessPicture", value)
            }
            onExtraInformationChange={(value) =>
              handleInputChange("extra_information", value)
            }
          />
        );

      case 5:
        return (
          <Step5
            faqs={formData.faqs}
            onUpdateFAQ={updateFAQ}
            onAddFAQ={addFAQ}
            onRemoveFAQ={removeFAQ}
          />
        );

      case 6:
        return (
          <Step6
            items={formData.items}
            onUpdateItem={updateItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        );

      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    handleInputChange,
    updateFAQ,
    addFAQ,
    removeFAQ,
    updateItem,
    addItem,
    removeItem,
  ]);

  const stepIndicators = useMemo(
    () =>
      Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full ${
            i + 1 <= currentStep ? "bg-blue-600" : "bg-gray-600"
          }`}
        />
      )),
    [currentStep, totalSteps]
  );

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden z-10">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 flex-col">
        <div className="h-auto max-h-[90vh] w-full sm:w-[600px] drop-shadow-lg bg-black p-8 rounded-3xl overflow-y-auto">
          <MemoizedAnimatedText
            text="Hello, I am SharpChat AI"
            className=" text-2xl sm:text-4xl"
            delay={100}
            duration={0.6}
          />
          <MemoizedAnimatedText
            text="Can we get to know your business?"
            className=" text-lg animate-pulse text-blue-600"
            delay={100}
            duration={0.6}
          />
          {currentStep === 1 && (
            <div className="mt-4 flex justify-between items-center">
              <Link href="/signin" className="text-blue-500 hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          )}
          {currentStep > 1 && (
            <div className="mt-4 text-right">
              <button
                onClick={startOver}
                className="text-red-500 hover:underline text-sm cursor-pointer"
              >
                Start Over
              </button>
            </div>
          )}
          <div className="mt-4 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Step {currentStep} of {totalSteps}
              </p>
              <div className="flex gap-1">{stepIndicators}</div>
            </div>
          </div>
          <motion.div
            className="mt-6"
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <MultilayerCardV_3>
              <ClickSpark
                sparkColor="#fff"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep}
                  </motion.div>
                </AnimatePresence>
              </ClickSpark>
            </MultilayerCardV_3>
          </motion.div>
        </div>
        <div className="flex gap-4 mt-6 self-start md:self-center px-10">
          {currentStep > 0 && (
            <Button_v2
              onClick={prevStep}
              className={`w-full ${currentStep === 1 ? "invisible" : ""}`}
              variant={"ghost"}
            >
              Previous
            </Button_v2>
          )}
          {currentStep < totalSteps ? (
            <Button_v2 onClick={nextStep} className="w-full">
              Next
            </Button_v2>
          ) : (
            <Button_v2
              onClick={handleSubmit}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button_v2>
          )}
        </div>
      </div>

      <MemoizedParticles
        className="z-10"
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}
