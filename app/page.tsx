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

            <a
              href="/register"
              className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/50 min-w-[200px] text-center"
            >
              <span className="relative z-10">Register now</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/40 animate-bounce">
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
              <div className="w-1 h-3 bg-white/40 rounded-full mx-auto" />
            </div>
          </div>
        </div>

        {/* Background decoration - celebration silhouette placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="" alt="Celebration" className="w-full h-full object-cover" />
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
              { label: "Treasure Hunting", color: "from-amber-500/20 to-amber-600/20", image: "/35.jpg" },
              { label: "Chess", color: "from-purple-500/20 to-purple-600/20", image: "/36.jpg" },
              { label: "Art", color: "from-pink-500/20 to-pink-600/20", image: "/37.jpg" },
              { label: "Dance", color: "from-rose-500/20 to-rose-600/20", image: "/38.jpg" },
              { label: "Music", color: "from-indigo-500/20 to-indigo-600/20", image: "/39.jpg" },
              { label: "Sports", color: "from-green-500/20 to-green-600/20", image: "/40.jpg" },
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

                  {/* Label - always visible, enhanced on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2.5 group-hover:bg-black/90 transition-all duration-500 shadow-lg">
                      <p className="text-white text-sm font-bold tracking-wide text-center">
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
          <h2 className="text-6xl font-extrabold text-center mb-6 text-yellow-400 tracking-tight">UPCOMING COMPETITION</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-20 rounded-full" />

          {/* First Row - 4 Events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              {
                name: "TUG-OF-WAR",
                badge: "INTER-SCHOOL\n(BENGALURU)",
                date: "NOVEMBER 2025",
                category: "(CLASS vs CLASS)\n(CLASS 1 - 12)",
                prizes: ["Price For Every Class", "1st price: 20,000 rupees", "2nd price: 15,000 rupees", "3rd price: 10,000 rupees"],
                image: "/tug-of-war.jpg"
              },
              {
                name: "TUG-OF-WAR",
                badge: "INTER-SCHOOL\n(NATION-WIDE)",
                date: "DECEMBER 2025",
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
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-3xl border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* Card with image background */}
                <div className="absolute inset-0 bg-black rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={event.image}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

                  {/* Yellow accent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top badge */}
                  <div className="absolute top-6 left-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black px-4 py-2 rounded-xl whitespace-pre-line leading-tight tracking-wide shadow-xl inline-block">
                      {event.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Sport name */}
                    <h3 className="text-yellow-400 font-black text-3xl mb-4 tracking-tighter leading-none drop-shadow-lg">
                      {event.name}
                    </h3>

                    {/* Info card */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border-2 border-yellow-400/30 shadow-2xl">
                      <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase mb-2">{event.date}</p>

                      <p className="text-white/80 text-xs mb-4 leading-tight whitespace-pre-line">
                        {event.category}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-yellow-400/20">
                        <p className="text-yellow-400 font-bold text-xs tracking-wider uppercase mb-2">Prize Pool</p>
                        {event.prizes.map((prize, idx) => (
                          <p key={idx} className="text-white/70 text-xs leading-relaxed">
                            {prize}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-700" />
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
                date: "APRIL 2026",
                category: "(CLASS vs CLASS)\n(CLASS 1 - 12)",
                prizes: ["Price For Every Class", "1st price: 3 lakh rupees", "2nd price: 2.5 lakh rupees", "3rd price: 2 lakh rupees"],
                image: "/tug-of-war.jpg"
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
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer rounded-3xl border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                {/* Card with image background */}
                <div className="absolute inset-0 bg-black rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={event.image}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

                  {/* Yellow accent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top badge */}
                  <div className="absolute top-6 left-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black px-4 py-2 rounded-xl whitespace-pre-line leading-tight tracking-wide shadow-xl inline-block">
                      {event.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Sport name */}
                    <h3 className="text-yellow-400 font-black text-3xl mb-4 tracking-tighter leading-none drop-shadow-lg">
                      {event.name}
                    </h3>

                    {/* Info card */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border-2 border-yellow-400/30 shadow-2xl">
                      <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase mb-2">{event.date}</p>

                      <p className="text-white/80 text-xs mb-4 leading-tight whitespace-pre-line">
                        {event.category}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-yellow-400/20">
                        <p className="text-yellow-400 font-bold text-xs tracking-wider uppercase mb-2">Prize Pool</p>
                        {event.prizes.map((prize, idx) => (
                          <p key={idx} className="text-white/70 text-xs leading-relaxed">
                            {prize}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Competition Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-24 overflow-hidden">
        {/* Elegant pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[length:30px_30px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-6xl font-extrabold text-center mb-6 text-black tracking-tight">CURRENT COMPETITION</h2>
          <div className="w-32 h-1 bg-black mx-auto mb-20 rounded-full" />

          <div className="grid md:grid-cols-[480px_1fr] gap-0 max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden">
            {/* Left side - Premium Event Card */}
            <div className="relative bg-black p-10 flex items-center justify-center border-r-4 border-black/30 overflow-hidden">
              {/* Background Image */}
              <img
                src="/tug-of-war.jpg"
                alt="Tug of War"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

              <div className="text-center relative z-10">
                <h3 className="text-yellow-400 font-extrabold text-5xl mb-5 tracking-wider drop-shadow-lg">TUG-OF-WAR</h3>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-extrabold text-sm px-6 py-3 rounded-xl inline-block mb-6 shadow-lg border-2 border-yellow-600">
                  INTER - SCHOOL<br />(BENGALURU)
                </div>

                <div className="mt-8 space-y-3 bg-white/5 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400/30">
                  <p className="text-yellow-300 font-bold text-xl tracking-wide">NOVEMBER 2025</p>
                  <p className="text-white/80 text-sm tracking-wide">(CLASS vs CLASS) | (CLASS 1 - 12)</p>

                  <div className="mt-6 pt-4 border-t border-yellow-400/20">
                    <p className="text-yellow-400 font-bold text-base mb-3 tracking-wide">Price For Every Class</p>
                    <p className="text-white/70 text-sm">1st price: 20,000 rupees</p>
                    <p className="text-white/70 text-sm">2nd price: 15,000 rupees</p>
                    <p className="text-white/70 text-sm">3rd price: 10,000 rupees</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Premium Rules Section */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-300 p-10 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-black text-black mb-6 tracking-tight">Rules & Regulations</h4>
                <ol className="space-y-5 text-black/90 text-sm leading-relaxed list-decimal list-inside">
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    <span className="font-semibold">Registration Fee = Rs. 15 / per student.</span>
                  </li>
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    Each school must creates a videos challenging other schools as a part of mandatory registration process.
                  </li>
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    Sports teacher will conduct the competition and share the video of each class-wise competition to be uploaded in the Youtube as a proof and public judgement.
                  </li>
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    Sports teacher & the school will also receive the same prize money if their student wins.
                  </li>
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    If a class of certain school has larger number of students than the class of other school while competing, then it must match the number of students by choosing their best to compete.
                  </li>
                  <li className="pl-2 hover:text-black transition-colors duration-300">
                    If a school has multiple sections for certain classes, it must first compete with each other and the winning section will compete with the other school.
                  </li>
                </ol>
              </div>

              {/* Registration CTA */}
              <div className="mt-10 pt-8 border-t-2 border-black/10">
                <a
                  href="/register"
                  className="group relative block w-full px-8 py-5 bg-gradient-to-r from-black to-gray-900 text-yellow-400 font-black text-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    REGISTER NOW
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <p className="text-center text-black/60 text-xs mt-3 font-medium">
                  Limited slots available • First come, first served
                </p>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Logo - Premium Style */}
            <div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-110 transition-transform duration-300 border-2 border-yellow-600">
                <img src="/logo.jpg" alt="Xtrnia Logo" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-white/80 text-sm leading-relaxed">
                Empowering students through competitive excellence
              </p>
            </div>

            {/* Links - Elegant Style */}
            <div>
              <h4 className="font-extrabold text-white mb-6 text-xl tracking-wide">LINKS</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-base font-medium transition-all duration-300 hover:translate-x-2 inline-block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media - Premium Icons */}
            <div>
              <h4 className="font-extrabold text-white mb-6 text-xl tracking-wide">FOLLOW US</h4>
              <div className="flex gap-5">
                <a href="#" className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300 text-xl font-bold border-2 border-red-800">
                  YT
                </a>
                <a href="#" className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300 text-xl font-bold border-2 border-pink-800">
                  IG
                </a>
                <a href="#" className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300 text-xl font-bold border-2 border-blue-600">
                  TW
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
