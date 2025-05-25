import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Building = ({
  position,
  height,
  width,
  depth,
  color,
}: {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.position.y =
        position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.1;
    }
  });

  return (
    <mesh position={position} ref={mesh} castShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const City = () => {
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0015;
    }
  });

  const buildings = [];
  const gridSize = 4;
  const spacing = 5;

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      if (Math.random() > 0.75) continue;
      const height = 2 + Math.random() * 8;
      buildings.push(
        <Building
          key={`building-${x}-${z}`}
          position={[x * spacing, height / 2, z * spacing]}
          height={height}
          width={1.5}
          depth={1.5}
          color="#ffffff"
        />
      );
    }
  }

  return <group ref={group}>{buildings}</group>;
};

const Background = () => {
  return (
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [20, 10, 20], fov: 60 }}
          gl={{ antialias: true }}
          eventSource={null}
          eventPrefix=""
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <fog attach="fog" args={['#000000', 15, 50]} />
          <City />
        </Canvas>
      </div>

      {/* Optional dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Background;

