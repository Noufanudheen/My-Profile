import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code2, Award } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, delay }) => (
  <motion.div 
    className="glass-panel"
    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, borderColor: 'rgba(255, 34, 85, 0.4)', boxShadow: '0 5px 20px rgba(255, 34, 85, 0.15)' }}
  >
    <div style={{ background: 'rgba(187, 136, 255, 0.1)', padding: '12px', borderRadius: '12px' }}>
      <Icon size={28} color="#bb88ff" />
    </div>
    <div>
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: 'var(--font-primary)' }}>{title}</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>{value}</p>
    </div>
  </motion.div>
);

const ProfileStats = () => {
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
          Education & Stats
        </motion.h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <StatCard icon={GraduationCap} title="BCA" value="Completed" delay={0.1} />
          <StatCard icon={BookOpen} title="MCA" value="Ongoing" delay={0.2} />
          <StatCard icon={Code2} title="Focus" value="Software Arch." delay={0.3} />
          <StatCard icon={Award} title="Projects" value="5+ Public Repos" delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default ProfileStats;
