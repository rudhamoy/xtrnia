"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Register() {
  // Set page title and meta tags for SEO
  useEffect(() => {
    document.title = "Register Your School - Xtrnia Interschool Competitions";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Register your school for exciting interschool sports tournaments. Fill out the registration form to participate in Tug-of-War, Kabaddi, Basketball, and other competitions across India.');

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'school registration, interschool tournament registration, sports competition registration, register school for competition, Xtrnia registration');
  }, []);
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    teacherName: "",
    studentRep1Name: "",
    studentRep2Name: "",
    classInfo: "",
    teachersParticipating: "",
    totalAmount: "",
  });
  // chnage of the google Sheets
  
  const [transactionId, setTransactionId] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Show payment section
    setShowPayment(true);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_WEB_ID;

      if (!scriptURL) {
        throw new Error("Google Web ID not configured");
      }

      // Combine form data with transaction ID
      const finalData = {
        ...formData,
        transactionId: transactionId,
      };

      // Submit to Google Apps Script with no-cors mode
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(finalData),
        headers: { "Content-Type": "application/json" }
      });

      // Since no-cors doesn't return response, assume success
      setSubmitStatus({
        type: "success",
        message: "Registration submitted successfully! We will contact you soon.",
      });

      // Clear form
      setFormData({
        schoolName: "",
        schoolAddress: "",
        teacherName: "",
        studentRep1Name: "",
        studentRep2Name: "",
        classInfo: "",
        teachersParticipating: "",
        totalAmount: "",
      });
      setTransactionId("");
      setShowPayment(false);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit registration. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Registration Form
            </span>
          </h1>
          <p className="text-white/60 text-lg">Register your school for upcoming competitions</p>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <div
            className={`mb-8 p-6 rounded-2xl border-2 backdrop-blur-xl ${
              submitStatus.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {submitStatus.type === "success" ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="font-semibold">{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12">
          {!showPayment ? (
          <form onSubmit={handleNext} className="space-y-8">
            {/* Name of School */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Name of School <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Address of School */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Address of School <span className="text-red-400">*</span>
              </label>
              <textarea
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={handleChange}
                required
                placeholder="Your answer"
                rows={3}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/20"
              />
            </div>

            {/* Name of Sports Teacher */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Name of Sports Teacher and Phone number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Name of Student Representative Number 1 */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Name of Student Representative Number - 1 and Phone number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="studentRep1Name"
                value={formData.studentRep1Name}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Name of Student Representative Number 2 */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Name of Student Representative Number - 2 and Phone number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="studentRep2Name"
                value={formData.studentRep2Name}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Number of class participating and number of students in each class */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Number of class participating and number of students in each class <span className="text-red-400">*</span>
              </label>
              <textarea
                name="classInfo"
                value={formData.classInfo}
                onChange={handleChange}
                required
                placeholder="Your answer"
                rows={3}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/20"
              />
            </div>

            {/* Number of Teachers participating */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Number of Teachers participating <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="teachersParticipating"
                value={formData.teachersParticipating}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Total amount to be paid */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Total amount to be paid (including all students & teacher) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Next Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] flex-1"
              >
                <span className="relative z-10">Next</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    schoolName: "",
                    schoolAddress: "",
                    teacherName: "",
                    studentRep1Name: "",
                    studentRep2Name: "",
                    classInfo: "",
                    teachersParticipating: "",
                    totalAmount: "",
                  });
                  setSubmitStatus({ type: null, message: "" });
                }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/50 flex-1"
              >
                Clear form
              </button>
            </div>

            {/* Required note */}
            <p className="text-red-400 text-sm text-center pt-4">
              * Indicates required question
            </p>
          </form>
          ) : (
          <form onSubmit={handleFinalSubmit} className="space-y-8">
            {/* Payment Section */}
            <div className="text-center">
              <h3 className="text-3xl font-black text-yellow-400 mb-6">Payment</h3>
              <p className="text-white/70 mb-8">Scan the QR code to complete the payment</p>

              {/* QR Code Image */}
              <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-2xl">
                  <img
                    src="/qrcode.jpg"
                    alt="Payment QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              {/* Transaction ID Input */}
              <div className="group max-w-md mx-auto">
                <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide text-left">
                  Transaction ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  placeholder="Enter your transaction ID"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/50 flex-1"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !transactionId}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
