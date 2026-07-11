import React from 'react';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import Hero from './components/Hero';
import About from './components/About';
import SkillsRadar from './components/SkillsRadar';
import Projects from './components/Projects';

import EducationTimeline from './components/EducationTimeline';
import Certificates from './components/Certificates';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-ai-accent selection:text-ai-dark">
      
      {/* Background Canvas */}
      <CanvasBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <SkillsRadar />
        <Projects />

        <EducationTimeline />
        <Certificates />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
