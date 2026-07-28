import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TesseractFollower = () => {
  const containerRef = useRef(null);
  const starsContainerRef = useRef(null);

  useEffect(() => {
    // -----------------------------------------------------------
    // 1. LIGHTWEIGHT 3D TESSERACT FOLLOWER (Three.js)
    // -----------------------------------------------------------
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(140, 140);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Tesseract Group
    const tesseractGroup = new THREE.Group();
    scene.add(tesseractGroup);

    // Outer Wireframe Cube
    const cube1 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(1.6, 1.6, 1.6)),
      new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.75 })
    );
    tesseractGroup.add(cube1);

    // Inner Wireframe Cube
    const cube2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.BoxGeometry(1.0, 1.0, 1.0)),
      new THREE.LineBasicMaterial({ color: 0xff2255, transparent: true, opacity: 0.6 })
    );
    tesseractGroup.add(cube2);

    // Core Glowing Octahedron
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.MeshBasicMaterial({ color: 0x33ccff, transparent: true, opacity: 0.8 })
    );
    tesseractGroup.add(core);

    // Mouse position tracking
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animateTesseract = () => {
      // Rotate hypercube
      tesseractGroup.rotation.x += 0.01;
      tesseractGroup.rotation.y += 0.015;
      cube2.rotation.x -= 0.02;
      cube2.rotation.z += 0.01;

      // Smooth lag-free mouse chase (Lerp)
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (container) {
        container.style.transform = `translate3d(${currentX - 70}px, ${currentY - 70}px, 0)`;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animateTesseract);
    };

    animateTesseract();

    // -----------------------------------------------------------
    // 2. SCATTERED INTERACTIVE STARS (React DOM + Lerp Physics)
    // -----------------------------------------------------------
    const starCount = 35; // Light count to prevent lag
    const starsData = [];
    const starsParent = starsContainerRef.current;

    if (starsParent) {
      starsParent.innerHTML = '';
      for (let i = 0; i < starCount; i++) {
        const starEl = document.createElement('div');
        starEl.className = 'interactive-star';

        const originX = Math.random() * window.innerWidth;
        const originY = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 2; // 2px - 5px
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

    // Star physics animation loop
    let starAnimId;
    const maxDistance = 140; // Range of mouse influence
    const pushDistance = 20; // ~0.5 cm shift

    const animateStars = () => {
      for (let i = 0; i < starsData.length; i++) {
        const star = starsData[i];
        const dx = targetX - star.originX;
        const dy = targetY - star.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let destX = star.originX;
        let destY = star.originY;

        if (dist < maxDistance && dist > 0) {
          // Calculate displacement angle
          const angle = Math.atan2(dy, dx);
          // Shift 0.5cm (approx 20px) away from cursor
          destX = star.originX - Math.cos(angle) * pushDistance;
          destY = star.originY - Math.sin(angle) * pushDistance;
        }

        // Smooth Lerp back to origin or pushed position
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

      {/* Mouse Following 3D Tesseract */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '140px',
          height: '140px',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
          filter: 'drop-shadow(0 0 12px rgba(0, 170, 255, 0.4))',
        }}
      />
    </>
  );
};

export default TesseractFollower;
