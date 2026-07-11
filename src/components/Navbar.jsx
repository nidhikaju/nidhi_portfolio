import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiAward } from 'react-icons/fi';

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'about', label: 'About', icon: <FiUser /> },
    { id: 'skills', label: 'Matrix', icon: <FiCode /> },
    { id: 'projects', label: 'Projects', icon: <FiBriefcase /> },
    { id: 'certificates', label: 'Certs', icon: <FiAward /> },
    { id: 'contact', label: 'Contact', icon: <FiMail /> }
  ];

  return (
    <>
      {/* Top Navbar (Logo & Desktop Menu) */}
      <nav className={`hidden md:block fixed z-40 transition-all duration-500 ease-out left-1/2 -translate-x-1/2 ${
        isScrolled 
          ? "top-4 w-[85%] max-w-5xl rounded-full glass-panel border border-ai-accent/30 shadow-[0_10px_30px_rgba(34,211,238,0.2)] backdrop-blur-md" 
          : "top-0 w-full rounded-none glass-panel border-b border-ai-accent/20 backdrop-blur-sm"
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
            
            {/* Creative Expanding Logo */}
            <Link to="home" smooth={true} duration={500} className="flex items-center cursor-pointer group">
              <div className="relative flex items-center h-10 sm:h-11 rounded-full bg-gradient-to-r from-ai-accent to-ai-green shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-500 ease-in-out overflow-hidden w-10 sm:w-11 group-hover:w-[260px]">
                {/* Logo Circle */}
                <div className="w-10 sm:w-11 h-10 sm:h-11 flex-shrink-0 flex items-center justify-center bg-ai-dark/10 rounded-full">
                  <span className="text-ai-dark font-black tracking-tighter text-sm sm:text-base drop-shadow-sm">NS</span>
                </div>
                {/* Sliding Text */}
                <span className="whitespace-nowrap text-ai-dark font-bold font-mono text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-2 pr-4">
                  Welcome to Nidhi's World
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center space-x-1 lg:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  spy={true}
                  duration={500}
                  className="px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer text-slate-400 hover:text-ai-accent hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:bg-ai-accent/10"
                  activeClass="text-ai-accent shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-slate-800/80"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link to="contact" smooth={true} duration={500} className="flex px-5 py-2 rounded-full border-2 border-ai-green text-ai-green text-sm font-bold hover:bg-ai-green hover:text-ai-dark transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer items-center justify-center">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Creative Mobile Top Dock */}
      <div className={`md:hidden fixed left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 rounded-full glass-panel flex justify-between items-center px-4 py-3 border border-ai-accent/30 shadow-[0_10px_40px_rgba(34,211,238,0.15)] backdrop-blur-lg transition-all duration-500 ${isScrolled ? 'top-4' : 'top-6'}`}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            smooth={true}
            spy={true}
            duration={500}
            className="relative text-xl p-2 rounded-full transition-all duration-300 text-slate-500 cursor-pointer hover:text-ai-accent flex flex-col items-center justify-center group"
            activeClass="text-ai-accent scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-ai-dark/50"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
