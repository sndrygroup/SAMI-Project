"use client";

import React, { useEffect, useState, useRef } from 'react';

export default function SamiPage() {
  const [theme, setTheme] = useState('dark');
  const [messages, setMessages] = useState<{ text: string, type: 'sami' | 'user' }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);

  // 1. تحويل الـ Theme (الوضع الليلي والنهاري) بنفس منطق ملفك
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // 2. تأثير النجوم (Stars Canvas) من ملفك الأصلي
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let stars: any[] = [];
    const initStars = () => {
      cv.width = window.innerWidth;
      cv.height = document.documentElement.scrollHeight;
      const n = Math.floor(cv.width * cv.height / 7000);
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          r: Math.random() * 1.3 + .3,
          a: Math.random() * .55 + .2,
          sp: Math.random() * .0008 + .0003,
          ph: Math.random() * Math.PI * 2
        });
      }
    };

    const drawStars = () => {
      cx.clearRect(0, 0, cv.width, cv.height);
      const t = Date.now();
      stars.forEach(s => {
        const f = Math.sin(t * s.sp + s.ph) * .3 + .7;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(255,255,255,${s.a * f})`;
        cx.fill();
      });
      requestAnimationFrame(drawStars);
    };

    initStars();
    drawStars();
    window.addEventListener('resize', initStars);
    return () => window.removeEventListener('resize', initStars);
  }, []);

  // 3. منطق الشات (المحادثة)
  const replies = [
    "أهلاً وسهلاً! 👋 أنا سامي، مساعدك التسويقي الذكي. سجل حسابك الآن!",
    "يا هلا فيك! 🎯 أنا هنا لمساعدتك في إدارة حملاتك بكل سهولة.",
    "مرحباً! ✨ سامي معك، دعنا نبدأ رحلتك التسويقية المذهلة."
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{ text: "أهلاً! 👋 أنا سامي، مساعدك التسويقي بالذكاء الاصطناعي. اكتب أي شي وخلني أعرّفك على المنصة!", type: 'sami' }]);
      }, 1000);
    }, 600);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { text: inputValue, type: 'user' }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: replies[Math.floor(Math.random() * replies.length)], type: 'sami' }]);
    }, 1400);
  };

  return (
    <>
      <style jsx global>{`
        :root { --cyan: #06b6d4; --violet: #8b5cf6; --fuchsia: #d946ef; --radius: 14px; --transition: .45s cubic-bezier(.4,0,.2,1); }
        [data-theme="light"] { --bg:#fafafa; --text:#1a1a2e; --text-sec:rgba(26,26,46,.5); --surface:rgba(255,255,255,.8); --surface-border:rgba(0,0,0,.07); --card-bg:rgba(255,255,255,.85); --chat-sami-bg:rgba(139,92,246,.07); --chat-user-bg:rgba(0,0,0,.04); --badge-bg:rgba(139,92,246,.06); --badge-text:#7c3aed; --star-opacity:0; }
        [data-theme="dark"] { --bg:#050a18; --text:#e6edf3; --text-sec:rgba(230,237,243,.5); --surface:rgba(255,255,255,.04); --surface-border:rgba(255,255,255,.07); --card-bg:rgba(255,255,255,.04); --chat-sami-bg:rgba(139,92,246,.12); --chat-user-bg:rgba(255,255,255,.06); --badge-bg:rgba(139,92,246,.12); --badge-text:#a78bfa; --star-opacity:1; }
        body { font-family: 'Tajawal', sans-serif; background: var(--bg); color: var(--text); transition: background var(--transition); direction: rtl; }
        .grd-text { background: linear-gradient(to left, var(--cyan), var(--violet), var(--fuchsia)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .robot-glow { background: radial-gradient(circle, rgba(139,92,246,.2) 0%, rgba(6,182,212,.1) 50%, transparent 70%); animation: pulse 3s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: .5 } }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden">
        <canvas ref={cvRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 'var(--star-opacity)' }} />
        
        {/* Toggle Theme */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-5 right-5 z-[100] w-11 h-11 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] backdrop-blur-md flex items-center justify-center"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Navigation */}
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[860px]">
          <div className="flex items-center justify-between p-3 px-5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center font-black text-white">S</div>
              <span className="font-bold text-xl">SAMI</span>
            </div>
            <button className="px-5 py-2 rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] text-white font-bold text-sm">ابدأ الآن</button>
          </div>
        </nav>

        {/* Hero Section مع الروبوت الأصلي */}
        <section className="relative z-10 pt-32 pb-20 px-5 text-center max-w-[860px] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-text)] text-xs font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-ping" />
            منصة التسويق الذكي بالذكاء الاصطناعي
          </div>

          {/* Robot SVG من ملفك بالضبط */}
          <div className="relative w-64 h-72 mx-auto mb-2">
            <div className="robot-glow absolute inset-0 rounded-full" />
            <svg className="relative z-10 w-full h-full" viewBox="0 0 320 360">
              {/* هنا نضع الـ SVG الخاص بالروبوت من ملفك كما هو */}
              <rect x="90" y="60" width="140" height="110" rx="28" fill="#1e293b" stroke="url(#borderG)" strokeWidth="2"/>
              <circle cx="130" cy="110" r="12" fill="#06b6d4" />
              <circle cx="190" cy="110" r="12" fill="#a78bfa" />
              <path d="M140 140 Q160 155 180 140" stroke="#06b6d4" strokeWidth="3" fill="none" />
              <rect x="75" y="190" width="170" height="120" rx="24" fill="#0f172a" stroke="url(#borderG)" strokeWidth="2"/>
              <defs>
                <linearGradient id="borderG"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#ec4899"/></linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="grd-text">مستقبلك التسويقي</span><br />
            <span>مع سامي</span>
          </h1>
          <p className="text-[var(--text-sec)] max-w-lg mx-auto mb-12 leading-relaxed">
            سامي يساعدك تدير حملاتك الإعلانية، تحلل بياناتك، وتتواصل مع عملائك — كل شي بالذكاء الاصطناعي.
          </p>

          {/* Chat Box الأصلي */}
          <div className="max-w-[620px] mx-auto rounded-[var(--radius)] border border-[var(--surface-border)] bg-[var(--card-bg)] backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="p-3 px-5 border-b border-[var(--surface-border)] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] text-white flex items-center justify-center font-bold">س</div>
              <div className="text-right">
                <div className="text-sm font-bold">سامي</div>
                <div className="text-[10px] text-green-500">متصل الآن</div>
              </div>
            </div>
            <div className="h-56 overflow-y-auto p-4 space-y-3 flex flex-col" ref={msgsRef}>
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${m.type === 'sami' ? 'self-start bg-[var(--chat-sami-bg)] border border-[var(--chat-sami-border)] text-right' : 'self-end bg-[var(--chat-user-bg)] border border-[var(--chat-user-border)] text-left'}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-500 animate-pulse text-right">سامي يكتب...</div>}
            </div>
            <div className="p-3 border-t border-[var(--surface-border)] flex gap-2">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl p-2 px-4 text-xs outline-none"
                placeholder="اكتب رسالتك هنا..."
              />
              <button onClick={handleSend} className="px-6 py-2 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white rounded-xl text-xs font-bold">إرسال</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[var(--surface-border)] p-6 text-center text-[var(--text-muted)] text-[10px]">
          © 2026 SAMI — منصة التسويق الذكي. جميع الحقوق محفوظة.
        </footer>
      </div>
    </>
  );
}
