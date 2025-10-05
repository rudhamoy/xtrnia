import Link from 'next/link';
import Image from 'next/image';

export default function About() {
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
              ABOUT US
            </h1>
          </div>

          {/* Subtitle */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 blur-2xl" />
            <p className="relative text-xl sm:text-2xl md:text-3xl font-medium tracking-tight bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent px-4">
              Where Activities Become Achievements
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-32 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Content Cards */}
          <div className="space-y-8">
            {/* Card 1 */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.01]">
              <p className="text-xl md:text-2xl text-black/90 leading-relaxed font-medium">
                XTRNIA is India&apos;s premier extracurricular platform - a transformative space where school students from across the country connect, compete, and grow beyond the boundaries of the classroom.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.01]">
              <p className="text-xl md:text-2xl text-black/90 leading-relaxed font-medium">
                At XTRNIA, learning takes on new life. Through exhilarating competitions, creative challenges, and collaborative events, students engage in experiences that awaken imagination, build confidence, and ignite a spirit of leadership and teamwork.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-black/20 hover:bg-black/15 transition-all duration-300 hover:scale-[1.01]">
              <p className="text-xl md:text-2xl text-black/90 leading-relaxed font-medium">
                More than just a platform, XTRNIA is a vibrant ecosystem - uniting students and educators in a shared mission to cultivate talent, unlock potential, and turn every activity into a meaningful achievement. It&apos;s where passion meets purpose, and where every step beyond the classroom leads to growth, discovery, and lasting impact.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="group relative px-8 py-4 bg-gradient-to-r from-black to-gray-900 text-yellow-400 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] min-w-[200px] text-center"
              >
                <span className="relative z-10">Back to Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-black to-gray-900 text-yellow-400 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] min-w-[200px] text-center"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 group">
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
