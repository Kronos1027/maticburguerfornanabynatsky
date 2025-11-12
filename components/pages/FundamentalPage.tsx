import React, { useState } from 'react';
import DynamicQuiz from '../quiz/DynamicQuiz';

interface FundamentalPageProps {
  onBack: () => void;
}

const BackButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute top-4 left-4 flex items-center space-x-2 bg-amber-100 text-amber-900 font-bold py-2 px-4 rounded-full shadow-md hover:bg-amber-200 transition-colors"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
    <span>Voltar</span>
  </button>
);

const FundamentalPage: React.FC<FundamentalPageProps> = ({ onBack }) => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const topics = [
    "Soma e Subtração",
    "Multiplicação e Divisão",
    "Equações de 1º Grau",
    "Equações de 2º Grau"
  ];

  if (activeQuiz) {
    return (
        <div className="relative py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
                 <BackButton onClick={() => setActiveQuiz(null)} />
                 <h1 className="text-4xl md:text-5xl font-black text-amber-900 text-center mb-8">
                    Desafio: {activeQuiz}
                </h1>
                <DynamicQuiz topic={activeQuiz} />
            </div>
        </div>
    )
  }

  return (
    <div className="relative py-12 md:py-16">
       <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={onBack} />
        <h1 className="text-4xl md:text-5xl font-black text-amber-900 text-center mb-8">
            Cardápio Fundamental
        </h1>
        <p className="text-center text-lg text-amber-800 mb-12">
            Escolha um dos nossos pratos principais para praticar!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {topics.map(topic => (
                <button 
                    key={topic}
                    onClick={() => setActiveQuiz(topic)}
                    className="text-center bg-amber-500 text-white font-bold text-xl py-6 px-8 rounded-xl shadow-lg border-b-4 border-amber-700 hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-200"
                >
                    {topic}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FundamentalPage;
