import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Edges,
  Float,
  Html,
  Line,
  MeshDistortMaterial,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

const accentMap = {
  cyan: { main: '#8cf2ff', secondary: '#6d7cff', glow: '#8cf2ff' },
  violet: { main: '#9a88ff', secondary: '#ff88c6', glow: '#9a88ff' },
  gold: { main: '#ffd27a', secondary: '#8cf2ff', glow: '#ffd27a' },
  magenta: { main: '#ff88c6', secondary: '#9a88ff', glow: '#ff88c6' },
};

const hotspotLayouts = {
  qa: [
    [1.95, 1.04, 0.56],
    [-1.98, 0.12, 0.84],
    [0.16, -1.24, 1.08],
  ],
  ai: [
    [2.02, 1.04, 0.56],
    [-2.02, 0.12, 0.84],
    [0.1, -1.28, 1.1],
  ],
  data: [
    [1.96, 0.96, 0.54],
    [-1.96, 0.16, 0.88],
    [0.08, -1.22, 1.04],
  ],
  web: [
    [1.98, 0.98, 0.6],
    [-1.98, 0.18, 0.9],
    [0.08, -1.2, 1.0],
  ],
  tooling: [
    [1.96, 1.04, 0.6],
    [-1.98, 0.12, 0.82],
    [0.08, -1.22, 1.02],
  ],
  clarity: [
    [1.98, 0.98, 0.58],
    [-1.98, 0.14, 0.86],
    [0.06, -1.24, 1.04],
  ],
};

const focusAngles = [0.2, -0.38, 0.72];

function OrbitingNodes({ colorA, colorB, count = 8, radius = 1.9, shape = 'sphere', scale = 1 }) {
  const nodes = useRef([]);
  const points = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        angle: (index / count) * Math.PI * 2,
        offset: Math.random() * Math.PI * 2,
        size: (0.12 + (index % 3) * 0.04) * scale,
        speed: 0.5 + index * 0.04,
      })),
    [count, scale],
  );

  useFrame((state, delta) => {
    nodes.current.forEach((node, index) => {
      if (!node) return;
      const point = points[index];
      const t = state.clock.getElapsedTime() * point.speed + point.offset;
      node.position.x = Math.cos(t) * radius;
      node.position.z = Math.sin(t) * radius;
      node.position.y = Math.sin(t * 1.5) * 0.35;
      node.rotation.x += delta * 0.7;
      node.rotation.y += delta * 0.5;
    });
  });

  return points.map((point, index) => (
    <mesh
      key={`${shape}-${index}`}
      ref={(node) => {
        nodes.current[index] = node;
      }}
      position={[Math.cos(point.angle) * radius, 0, Math.sin(point.angle) * radius]}
    >
      {shape === 'box' ? (
        <boxGeometry args={[point.size, point.size, point.size]} />
      ) : shape === 'tetra' ? (
        <tetrahedronGeometry args={[point.size, 0]} />
      ) : (
        <sphereGeometry args={[point.size, 18, 18]} />
      )}
      <meshStandardMaterial
        color={index % 2 === 0 ? colorA : colorB}
        emissive={index % 2 === 0 ? colorA : colorB}
        emissiveIntensity={1.8}
        roughness={0.16}
        metalness={0.38}
      />
    </mesh>
  ));
}

