import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('eagleContainer');
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');

// --- Three.js Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(2, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- Lighting ---
scene.add(new THREE.AmbientLight(0xffffff, 1));
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --- Model Loading ---
let mixer, eagle;
const loader = new GLTFLoader();
loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Stork.glb', (gltf) => {
    eagle = gltf.scene;
    eagle.scale.set(0.015, 0.015, 0.015);
    eagle.rotation.y = Math.PI / 2;
    scene.add(eagle);

    mixer = new THREE.AnimationMixer(eagle);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
});

// --- Mouse Interaction (Subtle Parallax) ---
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// --- Animation Loop ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    if (eagle) {
        // Idle movement
        eagle.position.y = Math.sin(Date.now() * 0.002) * 0.1;

        // Mouse follow
        eagle.rotation.x += (mouseY * 0.2 - eagle.rotation.x) * 0.05;
        eagle.rotation.y += (mouseX * 0.5 + Math.PI / 2 - eagle.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}
animate();

// --- Interactive Logic ---
let typingTimeout;
inputs.forEach(input => {
    input.addEventListener('input', () => {
        // Increase speed when typing
        if (mixer) {
            gsap.to(mixer, { timeScale: 3, duration: 0.5 });
        }

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            if (mixer) gsap.to(mixer, { timeScale: 1, duration: 0.5 });
        }, 1000);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message Sent!');

    if (eagle && mixer) {
        const tl = gsap.timeline();

        // 1. Takeoff
        tl.to(eagle.position, { y: 15, z: -20, x: 10, duration: 2.5, ease: "power2.in" });
        tl.to(eagle.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 2.5 }, 0);
        gsap.to(mixer, { timeScale: 6, duration: 0.5 });

        // 2. Return
        tl.to({}, { duration: 1.5 }); // Wait
        tl.to(eagle.position, { x: 0, y: 0, z: 0, duration: 2, ease: "power2.out" });
        tl.to(eagle.scale, { x: 0.015, y: 0.015, z: 0.015, duration: 2, ease: "power2.out" }, ">-2");

        tl.add(() => {
            gsap.to(mixer, { timeScale: 1, duration: 1 });
        });
    }
});

// --- Resize ---
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
