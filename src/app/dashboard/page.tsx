"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedText from "@/components/AnimatedText";
import { Button_v2 } from "@/components/shared/Button";
import { Business } from "@/services/authService";

export default function Dashboard() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<Business | null>(null);

  useEffect(() => {
    // Get business data from localStorage or session
    const storedData = localStorage.getItem("businessData");
    if (storedData) {
      setBusinessData(JSON.parse(storedData));
    } else {
      // If no data, redirect to sign in
      router.push("/signin");
    }
  }, [router]);

  if (!businessData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <AnimatedText
            text="Business Dashboard"
            className="text-4xl text-white"
            delay={100}
            duration={0.6}
          />
          <Button_v2
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Business Info
          </Button_v2>
        </div>

        {/* Business Overview */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Business Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Business ID</p>
              <p className="text-white font-semibold">{businessData.business_id}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-semibold">{businessData.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Business Name</p>
              <p className="text-white font-semibold">{businessData.businessName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Category</p>
              <p className="text-white font-semibold">{businessData.businessCategory}</p>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Business Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Description</p>
              <p className="text-white">{businessData.businessDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Address</p>
                <p className="text-white">{businessData.businessAddress}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white">{businessData.businessPhone}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Business Email</p>
                <p className="text-white">{businessData.businessEmailAddress}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Website</p>
                <p className="text-white">{businessData.businessWebsite || "N/A"}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Open Hours</p>
              <p className="text-white">{businessData.businessOpenHours}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Open Days</p>
              <p className="text-white">{businessData.businessOpenDays}</p>
            </div>
            {businessData.extra_information && (
              <div>
                <p className="text-gray-400 text-sm">Extra Information</p>
                <p className="text-white">{businessData.extra_information}</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Picture */}
        {businessData.businessPicture && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Business Picture</h2>
            <img
              src={businessData.businessPicture}
              alt={businessData.businessName}
              className="rounded-lg max-w-md"
            />
          </div>
        )}

        {/* FAQs */}
        {businessData.faqs && businessData.faqs.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">FAQs</h2>
            <div className="space-y-4">
              {businessData.faqs.map((faq, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <p className="text-white font-semibold mb-2">{faq.question}</p>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items/Menu */}
        {businessData.items && businessData.items.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessData.items.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-blue-400 font-semibold mb-2">${item.price.toFixed(2)}</p>
                  {item.description && (
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
