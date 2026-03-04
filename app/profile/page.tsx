"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface UserRegistration {
  id: string;
  schoolName: string;
  schoolAddress: string;
  teacherName: string;
  teacherPhone: string;
  teachersParticipating: string;
  totalAmount: string;
  competitionId: string | null;
  createdAt: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentGateway: "RAZORPAY";
  paymentAmount: number | null;
  paymentCurrency: string;
  paymentOrderId: string | null;
  paymentId: string | null;
  paymentPaidAt: string | null;
  paymentError: string | null;
  competition: {
    id: string;
    name: string;
    date: string;
    badge: string;
  } | null;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<UserRegistration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payingRegistrationId, setPayingRegistrationId] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registration/me", { cache: "no-store" });
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setRegistrations(data.data);
      } else {
        setRegistrations([]);
      }
    } catch {
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async (registration: UserRegistration) => {
    if (registration.paymentStatus !== "PENDING") return;

    setPayingRegistrationId(registration.id);
    try {
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway. Please try again.");
        return;
      }

      const response = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: registration.id }),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || "Failed to create payment order.");
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Xtrnia",
        description: "Competition registration payment",
        order_id: data.orderId,
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        handler: async (paymentResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyResponse = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              registrationId: registration.id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            await fetchRegistrations();
          } else {
            alert(verifyData.message || "Payment verification failed.");
          }
        },
        theme: {
          color: "#facc15",
        },
      } as any;

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } finally {
      setPayingRegistrationId(null);
    }
  };

  const formatAmount = (amount: number | null, currency: string) => {
    if (!amount) return "-";
    const value = (amount / 100).toFixed(2);
    return `${currency} ${value}`;
  };

  const statusBadge = (status: UserRegistration["paymentStatus"]) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
      PAID: "bg-green-500/20 text-green-300 border-green-500/40",
      FAILED: "bg-red-500/20 text-red-300 border-red-500/40",
      REFUNDED: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${styles[status] || "bg-white/10 text-white/60 border-white/10"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Your Profile
              </span>
            </h1>
            <p className="text-white/60 text-lg">Account overview and registrations</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/register"
              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
            >
              Register
            </Link>
            <SignOutButton>
              <button className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl hover:bg-red-500/30 transition-all">
                Log out
              </button>
            </SignOutButton>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-2xl font-black text-yellow-300 mb-4">Account</h2>
          <div className="space-y-2">
            <p className="text-white/80">
              <span className="text-white/50">Name:</span> {user?.fullName || "-"}
            </p>
            <p className="text-white/80">
              <span className="text-white/50">Email:</span> {user?.primaryEmailAddress?.emailAddress || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-2xl font-black text-yellow-300">Your Registrations</h2>
          </div>
          {loading ? (
            <p className="text-white/60">Loading your registrations...</p>
          ) : registrations.length === 0 ? (
            <p className="text-white/60">No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {registrations.map((registration) => (
                <div key={registration.id} className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-yellow-400/40 hover:bg-black/40">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegistration(registration);
                      setIsModalOpen(true);
                    }}
                    className="w-full text-left"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-white font-semibold">
                        {registration.competition?.name || "Competition unavailable"}
                      </p>
                      {statusBadge(registration.paymentStatus)}
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                      {registration.competition?.date || "-"}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      Submitted: {new Date(registration.createdAt).toLocaleString()}
                    </p>
                    <p className="text-yellow-300/80 text-xs mt-2">View details</p>
                  </button>
                  {registration.paymentStatus === "PENDING" && (
                    <button
                      type="button"
                      onClick={() => startPayment(registration)}
                      disabled={payingRegistrationId === registration.id}
                      className="mt-3 px-4 py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {payingRegistrationId === registration.id ? "Processing..." : "Pay now"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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

      {isModalOpen && selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
              setSelectedRegistration(null);
            }
          }}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-yellow-300">Registration Details</h3>
                <p className="text-white/60 text-sm">
                  Submitted {new Date(selectedRegistration.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRegistration(null);
                }}
                className="text-white/70 hover:text-white text-2xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-white/60 text-xs uppercase tracking-wide">Competition</p>
                <p className="text-white font-semibold">
                  {selectedRegistration.competition?.name || "Competition unavailable"}
                </p>
                <p className="text-white/70 text-sm">
                  {selectedRegistration.competition?.date || "-"}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {selectedRegistration.competition?.badge || "-"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">School Name</p>
                  <p className="text-white font-semibold">{selectedRegistration.schoolName}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Teacher Name</p>
                  <p className="text-white font-semibold">{selectedRegistration.teacherName}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Teacher Phone</p>
                  <p className="text-white font-semibold">{selectedRegistration.teacherPhone || "-"}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-white/60 text-xs uppercase tracking-wide">School Address</p>
                <p className="text-white font-semibold whitespace-pre-line">
                  {selectedRegistration.schoolAddress}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Teachers</p>
                  <p className="text-white font-semibold">{selectedRegistration.teachersParticipating}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Total Amount</p>
                  <p className="text-white font-semibold">{selectedRegistration.totalAmount}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Payment Status</p>
                  <p className="text-white font-semibold">{selectedRegistration.paymentStatus}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Paid Amount</p>
                  <p className="text-white font-semibold">
                    {formatAmount(selectedRegistration.paymentAmount, selectedRegistration.paymentCurrency)}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Paid At</p>
                  <p className="text-white font-semibold">
                    {selectedRegistration.paymentPaidAt
                      ? new Date(selectedRegistration.paymentPaidAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Gateway</p>
                  <p className="text-white font-semibold">{selectedRegistration.paymentGateway}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Order ID</p>
                  <p className="text-white font-semibold break-all">
                    {selectedRegistration.paymentOrderId || "-"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Payment ID</p>
                  <p className="text-white font-semibold break-all">
                    {selectedRegistration.paymentId || "-"}
                  </p>
                </div>
              </div>

              {selectedRegistration.paymentStatus === "PENDING" && (
                <button
                  type="button"
                  onClick={() => startPayment(selectedRegistration)}
                  disabled={payingRegistrationId === selectedRegistration.id}
                  className="mt-2 px-4 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {payingRegistrationId === selectedRegistration.id ? "Processing..." : "Pay now"}
                </button>
              )}

              {selectedRegistration.paymentError && (
                <p className="text-red-300 text-sm">{selectedRegistration.paymentError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
