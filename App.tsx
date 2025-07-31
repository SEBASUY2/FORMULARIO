
import React, { useState } from 'react';
import { SurveyData } from './types';
import { analyzeSurveyData } from './services/geminiService';
import SurveyForm from './components/SurveyForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import CameraIcon from './components/icons/CameraIcon';

const App: React.FC = () => {
    const initialSurveyData: SurveyData = {
        satisfaccion: '5',
        motivacion: '',
        temaFavorito: '',
        temaSugerido: '',
        mejora: '',
    };

    const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSurveySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setAnalysis('');

        try {
            const result = await analyzeSurveyData(surveyData);
            setAnalysis(result);
            setIsSubmitted(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error al analizar la encuesta: ${err.message}`);
            } else {
                setError('Ocurrió un error desconocido.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setSurveyData(initialSurveyData);
        setAnalysis('');
        setError(null);
        setIsSubmitted(false);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <CameraIcon className="w-12 h-12 text-blue-500" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
                            Encuesta del Taller de Fotografía
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Tu opinión nos ayuda a mejorar. Una vez enviada, nuestra IA analizará tu respuesta.
                    </p>
                </header>

                <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/20 overflow-hidden">
                   <div className="p-6 sm:p-8 lg:p-10">
                    {isSubmitted ? (
                        <AnalysisDisplay 
                            analysis={analysis}
                            isLoading={isLoading}
                            error={error}
                            onReset={handleReset}
                        />
                    ) : (
                        <SurveyForm
                            surveyData={surveyData}
                            setSurveyData={setSurveyData}
                            onSubmit={handleSurveySubmit}
                            isLoading={isLoading}
                        />
                    )}
                   </div>
                </main>
                 <footer className="text-center mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Desarrollado con React, Tailwind CSS y la API de Gemini.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;
