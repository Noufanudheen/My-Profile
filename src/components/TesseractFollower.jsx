import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TesseractFollower = () => {
  const containerRef = useRef(null);
  const starsContainerRef = useRef(null);

  useEffect(() => {
    // -----------------------------------------------------------
    // 1. TESSERACT WITH CLAMPED MOTION-DRIVEN ROTATION (Mouse + Touch)
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
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let angularVelX = 0;
    let angularVelY = 0;

    // Max speed limit (relaxing & non-nauseating)
    const MAX_SPEED = 0.012;

    const handlePointerMove = (clientX, clientY) => {
      const deltaX = clientX - lastX;
      const deltaY = clientY - lastY;

      lastX = clientX;
      lastY = clientY;

      // Add gentle angular impulse
      angularVelY += deltaX * 0.00018;
      angularVelX += deltaY * 0.00018;

      // Clamp max rotational velocity
      angularVelY = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, angularVelY));
      angularVelX = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, angularVelX));

      // Normalized position for subtle container sway
      targetX = (clientX / window.innerWidth - 0.5) * 2;
      targetY = (clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    let animId;
    const animateTesseract = () => {
      // Rotate tesseract gracefully in direction of movement velocity
      tesseractGroup.rotation.y += angularVelY;
      tesseractGroup.rotation.x += angularVelX;
      cube2.rotation.z -= angularVelY * 0.5;

      // Gentle Friction Deceleration: Smoothly slow down rotation when pointer stops
      angularVelX *= 0.94;
      angularVelY *= 0.94;

      // Stop micro-movements when velocity is near zero
      if (Math.abs(angularVelX) < 0.00002) angularVelX = 0;
      if (Math.abs(angularVelY) < 0.00002) angularVelY = 0;

      // Smooth subtle position sway from center
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (container) {
        const swayX = currentX * 25;
        const swayY = currentY * 25;
        container.style.transform = `translate(-50%, -50%) translate3d(${swayX}px, ${swayY}px, 0)`;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animateTesseract);
    };

    animateTesseract();

    // -----------------------------------------------------------
    // 2. SCATTERED INTERACTIVE STARS (Shift 0.5cm on Mouse/Touch Proximity)
    // -----------------------------------------------------------
    const starCount = 35;
    const starsData = [];
    const starsParent = starsContainerRef.current;

    let pointerXPos = window.innerWidth / 2;
    let pointerYPos = window.innerHeight / 2;

    const trackPointerPos = (e) => {
      if (e.touches && e.touches[0]) {
        pointerXPos = e.touches[0].clientX;
        pointerYPos = e.touches[0].clientY;
      } else {
        pointerXPos = e.clientX;
        pointerYPos = e.clientY;
      }
    };

    window.addEventListener('mousemove', trackPointerPos);
    window.addEventListener('touchmove', trackPointerPos, { passive: true });
    window.addEventListener('touchstart', trackPointerPos, { passive: true });

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
        const dx = pointerXPos - star.originX;
        const dy = pointerYPos - star.originY;
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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', trackPointerPos);
      window.removeEventListener('touchmove', trackPointerPos);
      window.removeEventListener('touchstart', trackPointerPos);
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

      {/* Touch & Mouse Motion-Driven 3D Tesseract */}
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