function MiniUiPanel({ position, rotation = [0, 0, 0], colors, accent = 'main', width = 1.1, height = 0.68 }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[width, height, 0.06]} radius={0.08} smoothness={6}>
        <meshStandardMaterial color="#0b1430" metalness={0.45} roughness={0.18} />
        <Edges color={colors[accent]} threshold={12} />
      </RoundedBox>
      <mesh position={[0, height * 0.18, 0.04]}>
        <planeGeometry args={[width * 0.62, 0.08]} />
        <meshBasicMaterial color={colors[accent]} transparent opacity={0.95} />
      </mesh>
      <mesh position={[-width * 0.18, -height * 0.08, 0.04]}>
        <planeGeometry args={[width * 0.26, height * 0.24]} />
        <meshBasicMaterial color={colors.secondary} transparent opacity={0.3} />
      </mesh>
      <mesh position={[width * 0.16, -height * 0.08, 0.04]}>
        <planeGeometry args={[width * 0.4, height * 0.24]} />
        <meshBasicMaterial color={colors.main} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function QaMode({ colors, activeIndex = 0 }) {
  const pivot = useRef(null);
  const panels = useRef([]);
  const panelData = useMemo(
    () => [
      { position: [1.08, 0.82, -0.26], rotation: [0.06, -0.32, 0.08] },
      { position: [-1.2, -0.1, 0.34], rotation: [-0.04, 0.26, -0.06] },
      { position: [0.14, -1.05, 0.54], rotation: [-0.18, 0.04, 0.04] },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y = THREE.MathUtils.lerp(pivot.current.rotation.y, focusAngles[activeIndex] ?? 0.18, 0.05);
      pivot.current.rotation.x = THREE.MathUtils.lerp(pivot.current.rotation.x, state.pointer.y * -0.12, 0.05);
      pivot.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.05) * 0.04;
    }

    panels.current.forEach((panel, index) => {
      if (!panel) return;
      panel.rotation.y += delta * (0.08 + index * 0.015);
      panel.position.y = panelData[index].position[1] + Math.sin(state.clock.getElapsedTime() * 1.4 + index) * 0.05;
    });
  });

  return (
    <group ref={pivot} scale={0.94}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.28}>
        <group>
          <RoundedBox args={[1.72, 1.06, 0.16]} radius={0.12} smoothness={6}>
            <meshStandardMaterial color="#0d1731" metalness={0.42} roughness={0.18} />
            <Edges color={colors.main} threshold={10} />
          </RoundedBox>
          <mesh position={[0, 0.24, 0.09]}>
            <planeGeometry args={[1.06, 0.11]} />
            <meshBasicMaterial color={colors.main} transparent opacity={0.85} />
          </mesh>
          <mesh position={[-0.4, -0.1, 0.09]}>
            <planeGeometry args={[0.38, 0.34]} />
            <meshBasicMaterial color={colors.secondary} transparent opacity={0.28} />
          </mesh>
          <mesh position={[0.26, -0.1, 0.09]}>
            <planeGeometry args={[0.66, 0.34]} />
            <meshBasicMaterial color={colors.main} transparent opacity={0.18} />
          </mesh>
        </group>
      </Float>

      {panelData.map((panel, index) => (
        <Float key={`qa-panel-${index}`} speed={1.2 + index * 0.2} rotationIntensity={0.08} floatIntensity={0.18}>
          <group
            ref={(node) => {
              panels.current[index] = node;
            }}
            position={panel.position}
            rotation={panel.rotation}
          >
            <MiniUiPanel colors={colors} accent={index === 1 ? 'secondary' : 'main'} position={[0, 0, 0]} width={0.92} height={0.56} />
          </group>
        </Float>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.56, 0.04, 20, 140]} />
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1.8} transparent opacity={0.88} />
      </mesh>
      <OrbitingNodes colorA={colors.main} colorB={colors.secondary} shape="box" count={7} radius={2.02} scale={0.9} />
    </group>
  );
}

function AiMode({ colors, activeIndex = 0 }) {
  const core = useRef(null);
  const shell = useRef(null);
  const pivot = useRef(null);

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y = THREE.MathUtils.lerp(pivot.current.rotation.y, focusAngles[activeIndex] ?? 0.2, 0.05);
      pivot.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.12) * 0.05;
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.2;
      core.current.rotation.y += delta * 0.32;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.16;
      shell.current.rotation.z += delta * 0.12;
      shell.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.024);
    }
  });

  return (
    <group ref={pivot} scale={0.92}>
      <Float speed={1.9} rotationIntensity={0.18} floatIntensity={0.36}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.9, 28]} />
          <MeshDistortMaterial
            color={colors.main}
            emissive={colors.main}
            emissiveIntensity={1.8}
            roughness={0.08}
            metalness={0.28}
            distort={0.24}
            speed={2.2}
          />
        </mesh>
      </Float>
      <mesh ref={shell}>
        <torusKnotGeometry args={[1.44, 0.06, 170, 24, 2, 5]} />
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} />
      </mesh>
      <OrbitingNodes colorA={colors.main} colorB={colors.secondary} shape="sphere" count={8} radius={1.96} scale={0.92} />
    </group>
  );
}

