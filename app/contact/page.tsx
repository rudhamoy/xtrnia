import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-black overflow-hidden flex items-center justify-center">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-yellow-400/20 to-orange-500/30" />
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        {/* Logo at top */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <Image src="/logo.jpg" alt="Xtrnia Logo" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14 rounded-lg shadow-2xl border-2 border-yellow-400/30 hover:scale-110 transition-transform duration-300" />
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Main title */}
          <div className="overflow-visible mb-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent tracking-tighter py-4 px-2" style={{ WebkitTextStroke: '0.5px rgba(234,179,8,0.3)' }}>
              CONTACT US
            </h1>
          </div>

          {/* Subtitle */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 blur-2xl" />
            <p className="relative text-xl sm:text-2xl md:text-3xl font-medium tracking-tight bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent px-4">
              Get in Touch with Us
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-32 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address Card */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-3 tracking-tight">Address</h3>
                  <p className="text-base text-black/80 leading-relaxed">
                    10. Bhuvaneswari Nilayam Ground Floor,<br />
                    4th Cross 1st Main Hosapalya Main Road,<br />
                    Hosapalya, Shivarama Reddy Layout,<br />
                    Bangalore, 560068
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-3 tracking-tight">Phone</h3>
                  <a href="tel:7899642135" className="text-base text-black/80 hover:text-black transition-colors duration-300 font-medium">
                    +91 7899642135
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Email Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Query Email Card */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-3 tracking-tight">For Query</h3>
                  <a href="mailto:info@xtrnia.com" className="text-base text-black/80 hover:text-black transition-colors duration-300 font-medium break-all">
                    admin@xtrnia.com 
                  </a>
                </div>
              </div>
            </div>

            {/* Support Email Card */}
            {/* <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-3 tracking-tight">For Support</h3>
                  <a href="mailto:support@xtrnia.com" className="text-base text-black/80 hover:text-black transition-colors duration-300 font-medium break-all">
                    support@xtrnia.com
                  </a>
                </div>
              </div>
            </div> */}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="group relative inline-block px-8 py-4 bg-gradient-to-r from-black to-gray-900 text-yellow-400 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] min-w-[200px] text-center"
            >
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/footerr.jpg" alt="Footer Background" fill className="object-cover object-top" />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Logo */}
            <div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-110 transition-transform duration-300 border-2 border-yellow-600 relative">
                <Image src="/logo.jpg" alt="Xtrnia Logo" fill className="object-cover" />
              </div>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Where Activities Become Achievements
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-black text-xl mb-6 tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-white font-black text-xl mb-6 tracking-wide">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://www.youtube.com/@xtrnia-1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/xtrnia?igsh=YXVoMDhsd25oaXQz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm text-center font-medium">
              © 2025 Xtrnia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
