import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 text-center bg-ai-dark/30 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl mt-8">

          <div className="space-y-4 w-full flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-slate-100 drop-shadow-lg">
              Hi, I'm <span className="glow-text">Nidhi Sharma</span>
            </h1>
            <div className="text-xl sm:text-3xl font-mono text-ai-accent h-10 drop-shadow-md">
              <TypeAnimation
                sequence={[
                  'Software Engineer',
                  1000,
                  'Java Full Stack Developer',
                  1000,
                  'Open Source Contributor',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Software Engineer specializing in Data Structures, Algorithms, and full-stack development. Welcome to my operational nerve center.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-ai-accent to-ai-green text-ai-dark font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-[1.02] transition-all cursor-pointer text-center"
            >
              Access Projects Matrix
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