function DataMode({ colors, activeIndex = 0 }) {
  const group = useRef(null);
  const blocks = useRef([]);
  const items = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        x: (index % 4) * 0.58 - 0.86,
        z: Math.floor(index / 4) * 0.58 - 0.58,
        h: 0.2 + (index % 4) * 0.16,
      })),
    [],
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, focusAngles[activeIndex] ?? 0.3, 0.05);
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.06) * 0.04;
    }

    blocks.current.forEach((block, index) => {
      if (!block) return;
      const base = items[index];
      block.position.y = Math.sin(state.clock.getElapsedTime() * 1.7 + index * 0.35) * 0.05;
      block.scale.y = 0.86 + base.h + (Math.sin(state.clock.getElapsedTime() * 1.16 + index) + 1) * 0.14;
      block.rotation.y += delta * 0.16;
    });
  });

  return (
    <group ref={group} rotation={[0.14, 0.4, 0]} scale={0.96}>
      <RoundedBox args={[2.72, 0.16, 2.1]} radius={0.1} smoothness={6} position={[0, -0.68, 0]}>
        <meshStandardMaterial color="#0a1124" metalness={0.25} roughness={0.22} />
        <Edges color={colors.secondary} threshold={12} />
      </RoundedBox>

      {items.map((item, index) => (
        <mesh
          key={`data-block-${index}`}
          ref={(node) => {
            blocks.current[index] = node;
          }}
          position={[item.x, 0, item.z]}
        >
          <boxGeometry args={[0.3, 0.82, 0.3]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? colors.main : colors.secondary}
            emissive={index % 2 === 0 ? colors.main : colors.secondary}
            emissiveIntensity={1.45}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function WebMode({ colors, activeIndex = 0 }) {
  const panels = useRef([]);
  const pivot = useRef(null);

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y = THREE.MathUtils.lerp(pivot.current.rotation.y, focusAngles[activeIndex] ?? 0.24, 0.05);
      pivot.current.rotation.x = THREE.MathUtils.lerp(pivot.current.rotation.x, -state.pointer.y * 0.08, 0.05);
    }

    panels.current.forEach((panel, index) => {
      if (!panel) return;
      panel.rotation.y = THREE.MathUtils.lerp(panel.rotation.y, state.pointer.x * 0.18 + index * 0.05, 0.08);
      panel.rotation.x = THREE.MathUtils.lerp(panel.rotation.x, -state.pointer.y * 0.12, 0.08);
      panel.position.y = Math.sin(state.clock.getElapsedTime() * 1.3 + index * 0.5) * 0.08 + index * 0.1;
      panel.position.x = index * 0.14 - 0.14;
      panel.rotation.z += delta * 0.015;
    });
  });

  return (
    <group ref={pivot} scale={0.92}>
      {[0, 1, 2].map((index) => (
        <Float key={`web-panel-${index}`} speed={1.1 + index * 0.2} rotationIntensity={0.08} floatIntensity={0.2}>
          <group
            ref={(node) => {
              panels.current[index] = node;
            }}
            position={[index * 0.14 - 0.14, index * 0.1, -index * 0.3]}
          >
            <MiniUiPanel colors={colors} accent={index === 1 ? 'main' : 'secondary'} position={[0, 0, 0]} width={1.84} height={1.12} />
          </group>
        </Float>
      ))}
      <OrbitingNodes colorA={colors.main} colorB={colors.secondary} count={6} radius={2.0} shape="tetra" scale={0.88} />
    </group>
  );
}

function UtilityMode({ colors, activeIndex = 0 }) {
  const pivot = useRef(null);
  const cards = useRef([]);
  const positions = useMemo(
    () => [
      [1.1, 0.86, 0.1],
      [-1.16, 0.04, 0.28],
      [0.06, -1.02, 0.48],
    ],
    [],
  );

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y = THREE.MathUtils.lerp(pivot.current.rotation.y, focusAngles[activeIndex] ?? 0.22, 0.05);
      pivot.current.rotation.x = THREE.MathUtils.lerp(pivot.current.rotation.x, -state.pointer.y * 0.08, 0.05);
      pivot.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.04) * 0.04;
    }

    cards.current.forEach((card, index) => {
      if (!card) return;
      card.rotation.y += delta * (0.06 + index * 0.014);
      card.position.y = positions[index][1] + Math.sin(state.clock.getElapsedTime() * 1.3 + index * 0.6) * 0.06;
    });
  });

  return (
    <group ref={pivot} scale={0.96}>
      <RoundedBox args={[1.64, 0.96, 0.08]} radius={0.1} smoothness={6}>
        <meshStandardMaterial color="#0c152d" metalness={0.4} roughness={0.16} />
        <Edges color={colors.main} threshold={10} />
      </RoundedBox>
      <mesh position={[0, 0.18, 0.05]}>
        <planeGeometry args={[0.96, 0.1]} />
        <meshBasicMaterial color={colors.main} transparent opacity={0.86} />
      </mesh>
      <mesh position={[-0.28, -0.12, 0.05]}>
        <planeGeometry args={[0.24, 0.24]} />
        <meshBasicMaterial color={colors.secondary} transparent opacity={0.28} />
      </mesh>
      <mesh position={[0.22, -0.12, 0.05]}>
        <planeGeometry args={[0.58, 0.24]} />
        <meshBasicMaterial color={colors.main} transparent opacity={0.18} />
      </mesh>

      {positions.map((position, index) => (
        <Float key={`tool-card-${index}`} speed={1.05 + index * 0.18} rotationIntensity={0.08} floatIntensity={0.18}>
          <group
            ref={(node) => {
              cards.current[index] = node;
            }}
            position={position}
            rotation={[0.04 * (index - 1), index === 1 ? 0.24 : -0.2, 0.04 * (index - 1)]}
          >
            <MiniUiPanel colors={colors} accent={index === 0 ? 'main' : 'secondary'} position={[0, 0, 0]} width={0.96} height={0.58} />
          </group>
        </Float>
      ))}

      {positions.map((position, index) => (
        <Line
          key={`tool-line-${index}`}
          points={[
            [0, 0, 0],
            position,
          ]}
          color={index === activeIndex ? colors.main : colors.secondary}
          transparent
          opacity={index === activeIndex ? 0.82 : 0.26}
          lineWidth={index === activeIndex ? 2.2 : 1.2}
        />
      ))}

      <mesh>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color={colors.main} emissive={colors.main} emissiveIntensity={2.2} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.76, 0.04, 18, 120]} />
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1.7} transparent opacity={0.82} />
      </mesh>
      <OrbitingNodes colorA={colors.main} colorB={colors.secondary} count={6} radius={2.04} shape="box" scale={0.84} />
    </group>
  );
}

