'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <table className="min-w-full text-sm text-white text-left">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Teacher Phone</th>
                <th className="px-4 py-3">Classes</th>
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
                  <td colSpan={9} className="text-center py-8 text-yellow-400">
                    Loading...
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-yellow-400">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((r: any) => (
                  <tr
                    key={r.id}
                    className="border-t border-gray-700 hover:bg-yellow-400/10"
                    onClick={() => {
                      setSelectedRegistration(r);
                      setIsModalOpen(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-4 py-2">{r.schoolName}</td>
                    <td className="px-4 py-2">{r.teacherName}</td>
                    <td className="px-4 py-2">{r.teacherPhone || '-'}</td>
                    <td className="px-4 py-2">
                      {Array.isArray(r.classesParticipating)
                        ? `${r.classesParticipating.length} item${r.classesParticipating.length === 1 ? '' : 's'}`
                        : '-'}
                    </td>
                    <td className="px-4 py-2">{r.totalAmount}</td>
                    <td className="px-4 py-2">
                      {(() => {
                        const status = r.paymentStatus || 'PENDING';
                        const badgeClass =
                          status === 'PAID'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                            : status === 'FAILED'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : status === 'REFUNDED'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40';
                        return (
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${badgeClass}`}>
                            {status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-2">{r.competition?.name || '-'}</td>
                    <td className="px-4 py-2">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(r.id);
                        }}
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

      {isModalOpen && selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-3 sm:px-4 sm:py-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
              setSelectedRegistration(null);
            }
          }}
        >
          <div className="w-full h-[100svh] sm:h-auto max-w-none sm:max-w-3xl overflow-hidden sm:overflow-y-auto rounded-2xl border border-white/10 bg-gray-900 p-4 shadow-2xl text-base sm:max-h-[90vh] sm:p-6 sm:text-base">
            <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
              <div>
                <h3 className="text-xl font-black text-yellow-300 sm:text-2xl">Registration Details</h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Submitted {selectedRegistration.createdAt ? new Date(selectedRegistration.createdAt).toLocaleString() : '-'}
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

            <div className="grid gap-3 sm:gap-4">
              <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                <p className="text-white/60 text-xs uppercase tracking-wide">Competition</p>
                <p className="text-white font-semibold">
                  {selectedRegistration.competition?.name || 'Competition unavailable'}
                </p>
                <p className="text-white/70 text-xs sm:text-sm">{selectedRegistration.competition?.date || '-'}</p>
                <p className="text-white/50 text-xs mt-1">{selectedRegistration.competition?.badge || '-'}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">School Name</p>
                  <p className="text-white font-semibold">{selectedRegistration.schoolName || '-'}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Teacher Name</p>
                  <p className="text-white font-semibold">{selectedRegistration.teacherName || '-'}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                <p className="text-white/60 text-xs uppercase tracking-wide">School Address</p>
                <p className="text-white font-semibold whitespace-pre-line text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                  {selectedRegistration.schoolAddress || '-'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                <p className="text-white/60 text-xs uppercase tracking-wide">Teacher Phone</p>
                <p className="text-white font-semibold">{selectedRegistration.teacherPhone || '-'}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Classes</p>
                  <p className="text-white font-semibold">
                    {Array.isArray(selectedRegistration.classesParticipating)
                      ? selectedRegistration.classesParticipating
                          .map((value: string | number) => (String(value) === 'Teacher' ? 'Teacher' : `Class ${value}`))
                          .join(', ')
                      : '-'}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Total Amount</p>
                  <p className="text-white font-semibold">{selectedRegistration.totalAmount || '-'}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Payment Status</p>
                  <p className="text-white font-semibold">{selectedRegistration.paymentStatus || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Payment Order ID</p>
                  <p className="text-white font-semibold truncate sm:break-all">{selectedRegistration.paymentOrderId || '-'}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Payment ID</p>
                  <p className="text-white font-semibold truncate sm:break-all">{selectedRegistration.paymentId || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">Paid At</p>
                  <p className="text-white font-semibold">
                    {selectedRegistration.paymentPaidAt
                      ? new Date(selectedRegistration.paymentPaidAt).toLocaleString()
                      : '-'}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4">
                  <p className="text-white/60 text-xs uppercase tracking-wide">User</p>
                  <p className="text-white font-semibold">{selectedRegistration.user?.fullName || '-'}</p>
                  <p className="text-white/70 text-xs break-all">{selectedRegistration.user?.email || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
