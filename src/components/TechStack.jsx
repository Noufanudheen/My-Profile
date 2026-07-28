import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ name, percentage, color, delay }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <span style={{ fontWeight: 500 }}>{name}</span>
      <span style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ delay, duration: 1, ease: 'easeOut' }}
        style={{ height: '100%', background: color, borderRadius: '4px', boxShadow: `0 0 10px ${color}` }}
      />
    </div>
  </div>
);

const TechStack = () => {
  const frontend = [
    { name: 'HTML5', percentage: 95 },
    { name: 'CSS3', percentage: 92 },
    { name: 'JavaScript', percentage: 90 },
    { name: 'React', percentage: 80 }
  ];

  const backend = [
    { name: 'Node.js', percentage: 78 },
    { name: 'Express.js', percentage: 75 },
    { name: 'MongoDB', percentage: 72 },
    { name: 'Python', percentage: 68 }
  ];

  const tools = [
    { name: 'Git & GitHub', percentage: 82 },
    { name: 'TypeScript', percentage: 65 },
    { name: 'Shell / Bash', percentage: 60 },
    { name: 'Three.js', percentage: 75 }
  ];

  return (
    <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.h2 
          className="text-gradient"
          style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--accent-electric-blue)' }}>Frontend</h3>
            {frontend.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color="var(--accent-electric-blue)" delay={0.2 + (index * 0.1)} />
            ))}
          </motion.div>

          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--accent-cyber-red)' }}>Backend</h3>
            {backend.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color="var(--accent-cyber-red)" delay={0.4 + (index * 0.1)} />
            ))}
          </motion.div>

          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--accent-deep-purple)' }}>Tools</h3>
            {tools.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color="var(--accent-deep-purple)" delay={0.6 + (index * 0.1)} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
