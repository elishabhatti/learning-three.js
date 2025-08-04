import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    // === 1. Scene ===
    const scene = new THREE.Scene();

    // === 2. Camera ===
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // === 3. Renderer ===
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // --- Optional: Add a basic object
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: "ffffff",
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div style={{ width: "100%", height: "100vh" }} ref={mountRef} />;
}
