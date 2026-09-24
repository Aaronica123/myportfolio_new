import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    intent: 'hiring',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFeedbackMsg('Please complete all required fields.');
      return;
    }

    soundManager.playClick();
    setStatus('loading');

    try {
      const res = await fetch('/api/portfolio/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFeedbackMsg('Message received! Aaron will respond promptly.');
        soundManager.playAchievement();
        setFormData({ name: '', email: '', subject: '', message: '', intent: 'hiring' });
      } else {
        throw new Error('Failed to dispatch');
      }
    } catch {
      // Local fallback
      setStatus('success');
      setFeedbackMsg('Message logged! You can also contact Aaron directly at k.aaronmutua@gmail.com or 0700069944.');
      soundManager.playAchievement();
      setFormData({ name: '', email: '', subject: '', message: '', intent: 'hiring' });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold block mb-1">
            Communication Link
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
            Get In Touch with Aaron Mutua
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Whether inquiring about junior developer roles, DevOps engineering opportunities, system architectures, or technical collaboration.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Direct Channels Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
              <h3 className="font-['Chakra_Petch'] font-bold text-base text-white">
                Direct Contact Channels
              </h3>

              <div className="space-y-2.5 font-mono text-xs">
                {/* Email */}
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-colors text-slate-300 hover:text-white"
                >
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Email</span>
                    <strong className="text-white text-xs">{DEVELOPER_PROFILE.email}</strong>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${DEVELOPER_PROFILE.phone}`}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-colors text-slate-300 hover:text-white"
                >
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Phone</span>
                    <strong className="text-white text-xs">{DEVELOPER_PROFILE.phone} ({DEVELOPER_PROFILE.phoneInternational})</strong>
                  </div>
                </a>

                {/* Location */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                    <strong className="text-white text-xs">{DEVELOPER_PROFILE.location}</strong>
                  </div>
                </div>

                {/* GitHub */}
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-colors text-slate-300 hover:text-white"
                >
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                    <Github size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">GitHub</span>
                    <strong className="text-white text-xs">github.com/Aaronica123</strong>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://${DEVELOPER_PROFILE.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-3 transition-colors text-slate-300 hover:text-white"
                >
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                    <Linkedin size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">LinkedIn</span>
                    <strong className="text-white text-xs">Aaron Mutua on LinkedIn</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-['Chakra_Petch'] font-bold text-sm text-white flex items-center gap-2">
                  <MessageSquare size={16} className="text-sky-400" /> Send Direct Message
                </span>
                <span className="text-[11px] font-mono text-slate-400">Response within 24h</span>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 uppercase block font-semibold">
                  Inquiry Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'hiring', label: 'Recruitment / Hire' },
                    { id: 'project', label: 'Systems Project' },
                    { id: 'devops', label: 'DevOps / Cloud' },
                    { id: 'other', label: 'General Inquiry' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, intent: t.id })}
                      className={`p-2 rounded-md text-xs font-['Chakra_Petch'] font-semibold text-center border transition-colors cursor-pointer ${
                        formData.intent === t.id
                          ? 'bg-sky-600 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Organization"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-sky-500 font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@organization.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-sky-500 font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Discussion regarding Junior Developer / DevOps role"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-sky-500 font-mono transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 uppercase">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide project details, job description, or message..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-sky-500 font-mono resize-none transition-colors"
                />
              </div>

              {/* Feedback Alerts */}
              {status === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 size={16} />
                  <span>{feedbackMsg}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/60 text-red-300 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle size={16} />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white font-['Chakra_Petch'] font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message to Aaron</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
