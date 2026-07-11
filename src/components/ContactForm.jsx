import React, { useState } from 'react';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiGlobe, FiInstagram } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert("Transmission Successful.");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative px-4 z-10 bg-ai-dark/40 border-t border-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">06</span> // ESTABLISH_CONNECTION ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-ai-accent/5 to-transparent rounded-bl-full pointer-events-none" />
              <h3 className="text-xl font-bold font-mono text-slate-200 mb-2 flex items-center gap-2">
                <FiGlobe className="text-ai-accent" /> Connect With Me
              </h3>
              
              <div className="space-y-6 relative z-10">
                <a href="mailto:nidhisharma999000@gmail.com" className="flex items-center space-x-4 text-slate-300 hover:text-ai-accent transition-colors group">
                  <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-ai-accent/20 transition-colors border border-slate-800 group-hover:border-ai-accent/50">
                    <FiMail className="w-5 h-5 text-ai-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Email</p>
                    <p className="text-sm font-medium">nidhisharma999000@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <FiPhone className="w-5 h-5 text-ai-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Phone</p>
                    <p className="text-sm font-medium">+91 9305960632</p>
                  </div>
                </div>

                <a href="https://linkedin.com/in/nidhi-sharma-8a594b278" target="_blank" rel="noreferrer" className="flex items-center space-x-4 text-slate-300 hover:text-ai-accent transition-colors group">
                  <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-ai-accent/20 transition-colors border border-slate-800 group-hover:border-ai-accent/50">
                    <FiLinkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">LinkedIn</p>
                    <p className="text-sm font-medium break-all">nidhi-sharma-8a594b278</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-ai-purple/5 to-transparent rounded-tr-full pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 tracking-wider">IDENTIFIER</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-colors font-mono"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 tracking-wider">COMM_LINK</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-colors font-mono"
                    placeholder="name@server.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 tracking-wider">PAYLOAD</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-colors resize-none font-mono"
                  placeholder="Enter message data here..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-ai-dark border border-ai-accent text-ai-accent font-bold font-mono tracking-widest rounded-xl hover:bg-ai-accent hover:text-ai-dark transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <span>INITIATE_TRANSFER</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
