import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SkillsRadar = () => {
  const orbitRef = useRef(null);

  const flipCardsData = [
    { name: "React", icon: "⚛️", details: ["Hooks", "Context API", "Routing", "Redux"] },
    { name: "Java", icon: "☕", details: ["Spring Boot", "OOP", "Multithreading", "JPA"] },
    { name: "Python", icon: "🐍", details: ["Pandas", "NumPy", "Scikit-Learn", "FastAPI"] },
    { name: "Node.js", icon: "🟢", details: ["Express", "REST APIs", "Microservices", "JWT"] },
    { name: "JavaScript", icon: "📜", details: ["ES6+", "DOM Manipulation", "Async/Await", "TypeScript"] },
    { name: "Tailwind", icon: "🌬️", details: ["Utility-First", "Responsive", "Animations", "UI/UX"] },
    { name: "Git", icon: "🌳", details: ["Version Control", "CI/CD", "GitHub Actions", "Merging"] },
    { name: "SQL", icon: "🗄️", details: ["PostgreSQL", "MySQL", "Database Design", "Queries"] },
    { name: "AI/ML", icon: "🧠", details: ["Neural Networks", "LLMs", "Computer Vision", "NLP"] },
  ];

  const orbitTechs = ["React", "Java", "Python", "Node.js", "AI", "Git", "SQL", "Tailwind"];

  const chartData = [
    { name: 'JavaScript/TS', value: 35, color: '#facc15' },
    { name: 'Python', value: 25, color: '#3b82f6' },
    { name: 'Java', value: 20, color: '#f97316' },
    { name: 'HTML/CSS', value: 15, color: '#ec4899' },
    { name: 'SQL', value: 5, color: '#10b981' },
  ];

  useEffect(() => {
    const parentAnim = anime({
      targets: orbitRef.current,
      rotate: 360,
      duration: 25000,
      easing: 'linear',
      loop: true
    });

    const childAnim = anime({
      targets: '.tech-node',
      rotate: -360,
      duration: 25000,
      easing: 'linear',
      loop: true
    });

    return () => {
      parentAnim.pause();
      childAnim.pause();
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">02</span> // Skills & Tech Radar ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Flipping Cards */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-mono text-ai-accent mb-6 flex items-center">
              <span className="w-2 h-2 rounded-full bg-ai-green animate-pulse mr-2"></span>
              Skills and Technologies
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {flipCardsData.map((skill, index) => (
                <div key={index} className="group relative h-40 sm:h-48 w-full perspective-[1000px] cursor-pointer">
                  <div className="absolute w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                    
                    {/* Front of Card */}
                    <div className="absolute w-full h-full glass-panel border-slate-700 rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 backface-hidden group-hover:border-ai-accent/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <span className="text-4xl sm:text-5xl mb-3 filter drop-shadow-md">{skill.icon}</span>
                      <span className="font-mono font-bold text-slate-200 text-base sm:text-lg text-center">{skill.name}</span>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full glass-panel border-ai-purple rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 backface-hidden rotate-y-180 bg-slate-900/90 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      <div className="space-y-2 sm:space-y-3 text-center w-full">
                        {skill.details.map((detail, idx) => (
                          <div key={idx} className="text-xs sm:text-sm font-mono text-ai-accent border-b border-ai-purple/30 pb-1.5 w-full truncate">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Orbit & Chart */}
          <div className="lg:col-span-5 flex flex-col space-y-12">
            
            {/* Tech Stack Orbit */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-mono text-ai-purple mb-6 self-start lg:self-center flex items-center">
                <span className="w-2 h-2 rounded-full bg-ai-purple animate-ping mr-2"></span>
                ACTIVE_ORBIT
              </h3>
              
              <div className="relative p-4 sm:p-8 rounded-3xl glass-panel w-full max-w-[400px] aspect-square flex items-center justify-center overflow-visible group transform scale-75 sm:scale-90 md:scale-100 origin-center transition-transform">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-ai-purple/10 to-transparent rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-ai-accent/10 to-transparent rounded-tr-full pointer-events-none" />
                
                {/* Background Rings */}
                <div className="absolute inset-0 m-auto w-72 h-72 rounded-full border border-dashed border-slate-700 opacity-50 pointer-events-none" />
                <div className="absolute inset-0 m-auto w-52 h-52 rounded-full border border-slate-800 opacity-50 pointer-events-none" />

                {/* Center Node */}
                <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-2 border-ai-accent shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                  <span className="font-mono font-bold text-slate-200 tracking-widest text-xs sm:text-sm">NIDHI</span>
                </div>

                {/* Orbiting Techs Container */}
                <div ref={orbitRef} className="absolute w-[288px] h-[288px] top-1/2 left-1/2 -mt-[144px] -ml-[144px]">
                  {orbitTechs.map((tech, index) => {
                    const angle = (index / orbitTechs.length) * 360;
                    const radius = 144;
                    const x = radius + radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius + radius * Math.sin((angle * Math.PI) / 180);
                    
                    return (
                      <div 
                        key={tech}
                        className="absolute -mt-8 -ml-8 w-16 h-16 pointer-events-auto"
                        style={{ left: `${x}px`, top: `${y}px` }}
                      >
                        <div className="tech-node w-full h-full rounded-full bg-slate-900 border border-ai-purple flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:border-ai-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform cursor-default">
                          <span className="font-mono text-[10px] sm:text-xs text-ai-accent font-bold px-1 text-center">{tech}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Languages Chart */}
            <div className="flex flex-col w-full">
              <h3 className="text-xl font-mono text-slate-300 mb-6 flex items-center">
                <span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span>
                LANGUAGE_DISTRIBUTION
              </h3>
              <div className="glass-panel rounded-3xl p-4 sm:p-6 h-[300px] w-full flex items-center justify-center shadow-lg">
                <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#22d3ee', borderRadius: '8px' }}
                      itemStyle={{ color: '#e2e8f0', fontFamily: 'monospace' }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
