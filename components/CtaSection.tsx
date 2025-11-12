import React, { useState, useEffect } from 'react';
import { getTodaysItems, StudyItem } from './StudyManager';

// Simplified Cat SVGs for decoration
const ChefCat = () => (
    <svg viewBox="0 0 150 150" className="w-48 h-48">
        <path d="M40 30 A 10 10 0 0 1 50 20 L 100 20 A 10 10 0 0 1 110 30 L 110 40 L 40 40 Z" fill="white" />
        <circle cx="75" cy="25" r="15" fill="white" />
        <circle cx="55" cy="28" r="15" fill="white" />
        <circle cx="95" cy="28" r="15" fill="white" />
        <path d="M50,140 C40,130 40,110 50,100 C60,90 80,90 90,100 L120,80 C125,75 135,75 140,80" fill="none" stroke="#f9a826" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="75" cy="80" r="40" fill="#f9a826"/>
        <circle cx="75" cy="80" r="5" fill="#d1d5db"/>
        <path d="M75,80 l -30,30" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round"/>
        <path d="M75,80 l 30,30" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round"/>
        <path d="M60,95c0,8,7,15,15,15s15-7,15-15H60z" fill="#FFFBF0"/>
        <circle cx="65" cy="85" r="5" fill="#573D2B"/>
        <circle cx="85" cy="85" r="5" fill="#573D2B"/>
        <path d="M50 40 L 100 40 L 90 140 L 60 140 Z" fill="#FFFBF0" />
        <path d="M65,55 A 20 20 0 0 1 85 55" stroke="#e11d48" strokeWidth="10" strokeLinecap="round" fill="none" />
    </svg>
);

const SpearCat = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
        <path d="M50 10 L 90 90 L 10 90 Z" fill="#f9a826"/>
        <path d="M40,65c0,5.5,4.5,10,10,10s10-4.5,10-10H40z" fill="#FFFBF0"/>
        <circle cx="43" cy="58" r="3" fill="#573D2B"/>
        <circle cx="57" cy="58" r="3" fill="#573D2B"/>
        <path d="M50 5 L 50 40" stroke="#78350F" strokeWidth="4" />
        <path d="M45 10 L 50 5 L 55 10" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface CtaSectionProps {
  onNavigate: (page: string) => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onNavigate }) => {
  const [highlights, setHighlights] = useState<StudyItem[]>([]);

  useEffect(() => {
    setHighlights(getTodaysItems());
  }, []);


  return (
    <section className="bg-[#FEEFCE] py-16 rounded-t-3xl -mt-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
        <div className="flex justify-center items-center">
          <ChefCat />
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={() => onNavigate('Kids')}
            className="w-full max-w-sm text-center bg-amber-500 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg border-b-4 border-amber-700 hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-200">
            Comece a Aprender!
          </button>
          <button 
            onClick={() => onNavigate('Fundamental')}
            className="w-full max-w-sm text-center bg-white text-amber-900 font-bold text-lg py-4 px-8 rounded-full shadow-lg border-b-4 border-amber-200 hover:bg-amber-50 transform hover:-translate-y-1 transition-all duration-200">
            Explore Nossos Menus (de estudo)
          </button>
        </div>
        
        <div className="flex justify-center items-center">
            <div className="bg-white/80 rounded-2xl p-6 text-center shadow-lg w-full max-w-sm">
                <h3 className="text-2xl font-extrabold text-amber-900 mb-4">Destaques do Dia!</h3>
                {highlights.length > 0 ? (
                  <div className="space-y-2">
                    {highlights.map(item => (
                      <button 
                        key={item.id} 
                        onClick={() => alert(`Resposta:\n\n${item.answer}`)}
                        className="w-full text-left p-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors text-amber-900 font-semibold truncate"
                        title={item.question}
                      >
                        - {item.question}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center mt-2">
                        <SpearCat />
                    </div>
                    <p className="text-amber-800/80 mt-2 text-sm">Nenhum item estudado hoje. Use a IA para começar!</p>
                  </>
                )}
            </div>
        </div>

      </div>
    </section>
  );
};

export default CtaSection;
