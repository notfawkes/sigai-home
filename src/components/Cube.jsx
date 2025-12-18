import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import '../App.css';

// The Cubelet component remains the same
const Cubelet = ({ position }) => {
  // ... (Your original Cubelet code)
  return (
    <group position={position}>
      {/* Core cube body */}
      <Box args={[9.8, 9.8, 9.8]}>
        <meshPhysicalMaterial
          color="#8ba7cf"
          emissive="#ffffff"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.95}
          clearcoat={0.8}
        />
      </Box>

      {/* Simulated gradient face planes + border */}
      {[
        { pos: [0, 0, 4.95], rot: [0, 0, 0] }, // front
        { pos: [0, 0, -4.95], rot: [0, Math.PI, 0] }, // back
        { pos: [4.95, 0, 0], rot: [0, Math.PI / 2, 0] }, // right
        { pos: [-4.95, 0, 0], rot: [0, -Math.PI / 2, 0] }, // left
        { pos: [0, 4.95, 0], rot: [-Math.PI / 2, 0, 0] }, // top
        { pos: [0, -4.95, 0], rot: [Math.PI / 2, 0, 0] }, // bottom
      ].map(({ pos, rot }, i) => (
        <group key={i} position={pos} rotation={rot}>
          {/* Gradient face */}
          <Box args={[10, 10, 0.06]}>
            <meshPhysicalMaterial
              color="#759fd8ff"
              emissive="#b8b7c0ff"
              emissiveIntensity={0.9}
              metalness={0.6}
              roughness={0.2}
              transparent
              opacity={0.95}
              clearcoat={0.9}
            />
          </Box>

          {/* Border simulation */}
          <Box args={[10.1, 10.1, 0.02]}>
            <meshPhysicalMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.25}
              metalness={0.3}
              roughness={0.4}
            />
          </Box>
        </group>
      ))}

      {/* Outer glow cube */}
      <Box args={[10.2, 10.2, 10.2]}>
        <meshPhysicalMaterial
          color="#ffffffff"
          emissive="#b4dcff"
          emissiveIntensity={1.4}
          transparent
          opacity={0.2}
          roughness={0.3}
          metalness={0.6}
        />
      </Box>
    </group>
  );
};


const RubiksCube = () => {
  // ... (Your original useState and useEffect logic remains the same)
  const [positions, setPositions] = useState([[0, 0, 0]]);

  useEffect(() => {
    const spacing = 15.0;

    const generatePhasePositions = () => {
      const phases = [];
      phases.push([[0, 0, 0]]);
      phases.push([
        [-spacing, 0, 0],
        [0, 0, 0],
        [spacing, 0, 0],
      ]);
      const phase2 = [];
      [-spacing, 0, spacing].forEach((y) => {
        [-spacing, 0, spacing].forEach((x) => {
          phase2.push([x, y, 0]);
        });
      });
      phases.push(phase2);
      const phase3 = [];
      [-spacing, 0, spacing].forEach((z) => {
        phase2.forEach(([x, y]) => {
          phase3.push([x, y, z]);
        });
      });
      phases.push(phase3);
      return phases;
    };

    const phases = generatePhasePositions();
    const sequence = [0, 1, 2, 3, 2, 1, 0];
    const delays = [1400, 1400, 1600, 2400, 1600, 1400, 1400];
    let idx = 0;
    let timer;
    const step = () => {
      setPositions(phases[sequence[idx]]);
      const d = delays[idx];
      idx = (idx + 1) % sequence.length;
      timer = setTimeout(step, d);
    };
    step();
    return () => clearTimeout(timer);
  }, []);

  // Set all rotation values to 0
  const cubeRotation = [Math.PI / 4, Math.PI / -4, 0];

  return (
    <div className="cube-section">
      <Canvas
        shadows
        camera={{
          // Position the camera directly in front of the object
          position: [0, 0, 120],
          fov: 40,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
          precision: 'highp',
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          background: 'transparent',
          filter: 'none',
        }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[30, 30, 30]} intensity={0.4} color="#bff2ff" />

        {/* Apply the corrected rotation */}
        <group rotation={cubeRotation}>
          {positions.map((pos, i) => (
            <Cubelet key={`cube-${i}-${pos.join(',')}`} position={pos} />
          ))}
        </group>

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.9}
            height={480}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default RubiksCube;