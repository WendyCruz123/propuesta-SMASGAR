"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Pos = [number, number, number];

function Building({
  position,
  height,
  color,
  width = 1.8,
  depth = 1.8,
}: {
  position: Pos;
  height: number;
  color: string;
  width?: number;
  depth?: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>

      <mesh position={[0, height + 0.06, 0]} castShadow>
        <boxGeometry args={[width + 0.15, 0.12, depth + 0.15]} />
        <meshStandardMaterial color="#dfe7ea" />
      </mesh>
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: Pos; scale?: number }) {
  const top = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (top.current) {
      top.current.rotation.z =
        Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.03;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.4, 8]} />
        <meshStandardMaterial color="#7a5537" />
      </mesh>

      <group ref={top}>
        <mesh position={[0, 1.7, 0]} castShadow>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial color="#3ca55c" flatShading />
        </mesh>
        <mesh position={[0.28, 1.45, 0.1]} castShadow>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#67c97a" flatShading />
        </mesh>
        <mesh position={[-0.28, 1.42, -0.05]} castShadow>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#2f8d4d" flatShading />
        </mesh>
      </group>
    </group>
  );
}

function Bush({ position, scale = 1 }: { position: Pos; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#c8b54d" roughness={1} />
      </mesh>
      <mesh position={[0.22, 0.02, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#d2bf58" roughness={1} />
      </mesh>
      <mesh position={[-0.22, 0.02, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#b7a33e" roughness={1} />
      </mesh>
    </group>
  );
}

function FlowerStrip({ position }: { position: Pos }) {
  const flowers = useMemo(() => {
    const result: Pos[] = [];
    for (let z = -6.8; z <= 6.8; z += 0.7) {
      result.push([0, 0.02, z]);
    }
    return result;
  }, []);

  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[0.55, 0.03, 14.5]} />
        <meshStandardMaterial color="#48693f" />
      </mesh>

      {flowers.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#ff7ca8" : "#f4d35e"} />
          </mesh>
          <mesh position={[0, 0.035, 0]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.08, 6]} />
            <meshStandardMaterial color="#3b7d45" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Car({
  position,
  color,
  speed,
  direction = "z",
}: {
  position: Pos;
  color: string;
  speed: number;
  direction?: "z" | "x";
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (direction === "z") {
      ref.current.position.z += speed * delta;
      if (ref.current.position.z > 8) ref.current.position.z = -8;
      if (ref.current.position.z < -8) ref.current.position.z = 8;
    } else {
      ref.current.position.x += speed * delta;
      if (ref.current.position.x > 12) ref.current.position.x = -12;
      if (ref.current.position.x < -12) ref.current.position.x = 12;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.7, 0.25, 1.15]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.42, -0.05]} castShadow>
        <boxGeometry args={[0.46, 0.2, 0.55]} />
        <meshStandardMaterial color="#bde6ee" />
      </mesh>
    </group>
  );
}

function Lamp({ position }: { position: Pos }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 3, 8]} />
        <meshStandardMaterial color="#7d858b" />
      </mesh>

      <mesh position={[0.35, 2.9, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <meshStandardMaterial color="#7d858b" />
      </mesh>

      <mesh position={[0.72, 2.78, 0]} castShadow>
        <boxGeometry args={[0.14, 0.16, 0.14]} />
        <meshStandardMaterial color="#f6e5a3" emissive="#f6e5a3" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function RoadSystem() {
  return (
    <group>
      {/* Suelo general */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#d8dccf" />
      </mesh>

      {/* Vía principal */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[30, 0.05, 7.5]} />
        <meshStandardMaterial color="#596166" />
      </mesh>

      {/* Separador central */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[30, 0.12, 2.1]} />
        <meshStandardMaterial color="#c6b08b" />
      </mesh>

      {/* Aceras */}
      <mesh position={[0, 0.04, 5.25]} receiveShadow>
        <boxGeometry args={[30, 0.08, 1.2]} />
        <meshStandardMaterial color="#d8d8d8" />
      </mesh>
      <mesh position={[0, 0.04, -5.25]} receiveShadow>
        <boxGeometry args={[30, 0.08, 1.2]} />
        <meshStandardMaterial color="#d8d8d8" />
      </mesh>

      {/* Líneas de carril */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = -13 + i * 1.5;
        return (
          <group key={i}>
            <mesh position={[x, 0.065, 1.75]}>
              <boxGeometry args={[0.65, 0.01, 0.07]} />
              <meshBasicMaterial color="#f8edbb" />
            </mesh>
            <mesh position={[x, 0.065, -1.75]}>
              <boxGeometry args={[0.65, 0.01, 0.07]} />
              <meshBasicMaterial color="#f8edbb" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function BeforeSide() {
  const buildings = useMemo(() => {
    const coords = [
      [-10.5, 0, 8.2],
      [-7.5, 0, 8.6],
      [-4.5, 0, 8.2],
      [-10.2, 0, -8.4],
      [-7.1, 0, -8.2],
      [-4.1, 0, -8.5],
    ] as Pos[];

    return coords.map((position, i) => ({
      position,
      height: i % 2 === 0 ? 3.8 : 5.1,
      color: i % 2 === 0 ? "#a67d67" : "#92705f",
    }));
  }, []);

  return (
    <group>
      {/* mediano seco */}
      <mesh position={[-7.5, 0.11, 0]} receiveShadow>
        <boxGeometry args={[14.7, 0.06, 1.4]} />
        <meshStandardMaterial color="#9b8567" />
      </mesh>

      {/* tierra */}
      <mesh position={[-7.5, 0.14, 0]} receiveShadow>
        <boxGeometry args={[13.8, 0.03, 0.95]} />
        <meshStandardMaterial color="#7f6a52" />
      </mesh>

      {/* pasto apagado */}
      <mesh position={[-7.5, 0.11, 5.95]} receiveShadow>
        <boxGeometry args={[14.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#aeb28a" />
      </mesh>

      <mesh position={[-7.5, 0.11, -5.95]} receiveShadow>
        <boxGeometry args={[14.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#aeb28a" />
      </mesh>

      {/* pocos arbustos secos */}
      <mesh position={[-9.5, 0.2, 0.1]} castShadow>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial color="#8a7b55" />
      </mesh>
      <mesh position={[-6.8, 0.2, -0.15]} castShadow>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color="#8a7b55" />
      </mesh>

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}

      <Lamp position={[-12.3, 0, 4.8]} />
      <Lamp position={[-8.6, 0, 4.8]} />
      <Lamp position={[-4.8, 0, 4.8]} />

      <Lamp position={[-12.3, 0, -4.8]} />
      <Lamp position={[-8.6, 0, -4.8]} />
      <Lamp position={[-4.8, 0, -4.8]} />

      <Car position={[-12, 0, 1.75]} color="#d9d9d9" speed={1.7} direction="x" />
      <Car position={[-4, 0, -1.75]} color="#c58a52" speed={-1.5} direction="x" />
    </group>
  );
}

function AfterSide() {
  const buildings = useMemo(() => {
    const coords = [
      [4.5, 0, 8.2],
      [7.4, 0, 8.4],
      [10.4, 0, 8.1],
      [4.2, 0, -8.5],
      [7.2, 0, -8.2],
      [10.1, 0, -8.4],
    ] as Pos[];

    return coords.map((position, i) => ({
      position,
      height: i % 2 === 0 ? 4.4 : 5.8,
      color: i % 2 === 0 ? "#c98a63" : "#b9784f",
    }));
  }, []);

  const trees = useMemo(() => {
    const result: Pos[] = [];
    for (let x = 2.5; x <= 12; x += 2) {
      result.push([x, 0.15, 0.55]);
      result.push([x, 0.15, -0.55]);
    }
    return result;
  }, []);

  const sideTrees = useMemo(() => {
    const result: Pos[] = [];
    for (let x = 3; x <= 12; x += 2.3) {
      result.push([x, 0.1, 6.1]);
      result.push([x, 0.1, -6.1]);
    }
    return result;
  }, []);

  return (
    <group>
      {/* césped lateral */}
      <mesh position={[7.5, 0.11, 5.95]} receiveShadow>
        <boxGeometry args={[14.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#74b75f" />
      </mesh>
      <mesh position={[7.5, 0.11, -5.95]} receiveShadow>
        <boxGeometry args={[14.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#74b75f" />
      </mesh>

      {/* jardinera central */}
      <mesh position={[7.5, 0.11, 0]} receiveShadow>
        <boxGeometry args={[14.7, 0.06, 1.45]} />
        <meshStandardMaterial color="#d2bb97" />
      </mesh>

      <mesh position={[7.5, 0.145, 0]} receiveShadow>
        <boxGeometry args={[13.9, 0.03, 1.05]} />
        <meshStandardMaterial color="#4d7d44" />
      </mesh>

      <FlowerStrip position={[7.5, 0.15, 0]} />

      {trees.map((p, i) => (
        <Tree key={i} position={p} scale={0.78} />
      ))}

      {sideTrees.map((p, i) => (
        <Tree key={`side-${i}`} position={p} scale={0.72} />
      ))}

      {/* arbustos decorativos */}
      {[-11, -8.5, -6, -3.5, 3.5, 6, 8.5, 11].map((offset, i) => (
        <Bush key={i} position={[7.5 + offset * 0.5, 0.22, 0.95]} scale={0.95} />
      ))}

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}

      <Lamp position={[2.7, 0, 4.8]} />
      <Lamp position={[6.4, 0, 4.8]} />
      <Lamp position={[10.2, 0, 4.8]} />
      <Lamp position={[13.5, 0, 4.8]} />

      <Lamp position={[2.7, 0, -4.8]} />
      <Lamp position={[6.4, 0, -4.8]} />
      <Lamp position={[10.2, 0, -4.8]} />
      <Lamp position={[13.5, 0, -4.8]} />

      <Car position={[2, 0, 1.75]} color="#ffffff" speed={1.8} direction="x" />
      <Car position={[11, 0, -1.75]} color="#5aa1d8" speed={-1.6} direction="x" />
    </group>
  );
}

function DividerLine() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[0.08, 0.22, 20]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <group>
      <RoadSystem />
      <BeforeSide />
      <AfterSide />
      <DividerLine />

      <ContactShadows
        position={[0, 0.01, 0]}
        scale={40}
        opacity={0.28}
        blur={2.5}
        far={20}
      />
    </group>
  );
}

export default function BeforeAfterCityScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 8, 21], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#dff2ff"]} />
        <fog attach="fog" args={["#dff2ff", 18, 36]} />

        <ambientLight intensity={1.7} />
        <directionalLight
          position={[8, 16, 10]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Environment preset="city" />
        <SceneContent />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={16}
          maxDistance={28}
          minPolarAngle={0.65}
          maxPolarAngle={1.2}
          autoRotate
          autoRotateSpeed={0.22}
          target={[0, 1.5, 0]}
        />
      </Canvas>
    </div>
  );
}