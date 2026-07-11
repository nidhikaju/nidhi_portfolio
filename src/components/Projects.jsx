import React from 'react';
import Tilt from 'react-parallax-tilt';
import { projectsData } from '../data/portfolioData';

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative px-4 z-10 bg-ai-dark/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">03</span> // PROJECT_MATRIX ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Tilt 
              key={project.id}
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              scale={1.02} 
              transitionSpeed={250}
              className="flex"
            >
              <div className={`relative w-full rounded-3xl glass-panel p-6 flex flex-col justify-between overflow-hidden cursor-pointer border-slate-800 transition-colors duration-300 ${project.shadowColor}`}>
                
                {/* Tech pattern grid overlays */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-ai-accent/10 to-transparent rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ai-purple/10 to-transparent rounded-tr-full pointer-events-none" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-slate-500 tracking-widest">MODULE_{project.id}</span>
                  <span className={`h-2 w-2 rounded-full bg-ai-accent animate-ping`}></span>
                </div>

                <div className="space-y-4 z-10 flex-1">
                  <h3 className={`font-bold text-xl font-mono ${project.accent}`}>{project.title}</h3>
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {project.longDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-800/80 pt-4 mt-6 z-10">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">PERFORMANCE:</span>
                    <span className="text-slate-300">{project.metrics}</span>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
