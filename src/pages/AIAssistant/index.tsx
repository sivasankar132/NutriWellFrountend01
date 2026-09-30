import React, { useState } from 'react';
import { aiAssistantService, ChatMessage } from '../../services/aiAssistantService';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Bot, Send, Sparkles, User, Plus } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello Siva! I am NutriWell Emerald AI. I analyze your macro split, food budget in ₹ INR, and glycemic health in real-time. How can I assist you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const prompts = aiAssistantService.getSuggestedPrompts();

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const aiReply = await aiAssistantService.generateAIResponse(query);
      setMessages(prev => [...prev, aiReply]);
    } catch (err: any) {
      const errorMsg = err?.message || 'Assistant request failed. Please try again.';
      showToast(errorMsg, 'error');
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `[Error]: ${errorMsg}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Badge variant="mint" icon={<Bot className="w-3.5 h-3.5" />}>NutriWell AI Neural Intelligence</Badge>
        <h1 className="text-2xl font-bold text-white mt-1">Conversational Health Assistant</h1>
        <p className="text-xs text-slate-400">Ask any dietary, macro, glycemic, or meal budget question in natural language.</p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-900/50 text-xs font-semibold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-950/60 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <Card glow className="h-[450px] flex flex-col justify-between p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40 emerald-glow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-emerald-900/50 text-slate-200 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>

                {/* Interactive Recommended Meal inside Chat */}
                {msg.recommendedMeal && (
                  <div className="mt-3 pt-3 border-t border-emerald-900/50 flex items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={msg.recommendedMeal.image} alt={msg.recommendedMeal.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-white text-xs">{msg.recommendedMeal.name}</p>
                        <p className="text-[10px] text-emerald-300">{msg.recommendedMeal.protein}g protein • ₹{msg.recommendedMeal.costInr}</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Plus className="w-3 h-3" />}
                      onClick={() => {
                        addMeal({
                          foodName: msg.recommendedMeal!.name,
                          mealType: 'Dinner',
                          calories: msg.recommendedMeal!.calories,
                          protein: msg.recommendedMeal!.protein,
                          carbs: msg.recommendedMeal!.carbs,
                          fat: msg.recommendedMeal!.fat,
                          fiber: msg.recommendedMeal!.fiber,
                          costInr: msg.recommendedMeal!.costInr,
                        });
                      }}
                    >
                      Log
                    </Button>
                  </div>
                )}
                <span className="text-[9px] text-slate-400 block mt-1.5 text-right">{msg.timestamp}</span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 border border-slate-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-emerald-900/40 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder={loading ? "AI Assistant is thinking..." : "Type your nutrition prompt..."}
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
          />
          <Button variant="primary" size="md" icon={<Send className="w-4 h-4" />} onClick={() => handleSend()} disabled={loading}>
            {loading ? 'THINKING...' : 'SEND'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
