'use client';

import { useState, useEffect } from 'react';

interface Brochure {
  id: string;
  name: string;
  fileUrl: string;
  publicId: string;
  isActive: boolean;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export function BrochuresManagement() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [brochureName, setBrochureName] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{
    fileUrl: string;
    publicId: string;
    fileSize: number;
  } | null>(null);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const response = await fetch('/api/brochures');
      const data = await response.json();
      if (data.success) {
        setBrochures(data.data);
      }
    } catch (error) {
      console.error('Error fetching brochures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Invalid file type. Please upload PDF files only.');
      return;
    }

    // Validate file size (20MB max)
    if (file.size > 20 * 1024 * 1024) {
      alert('File size exceeds 20MB limit');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/brochures/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedFile({
          fileUrl: data.fileUrl,
          publicId: data.publicId,
          fileSize: data.fileSize,
        });
        alert('File uploaded successfully! Now enter a name and save.');
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

  const handleSaveBrochure = async () => {
    if (!brochureName.trim()) {
      alert('Please enter a brochure name');
      return;
    }

    if (!uploadedFile) {
      alert('Please upload a file first');
      return;
    }

    try {
      const response = await fetch('/api/brochures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brochureName,
          fileUrl: uploadedFile.fileUrl,
          publicId: uploadedFile.publicId,
          fileSize: uploadedFile.fileSize,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchBrochures();
        setBrochureName('');
        setUploadedFile(null);
        setShowForm(false);
        alert('Brochure saved successfully!');
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (error) {
      console.error('Error saving brochure:', error);
      alert('An error occurred while saving');
    }
  };

  const handleSetActive = async (id: string) => {
    if (!confirm('Set this brochure as active? This will deactivate all other brochures.')) return;

    try {
      const response = await fetch(`/api/brochures/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      });

      const data = await response.json();

      if (data.success) {
        fetchBrochures();
        alert('Brochure activated successfully!');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error setting active:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

    try {
      const response = await fetch(`/api/brochures/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchBrochures();
        alert('Brochure deleted successfully!');
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting brochure:', error);
      alert('An error occurred');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-yellow-400 text-xl">Loading brochures...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Manage Brochures</h2>
          <p className="text-white/60 text-sm mt-1">Upload and manage downloadable brochures</p>
        </div>
        <button
          onClick={() => {
            setBrochureName('');
            setUploadedFile(null);
            setShowForm(!showForm);
          }}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all"
        >
          {showForm ? 'Cancel' : 'Upload Brochure'}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Upload New Brochure</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Brochure Name</label>
              <input
                type="text"
                value={brochureName}
                onChange={(e) => setBrochureName(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="e.g., Xtrnia 2026 Competition Brochure"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">PDF File</label>
              <div className="flex gap-3">
                <label className="flex-1 px-6 py-3 bg-blue-500/20 border-2 border-dashed border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {uploading ? 'Uploading...' : uploadedFile ? 'File Uploaded ✓' : 'Select PDF File'}
                </label>
              </div>
              {uploadedFile && (
                <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  ✓ File uploaded: {formatFileSize(uploadedFile.fileSize)}
                </div>
              )}
              <p className="text-white/50 text-xs mt-2">
                Maximum file size: 20MB. Only PDF files are allowed.
              </p>
            </div>

            <button
              onClick={handleSaveBrochure}
              disabled={!brochureName.trim() || !uploadedFile || uploading}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Brochure
            </button>
          </div>
        </div>
      )}

      {/* Brochures List */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {brochures.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-white/60 text-lg">No brochures uploaded yet</p>
            <p className="text-white/40 text-sm mt-1">Click "Upload Brochure" to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Uploaded</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/80 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {brochures.map((brochure) => (
                  <tr key={brochure.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                            <path d="M14 2v6h6M10 13h4M10 17h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">{brochure.name}</p>
                          <a
                            href={brochure.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xs hover:underline"
                          >
                            View File
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/80 text-sm">{formatFileSize(brochure.fileSize)}</td>
                    <td className="px-6 py-4 text-white/80 text-sm">{formatDate(brochure.createdAt)}</td>
                    <td className="px-6 py-4">
                      {brochure.isActive ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-bold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 bg-white/10 border border-white/20 text-white/60 rounded-full text-xs">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {!brochure.isActive && (
                          <button
                            onClick={() => handleSetActive(brochure.id)}
                            className="px-3 py-1.5 bg-green-500/20 border border-green-500/50 text-green-500 rounded-lg hover:bg-green-500/30 transition-all text-xs font-medium"
                          >
                            Set Active
                          </button>
                        )}
                        <a
                          href={brochure.fileUrl}
                          download
                          className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all text-xs font-medium"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => handleDelete(brochure.id, brochure.name)}
                          className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-all text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
