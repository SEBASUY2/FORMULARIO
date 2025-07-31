
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
        <form onSubmit={onSubmit} className="space-y-7">
            {/* Satisfaction */}
            <div className="form-group">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                    1. En una escala del 1 al 5, ¿qué tan satisfecho/a estás con el taller?
                </label>
                <div className="grid grid-cols-5 gap-2">
                    {satisfactionLevels.map(level => (
                        <label key={level} className="relative text-center cursor-pointer">
                            <input
                                type="radio"
                                name="satisfaccion"
                                value={level}
                                checked={surveyData.satisfaccion === level}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="py-3 px-2 rounded-lg transition-all duration-200 bg-gray-700/50 border-2 border-gray-700 text-gray-300 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-500 peer-checked:scale-105 peer-checked:shadow-lg peer-checked:shadow-indigo-500/20 hover:border-gray-600">
                                <span className="font-bold text-lg">{level}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Fields */}
            {[
                { id: 'motivacion', name: 'motivacion', label: '2. ¿Qué fue lo que más te motivó a inscribirte?', placeholder: 'Ej: aprender a usar mi cámara, un pasatiempo...' },
                { id: 'tema-favorito', name: 'temaFavorito', label: '3. De los temas que hemos visto, ¿cuál te ha resultado más interesante?', placeholder: 'Ej: la composición, el modo manual...' },
                { id: 'tema-sugerido', name: 'temaSugerido', label: '4. ¿Hay algún tema que te encantaría que tratáramos en clase?', placeholder: 'Ej: retratos, paisaje nocturno, edición...' }
            ].map(({ id, name, label, placeholder }) => (
                 <div className="form-group relative" key={id}>
                    <label htmlFor={id} className="block text-sm font-semibold text-gray-300 mb-2">
                        {label}
                    </label>
                    <input
                        type="text"
                        id={id}
                        name={name as keyof SurveyData}
                        value={surveyData[name as keyof SurveyData]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="form-input w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-indigo-500 transition-colors duration-200 placeholder:text-gray-500"
                        required
                    />
                </div>
            ))}

            {/* Improvement */}
            <div className="form-group">
                <label htmlFor="mejora" className="block text-sm font-semibold text-gray-300 mb-2">
                    5. Si pudieras cambiar una sola cosa para mejorar el taller, ¿cuál sería?
                </label>
                <textarea
                    id="mejora"
                    name="mejora"
                    rows={4}
                    value={surveyData.mejora}
                    onChange={handleChange}
                    placeholder="Tu sugerencia aquí..."
                    className="form-textarea w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-indigo-500 transition-colors duration-200 resize-none placeholder:text-gray-500"
                    required
                ></textarea>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center items-center gap-3 py-3.5 px-4 border border-transparent rounded-lg shadow-lg shadow-indigo-500/20 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-950 disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-5 h-5"/>
                            Analizando...
                        </>
                    ) : (
                        <>
                            Enviar y Analizar con IA
                            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SurveyForm;
