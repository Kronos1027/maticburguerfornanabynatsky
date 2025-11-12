
import React from 'react';
import MathQuiz from '../quiz/MathQuiz';

interface KidsPageProps {
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

const KidsPage: React.FC<KidsPageProps> = ({ onBack }) => {
  return (
    <div className="relative py-12 md:py-16">
       <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={onBack} />
        <h1 className="text-4xl md:text-5xl font-black text-amber-900 text-center mb-8">
            Desafios do Burguer Matic Kids!
        </h1>
        <p className="text-center text-lg text-amber-800 mb-12">
            Resolva as somas para montar o hambúrguer mais delicioso!
        </p>
        <MathQuiz />
      </div>
    </div>
  );
};

export default KidsPage;
