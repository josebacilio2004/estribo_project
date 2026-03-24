// Three.js Interactive Architectural Viewer for ESTRIBO
// Minimalist structure (Lines and simple geometries)

import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

function init3D() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Keep it simple, just rotation
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Architectural Elements (Minimalist House)
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.9,
        flatShading: true
    });
    
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

    // Base Slab
    const baseGeo = new THREE.BoxGeometry(4, 0.2, 4);
    const base = new THREE.Mesh(baseGeo, material);
    scene.add(base);

    // Main Volume
    const houseGeo = new THREE.BoxGeometry(2, 2.5, 3);
    const house = new THREE.Mesh(houseGeo, material);
    house.position.y = 1.35;
    scene.add(house);

    // Wireframes for architectural look
    const edges = new THREE.EdgesGeometry(houseGeo);
    const line = new THREE.LineSegments(edges, lineMaterial);
    line.position.copy(house.position);
    scene.add(line);

    // Secondary Volume
    const sideGeo = new THREE.BoxGeometry(1.5, 1.5, 2);
    const side = new THREE.Mesh(sideGeo, material);
    side.position.set(1.5, 0.85, 0);
    scene.add(side);

    const sideEdges = new THREE.EdgesGeometry(sideGeo);
    const sideLine = new THREE.LineSegments(sideEdges, lineMaterial);
    sideLine.position.copy(side.position);
    scene.add(sideLine);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    // Resize Handling
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    animate();
}

document.addEventListener('DOMContentLoaded', init3D);
