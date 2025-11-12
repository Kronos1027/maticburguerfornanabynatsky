import React, { useState, FormEvent } from 'react';
import InteractiveLearner from '../learn/InteractiveLearner';


interface SobrePageProps {
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


const SobrePage: React.FC<SobrePageProps> = ({ onBack }) => {
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [customTopic, setCustomTopic] = useState('');

    const handleCustomTopicSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (customTopic.trim()) {
            setActiveTopic(customTopic.trim());
        }
    }

    const concepts = [
        "O que é Álgebra?", 
        "O que é Geometria?", 
        "O que é Cálculo?", 
        "O que é Estatística?",
        "Teorema de Pitágoras",
        "Frações",
    ];

  return (
    <div className="relative py-12 md:py-16">
       <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={onBack} />
        <h1 className="text-4xl md:text-5xl font-black text-amber-900 text-center mb-12">
            A Cozinha do Conhecimento
        </h1>

        <div className="bg-[#FEEFCE] p-6 rounded-2xl shadow-lg border-4 border-amber-300 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Aprenda e Pratique um Tópico</h2>
            <p className="text-center text-amber-800 mb-6">Escolha um dos nossos pratos ou peça um personalizado!</p>
            <div className="flex flex-wrap justify-center gap-3">
                {concepts.map(name => (
                     <button key={name} onClick={() => setActiveTopic(name)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors text-sm">
                        {name}
                    </button>
                ))}
            </div>
            
            <form onSubmit={handleCustomTopicSubmit} className="mt-6 border-t-2 border-amber-300 pt-6">
                <p className="text-center font-bold text-amber-900 mb-2">Ou pergunte sobre qualquer outro assunto!</p>
                <div className="flex justify-center gap-2">
                    <input 
                        type="text"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="Ex: Logaritmos"
                        className="p-2 rounded-lg border-2 border-amber-400 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                    <button type="submit" className="bg-amber-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-amber-600 transition-colors">
                        Aprender
                    </button>
                </div>
            </form>
        </div>

        {activeTopic && (
            <div className="mt-8">
                {/* Use key to force re-mount when topic changes */}
                <InteractiveLearner key={activeTopic} initialTopic={activeTopic} />
            </div>
        )}

      </div>
    </div>
  );
};

export default SobrePage;