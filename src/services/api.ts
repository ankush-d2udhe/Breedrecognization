/**
 * API service for handling external API calls
 * Centralizes API logic and error handling
 */

import config from '@/config';
import { processError, AppError } from '@/lib/error-handler';

// OpenAI API types
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{
    type: string;
    [key: string]: any;
  }>;
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// API service class
class ApiService {
  // Base URL for OpenRouter API
  private openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  // Send a chat request to OpenAI
  async sendChatRequest(
    messages: OpenAIMessage[],
    options: { model?: string; temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    try {
      // Check if API key exists
      if (!config.openAiApiKey) {
        throw new Error('OpenAI API key is not configured');
      }
      
      const requestBody: OpenAIRequest = {
        model: options.model || 'openai/gpt-4o-mini',
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens
      };
      
      const response = await fetch(this.openRouterUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.openAiApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.siteUrl,
          'X-Title': config.siteName
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const error = await processError(response);
        throw error;
      }
      
      const data = await response.json() as OpenAIResponse;
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      // Process and rethrow the error
      const processedError = await processError(error);
      throw processedError;
    }
  }
  
  // Send an image analysis request to OpenAI
  async analyzeImage(
    prompt: string,
    imageBase64: string,
    imageType: string,
    options: { model?: string; temperature?: number; maxTokens?: number } = {}
  ): Promise<any> {
    try {
      // Check if API key exists
      if (!config.openAiApiKey) {
        throw new Error('OpenAI API key is not configured');
      }
      
      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: 'You are a world-class veterinary AI specialist with expertise in cattle and buffalo diseases. Provide accurate, detailed medical analysis based on visual symptoms.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${imageType};base64,${imageBase64}`
              }
            }
          ]
        }
      ];
      
      const requestBody: OpenAIRequest = {
        model: options.model || 'openai/gpt-4o-mini',
        messages,
        temperature: options.temperature ?? 0.1,
        max_tokens: options.maxTokens || 2000
      };
      
      const response = await fetch(this.openRouterUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.openAiApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.siteUrl,
          'X-Title': config.siteName
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const error = await processError(response);
        throw error;
      }
      
      const data = await response.json() as OpenAIResponse;
      const aiResponse = data.choices[0]?.message?.content?.trim();
      
      if (!aiResponse) {
        throw new Error('No response from AI service');
      }
      
      // Try to parse JSON response
      try {
        // Extract JSON from the response (in case it's wrapped in markdown)
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : aiResponse;
        return JSON.parse(jsonString);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        // Fallback: create structured response from plain text
        return {
          diseaseName: "Analysis Completed",
          confidence: 75,
          severity: "Unknown",
          symptoms: ["Analysis provided in description"],
          description: aiResponse,
          causes: ["See description for details"],
          remedies: ["Consult veterinarian for proper diagnosis"],
          prevention: ["Regular health checkups recommended"],
          urgency: "Consult veterinarian",
          additionalInfo: {
            prognosis: "Depends on proper veterinary care",
            contagious: "Unknown - veterinary assessment needed",
            humanRisk: "Use proper hygiene when handling animals"
          }
        };
      }
    } catch (error) {
      // Process and rethrow the error
      const processedError = await processError(error);
      throw processedError;
    }
  }
}

// Export a singleton instance
export default new ApiService();