"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedText from "@/components/AnimatedText";
import { Button_v2 } from "@/components/shared/Button";
import { Business } from "@/services/authService";
import Particles from "@/components/Particles";
// import MultilayerCardV_3 from "@/components/shared/CardLayer3";
import { motion } from "framer-motion";
// import { showErrorToast } from "@/libs/utils/showToast";

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
      <div className="relative flex items-center justify-center h-screen bg-black">
        <Particles
          className="absolute inset-0 z-0"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="relative z-10">
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Particles Background - Fixed positioning */}
      <div className="fixed inset-0 z-0">
        <Particles
          className="w-full h-full"
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

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8 max-w-7xl mx-auto bg-black/10 backdrop-blur-sm ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-4">
          <AnimatedText
            text="Business Dashboard"
            className="text-3xl sm:text-4xl text-white"
            delay={100}
            duration={0.6}
          />
          <div className="flex gap-2">
            <Button_v2
              className="whitespace-nowrap"
              onClick={() => router.push(`/dashboard/edit/${businessData.business_id}`)}
            >
              Edit
            </Button_v2>
            <Button_v2
              className="whitespace-nowrap bg-red-600 hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem("businessData");
                router.push("/signin");
              }}
            >
              Logout
            </Button_v2>
          </div>
        </div>

        {/* Business Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          {/* <MultilayerCardV_3> */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Business Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Business ID</p>
                <p className="text-white font-semibold break-words">
                  {businessData.business_id}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-semibold break-words">
                  {businessData.email}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Business Name</p>
                <p className="text-white font-semibold break-words">
                  {businessData.businessName}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-white font-semibold break-words">
                  {businessData.businessCategory}
                </p>
              </div>
            </div>
          </div>
          {/* </MultilayerCardV_3> */}
        </motion.div>

        {/* Business Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Business Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Description</p>
                <p className="text-white break-words">
                  {businessData.businessDescription}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white break-words">
                    {businessData.businessAddress}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white break-words">
                    {businessData.businessPhone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Business Email</p>
                  <p className="text-white break-words">
                    {businessData.businessEmailAddress}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <p className="text-white break-words">
                    {businessData.businessWebsite || "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Open Hours</p>
                <p className="text-white break-words">
                  {businessData.businessOpenHours}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Open Days</p>
                <p className="text-white break-words">
                  {businessData.businessOpenDays}
                </p>
              </div>
              {businessData.extra_information && (
                <div>
                  <p className="text-gray-400 text-sm">Extra Information</p>
                  <p className="text-white break-words">
                    {businessData.extra_information}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Business Picture */}
        {/* {businessData.businessPicture && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Business Picture
              </h2>
              <img
                src={businessData.businessPicture}
                alt={businessData.businessName}
                className="rounded-lg max-w-full w-full sm:max-w-md"
              />
            </div>
          </motion.div>
        )} */}

        {/* FAQs */}
        {businessData.faqs && businessData.faqs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                FAQs
              </h2>
              <div className="space-y-4">
                {businessData.faqs.map((faq, index) => (
                  <div key={index} className="py-2">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700  transition-colors">
                      <p className="text-blue-400 font-bold text-lg mb-2 break-words">
                        Q: {faq.question}
                      </p>
                      <p className="text-gray-300 break-words leading-relaxed">
                        A: {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Items/Menu */}
        {businessData.items && businessData.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6 pb-8"
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Menu Items
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessData.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 transition-colors"
                  >
                    <h3 className="text-white font-bold text-lg mb-2 break-words">
                      {item.name}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-2">
                      ₦ {item.price}
                    </p>
                    {item.description && (
                      <p className="text-gray-300 text-sm break-words">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
