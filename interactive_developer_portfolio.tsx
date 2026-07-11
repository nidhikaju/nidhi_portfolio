import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. CANVAS BACKGROUND COMPONENT
// ==========================================
const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10;
        this.color = `hsla(${200 + Math.random() * 40}, 80%, 70%, ${Math.random() * 0.4 + 0.1})`;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Simple attraction/repulsion from mouse
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * this.density * 0.5;
            this.y -= forceDirectionY * force * this.density * 0.5;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 9000, 150);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Draw light connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.15 - (distance/110) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-slate-950" />;
};


// ==========================================
// 2. HELPER: MINI CUSTOM GLOWING SVGs
// ==========================================
const TerminalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
);
const FolderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
);
const GraduationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
);
const EnvelopeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
);


// ==========================================
// 3. MAIN APP PORTFOLIO COMPONENT
// ==========================================
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'System Initialized. Welcome to Portfolio OS.', type: 'system' },
    { text: 'Type "help" to view list of available core commands.', type: 'info' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  
  // Custom states for interactive skill map
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Typewriter effect
  useEffect(() => {
    const fullText = "Full Stack Engineer & Creative UI Designer";
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // Dynamically load AnimeJS from cdn
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
    script.async = true;
    script.onload = () => {
      // Trigger subtle entering staggered animations on load
      if (window.anime) {
        window.anime({
          targets: '.anime-nav-item',
          opacity: [0, 1],
          translateY: [-20, 0],
          delay: window.anime.stagger(100),
          easing: 'easeOutExpo',
          duration: 1200
        });

        window.anime({
          targets: '.anime-hero-fade',
          opacity: [0, 1],
          scale: [0.95, 1],
          delay: window.anime.stagger(150),
          easing: 'easeOutElastic(1, .8)',
          duration: 1500
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Smooth scroll and update section state
  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section detector on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Terminal Handler
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response = [];
    switch (command) {
      case 'help':
        response = [
          { text: '> available commands:', type: 'success' },
          { text: '  about      - Display brief introduction background', type: 'info' },
          { text: '  skills     - List current operational technology stacks', type: 'info' },
          { text: '  projects   - Show notable project configurations', type: 'info' },
          { text: '  clear      - Wipe terminal history logs', type: 'info' },
          { text: '  easteregg  - Activate secret visual pulse overload', type: 'success' }
        ];
        break;
      case 'about':
        response = [
          { text: 'User Profile: Dev Architect', type: 'success' },
          { text: 'Mission: Design premium visual platforms and scalable backend microservices.', type: 'info' },
          { text: 'Hobbies: High-refresh keyboards, Cyberpunk aesthetics, Generative code.', type: 'info' }
        ];
        break;
      case 'skills':
        response = [
          { text: 'System Core Stacks Ready:', type: 'success' },
          { text: '  - Core languages: JavaScript, Python, TypeScript, Go', type: 'info' },
          { text: '  - Web Interface: React, Next.js, TailwindCSS, HTML5/CSS3 Canvas', type: 'info' },
          { text: '  - Architecture & DBs: Node.js, Express, PostgreSQL, Redis, MongoDB', type: 'info' }
        ];
        break;
      case 'projects':
        response = [
          { text: 'Loaded Project Matrices:', type: 'success' },
          { text: '  1. Zenith Cloud Engine - High speed distributed telemetry dashboard', type: 'info' },
          { text: '  2. NeuroForge AI - Transformer-based prompt refinement canvas', type: 'info' },
          { text: '  3. Chronos VR Hub - Dynamic visual WebXR virtual landscape portal', type: 'info' }
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'easteregg':
        response = [
          { text: 'OVERLOAD SEQUENCE INITIATED... Grid Pulsing active.', type: 'error' },
          { text: 'Look closely at your background fields!', type: 'success' }
        ];
        // Trigger animejs explosion if available
        if (window.anime) {
          window.anime({
            targets: '.interactive-card-neon',
            scale: [1, 1.05, 1],
            rotateZ: [0, 2, -2, 0],
            duration: 800,
            easing: 'easeInOutSine'
          });
        }
        break;
      default:
        response = [
          { text: `Command not found: "${command}". Type "help" for instructions.`, type: 'error' }
        ];
    }

    setTerminalHistory(prev => [
      ...prev,
      { text: `$ ${terminalInput}`, type: 'input' },
      ...response
    ]);
    setTerminalInput('');
  };

  // Skill interactive data structures
  const skillsData = [
    { name: "Frontend Architecture", score: 95, color: "from-cyan-500 to-blue-600", desc: "React, Next.js, WebGL & CSS animation matrix." },
    { name: "Backend Engines", score: 90, color: "from-purple-500 to-indigo-600", desc: "Fastify, Node.js, Distributed microservice patterns." },
    { name: "Database Engineering", score: 85, color: "from-teal-400 to-emerald-600", desc: "PostgreSQL schema, Redis layers, NoSQL clusters." },
    { name: "Cloud & Devops", score: 80, color: "from-pink-500 to-rose-600", desc: "Docker virtual containers, Github actions CI/CD flow." },
    { name: "Creative Web Design", score: 92, color: "from-yellow-400 to-orange-500", desc: "Figma wireframing, high-fidelity responsive interfaces." }
  ];

  // Projects structured matrix with customized colors
  const projectsData = [
    {
      id: 1,
      title: "Zenith Cloud Dashboard",
      shortDesc: "Comprehensive cloud telemetry panel utilizing high refresh canvas animations.",
      longDesc: "A server monitoring microservice processing over 50k real-time events per second. Leveraged React clusters, Tailwind charts, and standard WebSockets.",
      tech: ["React.js", "Tailwind CSS", "WebSockets", "NodeJS"],
      metrics: "50k/s throughput",
      shadowColor: "shadow-cyan-500/20 hover:shadow-cyan-400/40 border-cyan-800/40 hover:border-cyan-400/80",
      accent: "text-cyan-400"
    },
    {
      id: 2,
      title: "NeuroForge Neural Canvas",
      shortDesc: "Refined prompt compiler and generative engine built for local node networks.",
      longDesc: "Integrated local model weights using web pipelines. Implemented responsive playground and instant export features with complex CSS keyframes.",
      tech: ["TypeScript", "Next.js", "HuggingFace API", "Postgres"],
      metrics: "99.8% Client uptime",
      shadowColor: "shadow-violet-500/20 hover:shadow-violet-400/40 border-violet-800/40 hover:border-violet-400/80",
      accent: "text-violet-400"
    },
    {
      id: 3,
      title: "Chronos XR Portal",
      shortDesc: "Advanced spatial immersive design interface running natively inside 2D responsive grids.",
      longDesc: "Utilized customized ThreeJS elements mapped onto interactive panels, complete with particle grids, camera panning vectors, and audio responsive elements.",
      tech: ["Three.js", "React Engine", "Tailwind", "Vite"],
      metrics: "60 FPS Render performance",
      shadowColor: "shadow-pink-500/20 hover:shadow-pink-400/40 border-pink-800/40 hover:border-pink-400/80",
      accent: "text-pink-400"
    }
  ];

  // 3D Card Tilt Hook Helper (Pure Interactive Transform logic)
  const handleCardMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Smooth responsive transformation ratios
    const tiltX = (y / (box.height / 2)) * -12; 
    const tiltY = (x / (box.width / 2)) * 12;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    const glow = card.querySelector('.neon-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${e.clientX - box.left}px ${e.clientY - box.top}px, rgba(103, 232, 249, 0.15) 0%, transparent 60%)`;
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glow = card.querySelector('.neon-card-glow');
    if (glow) {
      glow.style.background = 'transparent';
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Dynamic Fluid Particles Canvas background */}
      <CanvasBackground />

      {/* ==========================================
          HEADER / GLASS NAVBAR
          ========================================== */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleScrollTo('home')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform">
                <span className="text-slate-950 font-bold text-lg">&lt;/&gt;</span>
              </div>
              <span className="font-mono font-bold text-base sm:text-lg tracking-widest bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent group-hover:opacity-80">
                DEV_PORTAL
              </span>
            </div>

            {/* Nav Menu Desktop */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Matrix' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Path' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`anime-nav-item px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </button>
              ))}
            </div>

            {/* Quick Contact Trigger */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleScrollTo('contact')}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                Hire Agent
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar Bar (Bottom Bar Floating style for better ergonomics) */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-slate-950/80 backdrop-blur-lg border border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex justify-around py-3">
          {[
            { id: 'home', icon: '⚡' },
            { id: 'about', icon: '👤' },
            { id: 'skills', icon: '📊' },
            { id: 'projects', icon: '💻' },
            { id: 'education', icon: '🎓' },
            { id: 'contact', icon: '✉️' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-lg p-2 rounded-xl transition-all ${
                activeSection === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="anime-hero-fade inline-flex items-center space-x-2 self-center lg:self-start bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>DEPLOYMENT SYSTEM READY (v4.6.1)</span>
            </div>

            <div className="anime-hero-fade space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-slate-100">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-500 bg-clip-text text-transparent">Alex Mercer</span>
              </h1>
              <p className="text-lg sm:text-2xl font-mono text-cyan-400 h-8 sm:h-10">
                {typedTitle}
                <span className="animate-pulse">_</span>
              </p>
            </div>

            <p className="anime-hero-fade text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Synthesizing scalable software architecture, pixel-perfect user engagement models, and modular reactive systems. Welcome to my operational nerve center.
            </p>

            <div className="anime-hero-fade flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Access Projects Matrix
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-200 font-bold text-sm tracking-wide transition-all"
              >
                Establish Connection
              </button>
            </div>
          </div>

          {/* Glowing Interactive 3D Card (Tilt effect enabled) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div 
              onMouseMove={(e) => handleCardMouseMove(e, 'hero-card')}
              onMouseLeave={handleCardMouseLeave}
              className="interactive-card-neon relative w-full max-w-[380px] aspect-[4/5] rounded-3xl backdrop-blur-md bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Radial gradient glowing layer inside card */}
              <div className="neon-card-glow absolute inset-0 pointer-events-none transition-opacity duration-300" />
              
              {/* Tech pattern grid overlays */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-tr-full pointer-events-none" />

              {/* Card top banner */}
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-slate-500 tracking-widest">ID_CARD_SYSTEM</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              {/* Core Avatar Simulation block */}
              <div className="flex flex-col items-center space-y-4 my-auto py-4">
                <div className="relative">
                  {/* Neon ring orbits */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 blur opacity-40 animate-spin" style={{ animationDuration: '8s' }}></div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {/* SVG Graphic Avatar representing network code */}
                    <svg className="w-16 h-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.571V11a.75.75 0 011.5 0v.571c0 .574.124 1.12.348 1.611m1.34 1.124A13.916 13.916 0 0115 11.571V11a.75.75 0 011.5 0v.571c0 .574.124 1.12.348 1.611M5.25 10.5a6.75 6.75 0 0113.5 0v.75c0 1-.252 1.94-.7 2.75m-12.1 0A6.75 6.75 0 015.25 11.25V10.5z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-lg text-slate-100 font-mono">Alex Mercer</h3>
                  <p className="text-xs text-cyan-400 tracking-widest uppercase">Senior Core Architect</p>
                </div>
              </div>

              {/* Card specs detail */}
              <div className="space-y-2 border-t border-slate-800/80 pt-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">IP ADDRESS:</span>
                  <span className="text-slate-300">127.0.0.1</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">PRIMARY NODE:</span>
                  <span className="text-slate-300 text-cyan-300">ReactJS / Go</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          ABOUT ME (Terminal Emulator Layout)
          ========================================== */}
      <section id="about" className="py-24 relative px-4 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              [ <span className="text-cyan-400">01</span> // BACKSTORY ]
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 rounded"></div>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Uncover biographical specifications or interface directly with the secure custom terminal engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bio info text card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-slate-900/40 border border-slate-800 shadow-xl space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 flex items-center space-x-2">
                  <UserIcon />
                  <span>BIOGRAPHY_MATRIX</span>
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  I specialize in structuring clean, high-performance modular applications. With over half a decade refining interfaces, I strive to make web experiences highly immersive, fast, and accessible across the entire digital network.
                </p>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Every asset, responsive utility, and network layer is designed with strict optimization parameters to minimize render cycles and deliver silky-smooth user flow.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900">
                    <span className="block text-2xl font-bold text-cyan-400 font-mono">20+</span>
                    <span className="text-xs text-slate-500 tracking-wider">PROJECT MODULES</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900">
                    <span className="block text-2xl font-bold text-violet-400 font-mono">5+</span>
                    <span className="text-xs text-slate-500 tracking-wider">YEARS EXPERIENCING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Emulator */}
            <div className="lg:col-span-7">
              <div className="w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
                
                {/* Terminal Header Bar */}
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono select-none flex items-center gap-1.5">
                    <TerminalIcon />
                    alex_mercer@system_terminal
                  </span>
                  <div className="w-4"></div>
                </div>

                {/* Terminal Log Console */}
                <div className="p-4 sm:p-6 h-[280px] overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5">
                  {terminalHistory.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`leading-relaxed whitespace-pre-wrap ${
                        log.type === 'input' ? 'text-slate-100 font-bold' :
                        log.type === 'success' ? 'text-cyan-400' :
                        log.type === 'error' ? 'text-rose-400 animate-pulse' :
                        log.type === 'info' ? 'text-slate-400' : 'text-cyan-300'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>

                {/* Terminal Input Bar */}
                <form 
                  onSubmit={handleTerminalSubmit}
                  className="bg-slate-900/60 border-t border-slate-800 px-4 py-3 flex items-center"
                >
                  <span className="text-cyan-400 font-mono mr-2 text-sm sm:text-base">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Enter interactive command..."
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-slate-100 font-mono text-sm sm:text-base"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="ml-2 text-xs font-mono bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 rounded px-2 py-1 hover:bg-cyan-400 hover:text-slate-950 transition-all"
                  >
                    RUN
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          SKILLS MATRIX & INTERACTIVE GRAPH STATS
          ========================================== */}
      <section id="skills" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              [ <span className="text-cyan-400">02</span> // CAPABILITY_MATRIX ]
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 rounded"></div>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Hover dynamically over individual vectors to check current metrics, latency paths, and core components.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Skills interactive list */}
            <div className="lg:col-span-6 space-y-4">
              {skillsData.map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-4 rounded-2xl bg-slate-900/40 border transition-all duration-300 transform cursor-pointer ${
                    hoveredSkill?.name === skill.name 
                      ? 'border-cyan-400 bg-slate-900/80 -translate-x-1 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono font-bold text-sm sm:text-base text-slate-200">{skill.name}</span>
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-800">{skill.score}% POWER</span>
                  </div>
                  
                  {/* Glowing progress tracks */}
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  
                  {/* Dynamic description toggling logic */}
                  <p className={`text-xs text-slate-400 mt-2 overflow-hidden transition-all duration-300 ${
                    hoveredSkill?.name === skill.name ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Custom Interactive SVG Skill Web Map / Radar Simulation */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-slate-900/30 border border-slate-800 shadow-xl max-w-[420px] w-full flex flex-col items-center">
                <span className="text-xs font-mono text-slate-500 tracking-wider mb-4">ENGINEERING_VECTORS</span>
                
                {/* SVG Radial Map */}
                <svg className="w-full aspect-square max-w-[300px]" viewBox="0 0 100 100">
                  {/* Grid Rings */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  
                  {/* Axis Crosslines */}
                  <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  
                  {/* Dynamic Polygon showing standard parameters */}
                  {/* Point order: Top, Right-Top, Right-Bottom, Left-Bottom, Left-Top */}
                  <polygon 
                    points="50,15 85,38 72,78 28,78 15,38" 
                    fill="none" 
                    stroke="rgba(34,211,238,0.2)" 
                    strokeWidth="1"
                  />

                  {/* Active overlay network line that pulses with color based on hovering state */}
                  <polygon 
                    points={`
                      50,${15 + (100 - (hoveredSkill?.name === 'Frontend Architecture' ? 100 : 85)) * 0.3} 
                      ${85 - (100 - (hoveredSkill?.name === 'Backend Engines' ? 100 : 90)) * 0.35},${38 + (100 - (hoveredSkill?.name === 'Database Engineering' ? 100 : 80)) * 0.15} 
                      ${72 - (100 - (hoveredSkill?.name === 'Cloud & Devops' ? 100 : 75)) * 0.22},${78 - (100 - (hoveredSkill?.name === 'Creative Web Design' ? 100 : 92)) * 0.28} 
                      ${28 + (100 - (hoveredSkill?.name === 'Database Engineering' ? 100 : 85)) * 0.22},${78 - (100 - (hoveredSkill?.name === 'Creative Web Design' ? 100 : 92)) * 0.28} 
                      ${15 + (100 - (hoveredSkill?.name === 'Frontend Architecture' ? 100 : 95)) * 0.35},${38 + (100 - (hoveredSkill?.name === 'Cloud & Devops' ? 100 : 80)) * 0.15}
                    `} 
                    fill="rgba(34,211,238,0.15)" 
                    stroke={hoveredSkill ? '#f472b6' : '#22d3ee'} 
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />

                  {/* Radar Interactive Nodes */}
                  <circle cx="50" cy="15" r="2" fill="#22d3ee" className="animate-ping" />
                  <circle cx="85" cy="38" r="2" fill="#22d3ee" />
                  <circle cx="72" cy="78" r="2" fill="#a78bfa" />
                  <circle cx="28" cy="78" r="2" fill="#f472b6" />
                  <circle cx="15" cy="38" r="2" fill="#22d3ee" />
                </svg>

                {/* Subtext info panel */}
                <div className="mt-6 w-full text-center">
                  {hoveredSkill ? (
                    <div className="animate-fade-in space-y-1">
                      <span className="text-sm font-bold text-cyan-400 font-mono block">{hoveredSkill.name}</span>
                      <p className="text-xs text-slate-400">{hoveredSkill.desc}</p>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Hover over any capability left to stream telemetry...</span>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          PROJECTS SECTION (3D Double Sided Flipping Cards)
          ========================================== */}
      <section id="projects" className="py-24 px-4 bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              [ <span className="text-cyan-400">03</span> // PROJECT_MODULES ]
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 rounded"></div>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Tap or hover to flip individual project micro-cards. Each side possesses detailed specs, production links, and latency tests.
            </p>
          </div>

          {/* Grid Layout containing Double-Sided Flipping Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div 
                key={project.id}
                className="group relative w-full h-[400px] [perspective:1000px] cursor-pointer"
              >
                {/* Flippable Container */}
                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* ====================
                      CARD FRONT (Standard details)
                      ==================== */}
                  <div className={`absolute inset-0 w-full h-full p-6 rounded-3xl backdrop-blur-md bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] shadow-lg ${project.shadowColor}`}>
                    
                    {/* Upper interface row */}
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-slate-500 tracking-wider">PROJECT_SYS_{project.id}</span>
                      <span className={`text-xs font-mono ${project.accent} px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800`}>
                        {project.metrics}
                      </span>
                    </div>

                    {/* Middle title row */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold tracking-tight text-slate-100 font-mono">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>

                    {/* Bottom technology tags */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800/80 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-xs font-mono text-cyan-400 group-hover:opacity-80">
                        <span>HOVER TO INJECT CODE & MORE STATS</span>
                        <svg className="w-4 h-4 ml-1.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                  </div>

                  {/* ====================
                      CARD BACK (Complex configurations)
                      ==================== */}
                  <div className="absolute inset-0 w-full h-full p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl">
                    
                    {/* Back upper row */}
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                      <span className="font-mono text-xs text-rose-400">SPEC_LATENCY_REPORT</span>
                      <span className="text-xs font-mono text-emerald-400">ONLINE</span>
                    </div>

                    {/* Extended text */}
                    <div className="space-y-3 my-auto">
                      <h4 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">Architecture Overview:</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-3 pt-3 border-t border-slate-800/80">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">Source:</span>
                        <span className="text-slate-300">GitHub Verified</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500">Security:</span>
                        <span className="text-emerald-400">SSL Shield Active</span>
                      </div>
                      
                      {/* Interaction link triggers */}
                      <div className="flex space-x-2 pt-2">
                        <a 
                          href="#contact" 
                          className="flex-1 text-center py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs rounded-xl tracking-wider hover:opacity-90 transition-opacity"
                        >
                          LAUNCH DEMO
                        </a>
                        <a 
                          href="#contact" 
                          className="px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl flex items-center justify-center text-slate-300"
                        >
                          <GithubIcon />
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          EDUCATION & MILESTONE TIMELINE
          ========================================== */}
      <section id="education" className="py-24 px-4 bg-slate-950/40">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              [ <span className="text-cyan-400">04</span> // RECENT_PATHWAYS ]
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 rounded"></div>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Chronological log of academic and professional development parameters verified on the ledger.
            </p>
          </div>

          {/* Interactive timeline map */}
          <div className="relative border-l-2 border-slate-800/80 pl-6 sm:pl-10 space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="relative group">
              {/* Pulsing indicator node */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 group-hover:scale-125 transition-transform" />
              
              <div className="space-y-2 p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-slate-900/30 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-lg font-mono text-slate-100">Senior Software Dev Architect</h3>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 border border-cyan-800/60 px-2 py-1 rounded w-fit">
                    2023 - PRESENT
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-400">Inception Systems Group, remote.</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Led internal agile teams implementing reactive cloud control components. Shipped performance upgrades cutting render loop delays by 34% using clean state synchronization.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-violet-400 border-4 border-slate-950 group-hover:scale-125 transition-transform" />
              
              <div className="space-y-2 p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-slate-900/30 border border-slate-800/80 hover:border-violet-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-lg font-mono text-slate-100">B.S. Computer Engineering & Systems</h3>
                  <span className="text-xs font-mono text-violet-400 bg-violet-950 border border-violet-800/60 px-2 py-1 rounded w-fit">
                    2019 - 2023
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-400">Metro Technical Institute</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Earned deep specialization in advanced databases, computational microprocessors, distributed architectures, and modular layout principles. Summa Cum Laude honors.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-600 border-4 border-slate-950 group-hover:scale-125 transition-transform" />
              
              <div className="space-y-2 p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-lg font-mono text-slate-100">Frontend Engineering Intern</h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded w-fit">
                    2022 (Summer)
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-400">ByteCloud Media Labs</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Engineered clean UI elements using dynamic Tailwind grids, managed secure internal dashboards, and conducted regression tests on complex micro-APIs.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          CONTACT & CONNECTIONS (Neon Interactive Form)
          ========================================== */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              [ <span className="text-cyan-400">05</span> // SECURE_PORTAL ]
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 rounded"></div>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Initiate contact. All outbound data flows are encrypted via digital system socket links.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl backdrop-blur-md bg-slate-900/30 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Glowing elements inside form */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest">Operator Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name..."
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest">Encrypted Address (Email)</label>
                  <input
                    type="email"
                    required
                    placeholder="operator@network.com"
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest">Message Transmission payload</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Draft system message telemetry here..."
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                onClick={() => {
                  // Simulate modern secure feedback
                  const btn = document.getElementById('submit-btn');
                  if (btn) {
                    btn.innerHTML = "PAYLOAD SENT. CONNECTION LOGGED.";
                    btn.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-blue-500');
                    btn.classList.add('bg-emerald-500', 'text-slate-950');
                    setTimeout(() => {
                      btn.innerHTML = "DISPATCH CONNECTIVITY REQUEST";
                      btn.classList.remove('bg-emerald-500', 'text-slate-950');
                      btn.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-blue-500');
                    }, 4000);
                  }
                }}
                id="submit-btn"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all uppercase"
              >
                Dispatch Connectivity Request
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* ==========================================
          FOOTER / NET STATUS INDICATORS
          ========================================== */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-12 px-4 text-center text-slate-500 text-xs sm:text-sm font-mono relative z-10 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PORTAL_SECURE // SYSTEM STATUS: ACTIVE</span>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p>© 2026 Alex Mercer. Designed on React Grid.</p>
            <p className="text-[10px] text-slate-600">All data channels verified. Encrypted telemetry logs active.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}