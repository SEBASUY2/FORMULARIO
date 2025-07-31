
import React from 'react';
import LoadingSpinner from './icons/LoadingSpinner';
import SparklesIcon from './icons/SparklesIcon';

interface AnalysisDisplayProps {
    analysis: string;
    isLoading: boolean;
    error: string | null;
    onReset: () => void;
}

const FormattedAnalysis: React.FC<{ text: string }> = ({ text }) => {
    if (!text) {
        return null;
    }
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="space-y-4 text-left">
            {lines.map((line, index) => {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                    return <h3 key={index} className="text-lg font-bold text-gray-100 mt-4 mb-1">{trimmedLine.substring(2, trimmedLine.length - 2)}</h3>;
                }

                const listItemMatch = trimmedLine.match(/^\*\s*\*\*(.*?)\*\*:\s*(.*)$/);
                if (listItemMatch) {
                    const [, key, value] = listItemMatch;
                    return (
                        <div key={index} className="relative pl-6">
                            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-400"></div>
                            <p className="text-gray-300">
                                <strong className="font-semibold text-gray-200">{key.trim()}</strong>:
                                <span className="text-gray-400"> {value.trim()}</span>
                            </p>
                        </div>
                    );
                }

                return <p key={index} className="text-gray-300">{trimmedLine}</p>;
            })}
        </div>
    );
};


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error, onReset }) => {
    if (isLoading) {
        return (
            <div className="text-center py-20 flex flex-col items-center justify-center min-h-[400px]">
                <LoadingSpinner className="mx-auto w-10 h-10 text-indigo-400" />
                <p className="mt-4 text-md font-medium text-gray-400 animate-pulse">
                    La IA está analizando tu respuesta...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 px-6 rounded-lg animate-fade-in-up">
                <p className="text-lg font-semibold text-red-400">¡Ups! Algo salió mal.</p>
                <p className="mt-2 text-sm text-red-400/80 max-w-md mx-auto">{error}</p>
                 <button
                    onClick={onReset}
                    className="mt-6 py-2 px-5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-950 transform hover:scale-105 transition-transform"
                >
                    Intentar de Nuevo
                </button>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in-up">
            <div className="text-center p-6 rounded-t-lg">
                <div className="inline-block bg-green-500/10 p-3 rounded-full mb-4 ring-1 ring-green-500/20">
                    <SparklesIcon className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">¡Gracias por tu opinión!</h2>
                <p className="mt-1 text-sm text-gray-400">Tu respuesta ha sido analizada con éxito.</p>
            </div>
            
            <div className="px-2 sm:px-4">
                <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700/50">
                     <FormattedAnalysis text={analysis} />
                </div>
            </div>
            
            <div className="text-center mt-8">
                <button
                    onClick={onReset}
                    className="group relative w-full sm:w-auto flex justify-center items-center gap-3 py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-950 transform active:scale-[0.98] transition-all duration-200"
                >
                    Enviar otra respuesta
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AnalysisDisplay;
