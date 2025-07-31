"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const genai_1 = require("@google/genai");
const admin = __importStar(require("firebase-admin"));
// Inicialización explícita para evitar problemas de resolución de proyecto en la nube.
// Esta es la solución definitiva para el error "5 NOT_FOUND".
admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT,
});
const defineGeminiApiKey = { secrets: ["GEMINI_API_KEY"] };
function buildPrompt(data) {
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
exports.api = (0, https_1.onRequest)(Object.assign(Object.assign({}, defineGeminiApiKey), { region: 'southamerica-east1', cors: true }), async (request, response) => {
    if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
    }
    try {
        const surveyData = request.body;
        logger.info("Iniciando procesamiento de la encuesta.", { body: surveyData });
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            logger.error("Error Crítico: GEMINI_API_KEY no está configurada en el entorno.");
            throw new Error("La configuración del servidor es incompleta.");
        }
        const ai = new genai_1.GoogleGenAI({ apiKey: geminiApiKey });
        const prompt = buildPrompt(surveyData);
        logger.info("Llamando a la API de Gemini...");
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const analysisText = result.text;
        logger.info("Llamada a la API de Gemini exitosa.");
        const dataToSave = Object.assign(Object.assign({}, surveyData), { analysis: analysisText, timestamp: admin.firestore.FieldValue.serverTimestamp() });
        logger.info("Intentando guardar en Firestore...");
        const db = admin.firestore();
        await db.collection("encuestas").add(dataToSave);
        logger.info("Encuesta guardada en Firestore con éxito.");
        response.status(200).json({ analysis: analysisText });
    }
    catch (error) {
        logger.error("Error detallado al procesar la solicitud:", error);
        if (error instanceof Error) {
            response.status(500).json({ error: "Error interno del servidor.", message: error.message });
        }
        else {
            response.status(500).json({ error: "Error interno del servidor desconocido." });
        }
    }
});
//# sourceMappingURL=index.js.map