import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // fov
      mountRef.current.clientWidth / mountRef.current.clientHeight, // aspect ration
      0.1, // near
      1000 //far
    );
    camera.position.z = 3; // putting that object away from the renderer

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // smooths edges and shapes for not making the geometry pixelated
    }); // renders the scene

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    // append the renderer
    mountRef.current.appendChild(renderer.domElement);

    // the body of actor
    const geometry = new THREE.BoxGeometry();
    // the costume / clothes of the actor
    const material = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      wireframe: true,
    });
    // the actor itself on the stage
    const cube = new THREE.Mesh(geometry, material);

    // actor in the state
    scene.add(cube);

    // === Animate ===
    // the dance of the actor
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    ></div>
  );
};

export default ThreeScene;
