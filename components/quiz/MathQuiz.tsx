
import React, { useState, useEffect, useMemo } from 'react';

interface Question {
    num1: number;
    num2: number;
    answer: number;
}

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const MathQuiz: React.FC = () => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [options, setOptions] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<{message: string, type: 'correct' | 'incorrect' | ''}>({message: '', type: ''});
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = num1 + num2;

        const newQuestion = { num1, num2, answer };
        setQuestion(newQuestion);

        const wrongOption1 = Math.max(0, answer + (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? 1 : -1));
        let wrongOption2;
        do {
            wrongOption2 = Math.max(0, answer + (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? 1 : -1));
        } while (wrongOption2 === wrongOption1 || wrongOption2 === answer);
        
        setOptions(shuffleArray([answer, wrongOption1, wrongOption2]));
        setFeedback({message: '', type: ''});
        setIsAnswered(false);
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleAnswer = (selectedAnswer: number) => {
        if (isAnswered) return;

        setIsAnswered(true);
        if (selectedAnswer === question?.answer) {
            setFeedback({message: 'Correto! 🎉', type: 'correct'});
            setScore(prevScore => prevScore + 10);
        } else {
            setFeedback({message: `Quase! A resposta era ${question?.answer}`, type: 'incorrect'});
        }
    };
    
    const burgerParts = useMemo(() => ['🍔', '🍟', '🥤', '🍦', '🍩', '🍕', '🌭'], []);
    const questionEmoji = useMemo(() => burgerParts[Math.floor(Math.random() * burgerParts.length)], [question]);

    if (!question) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-[#FEEFCE] p-6 md:p-10 rounded-2xl shadow-lg border-4 border-amber-300 w-full max-w-2xl mx-auto">
            <div className="text-right text-2xl font-bold text-amber-900 mb-4">
                Pontos: {score}
            </div>
            
            <div className="text-center mb-8">
                <p className="text-3xl md:text-5xl font-bold text-amber-800 flex justify-center items-center space-x-4">
                    <span>{question.num1}</span> 
                    <span className="text-4xl text-green-600">{questionEmoji}</span>
                    <span>+</span>
                    <span>{question.num2}</span> 
                    <span className="text-4xl text-green-600">{questionEmoji}</span>
                    <span>=</span>
                    <span className="text-red-500">?</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {options.map((option, index) => (
                    <button 
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        className="text-center bg-amber-500 text-white font-bold text-3xl py-4 px-8 rounded-xl shadow-lg border-b-4 border-amber-700 hover:bg-amber-600 transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {option}
                    </button>
                ))}
            </div>

            {feedback.message && (
                <div className={`text-center text-2xl font-bold p-4 rounded-lg ${feedback.type === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback.message}
                </div>
            )}

            {isAnswered && (
                 <div className="text-center mt-6">
                    <button 
                        onClick={generateQuestion}
                        className="text-center bg-blue-500 text-white font-bold text-xl py-3 px-10 rounded-full shadow-lg border-b-4 border-blue-700 hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-200"
                    >
                        Próxima Pergunta
                    </button>
                </div>
            )}
        </div>
    );
};

export default MathQuiz;
