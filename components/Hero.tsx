
import React from 'react';

// Simplified Cat SVGs for decoration
const HeroCat1 = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M62.2,84.2c-2.2-0.2-4-2-4-4.2V62c0-5.5,4.5-10,10-10h10c2.2,0,4-1.8,4-4s-1.8-4-4-4H78.2c-9.9,0-18,8.1-18,18v18 c0,4.4,3.6,8,8,8h2c2.2,0,4-1.8,4-4S64.4,84.2,62.2,84.2z" fill="#f9a826"/>
        <path d="M38,20c-11,0-20,9-20,20v40c0,2.2,1.8,4,4,4s4-1.8,4-4V40c0-6.6,5.4-12,12-12s12,5.4,12,12v12c0,2.2,1.8,4,4,4s4-1.8,4-4V32 C56,25.4,50.6,20,44,20H38z" fill="#d1d5db"/>
        <circle cx="50" cy="50" r="30" fill="#f9a826"/>
        <path d="M40,55c0,5.5,4.5,10,10,10s10-4.5,10-10H40z" fill="#FFFBF0"/>
        <circle cx="43" cy="48" r="3" fill="#573D2B"/>
        <circle cx="57" cy="48" r="3" fill="#573D2B"/>
    </svg>
);

const HeroCat2 = () => (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
        <path d="M20,80 C10,70 10,50 20,40 C30,30 50,30 60,40 L90,20 C95,15 105,15 110,20" fill="none" stroke="#f9a826" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="30" fill="#d1d5db"/>
        <circle cx="50" cy="50" r="25" fill="#FFFBF0"/>
        <path d="M40,55c0,5.5,4.5,10,10,10s10-4.5,10-10H40z" fill="#f9a826"/>
        <circle cx="43" cy="48" r="3" fill="#573D2B"/>
        <circle cx="57" cy="48" r="3" fill="#573D2B"/>
        <path d="M50,20 A 10 10 0 0 1 60 30" fill="none" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" />
        <path d="M50,20 A 10 10 0 0 0 40 30" fill="none" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" />
    </svg>
);

const HeroCat3 = () => (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
        <path d="M20 90 A 20 20 0 0 1 40 70 L 60 70 A 20 20 0 0 1 80 90" fill="#60a5fa" stroke="#2563eb" strokeWidth="4" />
        <rect x="30" y="40" width="40" height="30" rx="10" fill="#facc15" stroke="#ca8a04" strokeWidth="4" />
        <rect x="20" y="20" width="60" height="60" rx="20" fill="#60a5fa" />
        <path d="M30 10 L 40 20 L 60 20 L 70 10 Z" fill="white" />
        <path d="M40,55c0,5.5,4.5,10,10,10s10-4.5,10-10H40z" fill="#FFFBF0"/>
        <circle cx="43" cy="48" r="3" fill="#2563eb"/>
        <circle cx="57" cy="48" r="3" fill="#2563eb"/>
    </svg>
);


const Hero: React.FC = () => {
    const textShadowStyle = { textShadow: '4px 4px 0px #FBBF24, 8px 8px 0px rgba(0,0,0,0.1)' };

  return (
    <section className="py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex flex-col items-center justify-center">

          {/* Decorative elements */}
          <div className="absolute -top-12 -left-10 text-5xl font-black text-green-500 opacity-70 rotate-[-15deg]">+</div>
          <div className="absolute -top-8 -right-8 text-4xl font-black text-red-500 opacity-70 rotate-[20deg]">x</div>
          <div className="absolute top-10 -left-16 text-5xl font-black text-orange-400 opacity-70">1</div>
          <div className="absolute bottom-4 -left-8 text-5xl font-black text-teal-400 opacity-70">2</div>
          <div className="absolute top-12 -right-16 text-5xl font-black text-blue-400 opacity-70">3</div>

          <div className="absolute -bottom-10 -left-20 transform scale-x-[-1] opacity-80 hidden md:block">
             <HeroCat1 />
          </div>
           <div className="absolute -top-20 right-4 opacity-80 hidden md:block">
             <HeroCat2 />
          </div>
           <div className="absolute -bottom-16 right-0 opacity-90 hidden md:block">
             <HeroCat3 />
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-[#78350F] text-center leading-none" style={textShadowStyle}>
            Burguer
          </h1>
          <h1 className="text-7xl md:text-9xl font-black text-[#78350F] text-center -mt-4 md:-mt-8" style={textShadowStyle}>
            Matic
          </h1>
        </div>

        <p className="text-center text-xl md:text-2xl font-semibold text-amber-800 mt-8">
          Matemática saborosa para todos os gostos!
        </p>
        
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-amber-800 rounded-full"></div>
          <div className="w-3 h-3 bg-amber-800/30 rounded-full"></div>
          <div className="w-3 h-3 bg-amber-800/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
