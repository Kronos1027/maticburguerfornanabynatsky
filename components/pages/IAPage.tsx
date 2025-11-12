import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { saveItem } from '../StudyManager';
import InteractiveLearner from '../learn/InteractiveLearner';

interface IAPageProps {
  onBack: () => void;
}

// Utility to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
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

const IAPage: React.FC<IAPageProps> = ({ onBack }) => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [successfulPrompt, setSuccessfulPrompt] = useState<string | null>(null);
    const [showLearner, setShowLearner] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAskAI = async () => {
        if (!prompt && !image) {
            alert("Por favor, digite uma pergunta ou envie uma imagem.");
            return;
        }
        setLoading(true);
        setResponse('');
        setSuccessfulPrompt(null);
        setShowLearner(false);
        
        try {
            // Fix: Use process.env.API_KEY as per guidelines.
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
              // Fix: Update error message to reflect the correct environment variable.
              throw new Error("Chave API_KEY não encontrada.");
            }
            const ai = new GoogleGenAI({ apiKey });
            
            const fullPrompt = `Se houver uma imagem, analise-a. A pergunta do usuário é: "${prompt}". Você é um tutor de matemática amigável e prestativo para todas as idades, explicando conceitos de forma clara e passo a passo. Sua personalidade é fofa e encorajadora, adequada a um tema de gatos e hambúrgueres. Sempre responda em português do Brasil.`;
            const parts: any[] = [{ text: fullPrompt }];

            if (image) {
                const imagePart = await fileToGenerativePart(image);
                parts.unshift(imagePart);
            }
            
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: parts }
            });

            setResponse(result.text);
            setSuccessfulPrompt(prompt || "Análise de imagem matemática");

        } catch (error) {
            console.error(error);
            // Fix: Update user-facing error message.
            setResponse("Oops! Algo deu errado na cozinha da IA. Verifique se a chave da API está configurada corretamente e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        const question = successfulPrompt || "Análise de imagem";
        saveItem(question, response);
        alert(`"${question}" salvo na sua área de estudos!`);
    }

  return (
    <div className="relative py-12 md:py-16">
       <div className="max-w-4xl mx-auto px-4">
        <BackButton onClick={onBack} />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-900 text-center mb-8">
            Chef IA do Burguer Matic!
        </h1>
        <p className="text-center text-lg text-amber-800 mb-12">
            Tem alguma dúvida matemática? Pergunte ao nosso chef! Envie texto ou uma imagem do seu problema.
        </p>

        <div className="bg-[#FEEFCE] p-6 md:p-8 rounded-2xl shadow-lg border-4 border-amber-300 w-full mx-auto">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Como eu calculo a área de um círculo?"
                className="w-full p-4 rounded-lg border-2 border-amber-400 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                rows={4}
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto text-center bg-white text-amber-900 font-bold py-2 px-4 rounded-full shadow-md border-b-2 border-amber-200 hover:bg-amber-50 transition-colors"
                >
                    {image ? "Trocar Imagem" : "Enviar Imagem"}
                </button>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                
                <button
                    onClick={handleAskAI}
                    disabled={loading}
                    className="w-full sm:w-auto flex-grow text-center bg-amber-500 text-white font-bold py-2 px-6 rounded-full shadow-lg border-b-4 border-amber-700 hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-200 disabled:bg-amber-400 disabled:cursor-wait"
                >
                   {loading ? "Cozinhando a Resposta..." : "Perguntar ao Chef IA"}
                </button>
            </div>
             {imagePreview && (
                <div className="mt-4 text-center">
                    <img src={imagePreview} alt="Preview" className="max-h-60 mx-auto rounded-lg shadow-md" />
                </div>
            )}
        </div>

        {(loading || response) && (
            <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Resposta do Chef:</h2>
                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600 mx-auto"></div>
                        <p className="mt-4 text-amber-800">Preparando sua explicação deliciosa...</p>
                    </div>
                ) : (
                    <>
                        <div className="prose max-w-none text-amber-900" style={{whiteSpace: 'pre-wrap'}}>{response}</div>
                        {successfulPrompt && (
                             <div className="text-center mt-6 flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow-lg border-b-4 border-green-700 hover:bg-green-600 transition-colors"
                                >
                                    Salvar para Estudar
                                </button>
                                <button
                                    onClick={() => setShowLearner(true)}
                                    className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg border-b-4 border-blue-700 hover:bg-blue-600 transition-colors"
                                >
                                    Praticar este Tópico
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        )}

        {showLearner && successfulPrompt && (
            <div className="mt-8">
                <InteractiveLearner key={successfulPrompt} initialTopic={successfulPrompt} />
            </div>
        )}
      </div>
    </div>
  );
};

export default IAPage;