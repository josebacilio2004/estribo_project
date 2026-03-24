// Three.js Interactive Architectural Viewer for ESTRIBO
// Modern Custom House - Large Architectural Structure with Colors & Pool

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
    camera.position.set(10, 8, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true; // --- ZOOM ENABLED ---
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-10, 5, -10);
    scene.add(backLight);

    // Materials
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5f5, flatShading: true });
    const woodMaterial = new THREE.MeshPhongMaterial({ color: 0xdda15e, flatShading: true });
    const glassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xa8dadc, 
        transparent: true, 
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    const poolMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x457b9d, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
    });
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 }); // Dark slab
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1, transparent: true, opacity: 0.2 });

    function createArchitecturalBox(w, h, d, x, y, z, material = wallMaterial, hasOutline = true) {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);

        if (hasOutline) {
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(edges, edgeMaterial);
            line.position.set(x, y, z);
            scene.add(line);
        }
        return mesh;
    }

    // --- ARCHITECTURAL COMPOSITION ---

    // 1. Base Platform (Dark Concrete Slab)
    createArchitecturalBox(14, 0.2, 12, 0, -0.1, 0, baseMaterial);

    // 2. Ground Floor (Main White Volume)
    createArchitecturalBox(6, 2.5, 4, -1, 1.25, 0, wallMaterial);

    // 3. Entrance / Vertical Accent (Wood Texture Color)
    createArchitecturalBox(1.5, 5, 1.5, 2.5, 2.5, 1, woodMaterial);

    // 4. Second Floor (Cantilevered Modern Volume)
    createArchitecturalBox(7, 2, 3.5, 0.5, 3.5, -0.5, wallMaterial);

    // 5. Large Glass Facade (Ground Floor Social Area)
    createArchitecturalBox(4.5, 2.2, 0.1, -1, 1.1, 2.05, glassMaterial);

    // 6. Sidebar Terrace with Wood Decking
    createArchitecturalBox(3, 0.3, 3, -2, 2.5, 0, woodMaterial);

    // 7. Lateral Wing (Kitchen/Service)
    createArchitecturalBox(3.5, 1.8, 5, -5, 0.9, 1, wallMaterial);

    // 8. Visual Columns (Black Structural Elements)
    createArchitecturalBox(0.3, 2.5, 0.3, 1.5, 1.25, 2, baseMaterial);
    createArchitecturalBox(0.3, 2.5, 0.3, -3.5, 1.25, 2, baseMaterial);

    // 9. --- PISCINA (Front Pool Area) ---
    // Pool Deck (Wood)
    createArchitecturalBox(6, 0.1, 4, 1, 0.01, 4, woodMaterial);
    // Water surface
    createArchitecturalBox(5, 0.2, 3, 1, 0.05, 4, poolMaterial, false);

    // --- Animation & Responsive ---

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
