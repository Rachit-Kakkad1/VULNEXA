
import { GoogleGenAI, Type } from "@google/genai";
import { Vulnerability, Severity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCodeSecurity = async (code: string, fileName: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following code for security vulnerabilities. Model the thinking of an ethical hacker and a secure developer.
    
    File Name: ${fileName}
    Code:
    ${code}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallRiskScore: { type: Type.NUMBER },
          maturityScore: { type: Type.NUMBER },
          vulnerabilities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                severity: { type: Type.STRING, description: "CRITICAL, HIGH, MEDIUM, or LOW" },
                category: { type: Type.STRING },
                description: { type: Type.STRING },
                attackerLogic: { type: Type.STRING },
                defenderLogic: { type: Type.STRING },
                simulatedPayload: { type: Type.STRING },
                impact: { type: Type.STRING },
                riskScore: { type: Type.NUMBER },
                confidence: { type: Type.NUMBER },
                secureCodeFix: { type: Type.STRING },
                vulnerableCodeSnippet: { type: Type.STRING },
                killChainStage: { type: Type.STRING }
              },
              required: ["title", "severity", "description", "secureCodeFix"]
            }
          }
        },
        required: ["overallRiskScore", "vulnerabilities"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid AI response format");
  }
};
