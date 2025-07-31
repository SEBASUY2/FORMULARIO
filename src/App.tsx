
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
            setAnalysis(result.analysis);
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
        <div className="min-h-screen w-full text-gray-200 flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30 overflow-hidden relative">
            <div className="background-gradient"></div>
            <div className="relative w-full max-w-2xl mx-auto z-10">
                <header className="text-center mb-8 animate-fade-in-up">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <CameraIcon className="w-9 h-9 text-indigo-400" />
                        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-tight">
                            Encuesta de Fotografía
                        </h1>
                    </div>
                    <p className="text-md text-gray-400">
                        Tu opinión impulsa nuestra mejora. Nuestra IA la analizará por ti.
                    </p>
                </header>

                <main className="glass-card overflow-hidden animate-fade-in-up" style={{animationDelay: '150ms'}}>
                    <div className="p-6 sm:p-8">
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
                 <footer className="text-center mt-8 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    <p className="text-xs text-gray-500 hover:text-gray-400 transition">
                        Análisis por IA con Google Gemini y Firebase.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;
