'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/registration', { cache: 'no-store' });
      if (!res.ok) return setRegistrations([]);
      const json = await res.json();
      setRegistrations(json.data || []);
    } catch {
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/registration/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchRegistrations();
      } else {
        alert(json.message || 'Failed to delete registration.');
      }
    } catch {
      alert('Failed to delete registration.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.jpg"
              alt="Xtrnia"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-black text-yellow-400">
              Contact Submissions
            </h1>
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="min-w-6xl p-20">
        <h1 className="text-3xl font-bold mb-8">Registrations</h1>
        <div className="overflow-x-auto rounded-xl shadow border border-gray-700 bg-black/60">
          <table className="min-w-full text-sm text-white">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Teachers</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Competition</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-yellow-400">
                    Loading...
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-yellow-400">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((r: any) => (
                  <tr
                    key={r.id}
                    className="border-t border-gray-700 hover:bg-yellow-400/10"
                  >
                    <td className="px-4 py-2">{r.schoolName}</td>
                    <td className="px-4 py-2">{r.teacherName}</td>
                    <td className="px-4 py-2">{r.teachersParticipating}</td>
                    <td className="px-4 py-2">{r.totalAmount}</td>
                    <td className="px-4 py-2">{r.paymentStatus || '-'}</td>
                    <td className="px-4 py-2">{r.competition?.name || '-'}</td>
                    <td className="px-4 py-2">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === r.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Link
            href="/admin/dashboard"
            className="text-yellow-400 hover:underline"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