function ClarityMode({ colors, activeIndex = 0 }) {
  const frame = useRef(null);
  const layers = useRef([]);
  const pivot = useRef(null);

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y = THREE.MathUtils.lerp(pivot.current.rotation.y, focusAngles[activeIndex] ?? 0.18, 0.05);
      pivot.current.rotation.x = THREE.MathUtils.lerp(pivot.current.rotation.x, -state.pointer.y * 0.06, 0.05);
    }
    if (frame.current) {
      frame.current.rotation.y += delta * 0.14;
      frame.current.rotation.x = THREE.MathUtils.lerp(frame.current.rotation.x, -state.pointer.y * 0.1, 0.06);
    }

    layers.current.forEach((layer, index) => {
      if (!layer) return;
      layer.position.z = -0.34 + index * 0.24 + Math.sin(state.clock.getElapsedTime() * 1.2 + index) * 0.05;
      layer.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.9 + index) * 0.03;
    });
  });

  return (
    <group ref={pivot} scale={0.95}>
      <mesh ref={frame}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color={colors.main} emissive={colors.main} emissiveIntensity={1.1} wireframe />
      </mesh>
      {[0, 1, 2].map((index) => (
        <mesh
          key={`clarity-layer-${index}`}
          ref={(node) => {
            layers.current[index] = node;
          }}
          position={[0, 0, -0.34 + index * 0.24]}
        >
          <planeGeometry args={[1.36 - index * 0.18, 0.84 - index * 0.1]} />
          <meshBasicMaterial color={index % 2 === 0 ? colors.secondary : colors.main} transparent opacity={0.24 + index * 0.08} />
        </mesh>
      ))}
      <OrbitingNodes colorA={colors.main} colorB={colors.secondary} count={5} radius={2.08} shape="sphere" scale={0.9} />
    </group>
  );
}

