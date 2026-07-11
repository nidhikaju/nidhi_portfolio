import React from 'react';
import { certificatesData } from '../data/portfolioData';

const Certificates = () => {
  return (
    <section id="certificates" className="py-24 relative px-4 z-10 bg-ai-dark/60">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">05</span> // CERTIFICATIONS ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificatesData.map((cert, index) => (
            <div key={index} className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-ai-accent transition-colors duration-300 flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ai-dark border border-ai-accent flex items-center justify-center text-ai-accent shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div>
                <h3 className="text-slate-200 font-bold font-mono text-sm leading-relaxed">{cert}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
