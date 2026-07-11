import React from 'react';
import { educationData } from '../data/portfolioData';

const EducationTimeline = () => {
  return (
    <section id="education" className="py-24 relative px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">04</span> // ACADEMIC_PATH ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
          {educationData.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-ai-accent bg-ai-dark text-ai-accent shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono text-xs">
                {index + 1}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl group-hover:border-ai-accent transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 space-y-1 sm:space-y-0">
                  <h3 className="font-bold text-slate-100 text-lg">{item.degree}</h3>
                  <span className="font-mono text-ai-accent text-sm bg-ai-dark px-2 py-1 rounded border border-ai-accent/30">{item.year}</span>
                </div>
                <div className="text-ai-purple font-mono text-sm mb-3">{item.institution}</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
