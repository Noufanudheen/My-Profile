import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Objects group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Floating 3D Icosahedron Prism (Light Reflector)
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x00aaff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.9,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(3, 1, -2);
    group.add(icoMesh);

    // 2. Torus Knot Prism
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.3, 100, 16);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xff2255,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-3.5, -2, -3);
    group.add(torusMesh);

    // 3. Central Wireframe Globe
    const sphereGeo = new THREE.SphereGeometry(1.8, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x9955ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, 0, -4);
    group.add(sphereMesh);

    // 4. Ambient Glowing Particle Cloud
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const c1 = new THREE.Color(0x00aaff);
    const c2 = new THREE.Color(0xff2255);
    const c3 = new THREE.Color(0x9955ff);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const rand = Math.random();
      const col = rand < 0.4 ? c1 : rand < 0.7 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00aaff, 2, 12);
    blueLight.position.set(4, 4, 2);
    scene.add(blueLight);

    const redLight = new THREE.PointLight(0xff2255, 2, 12);
    redLight.position.set(-4, -4, 2);
    scene.add(redLight);

    // Mouse tilt tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      icoMesh.rotation.x = time * 0.15;
      icoMesh.rotation.y = time * 0.2;

      torusMesh.rotation.x = -time * 0.2;
      torusMesh.rotation.z = time * 0.15;

      sphereMesh.rotation.y = time * 0.1;

      particleSystem.rotation.y = time * 0.02;

      // Mouse inertia tracking
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      group.rotation.y = targetX * 0.3;
      group.rotation.x = -targetY * 0.3;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeCanvas;
