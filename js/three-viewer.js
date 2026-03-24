// Three.js Interactive Architectural Viewer for ESTRIBO
// Modern Custom House - Final High-Fidelity Version

import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

function init3D() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    const scene = new THREE.Scene();

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(12, 10, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.minDistance = 6;
    controls.maxDistance = 22;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 20, 10);
    scene.add(mainLight);

    // Materials
    const wallMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const woodMat = new THREE.MeshPhongMaterial({ color: 0xa67c52 }); // Rich Wood
    const glassMat = new THREE.MeshPhongMaterial({ color: 0x88ccff, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const waterMat = new THREE.MeshPhongMaterial({ color: 0x00aaff, transparent: true, opacity: 0.8, shininess: 100 });
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x222222 });

    function createBox(w, h, d, x, y, z, mat, outline = true) {
        const geo = new THREE.BoxGeometry(w, h, d);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        if (outline) {
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 }));
            line.position.copy(mesh.position);
            scene.add(line);
        }
        return mesh;
    }

    // HOUSE STRUCTURE
    createBox(15, 0.2, 12, 0, -0.1, 0, baseMat); // Base
    createBox(6, 3, 5, -2, 1.5, 0, wallMat);      // Ground floor central
    createBox(2, 6, 2, 2, 3, 2, woodMat);        // Tall wood tower
    createBox(8, 2, 4, 1, 4, -1, wallMat);       // Cantilevered upper
    createBox(5, 2.5, 0.1, -1.5, 1.25, 2.55, glassMat); // Front glass

    // POOL AREA (Front and Center)
    createBox(7, 0.1, 5, 0, 0, 7, woodMat);      // Pool Deck
    createBox(6, 0.2, 4, 0, 0.1, 7, waterMat, false); // Water

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        const w = container.clientWidth, h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });

    animate();
}

document.addEventListener('DOMContentLoaded', init3D);
