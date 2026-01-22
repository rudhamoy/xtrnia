'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Competition {
  _id: string;
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

export function UpcomingCompetitionsSection() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions?type=upcoming&status=active');
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

  if (loading) {
    return (
      <section id="upcoming-competition" className="relative bg-gradient-to-b from-black via-gray-900 to-black px-6 py-24 overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-yellow-400 text-xl">Loading competitions...</div>
        </div>
      </section>
    );
  }

  if (competitions.length === 0) {
    return (
      <section id="upcoming-competition" className="relative bg-gradient-to-b from-black via-gray-900 to-black px-6 py-24 overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-yellow-400">UPCOMING COMPETITION</h2>
          <p className="text-white/60">No upcoming competitions at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="upcoming-competition" className="relative bg-gradient-to-b from-black via-gray-900 to-black px-6 py-24 overflow-hidden scroll-mt-20">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_48%,yellow_49%,yellow_51%,transparent_52%)] bg-[length:20px_20px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 text-yellow-400 tracking-tight px-4">UPCOMING COMPETITION</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-20 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {competitions.map((event) => (
            <div
              key={event._id}
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
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 brightness-90 blur-sm"
                  />

                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Details Section - Modern Layout */}
                <div className="relative p-6 pt-2 bg-gradient-to-b from-black/95 to-black">

                  {/* Image card */}
                  <div className="relative rounded-2xl overflow-hidden border border-yellow-400/20 w-32 h-32 mx-auto mb-4 -mt-24">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
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
  );
}

export function CurrentCompetitionSection() {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetition();
  }, []);

  const fetchCompetition = async () => {
    try {
      const response = await fetch('/api/competitions?type=current&status=active');
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setCompetition(data.data[0]); // Get the first current competition
      }
    } catch (error) {
      console.error('Error fetching current competition:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-black text-xl">Loading current competition...</div>
        </div>
      </section>
    );
  }

  if (!competition) {
    return (
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-black">CURRENT COMPETITION</h2>
          <p className="text-black/70">No current competition at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-6 py-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_75%,black_75%,black),linear-gradient(45deg,black_25%,transparent_25%,transparent_75%,black_75%,black)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,black,black_2px,transparent_2px,transparent_20px)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,black_2px,transparent_2px)] bg-[length:40px_40px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 text-black tracking-tight px-4">CURRENT COMPETITION</h2>
        <div className="w-32 h-1 bg-black mx-auto mb-20 rounded-full" />

        {/* Competition Card - Centered */}
        <div className="max-w-md mx-auto mb-12">
          <div className="group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-400/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500">

              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute top-4 right-4 z-10">
                <div className="bg-yellow-400/90 backdrop-blur-sm text-black text-[9px] font-black px-3 py-1.5 rounded-full whitespace-pre-line leading-tight tracking-wider shadow-lg">
                  {competition.badge}
                </div>
              </div>

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={competition.image}
                  alt={competition.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700 brightness-90 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="relative p-6 pt-2 bg-gradient-to-b from-black/95 to-black">
                <div className="relative rounded-2xl overflow-hidden border border-yellow-400/20 w-64 h-48 mx-auto mb-4 -mt-24">
                  <Image
                    src={competition.image}
                    alt={competition.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-yellow-300 font-bold text-sm tracking-wider uppercase">{competition.date}</p>
                </div>

                <p className="text-white/70 text-xs mb-4 leading-relaxed text-center font-medium">
                  {competition.category.replace('\n', ' • ')}
                </p>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/20 space-y-1.5">
                  {competition.prizes.map((prize, idx) => (
                    <p key={idx} className={`leading-relaxed text-center transition-all duration-300 ${idx === 0 ? 'text-yellow-400 font-black tracking-wide text-sm uppercase mb-2' : 'text-white/80 text-xs font-medium'}`}>
                      {prize}
                    </p>
                  ))}
                </div>

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
              <p className="text-black/90 text-sm leading-relaxed pl-2">January 27, 2026.</p>
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
                {competition.prizes.slice(1).map((prize, idx) => (
                  <li key={idx} className="hover:text-black transition-colors duration-300 font-semibold">{prize}</li>
                ))}
              </ul>
              <p className="text-black/90 text-sm leading-relaxed pl-2">
                <span className="font-black">But that&apos;s not all!</span> If the student wins, the sports teacher wins too. For example, if a class wins 2nd place, they will be awarded the prize amount, and their sports teacher will also receive an additional equal amount.
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
                <span className="font-black">Additionally,</span> the video that receives the most views on our YouTube channel will also win exciting prizes, matching the competition prizes.
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
  );
}
