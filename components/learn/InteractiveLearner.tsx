import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface LearnerProps {
    initialTopic: string;
}

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600 mx-auto"></div>
      <p className="mt-4 text-amber-800">{message}</p>
    </div>
);
  
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center bg-red-100 text-red-800 p-4 rounded-lg">
      <p className="font-bold">Oops! Algo deu errado.</p>
      <p>{message}</p>
    </div>
);

const InteractiveLearner: React.FC<LearnerProps> = ({ initialTopic }) => {
    const [explanation, setExplanation] = useState('');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [errorExplanation, setErrorExplanation] = useState('');
    const [remediationQuestion, setRemediationQuestion] = useState<QuizQuestion | null>(null);
    
    const [ai, setAi] = useState<GoogleGenAI | null>(null);

    useEffect(() => {
        // Fix: Use process.env.API_KEY as per guidelines.
        const apiKey = process.env.API_KEY;
        if (apiKey) {
            setAi(new GoogleGenAI({ apiKey }));
        } else {
            // Fix: Update error message to reflect the correct environment variable.
            setError("Chave da API não encontrada. Verifique se a variável API_KEY está configurada corretamente no seu ambiente.");
        }
    }, []);


    useEffect(() => {
        const generateInitialContent = async () => {
            if (!ai) return;

            setLoading('Preparando sua aula particular...');
            setError(null);
            
            try {
                const schema = {
                    type: Type.OBJECT,
                    properties: {
                        explanation: { type: Type.STRING },
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

                const prompt = `Você é um tutor de matemática para o site 'Burguer Matic'. O usuário quer aprender sobre "${initialTopic}". Primeiro, crie uma explicação clara e concisa sobre o tópico, usando a temática fofa de gatos e hambúrgueres. Depois, crie um quiz de 10 perguntas de múltipla escolha para testar o conhecimento. Forneça 4 opções para cada pergunta e o índice da resposta correta (0 a 3). Responda em português do Brasil.`;

                const result = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { responseMimeType: 'application/json', responseSchema: schema }
                });

                const content = JSON.parse(result.text);
                setExplanation(content.explanation);
                setQuestions(content.quiz);

            } catch (err) {
                console.error(err);
                // Fix: Update user-facing error message.
                setError("Não foi possível gerar o conteúdo. Verifique se a chave da API está configurada corretamente e tente novamente.");
            } finally {
                setLoading('');
            }
        };

        generateInitialContent();
    }, [initialTopic, ai]);

    const handleAnswer = async (selectedIndex: number) => {
        if (selectedAnswer !== null || !ai) return;
        setSelectedAnswer(selectedIndex);

        const currentQ = remediationQuestion || questions[currentQuestionIndex];
        const correctIndex = currentQ.correctAnswerIndex;

        if (selectedIndex === correctIndex) {
            setFeedback('Correto! 🎉');
            setScore(prev => prev + 10);
            if (remediationQuestion) {
                // If they got the remediation question right, clear it and move on
                setRemediationQuestion(null);
                setErrorExplanation('');
            }
        } else {
            // Incorrect answer
            const wrongAnswerText = currentQ.options[selectedIndex];
            const correctAnswerText = currentQ.options[correctIndex];
            setFeedback(`Quase! A resposta certa era "${correctAnswerText}".`);
            setLoading("Analisando seu erro e criando uma nova questão...");

            try {
                // Get explanation for the error
                const explanationPrompt = `O usuário estava respondendo à pergunta de matemática: "${currentQ.question}". A resposta correta é "${correctAnswerText}", mas ele respondeu "${wrongAnswerText}". Explique de forma simples e encorajadora por que a resposta do usuário está incorreta e qual é o conceito correto a ser aplicado. Mantenha o tom do site 'Burguer Matic'.`;
                const explanationResult = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: explanationPrompt });
                setErrorExplanation(explanationResult.text);

                // Get a new, similar question
                const remediationSchema = {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswerIndex: { type: Type.INTEGER },
                    },
                };
                const remediationPrompt = `Crie uma nova pergunta de múltipla escolha que seja similar em conceito e dificuldade à pergunta: "${currentQ.question}". Forneça 4 opções e o índice da resposta correta.`;
                const remediationResult = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: remediationPrompt,
                    config: { responseMimeType: 'application/json', responseSchema: remediationSchema }
                });
                setRemediationQuestion(JSON.parse(remediationResult.text));
            } catch (err) {
                console.error(err);
                setErrorExplanation("Não consegui gerar a explicação do erro. Clique em 'Próxima' para continuar.");
                setRemediationQuestion(null); // skip remediation on error
            } finally {
                setLoading('');
            }
        }
    }

    const handleNext = () => {
        setSelectedAnswer(null);
        setFeedback('');
        setErrorExplanation('');
        // Only advance if we are not in a remediation loop
        if (!remediationQuestion) {
             setCurrentQuestionIndex(prev => prev + 1);
        }
    }
    
    if (loading && !remediationQuestion) return <LoadingSpinner message={loading} />;
    if (error) return <ErrorDisplay message={error} />;
    if (!ai) return <ErrorDisplay message="Cliente de IA não inicializado. Verifique a configuração da API Key." />;
    if (!explanation || questions.length === 0) return null; // Render nothing until content is ready
    
    const isQuizFinished = currentQuestionIndex >= questions.length;
    const currentQuestion = remediationQuestion || (isQuizFinished ? null : questions[currentQuestionIndex]);
    
    if (isQuizFinished) {
        return (
            <div className="bg-[#FEEFCE] p-6 md:p-10 rounded-2xl shadow-lg border-4 border-amber-300 w-full mx-auto text-center">
                 <h2 className="text-3xl font-bold text-amber-900 mb-4">Aula Finalizada!</h2>
                 <p className="text-xl text-amber-800 mb-6">Sua pontuação final foi:</p>
                 <p className="text-6xl font-black text-green-600">{score}</p>
            </div>
        )
    }

    return (
        <div className="bg-[#FEEFCE] p-6 md:p-10 rounded-2xl shadow-lg border-4 border-amber-300 w-full mx-auto space-y-6">
            {currentQuestionIndex === 0 && !remediationQuestion && (
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 text-center">Vamos aprender sobre {initialTopic}!</h2>
                    <div className="prose max-w-none bg-white/50 p-4 rounded-lg text-amber-900" style={{whiteSpace: 'pre-wrap'}}>{explanation}</div>
                </div>
            )}
            
            <div className="border-t-2 border-amber-300 pt-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-amber-800">
                        {remediationQuestion ? "Questão de Reforço" : `Questão ${currentQuestionIndex + 1} de ${questions.length}`}
                    </div>
                    <div className="text-lg font-bold text-amber-900">
                        Pontos: {score}
                    </div>
                </div>
                
                <div className="text-center mb-6 bg-white/50 p-4 rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold text-amber-900">{currentQuestion?.question}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                disabled={selectedAnswer !== null || !!loading}
                                className={`text-center text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg border-b-4 transition-all duration-200 disabled:cursor-not-allowed ${getButtonClass()}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>

            {loading && remediationQuestion && <LoadingSpinner message={loading} />}

            {feedback && (
                <div className={`text-center text-xl font-bold p-3 rounded-lg ${feedback.includes('Correto') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback}
                </div>
            )}
            
            {errorExplanation && (
                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4" role="alert">
                    <p className="font-bold">Explicação do Chef:</p>
                    <p style={{whiteSpace: 'pre-wrap'}}>{errorExplanation}</p>
                </div>
            )}

            {selectedAnswer !== null && !loading && (
                 <div className="text-center mt-6">
                    <button 
                        onClick={handleNext}
                        disabled={!!remediationQuestion}
                        className="text-center bg-blue-500 text-white font-bold text-xl py-3 px-10 rounded-full shadow-lg border-b-4 border-blue-700 hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-600"
                    >
                       {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default InteractiveLearner;