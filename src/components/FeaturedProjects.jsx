import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

const GithubIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div 
      className="glass-panel project-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {project.status === 'Featured' && (
        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255, 34, 85, 0.2)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--accent-cyber-red)', border: '1px solid rgba(255, 34, 85, 0.4)' }}>
          <Star size={14} fill="var(--accent-cyber-red)" /> Featured
        </div>
      )}
      
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', paddingRight: project.status === 'Featured' ? '80px' : '0' }}>
        {project.title}
      </h3>
      
      <p style={{ color: 'var(--text-muted)', flex: 1, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        {project.description}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{ background: 'rgba(0, 170, 255, 0.1)', color: 'var(--accent-electric-blue)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid rgba(0, 170, 255, 0.2)' }}>
            {tag}
          </span>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#fff' }} className="project-link">
            <GithubIcon size={18} /> Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--accent-electric-blue)' }} className="project-link">
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
      </div>

      <style>{`
        .project-card:hover {
          border-color: rgba(255, 34, 85, 0.4);
          box-shadow: 0 10px 30px rgba(255, 34, 85, 0.1);
          transform: translateY(-5px);
        }
        .project-link:hover {
          color: var(--accent-cyber-red) !important;
        }
      `}</style>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'Jarvis-Protocol',
      description: 'A cinematic 3D interface built with Three.js featuring a rotating holographic globe with interactive data nodes.',
      tags: ['Three.js', 'JavaScript', 'WebGL'],
      live: 'https://noufanudheen.github.io/Jarvis-Protocol',
      github: 'https://github.com/Noufanudheen/Jarvis-Protocol',
      status: 'Featured'
    },
    {
      title: 'ProjectMOWO',
      description: 'Lightweight, easy-to-use app for tracking local buses in real-time using packaged JSON data storage.',
      tags: ['JavaScript', 'JSON', 'Transit'],
      live: 'https://mcaofrit.qzz.io',
      github: 'https://github.com/Noufanudheen/ProjectMOWO'
    },
    {
      title: 'Auto-Doc Creator',
      description: 'Documentation Generator Web App that helps students and professionals create clean, well-structured technical documents.',
      tags: ['TypeScript', 'Web App'],
      github: 'https://github.com/Noufanudheen/Automatic-Documentation_Creator'
    },
    {
      title: 'YT Audio/Video DL',
      description: 'Python-based packaged app to download YouTube videos or playlists, or host a Telegram bot for automated download management.',
      tags: ['Python', 'Telegram Bot'],
      github: 'https://github.com/Noufanudheen/YouTube-Audio-Video-Downloader'
    },
    {
      title: 'Raphael Cam Light',
      description: 'Lightweight utility to control the popup camera call light on Raphael (Redmi K20 / Mi 9t) devices via shell scripting.',
      tags: ['Shell', 'Android'],
      github: 'https://github.com/Noufanudheen/Raphael-Popup-Cam-call-light'
    }
  ];

  return (
    <section style={{ padding: '4rem 2rem 8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2 
          className="text-gradient"
          style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
