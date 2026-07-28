import React, { useEffect } from 'react';
import TesseractFollower from './components/TesseractFollower';

function App() {
  useEffect(() => {
    // Dynamic Glass Refraction Mouse Highlight
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Interactive 3D Tesseract Cursor Follower & Scattered Stars */}
      <TesseractFollower />

      {/* Background Ambient Layer (Pure GPU CSS, Zero WebGL Overhead) */}
      <div className="bg-layer" aria-hidden="true">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-poly bg-poly-1"></div>
        <div className="bg-poly bg-poly-2"></div>
        <div className="bg-poly bg-poly-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Hidden checkbox for mobile nav */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle-input" aria-hidden="true" />

      {/* Header */}
      <header id="site-header" role="banner">
        <nav id="main-nav" role="navigation" aria-label="Main navigation">
          <a href="#hero" className="nav-logo" aria-label="Noufanudheen home">
            <span className="logo-text">N<span className="logo-dot">.</span></span>
          </a>

          <ul className="nav-links" role="list">
            <li><a href="#about" className="nav-link" id="nav-about">About</a></li>
            <li><a href="#skills" className="nav-link" id="nav-skills">Skills</a></li>
            <li><a href="#projects" className="nav-link" id="nav-projects">Projects</a></li>
            <li><a href="#contact" className="nav-link" id="nav-contact">Contact</a></li>
          </ul>

          <a
            href="https://github.com/Noufanudheen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass btn-sm"
            id="btn-github-nav"
            aria-label="View GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          <label htmlFor="menu-toggle" className="hamburger" aria-label="Toggle mobile menu">
            <span></span><span></span><span></span>
          </label>
        </nav>

        <div className="mobile-nav-overlay" role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            <li><label htmlFor="menu-toggle"><a href="#about" className="nav-link" id="mnav-about">About</a></label></li>
            <li><label htmlFor="menu-toggle"><a href="#skills" className="nav-link" id="mnav-skills">Skills</a></label></li>
            <li><label htmlFor="menu-toggle"><a href="#projects" className="nav-link" id="mnav-projects">Projects</a></label></li>
            <li><label htmlFor="menu-toggle"><a href="#contact" className="nav-link" id="mnav-contact">Contact</a></label></li>
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">

        {/* Hero Section */}
        <section id="hero" aria-labelledby="hero-heading">
          <div className="hero-geo" aria-hidden="true">
            <div className="geo-ring geo-ring-1"></div>
            <div className="geo-ring geo-ring-2"></div>
            <div className="geo-diamond"></div>
            <svg className="geo-lines" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="250,20 480,180 400,440 100,440 20,180" stroke="rgba(0,170,255,0.12)" strokeWidth="1" fill="none" />
              <polygon points="250,60 440,200 370,410 130,410 60,200" stroke="rgba(255,34,85,0.08)" strokeWidth="1" fill="none" />
              <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(0,170,255,0.06)" strokeWidth="1" />
              <line x1="20" y1="180" x2="480" y2="180" stroke="rgba(0,170,255,0.06)" strokeWidth="1" />
            </svg>
          </div>

          <div className="hero-content">
            <p className="hero-greeting anim-fade-up" style={{ '--d': '0.1s' }}>Hello, I'm</p>

            <h1 id="hero-heading" className="hero-name anim-fade-up" style={{ '--d': '0.25s' }}>
              <span className="name-part">Noufan</span><span className="name-part accent-blue">udheen</span>
            </h1>

            <p className="hero-title anim-fade-up" style={{ '--d': '0.45s' }} aria-label="Software Developer">
              <span className="title-prefix">—</span>
              <span className="typing-wrap">
                <span className="typing-text">Software Developer</span>
              </span>
            </p>

            <p className="hero-subtitle anim-fade-up" style={{ '--d': '0.62s' }}>
              Crafting immersive digital experiences with code, curiosity, and caffeine.
            </p>

            <div className="hero-cta-group anim-fade-up" style={{ '--d': '0.78s' }} role="group" aria-label="Call to action">
              <a href="#projects" className="btn btn-glass btn-primary" id="btn-view-work">View My Work</a>
              <a href="#contact" className="btn btn-neumorphic" id="btn-get-in-touch">Get In Touch</a>
            </div>

            <div className="hero-socials anim-fade-up" style={{ '--d': '0.94s' }} role="list" aria-label="Social links">
              <a
                href="https://github.com/Noufanudheen"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                id="social-github"
                aria-label="GitHub"
                role="listitem"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/noufanudheen-c-96842925a/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                id="social-linkedin"
                aria-label="LinkedIn"
                role="listitem"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:noufanudheen@gmail.com"
                className="social-link"
                id="social-email"
                aria-label="Send Email"
                role="listitem"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
              </a>
            </div>
          </div>

          <div className="scroll-cue anim-fade-up" style={{ '--d': '1.4s' }} aria-hidden="true">
            <span className="scroll-line"></span>
            <span className="scroll-label">scroll</span>
          </div>
        </section>

        {/* About Section */}
        <section id="about" aria-labelledby="about-heading">
          <div className="section-container">
            <header className="section-header">
              <p className="section-label">Get to know me</p>
              <h2 id="about-heading" className="section-title">About <span className="accent-blue">Me</span></h2>
            </header>

            <div className="about-grid">
              <article className="about-card glass-card" id="about-card-bio">
                <div className="about-avatar-wrap" aria-hidden="true">
                  <div className="avatar-ring"></div>
                  <div className="avatar-face">
                    <span aria-hidden="true">N</span>
                  </div>
                </div>
                <div className="about-body">
                  <p className="about-intro">
                    I'm <strong className="accent-blue">Noufanudheen</strong>, a passionate Software Developer
                    currently pursuing my <strong>MCA</strong>, building upon a completed <strong>BCA</strong>.
                  </p>
                  <p>
                    I love to experiment with new design paradigms and cutting-edge technologies in web development.
                    From precise CSS craft to immersive interface design, I'm always pushing what the browser can do.
                  </p>
                  <p>
                    When I'm not coding, I'm studying new frameworks, tinkering with creative tools,
                    or thinking about the next cinematic web experience.
                  </p>
                </div>
              </article>

              <div className="stat-grid">
                <div className="stat-card neu-card" id="stat-education">
                  <span className="stat-icon material-symbols-outlined" aria-hidden="true">school</span>
                  <h3 className="stat-label">Education</h3>
                  <p className="stat-value">BCA ✓<br />MCA ongoing</p>
                </div>
                <div className="stat-card neu-card" id="stat-focus">
                  <span className="stat-icon material-symbols-outlined" aria-hidden="true">bolt</span>
                  <h3 className="stat-label">Focus</h3>
                  <p className="stat-value">Full Stack<br />Web Dev</p>
                </div>
                <div className="stat-card neu-card" id="stat-projects">
                  <span className="stat-icon material-symbols-outlined" aria-hidden="true">rocket_launch</span>
                  <h3 className="stat-label">Projects</h3>
                  <p className="stat-value">5+ Public<br />Repos</p>
                </div>
                <div className="stat-card neu-card" id="stat-passion">
                  <span className="stat-icon material-symbols-outlined" aria-hidden="true">palette</span>
                  <h3 className="stat-label">Passion</h3>
                  <p className="stat-value">Design &amp;<br />3D Interfaces</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" aria-labelledby="skills-heading">
          <div className="section-container">
            <header className="section-header">
              <p className="section-label">What I work with</p>
              <h2 id="skills-heading" className="section-title">Tech <span className="accent-red">Stack</span></h2>
            </header>

            <div className="skills-columns">

              <div className="skills-group" id="skills-frontend">
                <h3 className="skills-group-title">Frontend</h3>
                <div className="skills-list">
                  <div className="skill-row glass-card" id="skill-html">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">language</span>
                    <div className="skill-info">
                      <span className="skill-name">HTML5</span>
                      <span className="skill-pct">95%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar blue" style={{ '--w': '95%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-css">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">palette</span>
                    <div className="skill-info">
                      <span className="skill-name">CSS3</span>
                      <span className="skill-pct">92%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar blue" style={{ '--w': '92%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-js">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">bolt</span>
                    <div className="skill-info">
                      <span className="skill-name">JavaScript</span>
                      <span className="skill-pct">90%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar blue" style={{ '--w': '90%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-react">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">hub</span>
                    <div className="skill-info">
                      <span className="skill-name">React</span>
                      <span className="skill-pct">80%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar blue" style={{ '--w': '80%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="skills-group" id="skills-backend">
                <h3 className="skills-group-title">Backend</h3>
                <div className="skills-list">
                  <div className="skill-row glass-card" id="skill-node">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">dns</span>
                    <div className="skill-info">
                      <span className="skill-name">Node.js</span>
                      <span className="skill-pct">78%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar red" style={{ '--w': '78%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-express">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">route</span>
                    <div className="skill-info">
                      <span className="skill-name">Express.js</span>
                      <span className="skill-pct">75%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar red" style={{ '--w': '75%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-mongo">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">storage</span>
                    <div className="skill-info">
                      <span className="skill-name">MongoDB</span>
                      <span className="skill-pct">72%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar red" style={{ '--w': '72%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-python">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">code_blocks</span>
                    <div className="skill-info">
                      <span className="skill-name">Python</span>
                      <span className="skill-pct">68%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar red" style={{ '--w': '68%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="skills-group" id="skills-tools">
                <h3 className="skills-group-title">Tools</h3>
                <div className="skills-list">
                  <div className="skill-row glass-card" id="skill-git">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">merge</span>
                    <div className="skill-info">
                      <span className="skill-name">Git &amp; GitHub</span>
                      <span className="skill-pct">82%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar purple" style={{ '--w': '82%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-ts">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">data_object</span>
                    <div className="skill-info">
                      <span className="skill-name">TypeScript</span>
                      <span className="skill-pct">65%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar purple" style={{ '--w': '65%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-shell">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">terminal</span>
                    <div className="skill-info">
                      <span className="skill-name">Shell / Bash</span>
                      <span className="skill-pct">60%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar purple" style={{ '--w': '60%' }}></div></div>
                  </div>
                  <div className="skill-row glass-card" id="skill-threejs">
                    <span className="skill-icon material-symbols-outlined" aria-hidden="true">deployed_code</span>
                    <div className="skill-info">
                      <span className="skill-name">Three.js</span>
                      <span className="skill-pct">75%</span>
                    </div>
                    <div className="skill-track"><div className="skill-bar purple" style={{ '--w': '75%' }}></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" aria-labelledby="projects-heading">
          <div className="section-container">
            <header className="section-header">
              <p className="section-label">What I've built</p>
              <h2 id="projects-heading" className="section-title">Featured <span className="accent-blue">Projects</span></h2>
            </header>

            <div className="projects-grid">

              <article className="project-card glass-card featured" id="proj-jarvis">
                <div className="project-badge-row">
                  <span className="lang-dot lang-js">● JavaScript</span>
                  <span className="proj-badge">Featured</span>
                </div>
                <h3 className="proj-title">Jarvis-Protocol</h3>
                <p className="proj-desc">A cinematic 3D interface built with Three.js featuring a rotating holographic globe with interactive data nodes. A technical showcase of immersive web design blending high-fidelity visuals with real-time interaction.</p>
                <div className="proj-tags" aria-label="Technologies">
                  <span className="tag">Three.js</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">WebGL</span>
                </div>
                <a
                  href="https://github.com/Noufanudheen/Jarvis-Protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm proj-btn"
                  id="btn-jarvis"
                >View on GitHub →</a>
              </article>

              <article className="project-card glass-card" id="proj-mowo">
                <div className="project-badge-row">
                  <span className="lang-dot lang-js">● JavaScript</span>
                  <a
                    href="https://github.com/Noufanudheen/ProjectMOWO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-link-icon"
                    aria-label="GitHub link"
                    id="link-mowo"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
                <h3 className="proj-title">ProjectMOWO</h3>
                <p className="proj-desc">Lightweight, easy-to-use app for tracking local buses in real-time using packaged JSON data storage.</p>
                <div className="proj-tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">JSON</span>
                  <span className="tag">Transit</span>
                </div>
                <a
                  href="https://github.com/Noufanudheen/ProjectMOWO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm proj-btn"
                  id="btn-mowo"
                >View →</a>
              </article>

              <article className="project-card glass-card" id="proj-autodoc">
                <div className="project-badge-row">
                  <span className="lang-dot lang-ts">● TypeScript</span>
                  <a
                    href="https://github.com/Noufanudheen/Automatic-Documentation_Creator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-link-icon"
                    aria-label="GitHub link"
                    id="link-autodoc"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
                <h3 className="proj-title">Auto-Doc Creator</h3>
                <p className="proj-desc">Documentation Generator Web App that helps students and professionals create clean, well-structured technical documents without manually writing reports.</p>
                <div className="proj-tags">
                  <span className="tag">TypeScript</span>
                  <span className="tag">Web App</span>
                </div>
                <a
                  href="https://github.com/Noufanudheen/Automatic-Documentation_Creator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm proj-btn"
                  id="btn-autodoc"
                >View →</a>
              </article>

              <article className="project-card glass-card" id="proj-ytdl">
                <div className="project-badge-row">
                  <span className="lang-dot lang-py">● Python</span>
                  <a
                    href="https://github.com/Noufanudheen/YouTube-Audio-Video-Downloader"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-link-icon"
                    aria-label="GitHub link"
                    id="link-ytdl"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
                <h3 className="proj-title">YT Audio/Video DL</h3>
                <p className="proj-desc">Python-based packaged app to download YouTube videos or playlists, or host a Telegram bot for automated download management.</p>
                <div className="proj-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Telegram Bot</span>
                </div>
                <a
                  href="https://github.com/Noufanudheen/YouTube-Audio-Video-Downloader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm proj-btn"
                  id="btn-ytdl"
                >View →</a>
              </article>

              <article className="project-card glass-card" id="proj-raphael">
                <div className="project-badge-row">
                  <span className="lang-dot lang-shell">● Shell</span>
                  <a
                    href="https://github.com/Noufanudheen/Raphael-Popup-Cam-call-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ext-link-icon"
                    aria-label="GitHub link"
                    id="link-raphael"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                </div>
                <h3 className="proj-title">Raphael Cam Light</h3>
                <p className="proj-desc">Lightweight utility to control the popup camera call light on Raphael (Redmi K20 / Mi 9t) devices via shell scripting.</p>
                <div className="proj-tags">
                  <span className="tag">Shell</span>
                  <span className="tag">Android</span>
                </div>
                <a
                  href="https://github.com/Noufanudheen/Raphael-Popup-Cam-call-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm proj-btn"
                  id="btn-raphael"
                >View →</a>
              </article>

              <article className="project-card more-card neu-card" id="proj-more">
                <svg className="more-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <h3 className="more-title">See All Projects</h3>
                <p className="more-sub">Explore more on GitHub</p>
                <a
                  href="https://github.com/Noufanudheen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass btn-sm"
                  id="btn-all-projects"
                >github.com/Noufanudheen →</a>
              </article>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className="section-container">
            <header className="section-header">
              <p className="section-label">Let's connect</p>
              <h2 id="contact-heading" className="section-title">Get In <span className="accent-red">Touch</span></h2>
            </header>

            <div className="contact-layout">
              <p className="contact-intro">
                Have an idea, want to collaborate, or just say hi?<br />
                My inbox is always open — I'll respond as soon as possible.
              </p>

              <div className="contact-row">
                <a
                  href="mailto:noufanudheen@gmail.com"
                  className="contact-card glass-card"
                  id="contact-email"
                  aria-label="Send email"
                >
                  <div className="contact-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="2,4 12,13 22,4" />
                    </svg>
                  </div>
                  <h3 className="contact-label">Email</h3>
                  <p className="contact-val">noufanudheen@gmail.com</p>
                </a>

                <a
                  href="https://github.com/Noufanudheen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card glass-card"
                  id="contact-github"
                  aria-label="GitHub profile"
                >
                  <div className="contact-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <h3 className="contact-label">GitHub</h3>
                  <p className="contact-val">github.com/Noufanudheen</p>
                </a>

                <a
                  href="https://www.linkedin.com/in/noufanudheen-c-96842925a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card glass-card"
                  id="contact-linkedin"
                  aria-label="LinkedIn profile"
                >
                  <div className="contact-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <h3 className="contact-label">LinkedIn</h3>
                  <p className="contact-val">noufanudheen-c</p>
                </a>
              </div>

              <a href="mailto:noufanudheen@gmail.com" className="btn btn-glass btn-primary btn-lg" id="btn-say-hello">Say Hello</a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="site-footer" role="contentinfo">
        <div className="footer-inner">
          <p className="footer-copy">© 2025 <span className="accent-blue">Noufanudheen</span> — Built with React &amp; CSS</p>
          <p className="footer-tagline">Always experimenting. Always building.</p>
          <nav className="footer-nav" aria-label="Footer links">
            <a href="https://github.com/Noufanudheen" target="_blank" rel="noopener noreferrer" id="footer-gh">GitHub</a>
            <a href="https://www.linkedin.com/in/noufanudheen-c-96842925a/" target="_blank" rel="noopener noreferrer" id="footer-li">LinkedIn</a>
            <a href="mailto:noufanudheen@gmail.com" id="footer-em">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default App;
