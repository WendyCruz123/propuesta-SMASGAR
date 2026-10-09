"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Pos = [number, number, number];

const LENGTH = 76;
const WATER_WIDTH = 5.4;

function riverX(z: number) {
  return Math.sin(z * 0.05) * 1.1 + Math.sin(z * 0.11 + 0.7) * 0.25;
}

function random(seed: number) {
  const n = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function Ribbon({
  offset = 0,
  width,
  color,
  height = 0.05,
  transparent = false,
  opacity = 1,
  roughness = 0.9,
}: {
  offset?: number;
  width: number;
  color: string;
  height?: number;
  transparent?: boolean;
  opacity?: number;
  roughness?: number;
}) {
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    const indices: number[] = [];
    const segments = 180;

    for (let i = 0; i <= segments; i++) {
      const z = -LENGTH / 2 + (i / segments) * LENGTH;
      const cx = riverX(z) + offset;

      vertices.push(cx - width / 2, height, z);
      vertices.push(cx + width / 2, height, z);

      if (i < segments) {
        const a = i * 2;
        indices.push(a, a + 1, a + 2);
        indices.push(a + 1, a + 3, a + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [offset, width, height]);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent={transparent}
        opacity={opacity}
        roughness={roughness}
        metalness={roughness < 0.4 ? 0.15 : 0}
      />
    </mesh>
  );
}

function WaterFlow() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const z = ((i * 4.5 + t * 1.8 + LENGTH / 2) % LENGTH) - LENGTH / 2;
      mesh.position.set(
        riverX(z) + (random(i + 20) - 0.5) * 2.2,
        0.17,
        z
      );
    });
  });

  return (
    <group>
      {Array.from({ length: 18 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.7 + random(i) * 0.8, 0.05]} />
          <meshBasicMaterial
            color="#d9ffff"
            transparent
            opacity={0.45}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Tree({
  position,
  scale = 1,
}: {
  position: Pos;
  scale?: number;
}) {
  const crown = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crown.current) {
      crown.current.rotation.z =
        Math.sin(clock.elapsedTime * 0.8 + position[2]) * 0.018;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.16, 1.8, 8]} />
        <meshStandardMaterial color="#74523a" />
      </mesh>

      <group ref={crown}>
        <mesh position={[0, 2.15, 0]} castShadow>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#3e9447" flatShading />
        </mesh>
        <mesh position={[-0.35, 1.8, 0.08]} castShadow>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial color="#5cb15c" flatShading />
        </mesh>
        <mesh position={[0.34, 1.82, -0.05]} castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#2f7f3f" flatShading />
        </mesh>
      </group>
    </group>
  );
}

function Bush({ position, scale = 1 }: { position: Pos; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.28, 14, 14]} />
        <meshStandardMaterial color="#6ea84d" roughness={1} />
      </mesh>
      <mesh position={[0.18, 0.02, 0.05]} castShadow>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshStandardMaterial color="#5f9545" roughness={1} />
      </mesh>
      <mesh position={[-0.16, 0.02, -0.04]} castShadow>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#7ab357" roughness={1} />
      </mesh>
    </group>
  );
}

