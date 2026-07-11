import React, { useState } from 'react';
import { FiTerminal } from 'react-icons/fi';

const About = () => {
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'System Initialized. Welcome to Portfolio OS.', type: 'system' },
    { text: 'Type "help" to view list of available core commands.', type: 'info' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

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
          { text: '  clear      - Wipe terminal history logs', type: 'info' }
        ];
        break;
      case 'about':
        response = [
          { text: 'User Profile: Software Engineer', type: 'success' },
          { text: 'Mission: Apply structured software engineering practices to solve real-world problems.', type: 'info' }
        ];
        break;
      case 'skills':
        response = [
          { text: 'System Core Stacks Ready:', type: 'success' },
          { text: '  - Languages: Java, Python, C, PHP', type: 'info' },
          { text: '  - Frontend: ReactJS, HTML, CSS, JavaScript', type: 'info' },
          { text: '  - Backend & DBs: Spring Boot, MySQL, Oracle, Firebase', type: 'info' }
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
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

  return (
    <section id="about" className="py-24 relative px-4 bg-ai-dark/60 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">01</span> // BACKSTORY ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-ai-accent flex items-center space-x-2">
                <span>BIOGRAPHY_MATRIX</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I am a Software Engineer with a strong foundation in Data Structures, Algorithms, and full-stack development (Java, Spring Boot, ReactJS). I am skilled at applying MVC architecture and RESTful API design to build end-to-end applications.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-ai-dark rounded-xl border border-slate-800">
                  <span className="block text-2xl font-bold text-ai-accent font-mono">15+</span>
                  <span className="text-xs text-slate-500 tracking-wider">RESTFUL APIS CREATED</span>
                </div>
                <div className="p-3 bg-ai-dark rounded-xl border border-slate-800">
                  <span className="block text-2xl font-bold text-ai-purple font-mono">3+</span>
                  <span className="text-xs text-slate-500 tracking-wider">ACADEMIC PROJECTS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full rounded-2xl bg-ai-dark border border-slate-800 shadow-2xl overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-ai-green"></div>
                </div>
                <span className="text-xs text-slate-400 font-mono select-none flex items-center gap-1.5">
                  <FiTerminal />
                  nidhi@system_terminal
                </span>
                <div className="w-4"></div>
              </div>

              <div className="p-4 sm:p-6 h-[280px] overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5">
                {terminalHistory.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`leading-relaxed whitespace-pre-wrap ${
                      log.type === 'input' ? 'text-slate-100 font-bold' :
                      log.type === 'success' ? 'text-ai-accent' :
                      log.type === 'error' ? 'text-rose-400' :
                      log.type === 'info' ? 'text-slate-400' : 'text-ai-accent'
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="bg-slate-900/60 border-t border-slate-800 px-4 py-3 flex items-center">
                <span className="text-ai-accent font-mono mr-2 text-sm sm:text-base">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Enter interactive command..."
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-slate-100 font-mono text-sm sm:text-base"
                />
                <button type="submit" className="ml-2 text-xs font-mono bg-ai-accent/20 text-ai-accent border border-ai-accent/30 rounded px-2 py-1 hover:bg-ai-accent hover:text-ai-dark transition-all">
                  RUN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
