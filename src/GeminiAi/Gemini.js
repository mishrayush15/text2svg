import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function gemini(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(
        `Based on the following user request, generate the SVG code for the requested icon. Ensure the response contains only the SVG code (in XML format) and no additional text or instructions. The code should be detailed and correctly structured, including necessary SVG attributes such as width, height, viewBox, fill, stroke, and any other attributes required for the requested icon.

If the user provides specific details about the design (such as colors, shapes, dimensions, and other visual elements), ensure that the SVG code strictly reflects those details. The design should be simple and clear, with no unnecessary complexity.

If the user's request is unrelated to SVG creation, do not provide any SVG code. Instead, inform the user that only SVG creation requests are supported.

Here’s the user’s request for the SVG:

User input -> ${prompt}

If the request is not about generating an SVG, reply with: "This is not an SVG generation request. Please provide a valid SVG request to generate the code." Otherwise, provide the detailed SVG code that matches the description exactly, ensuring that the code is correctly formatted for use in web applications.

If the user asks for an SVG, respond with: "Share prompt to generate svg." and then provide the SVG code in XML format.`
    );
    const response = result.response.text();
    return response;
}