function InsightHotspots({ capabilityKey, insights = [], colors, activeInsightIndex, onSelectInsight }) {
  const layout = hotspotLayouts[capabilityKey] ?? hotspotLayouts.qa;

  return insights.slice(0, 3).map((insight, index) => {
    const position = layout[index] ?? layout[layout.length - 1];
    const active = index === activeInsightIndex;

    return (
      <group key={`${capabilityKey}-${insight.short ?? insight.title ?? index}`}>
        <Line
          points={[
            [0, 0, 0],
            position,
          ]}
          color={active ? colors.main : colors.secondary}
          transparent
          opacity={active ? 0.9 : 0.28}
          lineWidth={active ? 2.2 : 1.05}
        />
        <Float speed={1 + index * 0.16} rotationIntensity={0.08} floatIntensity={0.14}>
          <group position={position}>
            <mesh onPointerOver={() => onSelectInsight(index)} onClick={() => onSelectInsight(index)}>
              <sphereGeometry args={[active ? 0.18 : 0.13, 20, 20]} />
              <meshStandardMaterial
                color={active ? colors.main : colors.secondary}
                emissive={active ? colors.main : colors.secondary}
                emissiveIntensity={active ? 2.2 : 1.2}
                metalness={0.34}
                roughness={0.16}
              />
            </mesh>
            <mesh scale={active ? 1.64 : 1.16}>
              <sphereGeometry args={[0.3, 18, 18]} />
              <meshBasicMaterial color={active ? colors.main : colors.secondary} transparent opacity={active ? 0.15 : 0.05} />
            </mesh>
            <Html position={[0, 0.34, 0]} transform sprite distanceFactor={6.8}>
              <button
                type="button"
                className={`scene-hotspot ${active ? 'is-active' : ''}`.trim()}
                data-accent={capabilityKey}
                onClick={() => onSelectInsight(index)}
              >
                {insight.short ?? insight.title ?? `Node ${index + 1}`}
              </button>
            </Html>
          </group>
        </Float>
      </group>
    );
  });
}

function CapabilityObject({ capability, activeIndex }) {
  const colors = accentMap[capability.accent] ?? accentMap.cyan;

  if (capability.key === 'qa') return <QaMode colors={colors} activeIndex={activeIndex} />;
  if (capability.key === 'ai') return <AiMode colors={colors} activeIndex={activeIndex} />;
  if (capability.key === 'data') return <DataMode colors={colors} activeIndex={activeIndex} />;
  if (capability.key === 'web') return <WebMode colors={colors} activeIndex={activeIndex} />;
  if (capability.key === 'tooling') return <UtilityMode colors={colors} activeIndex={activeIndex} />;
  return <ClarityMode colors={colors} activeIndex={activeIndex} />;
}

export function SystemLabScene({ capability, insights = [], activeInsightIndex = 0, onSelectInsight = () => {} }) {
  const colors = accentMap[capability.accent] ?? accentMap.cyan;

  return (
    <div className="system-lab-scene" data-accent={capability.accent}>
      <Canvas dpr={[1.1, 2.15]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.04, 7.1]} fov={36} />
          <ambientLight intensity={0.46} />
          <directionalLight position={[4, 4, 4]} intensity={1.15} color="#d8e4ff" />
          <pointLight position={[2.6, 1.4, 2.8]} intensity={10} color={colors.main} distance={10} />
          <pointLight position={[-2.4, -1.2, 2.5]} intensity={8.6} color={colors.secondary} distance={10} />
          <pointLight position={[0, 0.2, 3.2]} intensity={7} color="#ffd27a" distance={8} />
          <Sparkles count={128} scale={[7.2, 5.2, 5.2]} size={3.1} speed={0.34} color="#dce6ff" opacity={0.82} />
          <CapabilityObject capability={capability} activeIndex={activeInsightIndex} />
          <InsightHotspots
            capabilityKey={capability.key}
            insights={insights}
            colors={colors}
            activeInsightIndex={activeInsightIndex}
            onSelectInsight={onSelectInsight}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.46}
            autoRotate
            autoRotateSpeed={0.2}
            minDistance={7.1}
            maxDistance={7.1}
            maxPolarAngle={1.86}
            minPolarAngle={1.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
