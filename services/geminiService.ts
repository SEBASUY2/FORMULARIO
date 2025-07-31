
import { GoogleGenAI } from "@google/genai";
import { SurveyData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(data: SurveyData): string {
    return `
Eres un asistente experto para un instructor de talleres de fotografía. Has recibido la siguiente respuesta de una encuesta anónima. Tu tarea es analizar los comentarios y proporcionar un resumen claro y útil para el instructor.

No te limites a repetir las respuestas. Ofrece una interpretación y sugerencias concretas.

Estructura tu respuesta en el siguiente formato, usando Markdown (solo usa ** para títulos y * para viñetas):

**Resumen del Feedback**
*   **Sentimiento General:** (Describe el nivel de satisfacción y el tono general del participante).
*   **Motivaciones Clave:** (Analiza la razón por la que se inscribió).
*   **Puntos Fuertes del Taller:** (Basado en el tema favorito, destaca qué está funcionando bien).
*   **Oportunidades de Crecimiento:** (Basado en los temas sugeridos, propón nuevas áreas para explorar).
*   **Sugerencia de Mejora Principal:** (Analiza la sugerencia de mejora y conviértela en un punto de acción claro para el instructor).

Aquí están los datos de la encuesta:
- Satisfacción (1-5): ${data.satisfaccion}
- Motivación para inscribirse: "${data.motivacion}"
- Tema más interesante: "${data.temaFavorito}"
- Tema sugerido para el futuro: "${data.temaSugerido}"
- Sugerencia de mejora: "${data.mejora}"

Proporciona un análisis conciso y accionable en español.
    `;
}


export async function analyzeSurveyData(data: SurveyData): Promise<string> {
    const prompt = buildPrompt(data);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("No se pudo obtener una respuesta del servicio de IA.");
    }
}