function House({
  position,
  floors,
  width = 2.4,
  depth = 2.6,
  color = "#b66f56",
}: {
  position: Pos;
  floors: 1 | 2 | 3;
  width?: number;
  depth?: number;
  color?: string;
}) {
  const height = floors * 1.8;

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      <mesh position={[0, height + 0.07, 0]} castShadow>
        <boxGeometry args={[width + 0.08, 0.14, depth + 0.08]} />
        <meshStandardMaterial color="#c9b1a1" />
      </mesh>

      {Array.from({ length: floors }).map((_, floor) => (
        <group key={floor}>
          {[-0.6, 0.6].map((x, i) => (
            <mesh
              key={i}
              position={[x, 0.65 + floor * 1.8, depth / 2 + 0.01]}
            >
              <planeGeometry args={[0.42, 0.52]} />
              <meshStandardMaterial color="#7eb2c7" roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.95, depth / 2 + 0.02]}>
        <planeGeometry args={[0.58, 0.95]} />
        <meshStandardMaterial color="#5f4a3c" />
      </mesh>
    </group>
  );
}

function SideRoad({ x }: { x: number }) {
  return (
    <mesh position={[x, 0.01, 0]} receiveShadow>
      <boxGeometry args={[3, 0.04, LENGTH]} />
      <meshStandardMaterial color="#6e7376" />
    </mesh>
  );
}

function RoadMarks({ x }: { x: number }) {
  return (
    <group>
      {Array.from({ length: 26 }).map((_, i) => {
        const z = -34 + i * 2.7;
        return (
          <mesh key={i} position={[x, 0.04, z]}>
            <boxGeometry args={[0.18, 0.01, 1.15]} />
            <meshBasicMaterial color="#efe5ad" />
          </mesh>
        );
      })}
    </group>
  );
}

function Bridge({ z }: { z: number }) {
  const x = riverX(z);

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[10.5, 0.3, 2.4]} />
        <meshStandardMaterial color="#d6d0c3" />
      </mesh>

      {[-0.95, 0.95].map((side) => (
        <group key={side}>
          <mesh position={[0, 0.68, side]}>
            <boxGeometry args={[10.5, 0.08, 0.08]} />
            <meshStandardMaterial color="#39765e" />
          </mesh>
          {Array.from({ length: 13 }).map((_, i) => (
            <mesh key={i} position={[-4.8 + i * 0.8, 0.48, side]}>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <meshStandardMaterial color="#39765e" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function TreeRows() {
  const trees = useMemo(() => {
    const result: { position: Pos; scale: number }[] = [];

    for (let z = -32; z <= 32; z += 4.2) {
      const leftX = riverX(z) - 5.2;
      const rightX = riverX(z) + 5.2;

      result.push({
        position: [leftX, 0.02, z],
        scale: 0.88 + random(z + 10) * 0.24,
      });

      result.push({
        position: [rightX, 0.02, z + 0.5],
        scale: 0.88 + random(z + 30) * 0.24,
      });
    }

    return result;
  }, []);

  return (
    <group>
      {trees.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale} />
      ))}
    </group>
  );
}

function BushRows() {
  const bushes = useMemo(() => {
    const result: { position: Pos; scale: number }[] = [];

    for (let z = -32; z <= 32; z += 3.2) {
      result.push({
        position: [riverX(z) - 3.6, 0.08, z + 0.3],
        scale: 0.8 + random(z + 1) * 0.3,
      });

      result.push({
        position: [riverX(z) + 3.6, 0.08, z - 0.2],
        scale: 0.8 + random(z + 2) * 0.3,
      });
    }

    return result;
  }, []);

  return (
    <group>
      {bushes.map((b, i) => (
        <Bush key={i} position={b.position} scale={b.scale} />
      ))}
    </group>
  );
}

function BrickHouses() {
  const houses = useMemo(() => {
    const result: {
      position: Pos;
      floors: 1 | 2 | 3;
      width: number;
      depth: number;
      color: string;
    }[] = [];

    const colors = [
      "#b66f56",
      "#a95f49",
      "#c27a5c",
      "#9b5c48",
      "#b97253",
      "#8f5a4c",
    ];

    for (let z = -33; z <= 33; z += 4.3) {
      for (const side of [-1, 1] as const) {
        const base = side * 12.8;

        for (let lane = 0; lane < 3; lane++) {
          const x = base + side * lane * 3.25 + (random(z * 3 + lane) - 0.5) * 0.5;
          const seed = z * 2.8 + lane * 13 + side * 7;
          const floors = (1 + Math.floor(random(seed) * 3)) as 1 | 2 | 3;

          result.push({
            position: [x, 0, z + (random(seed + 1) - 0.5) * 0.8],
            floors,
            width: 2 + random(seed + 2) * 1.1,
            depth: 2.2 + random(seed + 3) * 0.8,
            color: colors[Math.floor(random(seed + 4) * colors.length)],
          });
        }
      }
    }

    return result;
  }, []);

  return (
    <group>
      {houses.map((house, i) => (
        <House
          key={i}
          position={house.position}
          floors={house.floors}
          width={house.width}
          depth={house.depth}
          color={house.color}
        />
      ))}
    </group>
  );
}

function RiversideScene() {
  return (
    <group>
      {/* terreno general */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
        <planeGeometry args={[82, 82]} />
        <meshStandardMaterial color="#b9b0a1" />
      </mesh>

      {/* franjas urbanas */}
      <SideRoad x={-18.5} />
      <SideRoad x={18.5} />
      <RoadMarks x={-18.5} />
      <RoadMarks x={18.5} />

      {/* corredor verde */}
      <Ribbon width={18.5} color="#7aae67" height={0.01} />
      <Ribbon offset={-6.2} width={2.3} color="#6ea25b" height={0.04} />
      <Ribbon offset={6.2} width={2.3} color="#6ea25b" height={0.04} />

      {/* senderos */}
      <Ribbon offset={-8.2} width={1.2} color="#ded0b2" height={0.07} />
      <Ribbon offset={8.2} width={1.2} color="#ded0b2" height={0.07} />

      {/* riberas */}
      <Ribbon width={7.6} color="#bcae8f" height={0.08} />

      {/* agua */}
      <Ribbon
        width={WATER_WIDTH}
        color="#2a98be"
        height={0.105}
        roughness={0.22}
      />
      <Ribbon
        width={2.9}
        color="#58c7dd"
        height={0.115}
        roughness={0.2}
        transparent
        opacity={0.68}
      />

      <WaterFlow />
      <BushRows />
      <TreeRows />
      <BrickHouses />

      <Bridge z={-16} />
      <Bridge z={14} />
    </group>
  );
}

export default function RiverScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [28, 28, 46], fov: 42, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#c9ddec"]} />

        <ambientLight intensity={1.7} />
        <hemisphereLight args={["#e6f5ff", "#7e8d67", 1.1]} />

        <directionalLight
          position={[-18, 30, 14]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <RiversideScene />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={18}
          maxDistance={85}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2.3}
          target={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={0.18}
        />
      </Canvas>
    </div>
  );
}