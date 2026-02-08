"use client";

import AnimatedText from "@/components/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import { Button_v2 } from "@/components/shared/Button";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
const MemoizedAnimatedText = memo(AnimatedText);

export default function Home() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const AUTH = useAuthService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const business_id = params.business_id as string;

  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState<BusinessData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("businessData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log({ parsedData });
      setFormData({
        businessName: parsedData.businessName,
        business_id: parsedData.business_id || "",
        businessDescription: parsedData.businessDescription || "",
        businessAddress: parsedData.businessAddress || "",
        businessPhone: parsedData.businessPhone || "",
        businessEmailAddress: parsedData.businessEmailAddress || "",
        businessCategory: parsedData.businessCategory || "",
        businessOpenHours: parsedData.businessOpenHours || "",
        businessOpenDays: parsedData.businessOpenDays || "",
        businessWebsite: parsedData.businessWebsite || "",
        businessPicture: "",
        extra_information: parsedData.extra_information || "",
        faqs: parsedData.faqs || [{ question: "", answer: "" }],
        items: parsedData.items || [{ name: "", price: 0, description: "" }],
      });
    } else {
      router.push("/main/signin");
    }
  }, [router]);

  const totalSteps = 6;

  const validateCurrentStep = useCallback((): boolean => {
    if (!formData) return false;
    switch (currentStep) {
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
          showErrorToast("Business address or YardCode is required");
          return false;
        }
        if (!formData.businessPhone) {
          showErrorToast("Business phone is required");
          return false;
        }
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.businessPhone)) {
          showErrorToast("Please enter a valid phone number");
          return false;
        }
        if (!formData.businessEmailAddress) {
          showErrorToast("Business email address is required");
          return false;
        }
        const businessEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!businessEmailRegex.test(formData.businessEmailAddress)) {
          showErrorToast("Please enter a valid business email address");
          return false;
        }
        if (!formData.businessWebsite) {
          showErrorToast("Business website is required");
          return false;
        }
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
            "All items must have a name and a price greater than 0",
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
      setFormData((prev) => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    },
    [],
  );

  const addFAQ = useCallback(() => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        faqs: [...prev.faqs, { question: "", answer: "" }],
      };
    });
  }, []);

  const updateFAQ = useCallback(
    (index: number, field: "question" | "answer", value: string) => {
      setFormData((prev) => {
        if (!prev) return prev;
        const updatedFAQs = [...prev.faqs];
        updatedFAQs[index][field] = value;
        return { ...prev, faqs: updatedFAQs };
      });
    },
    [],
  );

  const removeFAQ = useCallback(
    (index: number) => {
      if (!formData) return;
      if (formData.faqs.length > 1) {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index),
          };
        });
      }
    },
    [formData?.faqs.length],
  );

  const addItem = useCallback(() => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: [...prev.items, { name: "", price: 0, description: "" }],
      };
    });
  }, []);

  const updateItem = useCallback(
    (index: number, field: keyof Item, value: string | number) => {
      setFormData((prev) => {
        if (!prev) return prev;
        const updatedItems = [...prev.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        return { ...prev, items: updatedItems };
      });
    },
    [],
  );

  const removeItem = useCallback(
    (index: number) => {
      if (!formData) return;
      if (formData.items.length > 1) {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
          };
        });
      }
    },
    [formData?.items.length],
  );

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps && validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 2) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const startOver = useCallback(() => {
    const resetData: BusinessData = {
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
    setCurrentStep(2);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData) return;
    try {
      setIsSubmitting(true);
      const res = await AUTH.updateBusinessDetails(business_id, formData);
      if (res.message === "Business updated successfully") {
        localStorage.setItem("businessData", JSON.stringify(res.business));
        router.push("/main/dashboard");
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router]);

  const renderStep = useMemo(() => {
    if (!formData) return null;
    switch (currentStep) {
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
      Array.from({ length: totalSteps - 1 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full ${
            i + 2 <= currentStep ? "bg-blue-600" : "bg-gray-600"
          }`}
        />
      )),
    [currentStep, totalSteps],
  );

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden z-10">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 flex-col">
        <div className="h-auto max-h-[90vh] w-full sm:w-[600px]  p-8 rounded-3xl overflow-y-auto scrollbar-hide">
          <MemoizedAnimatedText
            text="Edit Your Business"
            className=" text-2xl sm:text-4xl"
            delay={100}
            duration={0.6}
          />
          <MemoizedAnimatedText
            text="Update your business information"
            className=" text-lg animate-pulse text-[#7DD3C0]"
            delay={100}
            duration={0.6}
          />
          {currentStep > 2 && (
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
                Step {currentStep - 1} of {totalSteps - 1}
              </p>
              <div className="flex gap-1">{stepIndicators}</div>
            </div>
          </div>
          <motion.div
            className="mt-6"
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        </div>
        <div className="flex gap-4 mt-6 self-start md:self-center px-10">
          {currentStep > 2 && (
            <Button_v2
              onClick={prevStep}
              className={`w-full ${currentStep === 2 ? "invisible" : ""}`}
              variant={"ghost"}
            >
              Previous
            </Button_v2>
          )}
          {currentStep < 6 ? (
            <Button_v2 onClick={nextStep} className="w-full">
              Next
            </Button_v2>
          ) : (
            <Button_v2
              onClick={handleSubmit}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button_v2>
          )}
        </div>
      </div>
    </div>
  );
}
