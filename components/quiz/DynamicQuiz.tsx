import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface DynamicQuizProps {
    topic: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600 mx-auto"></div>
      <p className="mt-4 text-amber-800">Gerando um desafio fresquinho para você...</p>
    </div>
);
  
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center bg-red-100 text-red-800 p-4 rounded-lg">
      <p className="font-bold">Oops! Algo deu errado.</p>
      <p>{message}</p>
    </div>
);

const DynamicQuiz: React.FC<DynamicQuizProps> = ({ topic }) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const generateQuestions = async () => {
            setLoading(true);
            setError(null);
            setQuestions([]);

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

                const responseSchema = {
                    type: Type.OBJECT,
                    properties: {
                      quiz: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            question: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            correctAnswerIndex: { type: Type.INTEGER },
                          },
                        },
                      },
                    },
                };
                  
                const prompt = `Crie um quiz de múltipla escolha com 5 perguntas sobre o tópico de matemática: "${topic}". Para cada pergunta, forneça 3 ou 4 opções de resposta e indique o índice da resposta correta (começando em 0). A dificuldade deve ser apropriada para o tópico.`;
                
                const result = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: 'application/json',
                        responseSchema: responseSchema,
                    }
                });

                const jsonResponse = JSON.parse(result.text);
                
                if (jsonResponse.quiz && jsonResponse.quiz.length > 0) {
                    setQuestions(jsonResponse.quiz);
                } else {
                    throw new Error("A IA não retornou um quiz válido.");
                }

            } catch (err) {
                console.error(err);
                setError("Não foi possível gerar o quiz. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        generateQuestions();
    }, [topic]);

    const handleAnswer = (selectedIndex: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(selectedIndex);
        const correctIndex = questions[currentQuestionIndex].correctAnswerIndex;

        if (selectedIndex === correctIndex) {
            setFeedback('Correto! 🎉');
            setScore(prev => prev + 10);
        } else {
            const correctAnswerText = questions[currentQuestionIndex].options[correctIndex];
            setFeedback(`Quase! A resposta certa era "${correctAnswerText}".`);
        }
    }

    const handleNext = () => {
        setSelectedAnswer(null);
        setFeedback('');
        setCurrentQuestionIndex(prev => prev + 1);
    }
    
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;
    if (questions.length === 0) return <ErrorDisplay message="Nenhuma questão foi gerada." />;

    const isQuizFinished = currentQuestionIndex >= questions.length;
    const currentQuestion = isQuizFinished ? null : questions[currentQuestionIndex];

    if (isQuizFinished) {
        return (
            <div className="bg-[#FEEFCE] p-6 md:p-10 rounded-2xl shadow-lg border-4 border-amber-300 w-full max-w-2xl mx-auto text-center">
                 <h2 className="text-3xl font-bold text-amber-900 mb-4">Quiz Finalizado!</h2>
                 <p className="text-xl text-amber-800 mb-6">Sua pontuação final foi:</p>
                 <p className="text-6xl font-black text-green-600">{score}</p>
                 <button onClick={() => window.location.reload()} className="mt-8 bg-blue-500 text-white font-bold text-xl py-3 px-10 rounded-full shadow-lg border-b-4 border-blue-700 hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-200">
                    Jogar Novamente
                 </button>
            </div>
        )
    }

    return (
        <div className="bg-[#FEEFCE] p-6 md:p-10 rounded-2xl shadow-lg border-4 border-amber-300 w-full max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold text-amber-800">
                    Questão {currentQuestionIndex + 1} de {questions.length}
                </div>
                <div className="text-lg font-bold text-amber-900">
                    Pontos: {score}
                </div>
            </div>
            
            <div className="text-center mb-6 bg-white/50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-amber-900">{currentQuestion?.question}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentQuestion?.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = selectedAnswer !== null && index === currentQuestion.correctAnswerIndex;
                    const isWrong = isSelected && !isCorrect;

                    const getButtonClass = () => {
                        if (isCorrect) return 'bg-green-500 border-green-700';
                        if (isWrong) return 'bg-red-500 border-red-700';
                        if (selectedAnswer !== null) return 'bg-gray-400 border-gray-600 opacity-70';
                        return 'bg-amber-500 border-amber-700 hover:bg-amber-600';
                    }

                    return (
                        <button 
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={`text-center text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg border-b-4 transition-all duration-200 disabled:cursor-not-allowed ${getButtonClass()}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {feedback && (
                <div className={`text-center text-xl font-bold p-3 rounded-lg mb-4 ${feedback.includes('Correto') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback}
                </div>
            )}

            {selectedAnswer !== null && (
                 <div className="text-center mt-6">
                    <button 
                        onClick={handleNext}
                        className="text-center bg-blue-500 text-white font-bold text-xl py-3 px-10 rounded-full shadow-lg border-b-4 border-blue-700 hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-200"
                    >
                       {currentQuestionIndex === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima Pergunta'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DynamicQuiz;
