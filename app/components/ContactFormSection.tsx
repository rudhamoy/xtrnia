'use client';

import { useState, FormEvent } from 'react';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message,
        });
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to submit form. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-32 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">
            Send Us a Message
          </h2>
          <p className="text-white/70 text-lg">
            Fill out the form below and we&apos;ll get back to you as soon as possible
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`mb-6 px-6 py-4 rounded-2xl border-2 ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/10 border-green-500/50 text-green-400'
                  : 'bg-red-500/10 border-red-500/50 text-red-400'
              } text-sm font-medium`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                Full Name <span className="text-yellow-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                Phone Number <span className="text-yellow-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[6-9][0-9]{9}"
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                placeholder="Enter 10-digit phone number"
              />
              <p className="text-white/50 text-xs mt-2">Format: 10-digit Indian phone number (e.g., 9876543210)</p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                Email Address <span className="text-yellow-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-white/80 text-sm font-bold mb-3 tracking-wide">
                Message <span className="text-yellow-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition-all duration-300 resize-none"
                placeholder="Tell us what you need..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
