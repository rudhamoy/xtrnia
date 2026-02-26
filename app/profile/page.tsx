"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

interface UserRegistration {
  id: string;
  schoolName: string;
  transactionId: string;
  createdAt: string;
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

  useEffect(() => {
    async function fetchRegistrations() {
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
    }

    fetchRegistrations();
  }, []);

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
          <h2 className="text-2xl font-black text-yellow-300 mb-4">Your Registrations</h2>
          {loading ? (
            <p className="text-white/60">Loading your registrations...</p>
          ) : registrations.length === 0 ? (
            <p className="text-white/60">No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {registrations.map((registration) => (
                <div key={registration.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-white font-semibold">
                    {registration.competition?.name || "Competition unavailable"}
                  </p>
                  <p className="text-white/70 text-sm">
                    {registration.competition?.date || "-"} | Txn: {registration.transactionId}
                  </p>
                  <p className="text-white/50 text-xs">
                    Submitted: {new Date(registration.createdAt).toLocaleString()}
                  </p>
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
    </div>
  );
}
