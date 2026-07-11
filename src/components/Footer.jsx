import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="relative bg-ai-dark border-t border-slate-900 z-10 pt-20 pb-8 overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full bg-gradient-to-r from-ai-accent/5 via-ai-purple/5 to-ai-green/5 opacity-50 blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Bio */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-mono text-slate-100 flex items-center">
              <span className="text-ai-accent mr-2">NS</span> Nidhi Sharma
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Software Engineer specializing in Data Structures, Algorithms, and full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link to="home" smooth={true} duration={500} className="hover:text-ai-accent cursor-pointer transition-colors">Home</Link>
              </li>
              <li>
                <Link to="about" smooth={true} duration={500} className="hover:text-ai-accent cursor-pointer transition-colors">About</Link>
              </li>
              <li>
                <Link to="skills" smooth={true} duration={500} className="hover:text-ai-accent cursor-pointer transition-colors">Skills Matrix</Link>
              </li>
              <li>
                <Link to="projects" smooth={true} duration={500} className="hover:text-ai-accent cursor-pointer transition-colors">Projects</Link>
              </li>
            </ul>
          </div>

          {/* Core Tech Stack */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-slate-200">
              Core Tech
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="hover:text-ai-green transition-colors cursor-default">Full-Stack React</li>
              <li className="hover:text-ai-green transition-colors cursor-default">Java Spring Boot</li>
              <li className="hover:text-ai-green transition-colors cursor-default">Python & AI/ML</li>
              <li className="hover:text-ai-green transition-colors cursor-default">Cloud Architecture</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-slate-200">
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-[#E1306C] hover:text-white transition-all shadow-md">
                <FaInstagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-[#333] hover:text-white transition-all shadow-md">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/nidhi-sharma-8a594b278" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-[#0077b5] hover:text-white transition-all shadow-md">
                <FaLinkedinIn size={20} />
              </a>
              <a href="mailto:nidhisharma999000@gmail.com" className="p-3 rounded-full bg-slate-800 hover:bg-[#EA4335] hover:text-white transition-all shadow-md">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-medium text-slate-300">
            🌌 Designed & Developed by <span className="glow-text font-bold">Nidhi</span>
          </p>
          <p className="text-xs font-mono text-slate-500 tracking-wider">
            © {new Date().getFullYear()} Nidhi Sharma. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
