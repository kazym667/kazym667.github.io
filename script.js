import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Configuration
const CONFIG = {
    particleCount: 1500,
    colors: {
        primary: 0x00ffff,
        secondary: 0xff00ff,
        accent: 0xffff00
    }
};

// Scene, Camera, Renderer
const canvas = document.getElementById('canvas3d');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a0f, 0.05);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
);
bloomPass.threshold = 0.21;
bloomPass.strength = 1.2;
bloomPass.radius = 0.55;
composer.addPass(bloomPass);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.minDistance = 3;
controls.maxDistance = 10;

// Particle System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = CONFIG.particleCount;

const positions = new Float32Array(particlesCnt * 3);
const colors = new Float32Array(particlesCnt * 3);
const scales = new Float32Array(particlesCnt);

for (let i = 0; i < particlesCnt; i++) {
    const i3 = i * 3;
    
    // Position
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;
    
    // Color
    const color = new THREE.Color();
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
        color.setHex(CONFIG.colors.primary);
    } else if (colorChoice < 0.66) {
        color.setHex(CONFIG.colors.secondary);
    } else {
        color.setHex(CONFIG.colors.accent);
    }
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    // Scale
    scales[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Central Geometry - Animated Torus Knot
const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16, 2, 3);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.colors.primary,
    emissive: CONFIG.colors.primary,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
    wireframe: false
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Wireframe overlay
const torusWireframeGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16, 2, 3);
const torusWireframeMaterial = new THREE.MeshBasicMaterial({
    color: CONFIG.colors.secondary,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torusWireframe = new THREE.Mesh(torusWireframeGeometry, torusWireframeMaterial);
scene.add(torusWireframe);

// Floating Cubes
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

for (let i = 0; i < 8; i++) {
    const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? CONFIG.colors.primary : CONFIG.colors.secondary,
        emissive: i % 2 === 0 ? CONFIG.colors.primary : CONFIG.colors.secondary,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.3
    });
    const cube = new THREE.Mesh(cubeGeometry, material);
    
    const angle = (i / 8) * Math.PI * 2;
    const radius = 3;
    cube.position.x = Math.cos(angle) * radius;
    cube.position.z = Math.sin(angle) * radius;
    cube.position.y = Math.sin(i) * 0.5;
    
    scene.add(cube);
    cubes.push({
        mesh: cube,
        angle: angle,
        radius: radius,
        speed: 0.3 + Math.random() * 0.2
    });
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(CONFIG.colors.primary, 2, 10);
pointLight1.position.set(2, 2, 2);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(CONFIG.colors.secondary, 2, 10);
pointLight2.position.set(-2, -2, -2);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(CONFIG.colors.accent, 1.5, 8);
pointLight3.position.set(0, 3, 0);
scene.add(pointLight3);

// Mouse interaction
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotation.x = mouse.y * 0.5;
    targetRotation.y = mouse.x * 0.5;
});

// Raycaster for hover effects
const raycaster = new THREE.Raycaster();
let hoveredObject = null;

// Navigation and Section Management
let currentSection = 0;
const sections = document.querySelectorAll('.content-section');
let isScrolling = false;

function navigateToSection(index) {
    if (isScrolling || index === currentSection) return;
    
    isScrolling = true;
    currentSection = index;
    
    // Update active section
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });
    
    // Animate camera based on section
    animateCameraForSection(index);
    
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

function animateCameraForSection(index) {
    const positions = [
        { x: 0, y: 0, z: 5 },      // Home
        { x: 2, y: 1, z: 4 },       // About
        { x: -2, y: -1, z: 5 },     // Skills
        { x: 1, y: 2, z: 6 },       // Projects
        { x: 0, y: -1, z: 4 }       // Contact
    ];
    
    const targetPos = positions[index];
    
    gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: 'power2.inOut'
    });
}

// Scroll handling
let scrollTimeout;
window.addEventListener('wheel', (event) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            navigateToSection(currentSection + 1);
        } else if (event.deltaY < 0 && currentSection > 0) {
            navigateToSection(currentSection - 1);
        }
    }, 50);
}, { passive: true });

// Navigation clicks
document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection(index);
    });
});

// Button navigation
document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', () => {
        const section = parseInt(button.getAttribute('data-section'));
        navigateToSection(section);
    });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Cette fonctionnalité sera bientôt disponible.');
    contactForm.reset();
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate central torus
    torus.rotation.x = elapsedTime * 0.2;
    torus.rotation.y = elapsedTime * 0.3;
    torusWireframe.rotation.x = elapsedTime * 0.2;
    torusWireframe.rotation.y = elapsedTime * 0.3;
    
    // Animate cubes
    cubes.forEach((cubeData, index) => {
        cubeData.angle += 0.01 * cubeData.speed;
        cubeData.mesh.position.x = Math.cos(cubeData.angle) * cubeData.radius;
        cubeData.mesh.position.z = Math.sin(cubeData.angle) * cubeData.radius;
        cubeData.mesh.position.y = Math.sin(elapsedTime + index) * 0.5;
        cubeData.mesh.rotation.x += 0.01;
        cubeData.mesh.rotation.y += 0.01;
    });
    
    // Animate particles
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.002;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = elapsedTime * 0.05;
    
    // Animate lights
    pointLight1.position.x = Math.sin(elapsedTime) * 3;
    pointLight1.position.z = Math.cos(elapsedTime) * 3;
    pointLight2.position.x = Math.cos(elapsedTime * 0.7) * 3;
    pointLight2.position.z = Math.sin(elapsedTime * 0.7) * 3;
    
    // Mouse interaction
    torus.rotation.x += (targetRotation.x - torus.rotation.x) * 0.05;
    torus.rotation.y += (targetRotation.y - torus.rotation.y) * 0.05;
    
    // Raycaster for hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([torus, ...cubes.map(c => c.mesh)]);
    
    if (intersects.length > 0) {
        if (hoveredObject !== intersects[0].object) {
            if (hoveredObject) {
                gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            }
            hoveredObject = intersects[0].object;
            gsap.to(hoveredObject.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
            document.body.style.cursor = 'pointer';
        }
    } else {
        if (hoveredObject) {
            gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            hoveredObject = null;
            document.body.style.cursor = 'default';
        }
    }
    
    // Update controls
    controls.update();
    
    // Render
    composer.render();
}

// Window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// GSAP for smooth animations (using CDN fallback if not available)
const gsap = window.gsap || {
    to: (target, vars) => {
        const duration = (vars.duration || 1) * 1000;
        const start = performance.now();
        const startValues = {};
        
        Object.keys(vars).forEach(key => {
            if (key !== 'duration' && key !== 'ease' && typeof target[key] === 'number') {
                startValues[key] = target[key];
            }
        });
        
        function update() {
            const elapsed = performance.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            
            Object.keys(startValues).forEach(key => {
                target[key] = startValues[key] + (vars[key] - startValues[key]) * progress;
            });
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
};

// Start animation
animate();

// Hide scroll indicator after initial view
setTimeout(() => {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        setTimeout(() => {
            scrollIndicator.style.display = 'none';
        }, 500);
    }
}, 5000);
