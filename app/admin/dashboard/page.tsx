'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AdminDashboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
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
  });

  useEffect(() => {
    verifyAuth();
    fetchCompetitions();
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
    });
    setEditingId(null);
  };

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
            <img src="/logo.jpg" alt="Xtrnia" className="w-12 h-12 rounded-lg" />
            <h1 className="text-2xl font-black text-yellow-400">XTRNIA CMS</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
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
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
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
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all"
                >
                  {editingId ? 'Update Competition' : 'Create Competition'}
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
