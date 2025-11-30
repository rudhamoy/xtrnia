'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
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

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact', {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub.id !== id));
        setSelectedSubmission(null);
      } else {
        alert('Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.jpg" alt="Xtrnia" width={48} height={48} className="rounded-lg" />
            <h1 className="text-2xl font-black text-yellow-400">Contact Submissions</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:inline">Settings</span>
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
            <p className="text-white/60 mt-4">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">No Submissions Yet</h2>
            <p className="text-white/60">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissions List */}
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  All Submissions ({submissions.length})
                </h2>
                <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSubmission?.id === submission.id
                          ? 'bg-yellow-500/20 border-yellow-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-bold">{submission.name}</h3>
                          <p className="text-white/60 text-sm">{submission.email}</p>
                        </div>
                        <span className="text-xs text-white/40">
                          {formatDate(submission.createdAt)}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {submission.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submission Detail */}
            <div className="sticky top-24">
              {selectedSubmission ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold text-white">Submission Details</h2>
                    <button
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">
                        Full Name
                      </label>
                      <p className="text-white text-lg font-medium">
                        {selectedSubmission.name}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-2">
                          Phone Number
                        </label>
                        <a
                          href={`tel:${selectedSubmission.phone}`}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          +91 {selectedSubmission.phone}
                        </a>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm font-medium block mb-2">
                          Email Address
                        </label>
                        <a
                          href={`mailto:${selectedSubmission.email}`}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors break-all"
                        >
                          {selectedSubmission.email}
                        </a>
                      </div>
                    </div>

                    {/* Submitted At */}
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">
                        Submitted At
                      </label>
                      <p className="text-white">
                        {formatDate(selectedSubmission.createdAt)}
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-2">
                        Message
                      </label>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-white whitespace-pre-wrap">
                          {selectedSubmission.message}
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-white/10">
                      <label className="text-white/60 text-sm font-medium block mb-3">
                        Quick Actions
                      </label>
                      <div className="flex gap-3">
                        <a
                          href={`mailto:${selectedSubmission.email}?subject=Re: Your message to Xtrnia`}
                          className="flex-1 px-4 py-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all text-center font-medium"
                        >
                          Reply via Email
                        </a>
                        <a
                          href={`tel:${selectedSubmission.phone}`}
                          className="flex-1 px-4 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-center font-medium"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <p className="text-white/60">
                    Select a submission to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
