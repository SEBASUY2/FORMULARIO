
import React from 'react';
import { SurveyData } from '../types';
import LoadingSpinner from './icons/LoadingSpinner';

interface SurveyFormProps {
    surveyData: SurveyData;
    setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ surveyData, setSurveyData, onSubmit, isLoading }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSurveyData(prev => ({ ...prev, [name]: value }));
    };

    const satisfactionLevels = ['1', '2', '3', '4', '5'];

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            {/* Satisfaction */}
            <div className="form-group">
                <label className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-3">
                    1. En una escala del 1 al 5, ¿qué tan satisfecho/a estás con el taller?
                </label>
                <div className="flex items-center justify-between sm:justify-start sm:gap-6 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {satisfactionLevels.map(level => (
                        <label key={level} className="flex flex-col-reverse sm:flex-row items-center gap-2 cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300">
                            <input
                                type="radio"
                                name="satisfaccion"
                                value={level}
                                checked={surveyData.satisfaccion === level}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${surveyData.satisfaccion === level ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>{level}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Motivation */}
            <div className="form-group">
                <label htmlFor="motivacion" className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
                    2. ¿Qué fue lo que más te motivó a inscribirte?
                </label>
                <input
                    type="text"
                    id="motivacion"
                    name="motivacion"
                    value={surveyData.motivacion}
                    onChange={handleChange}
                    placeholder="Ej: aprender a usar mi cámara, un pasatiempo..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                />
            </div>

            {/* Favorite Topic */}
            <div className="form-group">
                <label htmlFor="tema-favorito" className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
                    3. De los temas que hemos visto, ¿cuál te ha resultado más interesante?
                </label>
                <input
                    type="text"
                    id="tema-favorito"
                    name="temaFavorito"
                    value={surveyData.temaFavorito}
                    onChange={handleChange}
                    placeholder="Ej: la composición, el modo manual..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                />
            </div>

            {/* Suggested Topic */}
            <div className="form-group">
                <label htmlFor="tema-sugerido" className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
                    4. ¿Hay algún tema que te encantaría que tratáramos en clase?
                </label>
                <input
                    type="text"
                    id="tema-sugerido"
                    name="temaSugerido"
                    value={surveyData.temaSugerido}
                    onChange={handleChange}
                    placeholder="Ej: retratos, paisaje nocturno, edición..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                />
            </div>

            {/* Improvement */}
            <div className="form-group">
                <label htmlFor="mejora" className="block text-md font-medium text-gray-700 dark:text-gray-200 mb-2">
                    5. Si pudieras cambiar una sola cosa para mejorar el taller, ¿cuál sería?
                </label>
                <textarea
                    id="mejora"
                    name="mejora"
                    rows={4}
                    value={surveyData.mejora}
                    onChange={handleChange}
                    placeholder="Tu sugerencia aquí..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
                        Analizando...
                    </>
                ) : (
                    'Enviar y Analizar con IA'
                )}
            </button>
        </form>
    );
};

export default SurveyForm;
