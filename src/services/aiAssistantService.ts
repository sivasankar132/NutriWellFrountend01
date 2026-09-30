import { FoodItem } from '../types';
import { aiApi } from './api/aiApi';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedMeal?: FoodItem;
}

class AIAssistantService {
  public getSuggestedPrompts(): string[] {
    return [
      "Analyze my nutrition today",
      "What should I eat for dinner?",
      "How can I increase protein?",
      "Build a meal under ₹150",
      "Why is my nutrition score low?"
    ];
  }

  /**
   * Sends prompt to /ai/chat.
   * Throws explicit error if Gemini or request fails. No fake/fallback response generation.
   */
  public async generateAIResponse(prompt: string): Promise<ChatMessage> {
    try {
      const chatResult = await aiApi.chat(prompt);
      return {
        id: chatResult.id || `ai-${Date.now()}`,
        sender: 'ai',
        text: chatResult.text,
        timestamp: chatResult.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedMeal: chatResult.recommendedMeal
      };
    } catch (err: any) {
      console.error('AI Assistant backend error:', err);
      const errorMsg = err?.message || 'AI generation failed. Please try again.';
      throw new Error(errorMsg);
    }
  }
}

export const aiAssistantService = new AIAssistantService();
