// Three.js Interactive Architectural Viewer for ESTRIBO
// Modern Custom House - Large Architectural Structure

import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

function init3D() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null;

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(8, 6, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Materials
    const wallMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.95,
        flatShading: true
    });
    
    const glassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x88ccff, 
        transparent: true, 
        opacity: 0.3,
        side: THREE.DoubleSide
    });

    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x222222, linewidth: 1 });

    function createArchitecturalBox(w, h, d, x, y, z, isGlass = false) {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, isGlass ? glassMaterial : wallMaterial);
        mesh.position.set(x, y, z);
        scene.add(mesh);

        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, edgeMaterial);
        line.position.set(x, y, z);
        scene.add(line);
        return mesh;
    }

    // --- ARCHITECTURAL COMPOSITION (Large Modern House) ---

    // 1. Base Platform (Terrain/Deck)
    createArchitecturalBox(12, 0.1, 10, 0, -0.05, 0);

    // 2. Ground Floor (Main Volume)
    createArchitecturalBox(6, 2.5, 4, -1, 1.25, 0);

    // 3. Entrance / Vertical Element
    createArchitecturalBox(1.5, 5, 1.5, 2.5, 2.5, 1);

    // 4. Second Floor (Cantilevered Box)
    // This one sticks out over the base
    createArchitecturalBox(7, 2, 3.5, 0.5, 3.5, -0.5);

    // 5. Large Glass Facade (Ground Floor)
    createArchitecturalBox(4, 2, 0.1, -1, 1, 2.05, true);

    // 6. Terrace/Roof Deck Element
    createArchitecturalBox(3, 0.2, 3, -2, 2.5, 0);

    // 7. Lateral Wing
    createArchitecturalBox(3, 1.5, 5, -5, 0.75, 1);

    // 8. Visual Accents (Columns or thin walls)
    createArchitecturalBox(0.2, 2.5, 4, 2, 1.25, -1.8);

    // --- Interaction & Animation ---

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

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
