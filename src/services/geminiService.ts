
import { SurveyData } from '../types';

/**
 * Envía los datos de la encuesta a nuestro backend seguro en Firebase Functions
 * para que sea analizado por la API de Gemini.
 * @param data - Los datos de la encuesta recolectados del formulario.
 * @returns Una promesa que resuelve a un objeto con el análisis de la IA.
 */
export async function analyzeSurveyData(data: SurveyData): Promise<{ analysis: string }> {
    try {
        // Llama a la Cloud Function a través de la reescritura de URL de Firebase Hosting.
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor: ${response.status} - ${errorText || 'Sin respuesta'}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error al contactar el servicio de análisis:", error);
        if (error instanceof Error) {
            // Propaga un mensaje de error más amigable para el usuario.
            throw new Error(`No se pudo conectar con el servicio de IA. Revisa tu conexión o inténtalo más tarde.`);
        }
        throw new Error("Ocurrió un error de red desconocido.");
    }
}
