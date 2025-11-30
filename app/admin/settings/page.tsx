'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface AdminInfo {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettings() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const router = useRouter();

  // Verify admin authentication
  const verifyAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/admin/login');
      }
    } catch {
      router.push('/admin/login');
    }
  };

  // Fetch admin info
  const fetchAdminInfo = async () => {
    try {
      const response = await fetch('/api/admin/info', {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success) {
        setAdminInfo(data.data);
      }
    } catch (error) {
      console.error('Error fetching admin info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
    fetchAdminInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSubmitStatus({
        type: 'error',
        message: 'New passwords do not match',
      });
      return;
    }

    // Validate password strength
    if (passwordForm.newPassword.length < 8) {
      setSubmitStatus({
        type: 'error',
        message: 'Password must be at least 8 characters long',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message,
        });
        // Reset form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to change password',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.jpg" alt="Xtrnia" width={48} height={48} className="rounded-lg" />
            <h1 className="text-2xl font-black text-yellow-400">Admin Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
            <p className="text-white/60 mt-4">Loading settings...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Admin Information Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Username</label>
                  <p className="text-white text-lg font-semibold">{adminInfo?.username}</p>
                </div>

                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Account ID</label>
                  <p className="text-white/80 text-sm font-mono">{adminInfo?.id}</p>
                </div>

                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Account Created</label>
                  <p className="text-white/80">{adminInfo && formatDate(adminInfo.createdAt)}</p>
                </div>

                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Last Updated</label>
                  <p className="text-white/80">{adminInfo && formatDate(adminInfo.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`px-6 py-4 rounded-2xl border-2 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-500/10 border-green-500/50 text-green-400'
                        : 'bg-red-500/10 border-red-500/50 text-red-400'
                    } text-sm font-medium`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                    Current Password <span className="text-yellow-400">*</span>
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                    placeholder="Enter your current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                    New Password <span className="text-yellow-400">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                    Confirm New Password <span className="text-yellow-400">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                    placeholder="Confirm your new password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Updating Password...' : 'Change Password'}
                </button>
              </form>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-blue-400 font-bold mb-2">Security Tips</h3>
                  <ul className="text-blue-300/80 text-sm space-y-1">
                    <li>• Use a strong password with at least 8 characters</li>
                    <li>• Include uppercase, lowercase, numbers, and special characters</li>
                    <li>• Never share your password with anyone</li>
                    <li>• Change your password regularly for better security</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
