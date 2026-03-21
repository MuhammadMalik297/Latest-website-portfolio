import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

const laneAccentMap = {
  cyan: { primary: '#8cf2ff', secondary: '#5f74ff', tertiary: '#ffd27a', ambient: '#081120' },
  violet: { primary: '#9a88ff', secondary: '#ff88c6', tertiary: '#8cf2ff', ambient: '#090f22' },
  gold: { primary: '#ffd27a', secondary: '#8cf2ff', tertiary: '#9a88ff', ambient: '#120e08' },
  magenta: { primary: '#ff88c6', secondary: '#9a88ff', tertiary: '#8cf2ff', ambient: '#120816' },
};

function EnergyCore({ palette, activeLaneIndex }) {
  const group = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const shell = useRef(null);
  const halo = useRef(null);
  const shards = useRef([]);

  const shardData = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        position: [
          Math.sin((index / 14) * Math.PI * 2) * (1.54 + (index % 4) * 0.14),
          (index % 5) * 0.22 - 0.48,
          Math.cos((index / 14) * Math.PI * 2) * (1.56 + (index % 3) * 0.14),
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      })),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();
    const laneTilt = (activeLaneIndex - 1.5) * 0.08;

    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, laneTilt, 0.04);
    group.current.position.y = Math.sin(t * 1.1) * 0.06;

    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.24;
      ringA.current.rotation.y += delta * 0.2;
    }

    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.32;
      ringB.current.rotation.y -= delta * 0.14;
    }

    if (shell.current) {
      shell.current.rotation.x -= delta * 0.12;
      shell.current.rotation.z += delta * 0.1;
      shell.current.scale.setScalar(1.02 + Math.sin(t * 1.4) * 0.02);
    }

    if (halo.current) {
      halo.current.scale.setScalar(1.05 + Math.sin(t * 1.8) * 0.03);
      halo.current.material.opacity = 0.08 + (Math.sin(t * 1.8) + 1) * 0.022;
    }

    shards.current.forEach((mesh, index) => {
      if (!mesh) return;
      mesh.rotation.x += delta * (0.18 + index * 0.012);
      mesh.rotation.y -= delta * (0.12 + index * 0.01);
      mesh.position.y += Math.sin(t * 1.1 + index) * 0.0008;
    });
  });

  const shardColors = [palette.primary, palette.secondary, palette.tertiary];

  return (
    <group ref={group} scale={0.84}>
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.4}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[0.96, 22]} />
          <MeshDistortMaterial
            color={palette.primary}
            emissive={palette.secondary}
            emissiveIntensity={1.9}
            roughness={0.06}
            metalness={0.28}
            distort={0.24}
            speed={1.8}
            transparent
            opacity={0.98}
          />
        </mesh>
      </Float>

      <mesh ref={shell}>
        <octahedronGeometry args={[1.32, 0]} />
        <meshStandardMaterial
          color={palette.secondary}
          emissive={palette.secondary}
          emissiveIntensity={1.5}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>

      <mesh ref={halo}>
        <sphereGeometry args={[1.42, 36, 36]} />
        <meshBasicMaterial color={palette.secondary} transparent opacity={0.1} />
      </mesh>

      <mesh ref={ringA} rotation={[0.62, 0.5, 0.22]}>
        <torusGeometry args={[1.56, 0.04, 24, 160]} />
        <meshStandardMaterial color={palette.primary} emissive={palette.primary} emissiveIntensity={1.95} transparent opacity={0.9} />
      </mesh>

      <mesh ref={ringB} rotation={[-0.84, 0.18, 1.1]}>
        <torusGeometry args={[1.86, 0.026, 18, 160]} />
        <meshStandardMaterial color={palette.tertiary} emissive={palette.tertiary} emissiveIntensity={1.9} transparent opacity={0.68} />
      </mesh>

      {shardData.map((item, index) => (
        <mesh
          key={`${item.position.join('-')}-${index}`}
          ref={(node) => {
            shards.current[index] = node;
          }}
          position={item.position}
          rotation={item.rotation}
        >
          <octahedronGeometry args={[0.09 + (index % 3) * 0.025, 0]} />
          <meshStandardMaterial
            color={shardColors[index % shardColors.length]}
            emissive={shardColors[index % shardColors.length]}
            emissiveIntensity={1.8}
            transparent
            opacity={0.8}
            roughness={0.14}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function LaneHotspots({ lanes, activeLaneIndex, onSelectLane }) {
  const layout = useMemo(
    () => [
      [-1.82, 0.88, 0.46],
      [1.82, 0.92, 0.48],
      [-1.42, -0.54, 0.84],
      [1.44, -0.58, 0.86],
    ],
    [],
  );

  return lanes.slice(0, 4).map((lane, index) => {
    const position = layout[index] ?? layout[layout.length - 1];
    const palette = laneAccentMap[lane.accent] ?? laneAccentMap.cyan;
    const active = index === activeLaneIndex;

    return (
      <group key={lane.key}>
        <Line
          points={[
            [0, 0, 0],
            position,
          ]}
          color={active ? palette.primary : palette.secondary}
          transparent
          opacity={active ? 0.82 : 0.22}
          lineWidth={active ? 2.4 : 1.1}
        />

        <Float speed={1.05 + index * 0.14} rotationIntensity={0.08} floatIntensity={0.12}>
          <group position={position}>
            <mesh onPointerOver={() => onSelectLane(index)} onClick={() => onSelectLane(index)}>
              <icosahedronGeometry args={[active ? 0.18 : 0.14, 1]} />
              <meshStandardMaterial
                color={active ? palette.primary : palette.secondary}
                emissive={active ? palette.primary : palette.secondary}
                emissiveIntensity={active ? 2.4 : 1.25}
                roughness={0.14}
                metalness={0.38}
              />
            </mesh>
            <mesh scale={active ? 1.84 : 1.24}>
              <sphereGeometry args={[0.28, 18, 18]} />
              <meshBasicMaterial color={palette.secondary} transparent opacity={active ? 0.13 : 0.05} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={active ? 1 : 0.86}>
              <torusGeometry args={[0.28, 0.012, 12, 64]} />
              <meshBasicMaterial color={active ? palette.primary : palette.secondary} transparent opacity={active ? 0.72 : 0.36} />
            </mesh>
          </group>
        </Float>
      </group>
    );
  });
}

export function HeroScene({ lanes = [], activeLaneIndex = 0, onSelectLane = () => {} }) {
  const activeLane = lanes[activeLaneIndex] ?? lanes[0] ?? { accent: 'cyan' };
  const palette = laneAccentMap[activeLane.accent] ?? laneAccentMap.cyan;

  return (
    <div className="hero-scene">
      <Canvas dpr={[1.1, 2.2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.04, 7.4]} fov={34} />
          <fog attach="fog" args={[palette.ambient, 6.8, 18]} />
          <ambientLight intensity={0.42} />
          <directionalLight position={[4, 4, 5]} intensity={1.2} color="#dbe5ff" />
          <pointLight position={[0, 0, 2.8]} intensity={16} color={palette.secondary} distance={12} />
          <pointLight position={[2.4, -1, 3]} intensity={8} color={palette.primary} distance={10} />
          <pointLight position={[-2.2, 1.2, 3]} intensity={6.4} color={palette.tertiary} distance={10} />
          <pointLight position={[0.1, -2.1, 2.4]} intensity={4.2} color="#d8e5ff" distance={10} />
          <Stars radius={92} depth={40} count={2200} factor={3.6} fade speed={0.8} />
          <Sparkles count={180} scale={[8.2, 6.2, 6.2]} size={3.6} speed={0.44} color="#d7e2ff" opacity={0.86} />
          <group position={[0, 0.28, 0]}>
            <EnergyCore palette={palette} activeLaneIndex={activeLaneIndex} />
            <LaneHotspots lanes={lanes} activeLaneIndex={activeLaneIndex} onSelectLane={onSelectLane} />
          </group>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.42}
            autoRotate
            autoRotateSpeed={0.18}
            minPolarAngle={1.18}
            maxPolarAngle={1.96}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
