import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { getItems } from '../StudyManager';

interface AvancadoPageProps {
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

const LoadingSpinner: React.FC = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600 mx-auto"></div>
    <p className="mt-4 text-amber-800">Nosso chef IA está preparando seu material...</p>
  </div>
);

const AvancadoPage: React.FC<AvancadoPageProps> = ({ onBack }) => {
  const [studyStats, setStudyStats] = useState({ startDate: '-', totalItems: 0, studyDays: 0 });
  const [loading, setLoading] = useState(false);
  const [studyMaterial, setStudyMaterial] = useState('');

  useEffect(() => {
    const items = getItems();
    if (items.length > 0) {
      const timestamps = items.map(i => i.timestamp);
      const firstDate = new Date(Math.min(...timestamps));
      
      const uniqueDays = new Set(
        items.map(i => new Date(i.timestamp).toDateString())
      ).size;

      setStudyStats({
        startDate: firstDate.toLocaleDateString('pt-BR'),
        totalItems: items.length,
        studyDays: uniqueDays
      });
    }
  }, []);

  const generateStudyMaterial = async (topic: string) => {
    setLoading(true);
    setStudyMaterial('');
    
    try {
      // Fix: Use process.env.API_KEY to access the API key as per guidelines, which also resolves the 'import.meta.env' error.
      // The check for the key's existence is removed based on the guideline to assume it is pre-configured.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Você é um tutor de matemática sênior para o site 'Burguer Matic'. Crie um guia de estudo completo sobre ${topic}. Explique os conceitos-chave de forma clara, como se estivesse montando um 'hambúrguer de conhecimento'. Inclua exemplos práticos ('ingredientes') e alguns problemas para praticar ('desafios do chef'). Use um tom amigável, encorajador e a temática de gatos e comida. Responda em português do Brasil.`;
      
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      setStudyMaterial(result.text);

    } catch (error) {
      console.error(error);
      setStudyMaterial("Oops! Algo deu errado na cozinha da IA. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  }

  const advancedTopics = ["Cálculo", "Álgebra Linear", "Trigonometria"];

  return (
    <div className="relative py-12 md:py-16">
       <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={onBack} />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-900 text-center mb-8 sm:text-4xl">
            Menu Avançado
        </h1>

        <div className="bg-[#FEEFCE] p-6 rounded-2xl shadow-lg border-4 border-amber-300 mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Dashboard de Estudos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl sm:text-3xl font-black text-amber-700">{studyStats.startDate}</p>
                    <p className="text-sm font-semibold text-amber-800">Data de Início</p>
                </div>
                <div>
                    <p className="text-2xl sm:text-3xl font-black text-amber-700">{studyStats.totalItems}</p>
                    <p className="text-sm font-semibold text-amber-800">Itens Salvos</p>
                </div>
                <div>
                    <p className="text-2xl sm:text-3xl font-black text-amber-700">{studyStats.studyDays}</p>
                    <p className="text-sm font-semibold text-amber-800">Dias de Estudo</p>
                </div>
            </div>
        </div>

        <div className="bg-[#FEEFCE] p-6 rounded-2xl shadow-lg border-4 border-amber-300">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">Material de Estudo Personalizado</h2>
            <p className="text-center text-amber-800 mb-6">Escolha um tópico e nosso Chef IA irá preparar um material de estudo delicioso para você!</p>
            <div className="flex justify-center flex-wrap gap-4">
                {advancedTopics.map(topic => (
                    <button key={topic} onClick={() => generateStudyMaterial(topic)} className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full shadow-lg border-b-4 border-amber-700 hover:bg-amber-600 transition-colors">
                        {topic}
                    </button>
                ))}
            </div>
        </div>

        {(loading || studyMaterial) && (
             <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                 {loading ? <LoadingSpinner /> : (
                     <div className="prose max-w-none text-amber-900" style={{whiteSpace: 'pre-wrap'}}>{studyMaterial}</div>
                 )}
            </div>
        )}

      </div>
    </div>
  );
};

export default AvancadoPage;