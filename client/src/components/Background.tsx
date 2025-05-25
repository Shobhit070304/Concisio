import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from '../../node_modules/@types/three';

const Building = ({ position, height, width, depth, color }: {
  position: [number, number, number],
  height: number,
  width: number,
  depth: number,
  color: string
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.1;
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

  // 🔧 State to track dragging
  const isDragging = useRef(false);
  const previous = useRef<[number, number] | null>(null);
  const rotation = useRef<[number, number]>([0, 0]);

  const { gl } = useThree();

  useFrame(() => {
    if (group.current) {
      if (!isDragging.current) {
        group.current.rotation.y += 0.0015; // Auto rotation
      } else {
        // Manual rotation applied during drag
        group.current.rotation.y = rotation.current[0];
        group.current.rotation.x = rotation.current[1];
      }
    }
  });

  // 🎯 Setup Pointer Events on canvas
  React.useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: MouseEvent) => {
      if (e.button === 2) { // Right click
        isDragging.current = true;
        previous.current = [e.clientX, e.clientY];
      }
    };

    const onPointerUp = (e: MouseEvent) => {
      if (e.button === 2) {
        isDragging.current = false;
        previous.current = null;
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      if (isDragging.current && previous.current && group.current) {
        const [prevX, prevY] = previous.current;
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;

        rotation.current = [
          group.current.rotation.y + deltaX * 0.005,
          group.current.rotation.x + deltaY * 0.005,
        ];

        previous.current = [e.clientX, e.clientY];
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [gl]);

  // Generate buildings
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
          position={[x * spacing, height / 2 , z * spacing]}
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
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [20, 10, 20], fov: 60 }}
        gl={{ antialias: true }}
        onContextMenu={(e) => e.preventDefault()} // Disable right-click menu
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <fog attach="fog" args={['#000000', 15, 50]} />
        <City />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
};

export default Background;
