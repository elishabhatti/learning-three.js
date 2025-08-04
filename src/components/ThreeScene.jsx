import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function ThreeScene() {
  const mountRef = useRef(null);
    // a reference to the mount point for the scene

  useEffect(() => {
    const scene = new THREE.Scene();
    // a stage where all objects will be placed

    const camera = new THREE.PerspectiveCamera(
      // the eyes of the viewer
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.5,
      1000
    );
    camera.position.z = 5;

    // === 3. Renderer ===
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    // the projector of the scene
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement); // controls for the camera
    controls.enableZoom = true; // enable zooming
    controls.enableDamping = true; // smooth movement
    controls.rotateSpeed = 0.5; // speed of rotation
    controls.dampingFactor = 0.05; // how smooth the damping is
    controls.zoomSpeed = 0.8; // speed of zooming
    controls.minDistance = 2; // minimum zoom distance
    controls.maxDistance = 10; // maximum zoom distance

    // --- Optional: Add a basic object
    // our actor's body
    const geometry = new THREE.BoxGeometry();
    // the clothes / costume of the actor
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    // the actor itself
    const cube = new THREE.Mesh(geometry, material);
    // add the actor in the state
    scene.add(cube);

    // actor dancing
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    // start the dance
    animate();

    // === Resize Handler ===
    // if the stage is resized, we need to update the camera and renderer
    function handleResize() {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;

      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }

    window.addEventListener("resize", handleResize);

    //  Cleanup if actor failed ===
    return () => {
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return <div style={{ width: "100%", height: "100vh" }} ref={mountRef} />;
}
