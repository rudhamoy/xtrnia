"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Competition {
  id: string;
  name: string;
  badge: string;
  date: string;
  image: string;
  category: string;
  minClass: number;
  maxClass: number;
  prizes: string[];
  type: 'current' | 'upcoming';
  status: 'active' | 'inactive';
  order: number;
}

interface UserRegistration {
  id: string;
  schoolName: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  createdAt: string;
  competition: {
    id: string;
    name: string;
    date: string;
    badge: string;
  } | null;
}

export default function Register() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
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
    teacherPhone: "",
    classesParticipating: [] as string[],
    competitionId: "",
  });

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  // Fetch competitions for dropdown
  useEffect(() => {
    async function fetchCompetitions() {
      try {
        const res = await fetch("/api/competitions?type=upcoming&status=active");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCompetitions(json.data);
        }
      } catch (e) {
        setCompetitions([]);
      }
    }
    fetchCompetitions();
  }, []);

  // Pre-select competitionId from query param if present (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const preselectId = params.get('competitionId');
      if (preselectId) {
        setFormData((prev) => ({ ...prev, competitionId: preselectId }));
      }
    }
  }, []);
  // chnage of the google Sheets
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [myRegistrations, setMyRegistrations] = useState<UserRegistration[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);

  useEffect(() => {
    async function fetchMyRegistrations() {
      if (!isSignedIn) {
        setMyRegistrations([]);
        return;
      }

      setRegistrationsLoading(true);
      try {
        const response = await fetch("/api/registration/me", { cache: "no-store" });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setMyRegistrations(data.data);
        } else {
          setMyRegistrations([]);
        }
      } catch {
        setMyRegistrations([]);
      } finally {
        setRegistrationsLoading(false);
      }
    }

    fetchMyRegistrations();
  }, [isSignedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassToggle = (value: string) => {
    setFormData((prev) => {
      const exists = prev.classesParticipating.includes(value);
      return {
        ...prev,
        classesParticipating: exists
          ? prev.classesParticipating.filter((item) => item !== value)
          : [...prev.classesParticipating, value],
      };
    });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitStatus({
          type: "success",
          message: "Registration submitted successfully! We will contact you soon.",
        });
        setFormData({
          schoolName: "",
          schoolAddress: "",
          teacherName: "",
          teacherPhone: "",
          classesParticipating: [],
          competitionId: "",
        });
        router.push("/profile");
      } else {
        setSubmitStatus({
          type: "error",
          message: json.message || "Failed to submit registration. Please try again.",
        });
      }
    } catch (error) {
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

        {/* Auth Gate */}
        {!isSignedIn && (
          <div className="mb-8 p-6 rounded-2xl border-2 border-yellow-400/30 bg-yellow-400/10 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-yellow-300 mb-2">Sign up first to continue</h2>
            <p className="text-white/80 mb-5">
              You must create an account before submitting competition registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <SignUpButton mode="redirect" forceRedirectUrl="/register">
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl">
                  Create Account
                </button>
              </SignUpButton>
              <SignInButton mode="redirect" forceRedirectUrl="/register">
                <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        )}

        {/* My Registrations */}
        {isSignedIn && (
          <div className="mb-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-2xl font-black text-yellow-300">Your Registrations</h2>
              <Link
                href="/profile"
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all w-fit"
              >
                View Profile
              </Link>
            </div>
            {registrationsLoading ? (
              <p className="text-white/60">Loading your registrations...</p>
            ) : myRegistrations.length === 0 ? (
              <p className="text-white/60">No registrations yet.</p>
            ) : (
              <div className="space-y-3">
                {myRegistrations.slice(0, 5).map((registration) => (
                  <div key={registration.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-white font-semibold">
                      {registration.competition?.name || "Competition unavailable"}
                    </p>
                    <p className="text-white/70 text-sm">
                      {registration.competition?.date || "-"} | Payment: {registration.paymentStatus}
                    </p>
                    <p className="text-white/50 text-xs">
                      Submitted: {new Date(registration.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
                {myRegistrations.length > 5 && (
                  <p className="text-white/50 text-xs">
                    Showing latest 5 out of {myRegistrations.length} registrations.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

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
        {isSignedIn && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12">
          <form onSubmit={handleFinalSubmit} className="space-y-8">
                        {/* Competition Selection */}
                        <div className="group">
                          <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                            Select Competition <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="competitionId"
                            value={formData.competitionId}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                          >
                            <option value="">Select a competition</option>
                            {competitions.map((comp: Competition) => (
                              <option key={comp.id} value={comp.id}>
                                {comp.name} ({comp.date})
                              </option>
                            ))}
                          </select>
                        </div>
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
                Name of Sports Teacher <span className="text-red-400">*</span>
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

            {/* Sports Teacher Contact Number */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Sports Teacher Contact Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="teacherPhone"
                value={formData.teacherPhone}
                onChange={handleChange}
                required
                placeholder="Your answer"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
              />
            </div>

            {/* Class participating */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Class Participating <span className="text-red-400">*</span>
              </label>
              {(() => {
                const selectedCompetition = competitions.find((c: Competition) => c.id === formData.competitionId);
                if (!selectedCompetition) {
                  return (
                    <p className="text-white/60 text-sm">Select a competition to see available classes.</p>
                  );
                }

                const options = Array.from(
                  { length: selectedCompetition.maxClass - selectedCompetition.minClass + 1 },
                  (_, index) => String(selectedCompetition.minClass + index)
                );
                options.push("Teacher");

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {options.map((value) => {
                      const checked = formData.classesParticipating.includes(value);
                      return (
                        <label
                          key={value}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                            checked
                              ? "border-yellow-400/70 bg-yellow-400/10 text-yellow-300"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleClassToggle(value)}
                            className="h-4 w-4 accent-yellow-400"
                          />
                          {value === "Teacher" ? "Teacher" : `Class ${value}`}
                        </label>
                      );
                    })}
                  </div>
                );
              })()}
              {formData.classesParticipating.length > 0 && (
                <p className="text-white/60 text-xs mt-2">
                  Selected {formData.classesParticipating.length} class{formData.classesParticipating.length === 1 ? "" : "es"}.
                </p>
              )}
            </div>

            {/* Total amount to be paid */}
            <div className="group">
              <label className="block text-yellow-300 font-bold text-sm mb-3 tracking-wide">
                Total amount to be paid <span className="text-red-400">*</span>
              </label>
              <div className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white">
                INR {formData.classesParticipating.length * 750}
              </div>
              <p className="text-white/50 text-xs mt-2">₹750 per class selected.</p>
            </div>

            {/* Next Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    schoolName: "",
                    schoolAddress: "",
                    teacherName: "",
                    teacherPhone: "",
                    classesParticipating: [],
                    competitionId: "",
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
        </div>
        )}

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
