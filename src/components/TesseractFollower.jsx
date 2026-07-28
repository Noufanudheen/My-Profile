import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TesseractFollower = () => {
  const containerRef = useRef(null);
  const starsContainerRef = useRef(null);

  useEffect(() => {
    // -----------------------------------------------------------
    // 1. TESSERACT WITH MOTION-DRIVEN ROTATION & INERTIAL DECELERATION
    // -----------------------------------------------------------
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(220, 220);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Tesseract Group
    const tesseractGroup = new THREE.Group();
    scene.add(tesseractGroup);

    // Outer Wireframe Cube (Electric Blue)
    const cube1 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(1.6, 1.6, 1.6)),
      new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.85 })
    );
    tesseractGroup.add(cube1);

    // Inner Wireframe Cube (Cyber Red)
    const cube2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(1.0, 1.0, 1.0)),
      new THREE.LineBasicMaterial({ color: 0xff2255, transparent: true, opacity: 0.7 })
    );
    tesseractGroup.add(cube2);

    // Physics variables for rotational inertia
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let angularVelX = 0;
    let angularVelY = 0;

    const handleMouseMove = (e) => {
      // Calculate velocity vector of mouse movement
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      // Add angular momentum proportional to mouse velocity and direction
      angularVelY += deltaX * 0.0012;
      angularVelX += deltaY * 0.0012;

      // Normalized position for subtle container sway
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animateTesseract = () => {
      // Rotate tesseract in direction of movement velocity
      tesseractGroup.rotation.y += angularVelY;
      tesseractGroup.rotation.x += angularVelX;
      cube2.rotation.z -= angularVelY * 0.6;

      // Friction Deceleration: Smoothly slow down rotation when mouse stops
      angularVelX *= 0.91;
      angularVelY *= 0.91;

      // Stop micro-movements when velocity is near zero
      if (Math.abs(angularVelX) < 0.00005) angularVelX = 0;
      if (Math.abs(angularVelY) < 0.00005) angularVelY = 0;

      // Smooth subtle position sway from center
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (container) {
        const swayX = currentMouseX * 25;
        const swayY = currentMouseY * 25;
        container.style.transform = `translate(-50%, -50%) translate3d(${swayX}px, ${swayY}px, 0)`;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animateTesseract);
    };

    animateTesseract();

    // -----------------------------------------------------------
    // 2. SCATTERED INTERACTIVE STARS (Shift 0.5cm on Mouse Proximity)
    // -----------------------------------------------------------
    const starCount = 35;
    const starsData = [];
    const starsParent = starsContainerRef.current;

    let mouseXPos = window.innerWidth / 2;
    let mouseYPos = window.innerHeight / 2;

    const trackMousePos = (e) => {
      mouseXPos = e.clientX;
      mouseYPos = e.clientY;
    };
    window.addEventListener('mousemove', trackMousePos);

    if (starsParent) {
      starsParent.innerHTML = '';
      for (let i = 0; i < starCount; i++) {
        const starEl = document.createElement('div');
        starEl.className = 'interactive-star';

        const originX = Math.random() * window.innerWidth;
        const originY = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 2;
        const colorChoice = Math.random();
        const color = colorChoice < 0.5 ? '#00aaff' : colorChoice < 0.8 ? '#ff2255' : '#ffffff';

        Object.assign(starEl.style, {
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}`,
          opacity: (Math.random() * 0.5 + 0.3).toString(),
          pointerEvents: 'none',
          zIndex: '0',
          transform: `translate3d(${originX}px, ${originY}px, 0)`,
          willChange: 'transform',
        });

        starsParent.appendChild(starEl);

        starsData.push({
          el: starEl,
          originX,
          originY,
          currentX: originX,
          currentY: originY,
        });
      }
    }

    // Star animation loop
    let starAnimId;
    const maxDistance = 140;
    const pushDistance = 20;

    const animateStars = () => {
      for (let i = 0; i < starsData.length; i++) {
        const star = starsData[i];
        const dx = mouseXPos - star.originX;
        const dy = mouseYPos - star.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let destX = star.originX;
        let destY = star.originY;

        if (dist < maxDistance && dist > 0) {
          const angle = Math.atan2(dy, dx);
          destX = star.originX - Math.cos(angle) * pushDistance;
          destY = star.originY - Math.sin(angle) * pushDistance;
        }

        star.currentX += (destX - star.currentX) * 0.08;
        star.currentY += (destY - star.currentY) * 0.08;

        star.el.style.transform = `translate3d(${star.currentX}px, ${star.currentY}px, 0)`;
      }

      starAnimId = requestAnimationFrame(animateStars);
    };

    animateStars();

    // -----------------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId);
      cancelAnimationFrame(starAnimId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', trackMousePos);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Scattered Interactive Stars Layer */}
      <div ref={starsContainerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Motion-Driven Decelerating 3D Tesseract */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: '48%',
          left: '75%',
          width: '220px',
          height: '220px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.75,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.4))',
        }}
      />
    </>
  );
};

export default TesseractFollower;
