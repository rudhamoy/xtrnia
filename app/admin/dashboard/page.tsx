'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BrochuresManagement } from '@/app/components/BrochuresManagement';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
  instructionVideo?: string;
  instructionPdfUrl?: string;
  instructionPdfPublicId?: string;
  instructionText?: string;
}

export default function AdminDashboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'competitions' | 'brochures'>('competitions');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    badge: '',
    date: '',
    image: '',
    category: '',
    minClass: 1,
    maxClass: 12,
    prizes: ['', '', '', ''],
    type: 'upcoming' as 'current' | 'upcoming',
    status: 'active' as 'active' | 'inactive',
    order: 0,
    instructionVideo: '',
    instructionPdfUrl: '',
    instructionPdfPublicId: '',
    instructionText: '',
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, instructionText: editor.getHTML() }));
    },
  });

  useEffect(() => {
    verifyAuth();
    fetchCompetitions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      router.push('/admin/login');
    }
  };

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      if (data.success) {
        setCompetitions(data.data);
      }
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId
        ? `/api/competitions/${editingId}`
        : '/api/competitions';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        fetchCompetitions();
        resetForm();
        setShowForm(false);
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (competition: Competition) => {
    setFormData({
      name: competition.name,
      badge: competition.badge,
      date: competition.date,
      image: competition.image,
      category: competition.category,
      minClass: competition.minClass,
      maxClass: competition.maxClass,
      prizes: competition.prizes.length >= 4 ? competition.prizes : [...competition.prizes, ...Array(4 - competition.prizes.length).fill('')],
      type: competition.type,
      status: competition.status,
      order: competition.order,
      instructionVideo: competition.instructionVideo || '',
      instructionPdfUrl: competition.instructionPdfUrl || '',
      instructionPdfPublicId: competition.instructionPdfPublicId || '',
      instructionText: competition.instructionText || '',
    });
    setEditingId(competition.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competition?')) return;

    try {
      const response = await fetch(`/api/competitions/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchCompetitions();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting competition:', error);
      alert('An error occurred');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      badge: '',
      date: '',
      image: '',
      category: '',
      minClass: 1,
      maxClass: 12,
      prizes: ['', '', '', ''],
      type: 'upcoming',
      status: 'active',
      order: 0,
      instructionVideo: '',
      instructionPdfUrl: '',
      instructionPdfPublicId: '',
      instructionText: '',
    });
    setEditingId(null);
  };

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = formData.instructionText || '';
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, formData.instructionText]);
// Helper to convert YouTube URL to embed URL
function getYoutubeEmbedUrl(url: string): string | undefined {
  if (!url) return undefined;
  // Accept both youtu.be and youtube.com URLs
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return undefined;
}

  const updatePrize = (index: number, value: string) => {
    const newPrizes = [...formData.prizes];
    newPrizes[index] = value;
    setFormData({ ...formData, prizes: newPrizes });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, image: data.imageUrl });
        alert('Image uploaded successfully!');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Invalid file type. Please upload a PDF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit');
      return;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success && data.pdfUrl) {
        setFormData({
          ...formData,
          instructionPdfUrl: data.pdfUrl,
          instructionPdfPublicId: data.publicId,
        });
        alert('PDF uploaded successfully!');
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleType = async (id: string, currentType: string) => {
    const action = currentType === 'upcoming' ? 'set as current' : 'move to upcoming only';

    if (!confirm(`Are you sure you want to ${action}?`)) return;

    try {
      const response = await fetch(`/api/competitions/${id}/toggle-type`, {
        method: 'PATCH',
      });

      const data = await response.json();

      if (data.success) {
        await fetchCompetitions();
        alert(data.message);
      } else {
        alert(data.message || 'Toggle failed');
      }
    } catch (error) {
      console.error('Error toggling type:', error);
      alert('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.jpg" alt="Xtrnia" width={48} height={48} className="rounded-lg" />
            <h1 className="text-2xl font-black text-yellow-400">XTRNIA CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/submissions"
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Submissions</span>
            </Link>
            <Link
              href="/admin/registrations"
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Registrations</span>
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
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('competitions')}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === 'competitions'
                ? 'text-yellow-400'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Competitions
            {activeTab === 'competitions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('brochures')}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === 'brochures'
                ? 'text-yellow-400'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Brochures
            {activeTab === 'brochures' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'competitions' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Manage Competitions</h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all"
              >
                {showForm ? 'Cancel' : 'Add Competition'}
              </button>
            </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingId ? 'Edit Competition' : 'Add New Competition'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Competition Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Badge</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  placeholder="e.g., INTER-SCHOOL\n(BENGALURU)"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  placeholder="e.g., JANUARY 27, 2026"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">Competition Image</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="Image URL (from Cloudinary after upload)"
                      required
                    />
                    <label className="px-6 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                  </div>
                  {formData.image && (
                    <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-white/50 text-xs">
                    Upload an image (max 10MB) or paste a Cloudinary URL. Supported formats: JPEG, PNG, WebP, GIF
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  placeholder="e.g., (CLASS vs CLASS)\n(CLASS 1 - 12)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Min Class</label>
                  <input
                    type="number"
                    value={formData.minClass}
                    onChange={(e) => setFormData({ ...formData, minClass: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    min="1"
                    max="12"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Max Class</label>
                  <input
                    type="number"
                    value={formData.maxClass}
                    onChange={(e) => setFormData({ ...formData, maxClass: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    min="1"
                    max="12"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">Prizes (4 entries)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={formData.prizes[index] || ''}
                      onChange={(e) => updatePrize(index, e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder={index === 0 ? "Prize header" : `Prize ${index}`}
                      required
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                {/* Instruction Video Field */}
                <div className="mb-6">
                  <label className="block text-white/80 text-sm font-medium mb-2">Instruction Video (YouTube URL)</label>
                  <input
                    type="url"
                    value={formData.instructionVideo}
                    onChange={e => setFormData({ ...formData, instructionVideo: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {formData.instructionVideo && getYoutubeEmbedUrl(formData.instructionVideo) && (
                    <div className="mt-4 aspect-video w-full max-w-xl mx-auto rounded-lg overflow-hidden border border-white/10 bg-black">
                      <iframe
                        src={getYoutubeEmbedUrl(formData.instructionVideo)}
                        title="Instruction Video Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                <p className="text-white/50 text-xs mt-2">Paste a YouTube video link. The embed will preview below if valid.</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">Instruction PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                {formData.instructionPdfUrl ? (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={formData.instructionPdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow-300 text-sm underline"
                    >
                      PDF attached
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          instructionPdfUrl: '',
                          instructionPdfPublicId: '',
                        })
                      }
                      className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs hover:border-white/40"
                    >
                      Remove PDF
                    </button>
                  </div>
                ) : (
                  <p className="text-white/50 text-xs mt-2">Upload a PDF instruction file (max 10MB).</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">Instruction Text</label>
                <div className="flex flex-wrap gap-2 mb-3 rounded-xl border border-white/20 bg-white/5 p-2">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('bold')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('italic')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Italic
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('strike')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Strike
                  </button>
                  <div className="w-px bg-white/15 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('heading', { level: 2 })
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('heading', { level: 3 })
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('bulletList')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Bullets
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('orderedList')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Numbered
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      editor?.isActive('blockquote')
                        ? 'border-yellow-400/60 text-yellow-300'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    Quote
                  </button>
                  <div className="w-px bg-white/15 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold border-white/20 text-white/70 hover:border-white/40"
                  >
                    Clear
                  </button>
                </div>
                <div
                  className="rounded-xl border border-white/20 bg-white p-3 text-slate-900 focus-within:border-yellow-400/60 focus-within:ring-2 focus-within:ring-yellow-400/20 transition"
                  onClick={() => editor?.commands.focus()}
                >
                  <EditorContent
                    editor={editor}
                    className="text-sm leading-relaxed max-w-none min-h-[320px] cursor-text flex flex-col [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:flex-1 [&_.ProseMirror]:w-full [&_.ProseMirror]:outline-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_p]:text-slate-900"
                  />
                </div>
                <p className="text-white/50 text-xs mt-2">Write the instruction text as you want it to appear.</p>
              </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl transition-all ${saving ? 'opacity-60 cursor-not-allowed' : 'hover:from-yellow-300 hover:to-yellow-400'}`}
                  disabled={saving}
                >
                  {saving
                    ? (editingId ? 'Updating...' : 'Saving...')
                    : (editingId ? 'Update Competition' : 'Create Competition')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Competitions List */}
        <div className="space-y-6">
          {/* Current Competitions */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Current Competitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitions.filter(c => c.type === 'current').map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleType={handleToggleType}
                />
              ))}
              {competitions.filter(c => c.type === 'current').length === 0 && (
                <p className="text-white/60 col-span-full text-center py-8">No current competitions</p>
              )}
            </div>
          </div>

          {/* Upcoming Competitions */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Upcoming Competitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleType={handleToggleType}
                />
              ))}
              {competitions.length === 0 && (
                <p className="text-white/60 col-span-full text-center py-8">No upcoming competitions</p>
              )}
            </div>
          </div>
        </div>
          </div>
        ) : (
          <BrochuresManagement />
        )}
      </main>
    </div>
  );
}

function CompetitionCard({
  competition,
  onEdit,
  onDelete,
  onToggleType,
}: {
  competition: Competition;
  onEdit: (competition: Competition) => void;
  onDelete: (id: string) => void;
  onToggleType: (id: string, currentType: string) => void;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-yellow-400/50 transition-all">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-white">{competition.name}</h4>
        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <button
            onClick={() => onToggleType(competition.id, competition.type)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              competition.type === 'current'
                ? 'bg-yellow-400'
                : 'bg-white/20'
            }`}
            title={competition.type === 'current' ? 'Current (Click to move to upcoming only)' : 'Upcoming (Click to set as current)'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                competition.type === 'current' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              competition.status === 'active'
                ? 'bg-green-500/20 text-green-500'
                : 'bg-red-500/20 text-red-500'
            }`}
          >
            {competition.status}
          </span>
        </div>
      </div>
      <p className="text-white/60 text-sm mb-2">{competition.date}</p>
      <p className="text-white/80 text-xs mb-4">{competition.badge}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(competition)}
          className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(competition.id)}
          className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-all text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
