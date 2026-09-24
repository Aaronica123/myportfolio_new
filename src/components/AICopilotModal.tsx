import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, User } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVeneva: () => void;
}

export const AICopilotModal: React.FC<AICopilotModalProps> = ({
  isOpen,
  onClose,
  onOpenVeneva,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am Aaron's AI Portfolio Assistant. Ask me anything about Aaron Mutua's technical proficiencies, his education at Masinde Muliro University, his KMFRI attache experience, or his hackathon-winning Julisha AI platform.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Tell me about Aaron\'s CV and education',
    'What is Aaron\'s core tech stack?',
    'What was Aaron\'s role at KMFRI?',
    'Explain the Julisha AI platform win',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    soundManager.playClick();

    const userMsg: Message = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/portfolio/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply || 'Systems nominal. Aaron is ready for junior developer & DevOps opportunities.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      soundManager.playAchievement();
    } catch {
      // Deterministic portfolio fallback
      let fallbackText = `Aaron Mutua is a Junior Developer and DevOps enthusiast pursuing a Bachelor of Science in Information Technology at Masinde Muliro University of Science and Technology (MMUST, Class of 2027).

He has hands-on experience as an IT Attache at the Kenya Marine Fisheries Research Institute (KMFRI), where he engineered the company ticketing system and proposed system flow optimizations. He is also the 1st place champion of the GDG Pwani Hackathon 2026 for building the Julisha Healthcare AI platform.

You can reach Aaron directly via email at k.aaronmutua@gmail.com or by phone at 0700069944!`;

      if (text.toLowerCase().includes('stack') || text.toLowerCase().includes('technologies')) {
        fallbackText = `Aaron's full tech stack includes 27 verified technologies:
- Languages: C, Python, JavaScript, HTML5, CSS3
- Frontend: React, React Router, Vite, Figma
- Backend: NodeJS, Express.js, Django, Flask
- Databases: PostgreSQL, Supabase, Redis, MongoDB, MySQL, Microsoft SQL Server
- DevOps & Queues: Docker, RabbitMQ, Nginx, GitHub Actions
- Testing & Tools: Git, GitHub, Jest, Postman`;
      } else if (text.toLowerCase().includes('kmfri')) {
        fallbackText = `At the Kenya Marine and Fisheries Research Institute (KMFRI, May - Aug 2026), Aaron served as an IT Attache where he analyzed enterprise undertakings, proposed solutions for workflow flaws, and collaborated with staff to build and deploy the company's internal ticketing and issue tracking system.`;
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-2xl h-[560px] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
              <Bot size={17} />
            </div>
            <div>
              <h3 className="font-['Chakra_Petch'] font-bold text-sm text-white flex items-center gap-2">
                Aaron's Portfolio Assistant
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Grounded in Aaron Mutua's verified CV and technical data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-950/50">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Sparkles size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    isUser
                      ? 'bg-sky-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-normal'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block text-right">
                    {msg.time}
                  </span>
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            );
          })}
          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 p-2">
              <RefreshCw size={14} className="animate-spin text-sky-400" />
              <span>Synthesizing response...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] shrink-0">Prompts:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-800"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Aaron's background, education, KMFRI attache, or skills..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-sky-500 font-mono transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
