"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron, Torus, Sphere } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

// --- Mouse Reactive Wrapper ---
function SceneWrapper({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate rotation towards mouse position
      const targetX = (state.pointer.y * Math.PI) / 10;
      const targetY = (state.pointer.x * Math.PI) / 10;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 2 * delta);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 2 * delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// --- Animated Particles ---
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000);
    random.inSphere(positions, { radius: 10 });
    // Safety check to prevent THREE.BufferGeometry NaN radius crashes
    for (let i = 0; i < positions.length; i++) {
      if (!Number.isFinite(positions[i])) {
        positions[i] = 0; // Fallback to safe origin if invalid
      }
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// --- Floating Abstract Objects ---
function FloatingGeometries() {
  // Generate random positions and rotations for floating objects
  const objects = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5 // Push back on Z axis
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      type: Math.floor(Math.random() * 3) // 0: Icosahedron, 1: Torus, 2: Sphere
    }));
  }, []);

  const material = new THREE.MeshStandardMaterial({
    color: "#1a1a1a",
    roughness: 0.1,
    metalness: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });

  return (
    <>
      {objects.map((obj, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={3}>
          <mesh
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
            material={material}
          >
            {obj.type === 0 && <icosahedronGeometry args={[1, 0]} />}
            {obj.type === 1 && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
            {obj.type === 2 && <sphereGeometry args={[1, 16, 16]} />}
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function BackgroundParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020202]">
      {/* 
        Optimize performance:
        dpr={[1, 2]} limits pixel ratio for better performance on high-res displays.
        camera settings optimize the view frustum.
      */}
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        {/* Depth effect using fog */}
        <fog attach="fog" args={["#020202", 5, 25]} />
        
        {/* Ambient and directional lighting for 3D depth */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#3b82f6" penumbra={1} />

        <SceneWrapper>
          <ParticleCloud />
          <FloatingGeometries />
        </SceneWrapper>
      </Canvas>
    </div>
  );
}
