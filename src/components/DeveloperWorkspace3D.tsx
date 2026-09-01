import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playClickSound } from '../utils/audio';

interface DeveloperWorkspace3DProps {
  theme?: 'dark' | 'light';
  onInteract?: (item: string) => void;
}

export const DeveloperWorkspace3D: React.FC<DeveloperWorkspace3DProps> = ({
  theme = 'dark',
  onInteract,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lampOn, setLampOn] = useState(true);
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  const lampOnRef = useRef(lampOn);
  lampOnRef.current = lampOn;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x0a0c14 : 0xf8fafc, 0.045);

    // --- 2. CAMERA SETUP ---
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Isometric-style angled 3D camera view
    camera.position.set(7.5, 5.5, 8.5);
    camera.lookAt(0, 0.8, 0);

    // --- 3. RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- 4. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x1e2640 : 0xe2e8f0,
      theme === 'dark' ? 1.4 : 2.0
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xdbeafe, 1.6);
    dirLight.position.set(5, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Cyan accent fill light
    const cyanFillLight = new THREE.PointLight(0x38bdf8, 2.8, 12);
    cyanFillLight.position.set(-3, 2, 2);
    scene.add(cyanFillLight);

    // Neon contour base rim light
    const baseRimLight = new THREE.PointLight(0x0284c7, 3.5, 8);
    baseRimLight.position.set(0, 0.2, 0);
    scene.add(baseRimLight);

    // --- 5. MATERIALS PALETTE ---
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x121520,
      metalness: 0.85,
      roughness: 0.25,
    });

    const brushedChromeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.15,
    });

    const deskTopMat = new THREE.MeshStandardMaterial({
      color: 0x151824,
      metalness: 0.3,
      roughness: 0.35,
    });

    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const neonBlueMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const chairLeatherMat = new THREE.MeshStandardMaterial({
      color: 0x0f111a,
      metalness: 0.2,
      roughness: 0.6,
    });

    const plantGreenMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
    });

    const plantDarkGreenMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.5,
    });

    const plantPotMat = new THREE.MeshStandardMaterial({
      color: 0x1e2230,
      roughness: 0.7,
    });

    // --- 6. ROOT 3D WORKSPACE GROUP ---
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // --- 7. CONTOURED PLATFORM BASE & NEON OUTLINE ---
    const platformRadius = 3.8;
    const platformGeo = new THREE.CylinderGeometry(platformRadius, platformRadius + 0.3, 0.25, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c14,
      metalness: 0.7,
      roughness: 0.4,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.125;
    platform.receiveShadow = true;
    workspaceGroup.add(platform);

    // Glowing Neon Edge Ring
    const neonRingGeo = new THREE.TorusGeometry(platformRadius + 0.15, 0.045, 16, 64);
    const neonRing = new THREE.Mesh(neonRingGeo, neonCyanMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = 0.01;
    workspaceGroup.add(neonRing);

    // Inner subtle glow disc
    const discGeo = new THREE.CircleGeometry(platformRadius, 64);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = Math.PI / 2;
    disc.position.y = 0.02;
    workspaceGroup.add(disc);

    // --- 8. CURVED DEVELOPER DESK ---
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0, -0.2);
    workspaceGroup.add(deskGroup);

    // Desk Top (Sleek Chamfered Slab)
    const deskShape = new THREE.Shape();
    const dw = 3.6;
    const dd = 1.9;
    const dr = 0.35;
    deskShape.moveTo(-dw / 2 + dr, -dd / 2);
    deskShape.lineTo(dw / 2 - dr, -dd / 2);
    deskShape.quadraticCurveTo(dw / 2, -dd / 2, dw / 2, -dd / 2 + dr);
    deskShape.lineTo(dw / 2, dd / 2 - dr);
    deskShape.quadraticCurveTo(dw / 2, dd / 2, dw / 2 - dr, dd / 2);
    deskShape.lineTo(-dw / 2 + dr, dd / 2);
    deskShape.quadraticCurveTo(-dw / 2, dd / 2, -dw / 2, dd / 2 - dr);
    deskShape.lineTo(-dw / 2, -dd / 2 + dr);
    deskShape.quadraticCurveTo(-dw / 2, -dd / 2, -dw / 2 + dr, -dd / 2);

    const deskExtrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };
    const deskGeo = new THREE.ExtrudeGeometry(deskShape, deskExtrudeSettings);
    const deskMesh = new THREE.Mesh(deskGeo, deskTopMat);
    deskMesh.rotation.x = Math.PI / 2;
    deskMesh.position.set(0, 1.8, 0);
    deskMesh.castShadow = true;
    deskMesh.receiveShadow = true;
    deskGroup.add(deskMesh);

    // Desk Cyan Underglow Edge Ribbon
    const deskEdgeGlowGeo = new THREE.BoxGeometry(3.68, 0.025, 0.025);
    const deskEdgeGlow = new THREE.Mesh(deskEdgeGlowGeo, neonCyanMat);
    deskEdgeGlow.position.set(0, 1.76, 0.95);
    deskGroup.add(deskEdgeGlow);

    // Desk Left Legs (Dual metallic round pillars)
    const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.75, 24);
    const leg1 = new THREE.Mesh(legGeo, brushedChromeMat);
    leg1.position.set(-1.4, 0.875, 0.6);
    leg1.castShadow = true;
    deskGroup.add(leg1);

    const leg2 = new THREE.Mesh(legGeo, brushedChromeMat);
    leg2.position.set(-1.4, 0.875, -0.6);
    leg2.castShadow = true;
    deskGroup.add(leg2);

    const legCrossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16), brushedChromeMat);
    legCrossBar.rotation.x = Math.PI / 2;
    legCrossBar.position.set(-1.4, 0.4, 0);
    deskGroup.add(legCrossBar);

    // Right Storage / Server Tower Cabinet Base
    const cabinetGeo = new THREE.BoxGeometry(0.7, 1.75, 1.4);
    const cabinetMesh = new THREE.Mesh(cabinetGeo, darkMetalMat);
    cabinetMesh.position.set(1.3, 0.875, 0);
    cabinetMesh.castShadow = true;
    cabinetMesh.receiveShadow = true;
    deskGroup.add(cabinetMesh);

    // Cabinet Status LED Glow lines
    for (let i = 0; i < 3; i++) {
      const ledBar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.01), neonCyanMat);
      ledBar.position.set(1.3, 0.5 + i * 0.4, 0.71);
      deskGroup.add(ledBar);
    }

    // --- 9. DYNAMIC CODE TEXTURE FOR LAPTOP ---
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 512;
    codeCanvas.height = 320;
    const ctx = codeCanvas.getContext('2d');

    const codeSnippets = [
      [
        { text: "import { Developer } from '@future/ai';", color: '#60a5fa' },
        { text: "import { Cloud } from '@native/systems';", color: '#c084fc' },
        { text: '', color: '' },
        { text: 'const nithin = new Developer({', color: '#f472b6' },
        { text: "  name: 'Marthala Nithin Reddy',", color: '#34d399' },
        { text: "  role: 'Full Stack & AI Engineer',", color: '#fbbf24' },
        { text: "  stack: ['React', 'Node', 'Python', 'AWS'],", color: '#38bdf8' },
        { text: '  performance: 1.0,', color: '#f87171' },
        { text: '});', color: '#f472b6' },
        { text: '', color: '' },
        { text: 'await nithin.buildScalableProduct();', color: '#a78bfa' },
        { text: '// Ready for high-impact innovation', color: '#64748b' },
      ],
      [
        { text: "import { Agent, GenAI } from '@google/genai';", color: '#38bdf8' },
        { text: '', color: '' },
        { text: 'export async function initArchitecture() {', color: '#c084fc' },
        { text: '  const cloud = await AWS.deployCluster({', color: '#fbbf24' },
        { text: '    microservices: 12,', color: '#34d399' },
        { text: "    latency: '< 15ms',", color: '#60a5fa' },
        { text: '    uptime: 0.9999', color: '#f87171' },
        { text: '  });', color: '#fbbf24' },
        { text: '  return cloud.stream();', color: '#38bdf8' },
        { text: '}', color: '#c084fc' },
      ],
    ];

    function drawCodeScreen(snippetIndex: number, cursorVisible = true) {
      if (!ctx) return;
      ctx.fillStyle = '#0a0c16';
      ctx.fillRect(0, 0, 512, 320);

      // IDE Title bar
      ctx.fillStyle = '#141824';
      ctx.fillRect(0, 0, 512, 36);

      // Window controls dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(20, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(36, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(52, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      // Tab Title
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('Workspace.tsx', 80, 22);

      // Syntax Lines
      const lines = codeSnippets[snippetIndex % codeSnippets.length];
      let y = 62;
      ctx.font = '13px monospace';
      lines.forEach((l, idx) => {
        // Line number
        ctx.fillStyle = '#334155';
        ctx.fillText((idx + 1).toString().padStart(2, '0'), 16, y);

        // Text
        if (l.text) {
          ctx.fillStyle = l.color;
          ctx.fillText(l.text, 44, y);
        }
        y += 21;
      });

      // Blinking cursor on last line
      if (cursorVisible) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(290, y - 21 - 12, 8, 15);
      }
    }

    drawCodeScreen(0, true);
    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    codeTexture.minFilter = THREE.LinearFilter;

    // --- 10. LAPTOP 3D MESH ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.25, 1.83, 0.1);
    laptopGroup.rotation.y = 0.15;
    deskGroup.add(laptopGroup);

    // Laptop Base
    const laptopBaseGeo = new THREE.BoxGeometry(1.3, 0.035, 0.9);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, darkMetalMat);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.005, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x090a10, roughness: 0.2 })
    );
    trackpad.position.set(0, 0.02, 0.24);
    laptopGroup.add(trackpad);

    // Keyboard Keybed Recess
    const keybed = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.01, 0.44),
      new THREE.MeshStandardMaterial({ color: 0x08090f, roughness: 0.7 })
    );
    keybed.position.set(0, 0.02, -0.12);
    laptopGroup.add(keybed);

    // Laptop Screen Assembly
    const screenHingeGroup = new THREE.Group();
    screenHingeGroup.position.set(0, 0.02, -0.44);
    screenHingeGroup.rotation.x = -Math.PI / 1.7; // ~105 degree tilt
    laptopGroup.add(screenHingeGroup);

    // Screen Lid Back
    const screenLid = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.86, 0.025), darkMetalMat);
    screenLid.position.set(0, 0.43, 0);
    screenLid.castShadow = true;
    screenHingeGroup.add(screenLid);

    // Screen Glass / Code Display
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
    });
    const screenDisplay = new THREE.Mesh(new THREE.PlaneGeometry(1.22, 0.76), screenDisplayMat);
    screenDisplay.position.set(0, 0.43, 0.014);
    screenHingeGroup.add(screenDisplay);

    // --- 11. RETRO-MODERN DESK LAMP ---
    const lampGroup = new THREE.Group();
    lampGroup.position.set(1.2, 1.83, -0.45);
    deskGroup.add(lampGroup);

    // Lamp Base
    const lampBaseGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.04, 32);
    const lampBase = new THREE.Mesh(lampBaseGeo, darkMetalMat);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Lamp Stem Lower
    const stemLower = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 16), brushedChromeMat);
    stemLower.position.set(0, 0.45, 0);
    stemLower.rotation.z = -0.3;
    stemLower.rotation.x = 0.2;
    stemLower.castShadow = true;
    lampGroup.add(stemLower);

    // Joint Pivot Sphere
    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), darkMetalMat);
    joint.position.set(0.25, 0.85, -0.15);
    lampGroup.add(joint);

    // Lamp Stem Upper
    const stemUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.8, 16), brushedChromeMat);
    stemUpper.position.set(0, 1.2, 0);
    stemUpper.rotation.z = 0.45;
    stemUpper.rotation.x = -0.3;
    stemUpper.castShadow = true;
    lampGroup.add(stemUpper);

    // Lamp Cone Shade
    const shadeGeo = new THREE.ConeGeometry(0.22, 0.35, 24, 1, true);
    const shadeMesh = new THREE.Mesh(shadeGeo, darkMetalMat);
    shadeMesh.position.set(-0.35, 1.45, 0.25);
    shadeMesh.rotation.x = Math.PI / 1.35;
    shadeMesh.rotation.y = -0.3;
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    // Glowing Bulb
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
    const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), bulbMat);
    bulbMesh.position.set(-0.35, 1.42, 0.25);
    lampGroup.add(bulbMesh);

    // Real Spotlight Casting down on Desk
    const lampSpotlight = new THREE.SpotLight(0xfef08a, 4.5);
    lampSpotlight.position.set(-0.35, 1.45, 0.25);
    lampSpotlight.target = laptopGroup;
    lampSpotlight.angle = Math.PI / 4.2;
    lampSpotlight.penumbra = 0.6;
    lampSpotlight.decay = 1.8;
    lampSpotlight.distance = 4.5;
    lampSpotlight.castShadow = true;
    lampSpotlight.shadow.mapSize.width = 512;
    lampSpotlight.shadow.mapSize.height = 512;
    lampGroup.add(lampSpotlight);

    // --- 12. POTTED PLANT ---
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-1.35, 1.83, -0.4);
    deskGroup.add(plantGroup);

    // Pot
    const potGeo = new THREE.CylinderGeometry(0.18, 0.13, 0.32, 24);
    const potMesh = new THREE.Mesh(potGeo, plantPotMat);
    potMesh.position.y = 0.16;
    potMesh.castShadow = true;
    plantGroup.add(potMesh);

    // Soil
    const soilMesh = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), new THREE.MeshStandardMaterial({ color: 0x0f1118, roughness: 0.9 }));
    soilMesh.rotation.x = -Math.PI / 2;
    soilMesh.position.y = 0.31;
    plantGroup.add(soilMesh);

    // Fanned Monstera Leaves
    const leafAngles = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4];
    leafAngles.forEach((ang, i) => {
      const leafGeo = new THREE.PlaneGeometry(0.24, 0.42);
      const leaf = new THREE.Mesh(leafGeo, i % 2 === 0 ? plantGreenMat : plantDarkGreenMat);
      leaf.position.set(Math.cos(ang) * 0.1, 0.35 + (i % 3) * 0.05, Math.sin(ang) * 0.1);
      leaf.rotation.y = ang;
      leaf.rotation.x = -0.5 - (i % 2) * 0.3;
      leaf.castShadow = true;
      plantGroup.add(leaf);
    });

    // --- 13. CERAMIC COFFEE MUG WITH </> SYMBOL ---
    const mugGroup = new THREE.Group();
    mugGroup.position.set(0.7, 1.83, 0.4);
    deskGroup.add(mugGroup);

    const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.22, 24), darkMetalMat);
    mugBody.position.y = 0.11;
    mugBody.castShadow = true;
    mugGroup.add(mugBody);

    const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.02, 12, 24, Math.PI), darkMetalMat);
    mugHandle.rotation.y = Math.PI / 2;
    mugHandle.position.set(0.1, 0.11, 0);
    mugGroup.add(mugHandle);

    // Dark coffee liquid
    const coffeeLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.088, 20), new THREE.MeshStandardMaterial({ color: 0x241208, roughness: 0.1 }));
    coffeeLiquid.rotation.x = -Math.PI / 2;
    coffeeLiquid.position.y = 0.21;
    mugGroup.add(coffeeLiquid);

    // Steam Particles
    const steamCount = 15;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 0.08;
      steamPos[i * 3 + 1] = 0.25 + Math.random() * 0.3;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.04,
      transparent: true,
      opacity: 0.3,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    mugGroup.add(steamParticles);

    // --- 14. ERGONOMIC EXECUTIVE OFFICE CHAIR ---
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 1.45);
    chairGroup.rotation.y = Math.PI;
    workspaceGroup.add(chairGroup);

    // Star Base 5-legs
    for (let i = 0; i < 5; i++) {
      const starAngle = (i * Math.PI * 2) / 5;
      const legBar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.65), brushedChromeMat);
      legBar.rotation.y = starAngle;
      legBar.position.set(Math.sin(starAngle) * 0.3, 0.08, Math.cos(starAngle) * 0.3);
      legBar.castShadow = true;
      chairGroup.add(legBar);

      // Caster wheel
      const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), darkMetalMat);
      wheel.position.set(Math.sin(starAngle) * 0.6, 0.04, Math.cos(starAngle) * 0.6);
      chairGroup.add(wheel);
    }

    // Central Hydraulic Piston
    const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 20), brushedChromeMat);
    piston.position.y = 0.42;
    chairGroup.add(piston);

    // Seat Cushion (Ergonomic Curved)
    const seatGeo = new THREE.CylinderGeometry(0.65, 0.6, 0.14, 32);
    seatGeo.scale(1, 1, 1.1);
    const seat = new THREE.Mesh(seatGeo, chairLeatherMat);
    seat.position.y = 0.8;
    seat.castShadow = true;
    chairGroup.add(seat);

    // Ergonomic High Backrest
    const backrestGeo = new THREE.BoxGeometry(0.9, 1.15, 0.12);
    const backrest = new THREE.Mesh(backrestGeo, chairLeatherMat);
    backrest.position.set(0, 1.42, 0.5);
    backrest.rotation.x = -0.15;
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Armrests
    [-0.55, 0.55].forEach((xSide) => {
      const armPost = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12), brushedChromeMat);
      armPost.position.set(xSide, 0.95, 0.1);
      chairGroup.add(armPost);

      const armPad = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.45), darkMetalMat);
      armPad.position.set(xSide, 1.14, 0.1);
      chairGroup.add(armPad);
    });

    // --- 15. ILLUMINATED "MR" MONOGRAM CUBE ---
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(1.9, 0.42, 1.5);
    workspaceGroup.add(cubeGroup);

    // Monogram Texture Canvas
    const mrCanvas = document.createElement('canvas');
    mrCanvas.width = 256;
    mrCanvas.height = 256;
    const mrCtx = mrCanvas.getContext('2d');
    if (mrCtx) {
      mrCtx.fillStyle = '#06080e';
      mrCtx.fillRect(0, 0, 256, 256);
      mrCtx.strokeStyle = '#38bdf8';
      mrCtx.lineWidth = 14;
      mrCtx.strokeRect(12, 12, 232, 232);

      mrCtx.fillStyle = '#ffffff';
      mrCtx.font = "900 110px 'Plus Jakarta Sans', sans-serif";
      mrCtx.textAlign = 'center';
      mrCtx.textBaseline = 'middle';
      mrCtx.shadowColor = '#38bdf8';
      mrCtx.shadowBlur = 20;
      mrCtx.fillText('MR', 128, 132);
    }
    const mrTexture = new THREE.CanvasTexture(mrCanvas);

    const mrCubeGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const mrCubeMats = [
      darkMetalMat,
      darkMetalMat,
      darkMetalMat,
      darkMetalMat,
      new THREE.MeshBasicMaterial({ map: mrTexture }), // Front Face
      darkMetalMat,
    ];
    const mrCubeMesh = new THREE.Mesh(mrCubeGeo, mrCubeMats);
    mrCubeMesh.castShadow = true;
    cubeGroup.add(mrCubeMesh);

    // Wireframe neon border around MR cube
    const cubeEdges = new THREE.EdgesGeometry(mrCubeGeo);
    const cubeWireframe = new THREE.LineSegments(
      cubeEdges,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    cubeGroup.add(cubeWireframe);

    // Dedicated PointLight for the MR Cube
    const cubePointLight = new THREE.PointLight(0x38bdf8, 2.5, 3.5);
    cubePointLight.position.set(0, 0, 0.5);
    cubeGroup.add(cubePointLight);

    // --- 16. FLOATING 3D HOLOGRAPHIC TECH STACK TILES ---
    const techGroup = new THREE.Group();
    techGroup.position.set(2.4, 2.7, -0.6);
    workspaceGroup.add(techGroup);

    // Floating Glass Card Container
    const glassCardGeo = new THREE.BoxGeometry(1.9, 2.1, 0.05);
    const glassCardMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
    });
    const glassCard = new THREE.Mesh(glassCardGeo, glassCardMat);
    techGroup.add(glassCard);

    // Floating Tech Stack Grid Tiles (3x3)
    const techItems = [
      { name: 'React', color: '#38bdf8' },
      { name: 'JS', color: '#facc15' },
      { name: 'TS', color: '#3b82f6' },
      { name: 'Node', color: '#22c55e' },
      { name: 'Mongo', color: '#16a34a' },
      { name: 'Python', color: '#eab308' },
      { name: 'Tailwind', color: '#0ea5e9' },
      { name: 'Git', color: '#ea580c' },
      { name: 'Docker', color: '#0284c7' },
    ];

    techItems.forEach((tech, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = 128;
      tileCanvas.height = 128;
      const tCtx = tileCanvas.getContext('2d');
      if (tCtx) {
        tCtx.fillStyle = '#151926';
        tCtx.fillRect(0, 0, 128, 128);
        tCtx.strokeStyle = '#2d3748';
        tCtx.lineWidth = 6;
        tCtx.strokeRect(6, 6, 116, 116);

        tCtx.fillStyle = tech.color;
        tCtx.font = "bold 36px 'Plus Jakarta Sans', sans-serif";
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText(tech.name, 64, 64);
      }

      const tileTex = new THREE.CanvasTexture(tileCanvas);
      const tileMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.48, 0.04),
        new THREE.MeshStandardMaterial({
          map: tileTex,
          metalness: 0.5,
          roughness: 0.3,
        })
      );
      tileMesh.position.set((col - 1) * 0.56, (1 - row) * 0.56, 0.04);
      techGroup.add(tileMesh);
    });

    // --- 17. AMBIENT GLOWING CODE DUST PARTICLES ---
    const ambientParticleCount = 80;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(ambientParticleCount * 3);
    for (let i = 0; i < ambientParticleCount; i++) {
      partPos[i * 3] = (Math.random() - 0.5) * 12;
      partPos[i * 3 + 1] = Math.random() * 6;
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    });
    const ambientParticles = new THREE.Points(partGeo, partMat);
    scene.add(ambientParticles);

    // --- 18. INTERACTION RAYCASTING & PARALLAX ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.x = x;
      mouse.y = y;

      // Parallax smooth bounds
      targetRotationY = x * 0.22;
      targetRotationX = y * 0.14;
    };

    const handleMouseLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
      mouse.x = -100;
      mouse.y = -100;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const intersects = raycaster.intersectObjects(workspaceGroup.children, true);
      if (intersects.length > 0) {
        let currentObj: THREE.Object3D | null = intersects[0].object;
        let isLamp = false;
        let isLaptop = false;
        let isMrCube = false;

        while (currentObj) {
          if (currentObj === lampGroup) isLamp = true;
          if (currentObj === laptopGroup) isLaptop = true;
          if (currentObj === cubeGroup) isMrCube = true;
          currentObj = currentObj.parent;
        }

        if (isLamp) {
          playClickSound();
          const nextState = !lampOnRef.current;
          setLampOn(nextState);
          lampSpotlight.intensity = nextState ? 4.5 : 0.0;
          bulbMat.color.setHex(nextState ? 0xfffbeb : 0x334155);
          onInteract?.('Lamp');
        } else if (isLaptop) {
          playClickSound();
          setActiveCodeIndex((prev) => {
            const nextIdx = (prev + 1) % codeSnippets.length;
            drawCodeScreen(nextIdx, true);
            codeTexture.needsUpdate = true;
            return nextIdx;
          });
          onInteract?.('Laptop');
        } else if (isMrCube) {
          playClickSound();
          cubePointLight.intensity = 6.0;
          setTimeout(() => {
            cubePointLight.intensity = 2.5;
          }, 350);
          onInteract?.('MR Monogram');
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('click', handleClick);

    // --- 19. RESPONSIVE RESIZE OBSERVER ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          // Dynamically adjust camera zoom distance based on screen width
          if (newWidth < 480) {
            camera.position.set(9.2, 6.8, 10.5);
          } else if (newWidth < 768) {
            camera.position.set(8.2, 6.0, 9.5);
          } else {
            camera.position.set(7.5, 5.5, 8.5);
          }
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // --- 20. 60FPS RENDER LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let cursorBlinkTimer = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / scene damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      workspaceGroup.rotation.y = currentRotationY;
      workspaceGroup.rotation.x = currentRotationX;

      // Gentle floating animation for the workspace and tech stack
      workspaceGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;
      techGroup.position.y = 2.7 + Math.sin(elapsedTime * 1.5) * 0.12;
      techGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.08;

      // Pulse MR cube glow
      cubePointLight.intensity = 2.2 + Math.sin(elapsedTime * 3) * 0.8;

      // Ambient particle drift
      const positions = partGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientParticleCount; i++) {
        positions[i * 3 + 1] += 0.005;
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = 0;
        }
      }
      partGeo.attributes.position.needsUpdate = true;

      // Blinking Cursor on Laptop screen
      cursorBlinkTimer += delta;
      if (cursorBlinkTimer > 0.6) {
        cursorBlinkTimer = 0;
        drawCodeScreen(activeCodeIndex, Math.sin(elapsedTime * 5) > 0);
        codeTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- 21. CLEANUP ON UNMOUNT ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);

      renderer.dispose();
      scene.clear();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
    >
      {/* Interactive Micro-hint Pill on 3D Canvas */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0c0e16]/80 border border-white/10 backdrop-blur-md text-[11px] text-gray-400 font-mono flex items-center gap-2 pointer-events-none z-10 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Interactive 3D • Click Lamp/Laptop • Move to Rotate</span>
      </div>
    </div>
  );
};
