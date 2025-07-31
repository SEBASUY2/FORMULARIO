
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
    const renderLine = (line: string, index: number) => {
        if (line.startsWith('**') && line.endsWith('**')) {
            return <h3 key={index} className="text-xl font-semibold text-gray-800 dark:text-white mt-5 mb-2">{line.substring(2, line.length - 2)}</h3>;
        }
        if (line.startsWith('*   **') && line.includes('**:')) {
            const parts = line.substring(4).split('**:');
            return (
                <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1.5">&#9679;</span>
                    <p className="text-gray-600 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-200">{parts[0]}</strong>:{parts[1]}</p>
                </li>
            );
        }
        return <p key={index} className="text-gray-600 dark:text-gray-300">{line}</p>;
    };

    return (
        <div className="space-y-2">
            {text.split('\n').map(renderLine)}
        </div>
    );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, error, onReset }) => {
    if (isLoading) {
        return (
            <div className="text-center py-16">
                <LoadingSpinner className="mx-auto w-12 h-12 text-blue-500" />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate-pulse">
                    La IA está analizando tu respuesta...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">¡Ups! Algo salió mal.</p>
                <p className="mt-2 text-red-500 dark:text-red-400/80">{error}</p>
                 <button
                    onClick={onReset}
                    className="mt-6 py-2 px-5 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Intentar de Nuevo
                </button>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-t-lg">
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">¡Gracias por tu opinión!</h2>
                <p className="mt-1 text-green-600 dark:text-green-400">Tu respuesta ha sido enviada y analizada con éxito.</p>
            </div>
            
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <SparklesIcon className="w-6 h-6 text-blue-500" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Análisis de la IA</h3>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md">
                     <FormattedAnalysis text={analysis} />
                </div>
            </div>
            
            <div className="text-center mt-6 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onReset}
                    className="py-3 px-6 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Enviar otra respuesta
                </button>
            </div>
        </div>
    );
};

export default AnalysisDisplay;
