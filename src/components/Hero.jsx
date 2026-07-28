import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 24, color = "#00aaff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, color = "#00aaff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Hero = () => {
  return (
    <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel"
        style={{ maxWidth: '800px', textAlign: 'center' }}
      >
        <motion.h1 
          className="text-gradient"
          style={{ fontSize: '4rem', marginBottom: '0.5rem', letterSpacing: '-1px' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Noufanudheen
        </motion.h1>
        
        <motion.h2 
          style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Software Developer <span className="text-gradient-red">|</span> Software Architecture
        </motion.h2>
        
        <motion.p 
          style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Crafting immersive digital experiences with code, curiosity, and caffeine.
        </motion.p>
        
        <motion.div 
          style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="https://github.com/Noufanudheen" target="_blank" rel="noopener noreferrer" className="social-link" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}>
            <GithubIcon size={24} color="#00aaff" />
          </a>
          <a href="https://www.linkedin.com/in/noufanudheen-c-96842925a/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}>
            <LinkedinIcon size={24} color="#00aaff" />
          </a>
          <a href="mailto:noufanudheen@gmail.com" className="social-link" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}>
            <Mail size={24} color="#00aaff" />
          </a>
        </motion.div>
      </motion.div>
      
      <style>{`
        .social-link:hover {
          background: rgba(0, 170, 255, 0.15) !important;
          border-color: rgba(0, 170, 255, 0.5) !important;
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 170, 255, 0.3);
        }
        .social-link:hover svg {
          stroke: #ffffff;
        }
      `}</style>
    </section>
  );
};

export default Hero;
