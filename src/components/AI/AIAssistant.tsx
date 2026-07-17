import React, { useState, useRef, useEffect } from 'react';
import { useStadiumState } from '../../context/StadiumStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { askGemini, AIResponse } from '../../services/gemini';
import { ChatMessage } from '../../types/stadium';
import { faqs } from '../../utils/faqs';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Bot, 
  User, 
  Sparkles,
  Accessibility,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const { facilities, setSelectedFacility, setActiveRoute, addLog } = useStadiumState();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: "Hello! I am StadiumMind AI, your official FIFA World Cup 2026 digital concierge. How can I help you navigate MetLife Stadium today? You can ask me about entry gate queue wait times, wheelchair routes, nearest medical clinics, concession stands, or public transit timetables.", 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [showFAQMenu, setShowFAQMenu] = useState<boolean>(false);
  const [selectedFAQ, setSelectedFAQ] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response: AIResponse = await askGemini(text, language);
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Execute map routing actions
      if (response.action) {
        const target = facilities.find(f => f.id === response.action?.targetId);
        if (target) {
          setSelectedFacility(target);
          addLog(`AI triggered map focal center on ${target.name}.`, 'info');

          if (response.action.type === 'route') {
            const userLoc: [number, number] = [40.8120, -74.0768];
            const targetLoc = target.coordinates;
            
            let routeCoords: [number, number][] = [];
            const isWheelchair = response.action.routeType === 'wheelchair';
            
            if (isWheelchair) {
              const mid1: [number, number] = [userLoc[0] + 0.0003, userLoc[1]];
              const mid2: [number, number] = [mid1[0], targetLoc[1] - 0.0005];
              routeCoords = [userLoc, mid1, mid2, targetLoc];
            } else {
              routeCoords = [userLoc, [(userLoc[0] + targetLoc[0]) / 2, (userLoc[1] + targetLoc[1]) / 2], targetLoc];
            }

            setActiveRoute(routeCoords, {
              distance: isWheelchair ? '620 m' : '410 m',
              duration: isWheelchair ? '9 mins (ADA)' : '5 mins',
              type: isWheelchair ? 'Accessible Wheelchair Route' : 'Standard Direct Route'
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        if (isRecording) return;
        const queries = {
          en: "Where is the nearest medical center?",
          es: "¿Dónde está la puerta con menor fila?",
          fr: "Quel est le temps d'attente à la Porte A?",
          de: "Wo ist die nächste Toilette?",
          pt: "Onde fica o posto médico?"
        };
        setInputValue(queries[language as keyof typeof queries] || queries.en);
        setIsRecording(false);
      }, 2000);
    }
  };

  const speakText = (text: string) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const locales: Record<string, string> = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', pt: 'pt-BR' };
    utterance.lang = locales[language] || 'en-US';
    window.speechSynthesis.speak(utterance);
    addLog(`AI Audio guide initiated (${utterance.lang}).`, 'info');
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 h-full min-h-[500px]">
      {/* Chat Window Panel */}
      <div className="flex-1 bg-darkBg-card border border-darkBg-border rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
        {/* Chat Header */}
        <div className="bg-white/[0.02] border-b border-darkBg-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Bot size={20} className="animate-custom-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                {t('ai_title')}
                <span className="bg-primary/20 text-primary text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">Gemini 1.5</span>
              </h3>
              <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === 'user' 
                  ? 'bg-primary/10 border-primary/30 text-primary' 
                  : 'bg-white/5 border-white/10 text-white'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-black font-semibold rounded-tr-none'
                    : 'bg-white/5 border border-white/5 rounded-tl-none'
                }`}>
                  <p>{msg.content}</p>
                </div>
                
                {msg.role === 'assistant' && speechSupported && (
                  <button 
                    onClick={() => speakText(msg.content)} 
                    className="self-start text-[10px] text-gray-500 hover:text-primary flex items-center gap-1.5 mt-1 font-bold transition-colors"
                  >
                    <Volume2 size={12} /> Listen Audio Guide
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 50 FAQ Dropdown Slider Selector */}
        <div className="px-5 py-3 border-t border-darkBg-border bg-black/25 flex flex-col gap-2">
          <button 
            onClick={() => setShowFAQMenu(!showFAQMenu)}
            type="button"
            className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white font-bold transition-colors"
          >
            <span className="flex items-center gap-1.5"><HelpCircle size={14} className="text-primary" /> Suggested FAQs Guide (50 Topics)</span>
            <ChevronDown size={14} className={`transition-transform ${showFAQMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showFAQMenu && (
            <select
              value={selectedFAQ}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  handleSendMessage(val);
                  setSelectedFAQ('');
                  setShowFAQMenu(false);
                }
              }}
              className="w-full bg-darkBg border border-white/10 rounded-xl text-xs font-semibold px-3 py-2.5 text-gray-300 focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="">-- Choose from 50 FAQs --</option>
              {faqs.map((faq) => {
                const qText = faq.question[language] || faq.question.en;
                return (
                  <option key={faq.id} value={qText}>
                    [{faq.category.toUpperCase()}] {qText}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="p-4 bg-white/[0.01] border-t border-darkBg-border flex gap-2.5 items-center">
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-3 rounded-xl border transition-all ${
              isRecording 
                ? 'bg-red-500/20 text-red-500 border-red-500 animate-pulse' 
                : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
            }`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRecording ? t('ai_listening') : t('ai_placeholder')}
            disabled={isRecording}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-gray-500"
          />

          <button
            type="submit"
            className="p-3 bg-primary hover:bg-primary-hover text-black font-bold rounded-xl transition-all shadow-lg shadow-primary/10 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Quick Info Guide */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>

          <h4 className="font-extrabold text-sm mb-4 tracking-tight flex items-center gap-2 text-primary">
            <Sparkles size={16} /> {t('ai_info_title')}
          </h4>
          
          <ul className="space-y-3.5 text-xs text-gray-400 leading-normal">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>{t('ai_info_1')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>{t('ai_info_2')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>{t('ai_info_3')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>{t('ai_info_4')}</span>
            </li>
          </ul>
        </div>

        <div className="bg-darkBg-card border border-darkBg-border rounded-2xl p-5">
          <h4 className="font-extrabold text-sm mb-3 tracking-tight flex items-center gap-2">
            <Accessibility size={16} className="text-primary" /> {t('ai_access_title')}
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {t('ai_access_desc')}
          </p>
          <button 
            onClick={() => handleSendMessage("Map wheelchair accessible route to Gate A")} 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Accessibility size={14} /> {t('ada_route')}
          </button>
        </div>
      </div>
    </div>
  );
};
