import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
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
          <img src="/logo.jpg" alt="Xtrnia Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-lg shadow-2xl border-2 border-yellow-400/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Eyebrow text */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-5 py-2 mb-8">
            <span className="text-yellow-300 text-sm font-bold tracking-wider uppercase">Where Activities becomes Achievements</span>
          </div>

          {/* Main title with massive impact */}
          <div className="overflow-visible mb-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent tracking-tighter py-4 px-2" style={{ WebkitTextStroke: '0.5px rgba(234,179,8,0.3)' }}>
              XTRNIA
            </h1>
          </div>

          {/* Subtitle with sleek design */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 blur-2xl" />
            <p className="relative text-xl sm:text-2xl md:text-4xl font-medium tracking-tight mb-0 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent px-4">
              Extra Curricular Activities Platform
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-white/50 font-light mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide px-4">
            Connecting School students through diverse competitions across India
          </p>

          {/* CTA buttons with modern design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#upcoming-competition"
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] min-w-[200px] text-center"
            >
              <span className="relative z-10">Explore Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <Link
              href="/register"
              className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/50 min-w-[200px] text-center"
            >
              <span className="relative z-10">Register now</span>
            </Link>
          </div>

          {/* Download Brochure Link */}
          <div className="mt-6">
            <a
              href="/xtrnia_brochure.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-yellow-400 font-medium text-base transition-colors duration-300 inline-flex items-center gap-2 underline underline-offset-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-32 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Ultra modern heading */}
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black text-black tracking-tighter leading-none mb-6 drop-shadow-sm">
              WHO WE ARE
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-black to-transparent mx-auto mb-8 rounded-full" />

            <p className="text-2xl font-bold text-black/90 max-w-3xl mx-auto mb-4 tracking-tight">
              Welcome to Xtrnia!
            </p>
            <p className="text-lg text-black/70 max-w-4xl mx-auto leading-relaxed">
              Where learning goes beyond the classroom. <br/> A vibrant platform connecting students and faculty to engage, participate, and grow through a dynamic mix of extracurricular activities that ignite creativity, teamwork, and personal growth ranging from -
            </p>
          </div>

          {/* Bento Grid Style Photo Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { label: "Debates", color: "from-blue-500/20 to-blue-600/20", image: "/34.jpg" },
              { label: "Treasure Hunt", color: "from-amber-500/20 to-amber-600/20", image: "/35.jpg" },
              { label: "Chess", color: "from-purple-500/20 to-purple-600/20", image: "/cheess.jpg" },
              { label: "Art", color: "from-pink-500/20 to-pink-600/20", image: "/37.jpg" },
              { label: "Dance", color: "from-rose-500/20 to-rose-600/20", image: "/38.jpg" },
              { label: "Music", color: "from-indigo-500/20 to-indigo-600/20", image: "/39.jpg" },
              { label: "Sports", color: "from-green-500/20 to-green-600/20", image: "/sports.jpg" },
              { label: "Environment", color: "from-emerald-500/20 to-emerald-600/20", image: "/41.jpg" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {/* Glass card with modern design */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-3xl border-2 border-black/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-700 ease-out group-hover:scale-95 group-hover:shadow-[0_8px_60px_0_rgba(0,0,0,0.4)] overflow-hidden`}>

                  {/* Image container */}
                  <div className="absolute inset-2 bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>

                  {/* Label - always visible, enhanced on hover with glass effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 group-hover:bg-black/30 transition-all duration-500 shadow-lg border border-white/10">
                      <p className="text-white text-sm font-bold tracking-wide text-center drop-shadow-lg">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-black/0 group-hover:border-black/40 transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Competition Section */}
      <section id="upcoming-competition" className="relative bg-gradient-to-b from-black via-gray-900 to-black px-6 py-24 overflow-hidden scroll-mt-20">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_48%,yellow_49%,yellow_51%,transparent_52%)] bg-[length:20px_20px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 text-yellow-400 tracking-tight px-4">UPCOMING COMPETITION</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-20 rounded-full" />

          {/* First Row - 4 Events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              {
                name: "TUG-OF-WAR",
                badge: "INTER-SCHOOL\n(BENGALURU)",
                date: "JANUARY 15, 2026",
                category: "(CLASS vs CLASS)\n(CLASS 1 - 12)",
                prizes: ["Price For Every Class", "1st price: 20,000 rupees", "2nd price: 15,000 rupees", "3rd price: 10,000 rupees"],
                image: "/tug-of-war.jpg"
              },
              {
                name: "TUG-OF-WAR",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "APRIL 2026",
                category: "(CLASS vs CLASS)\n(CLASS 1 - 12)",
                prizes: ["Price For Every Class", "1st price: 2 lakh rupees", "2nd price: 1.5 lakh rupees", "3rd price: 1 lakh rupees"],
                image: "/tug-of-war.jpg"
              },
              {
                name: "KABADDI",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "APRIL 2026",
                category: "(CLASS vs CLASS)\n(CLASS 5 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/kabadi.jpg"
              },
              {
                name: "VOLLEYBALL",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "APRIL 2026",
                category: "(CLASS vs CLASS)\n(CLASS 5 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/volleyball.jpg"
              },
            ].map((event, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Glass card container */}
                <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-400/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500">

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top Badge with modern design */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-400/90 backdrop-blur-sm text-black text-[9px] font-black px-3 py-1.5 rounded-full whitespace-pre-line leading-tight tracking-wider shadow-lg">
                      {event.badge}
                    </div>
                  </div>

                  {/* Image Section with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-90 blur-sm"
                    />

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Details Section - Modern Layout */}
                  <div className="relative p-6 pt-2 bg-gradient-to-b from-black/95 to-black">

                    {/* Image card */}
                    <div className="relative rounded-2xl overflow-hidden border border-yellow-400/20 w-32 h-32 mx-auto mb-4 -mt-24">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                    </div>

                    {/* Date with icon */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase">{event.date}</p>
                    </div>

                    <p className="text-white/70 text-xs mb-4 leading-relaxed text-center font-medium">
                      {event.category.replace('\n', ' • ')}
                    </p>

                    {/* Prize section with modern card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/20 space-y-1.5">
                      {event.prizes.map((prize, idx) => (
                        <p key={idx} className={`leading-relaxed text-center transition-all duration-300 ${idx === 0 ? 'text-yellow-400 font-black tracking-wide text-sm uppercase mb-2' : 'text-white/80 text-xs font-medium'}`}>
                          {prize}
                        </p>
                      ))}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 4 Events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "TUG-OF-WAR",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "SEPTEMBER 2026",
                category: "(CLASS vs CLASS)\n(CLASS 1 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/football.jpg"
              },
              {
                name: "HANDBALL",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "SEPTEMBER 2026",
                category: "(CLASS vs CLASS)\n(CLASS 5 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/handball.jpg"
              },
              {
                name: "SOFTBALL",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "SEPTEMBER 2026",
                category: "(CLASS vs CLASS)\n(CLASS 5 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/softball.jpg"
              },
              {
                name: "BASKETBALL",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "SEPTEMBER 2026",
                category: "(CLASS vs CLASS)\n(CLASS 5 - 12)",
                prizes: ["Price For Every Class", "1st price: 5 lakh rupees", "2nd price: 4 lakh rupees", "3rd price: 3 lakh rupees"],
                image: "/basketball.jpg"
              },
            ].map((event, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Glass card container */}
                <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-400/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500">

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top Badge with modern design */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-400/90 backdrop-blur-sm text-black text-[9px] font-black px-3 py-1.5 rounded-full whitespace-pre-line leading-tight tracking-wider shadow-lg">
                      {event.badge}
                    </div>
                  </div>

                  {/* Image Section with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-90 blur-sm"
                    />

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Details Section - Modern Layout */}
                  <div className="relative p-6 pt-2 bg-gradient-to-b from-black/95 to-black">

                    {/* Image card */}
                    <div className="relative rounded-2xl overflow-hidden border border-yellow-400/20 w-32 h-32 mx-auto mb-4 -mt-24">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                    </div>

                    {/* Date with icon */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase">{event.date}</p>
                    </div>

                    <p className="text-white/70 text-xs mb-4 leading-relaxed text-center font-medium">
                      {event.category.replace('\n', ' • ')}
                    </p>

                    {/* Prize section with modern card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/20 space-y-1.5">
                      {event.prizes.map((prize, idx) => (
                        <p key={idx} className={`leading-relaxed text-center transition-all duration-300 ${idx === 0 ? 'text-yellow-400 font-black tracking-wide text-sm uppercase mb-2' : 'text-white/80 text-xs font-medium'}`}>
                          {prize}
                        </p>
                      ))}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Competition Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-24 overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_75%,black_75%,black),linear-gradient(45deg,black_25%,transparent_25%,transparent_75%,black_75%,black)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]" />
        </div>

        {/* Diagonal stripes overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,black,black_2px,transparent_2px,transparent_20px)]" />
        </div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,black_2px,transparent_2px)] bg-[length:40px_40px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 text-black tracking-tight px-4">CURRENT COMPETITION</h2>
          <div className="w-32 h-1 bg-black mx-auto mb-20 rounded-full" />

          {/* Competition Card - Centered */}
          <div className="max-w-md mx-auto mb-12">
            <div className="group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Glass card container */}
              <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-400/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500">

                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Top Badge with modern design */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-400/90 backdrop-blur-sm text-black text-[9px] font-black px-3 py-1.5 rounded-full whitespace-pre-line leading-tight tracking-wider shadow-lg">
                    INTER-SCHOOL{'\n'}(BENGALURU)
                  </div>
                </div>

                {/* Image Section with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/tug-of-war.jpg"
                    alt="Tug of War"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 brightness-90 blur-sm"
                  />

                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Details Section - Modern Layout */}
                <div className="relative p-6 pt-2 bg-gradient-to-b from-black/95 to-black">

                  {/* Image card */}
                  <div className="relative rounded-2xl overflow-hidden border border-yellow-400/20 w-64 h-48 mx-auto mb-4 -mt-24">
                    <img
                      src="/tug-of-war.jpg"
                      alt="Tug of War"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                  </div>

                  {/* Date with icon */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase">JANUARY 15, 2026</p>
                  </div>

                  <p className="text-white/70 text-xs mb-4 leading-relaxed text-center font-medium">
                    (CLASS vs CLASS) • (CLASS 1 - 12)
                  </p>

                  {/* Prize section with modern card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/20 space-y-1.5">
                    <p className="leading-relaxed text-center transition-all duration-300 text-yellow-400 font-black tracking-wide text-sm uppercase mb-2">
                      Price For Every Class
                    </p>
                    <p className="leading-relaxed text-center transition-all duration-300 text-white/80 text-xs font-medium">
                      1st price: 20,000 rupees
                    </p>
                    <p className="leading-relaxed text-center transition-all duration-300 text-white/80 text-xs font-medium">
                      2nd price: 15,000 rupees
                    </p>
                    <p className="leading-relaxed text-center transition-all duration-300 text-white/80 text-xs font-medium">
                      3rd price: 10,000 rupees
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Rules Section - Full Width */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-black/30 max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Main Title */}
              <div className="text-center mb-8">
                <h3 className="text-4xl font-black text-black mb-4 tracking-tight">Instructions</h3>
                <div className="w-24 h-1 bg-black mx-auto rounded-full" />
              </div>

              {/* When is it happening */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">When is it happening?</h4>
                <p className="text-black/90 text-sm leading-relaxed pl-2">January 15, 2026.</p>
              </div>

              {/* Who can participate */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">Who can participate?</h4>
                <ul className="space-y-2 text-black/90 text-sm leading-relaxed list-disc list-inside pl-2">
                  <li className="hover:text-black transition-colors duration-300">Students from Class 1 to 12 are eligible to participate.</li>
                  <li className="hover:text-black transition-colors duration-300">Faculty members and school officials.</li>
                </ul>
              </div>

              {/* How will it happen */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">How will it happen?</h4>
                <ul className="space-y-3 text-black/90 text-sm leading-relaxed list-disc list-inside pl-2">
                  <li className="hover:text-black transition-colors duration-300">It&apos;s a school vs school, class vs class, teacher vs teacher battle, where boys and girls of the same class will team up to take on other schools.</li>
                  <li className="hover:text-black transition-colors duration-300">If a class from one school has more students than its competing class from another school, it must match the number of participants by selecting their best players.</li>
                  <li className="hover:text-black transition-colors duration-300">In schools with multiple sections for a particular class (e.g., Class 6A, 6B), an internal competition must be held first. The winning section will represent the school in the inter-school match.</li>
                </ul>
              </div>

              {/* Prize For Every Class & Teachers */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">Prize For Every Class & Teachers:</h4>
                <ul className="space-y-2 text-black/90 text-sm leading-relaxed list-none pl-2 mb-4">
                  <li className="hover:text-black transition-colors duration-300 font-semibold">1st Prize: ₹20,000</li>
                  <li className="hover:text-black transition-colors duration-300 font-semibold">2nd Prize: ₹15,000</li>
                  <li className="hover:text-black transition-colors duration-300 font-semibold">3rd Prize: ₹10,000</li>
                </ul>
                <p className="text-black/90 text-sm leading-relaxed pl-2">
                  <span className="font-black">But that&apos;s not all!</span> If the student wins, the sports teacher wins too. For example, if a class wins 2nd place, they will be awarded ₹15,000, and their sports teacher will also receive an additional ₹15,000.
                </p>
              </div>

              {/* How to Participate */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">How to Participate?</h4>
                <ul className="space-y-3 text-black/90 text-sm leading-relaxed list-disc list-inside pl-2">
                  <li className="hover:text-black transition-colors duration-300">Fill the registration form.</li>
                  <li className="hover:text-black transition-colors duration-300"><span className="font-semibold">Registration Fee: Just ₹15 per student or faculty.</span></li>
                  <li className="hover:text-black transition-colors duration-300">As part of the mandatory registration process, each school must create and submit a video challenging other schools with us to be featured on our YouTube channel.</li>
                </ul>
              </div>

              {/* Where will it happen */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">Where will it happen?</h4>
                <ul className="space-y-3 text-black/90 text-sm leading-relaxed list-disc list-inside pl-2">
                  <li className="hover:text-black transition-colors duration-300">Sports teachers will coordinate with other schools to perform the battle at a mutually agreed playground.</li>
                  <li className="hover:text-black transition-colors duration-300">Every competition video must be shared with us as proof to be featured on our YouTube channel for public viewing and judgement.</li>
                </ul>
                <p className="text-black/90 text-sm leading-relaxed pl-2 mt-3">
                  <span className="font-black">Additionally,</span> the video that receives the most views on our YouTube channel will also win exciting prizes, matching the competition prizes:
                </p>
                <p className="text-black/90 text-sm leading-relaxed pl-2 mt-2">
                  <span className="font-bold">1st Prize: ₹20,000; 2nd Prize: ₹15,000; and 3rd Prize: ₹10,000.</span>
                </p>
              </div>

              {/* Instructions for videos */}
              <div>
                <h4 className="text-2xl font-black text-black mb-4 tracking-tight">Instructions for videos:</h4>
                <ul className="space-y-2 text-black/90 text-sm leading-relaxed list-disc list-inside pl-2">
                  <li className="hover:text-black transition-colors duration-300">Keep the video under 90 seconds in length.</li>
                  <li className="hover:text-black transition-colors duration-300">Ensure clear sound and high-quality visuals.</li>
                  <li className="hover:text-black transition-colors duration-300">The challenge video must have a minimum of 30 students.</li>
                  <li className="hover:text-black transition-colors duration-300">The competition video must be stable and clearly angled.</li>
                  <li className="hover:text-black transition-colors duration-300">Submit the video at <a href="mailto:info@xtrnia.com" className="text-black font-bold hover:underline">info@xtrnia.com</a>.</li>
                  <li className="hover:text-black transition-colors duration-300">Once officially uploaded, share the videos to boost views.</li>
                </ul>
              </div>
            </div>

            {/* Registration CTA */}
            <div className="mt-10 pt-8 border-t-2 border-black/20">
              <Link
                href="/register"
                className="group relative block w-full max-w-md mx-auto px-8 py-5 bg-gradient-to-r from-black to-gray-900 text-yellow-400 font-black text-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  REGISTER NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <div className="text-center mt-4">
                <a
                  href="/xtrnia_brochure.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-black/80 font-bold text-base transition-colors duration-300 inline-flex items-center gap-2 underline underline-offset-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
              </div>
              <p className="text-center text-black/70 text-sm mt-4 font-medium">
                Limited slots available • First come, first served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/footerr.jpg" alt="Footer Background" className="w-full h-full object-cover object-top" />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            {/* Logo - Premium Style */}
            <div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-110 transition-transform duration-300 border-2 border-yellow-600">
                <img src="/logo.jpg" alt="Xtrnia Logo" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Where Activities becomes Achievements
              </p>
            </div>

            {/* Links - Elegant Style */}
            <div>
              <h4 className="font-extrabold text-white mb-6 text-xl tracking-wide">LINKS</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="/xtrnia_brochure.pdf" download target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Download Brochure
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-extrabold text-white mb-6 text-xl tracking-wide">CONTACT</h4>
              <ul className="space-y-3">
                <li>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1 font-extrabold">For Query</p>
                  <a href="mailto:admin@xtrnia.com" className="text-white/80 hover:text-white text-sm font-bold transition-all duration-300 inline-block break-all">
                    admin@xtrnia.com 
                  </a>
                </li>
                <li className="mt-4">
                  <p className="text-white/60 text-xs font-extrabold uppercase tracking-wider mb-1">Phone</p>
                  <a href="mailto:support@xtrnia.com" className="text-white/80 hover:text-white text-sm font-bold transition-all duration-300 inline-block break-all">
                    +91 7899642135
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media - Premium Icons */}
            <div>
              <h4 className="font-extrabold text-white mb-6 text-xl tracking-wide">FOLLOW US</h4>
              <div className="flex gap-5">
                <a href="https://www.youtube.com/@xtrnia-1" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300 border-2 border-red-800">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/xtrnia?igsh=YXVoMDhsd25oaXQz" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300 border-2 border-pink-800">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 text-white/70 text-sm">
            © 2025 Xtrnia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
