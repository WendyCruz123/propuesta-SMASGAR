
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Pos = [number, number, number];

function Block({
  position,
  size,
  color,
  rotation,
}: {
  position: Pos;
  size: Pos;
  color: string;
  rotation?: Pos;
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

function Pole({
  position,
  height,
  color = "#227848",
  radius = 0.055,
}: {
  position: Pos;
  height: number;
  color?: string;
  radius?: number;
}) {
  return (
    <mesh
      position={[position[0], position[1] + height / 2, position[2]]}
      castShadow
    >
      <cylinderGeometry args={[radius, radius, height, 10]} />
      <meshStandardMaterial color={color} metalness={0.15} />
    </mesh>
  );
}

function Bar({
  from,
  to,
  color,
  radius = 0.055,
}: {
  from: Pos;
  to: Pos;
  color: string;
  radius?: number;
}) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const diff = end.clone().sub(start);
  const middle = start.clone().add(end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    diff.clone().normalize()
  );

  return (
    <mesh position={middle} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, diff.length(), 8]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
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
        Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.018;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.19, 1.8, 9]} />
        <meshStandardMaterial color="#73543c" />
      </mesh>
      <group ref={crown}>
        <mesh position={[0, 2.2, 0]} castShadow>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial color="#3d9647" flatShading />
        </mesh>
        <mesh position={[-0.5, 1.8, 0]} castShadow>
          <icosahedronGeometry args={[0.58, 1]} />
          <meshStandardMaterial color="#56b75a" flatShading />
        </mesh>
        <mesh position={[0.4, 1.75, 0.2]} castShadow>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial color="#24833f" flatShading />
        </mesh>
        <mesh position={[0, 2.75, 0]} castShadow>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#65bb5c" flatShading />
        </mesh>
      </group>
    </group>
  );
}

function FlowerBed({ position }: { position: Pos }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.10, 0]} receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.18, 20]} />
        <meshStandardMaterial color="#dfcab4" />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.77, 0.77, 0.05, 20]} />
        <meshStandardMaterial color="#467c36" />
      </mesh>

      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;

        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0.32, 0]}>
              <sphereGeometry args={[0.13, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#ff668b" : i % 3 === 1 ? "#ffd14f" : "#eea1cb"}
              />
            </mesh>
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
              <meshStandardMaterial color="#247a36" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Bench({ position, rotation = 0 }: { position: Pos; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Block position={[0, 0.48, 0]} size={[1.4, 0.12, 0.48]} color="#a96c36" />
      <Block position={[0, 0.92, -0.22]} size={[1.4, 0.65, 0.12]} color="#a96c36" />

      {[-0.53, 0.53].map((x) => (
        <group key={x}>
          <Pole position={[x, 0.05, 0.16]} height={0.43} color="#263d3a" />
          <Pole position={[x, 0.05, -0.16]} height={0.43} color="#263d3a" />
        </group>
      ))}
    </group>
  );
}

function PlaygroundTower({
  position,
  roofColor,
}: {
  position: Pos;
  roofColor: string;
}) {
  return (
    <group position={position}>
      <Block
        position={[0, 1.55, 0]}
        size={[1.9, 0.2, 1.9]}
        color="#da9d37"
      />

      {[-0.78, 0.78].flatMap((x) =>
        [-0.78, 0.78].map((z) => (
          <Pole
            key={`${x}-${z}`}
            position={[x, 0, z]}
            height={3.2}
            radius={0.09}
            color="#e6a520"
          />
        ))
      )}

      {/* Techo de cuatro aguas */}
      <mesh
        position={[0, 3.45, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <coneGeometry args={[1.65, 1.15, 4]} />
        <meshStandardMaterial color={roofColor} flatShading />
      </mesh>

      <Bar from={[-0.75, 2.1, 0.83]} to={[0.75, 2.1, 0.83]} color="#f3cf49" />
      <Bar from={[-0.75, 2.1, -0.83]} to={[0.75, 2.1, -0.83]} color="#f3cf49" />
    </group>
  );
}

function SlidesAndTowers() {
  return (
    <group position={[-1.3, 0, -1.8]}>
      <PlaygroundTower position={[-1.7, 0, 0]} roofColor="#ec453c" />
      <PlaygroundTower position={[1.7, 0, 0]} roofColor="#268de0" />

      {/* Puente de conexión */}
      <Block
        position={[0, 1.52, 0]}
        size={[1.65, 0.16, 1.2]}
        color="#52bb61"
      />

      {[-0.55, 0.55].map((z) => (
        <group key={z}>
          <Bar from={[-0.85, 2.3, z]} to={[0.85, 2.3, z]} color="#efc33a" />
          {[-0.65, 0, 0.65].map((x) => (
            <Pole
              key={x}
              position={[x, 1.6, z]}
              height={0.7}
              color="#e6a520"
            />
          ))}
        </group>
      ))}

      {/* Resbalín amarillo */}
      <Block
        position={[-3.15, 0.84, 0.9]}
        size={[1.15, 0.11, 3.1]}
        color="#ffd126"
        rotation={[-0.53, 0, 0]}
      />

      {/* Laterales del resbalín */}
      {[-3.68, -2.62].map((x) => (
        <Block
          key={x}
          position={[x, 0.94, 0.9]}
          size={[0.12, 0.24, 3.1]}
          color="#eeb51c"
          rotation={[-0.53, 0, 0]}
        />
      ))}

      {/* Escalera */}
      {Array.from({ length: 7 }, (_, i) => (
        <Block
          key={i}
          position={[2.55, 0.24 + i * 0.19, 2 - i * 0.28]}
          size={[0.85, 0.09, 0.24]}
          color="#efa72e"
        />
      ))}

      <Bar
        from={[2.05, 0.12, 2.25]}
        to={[2.05, 1.8, 0]}
        color="#dc7b1e"
      />
      <Bar
        from={[3, 0.12, 2.25]}
        to={[3, 1.8, 0]}
        color="#dc7b1e"
      />

      {/* Resbalín verde adicional */}
      <Block
        position={[3.25, 0.8, -0.45]}
        size={[2.6, 0.11, 0.85]}
        color="#35be70"
        rotation={[0, 0, 0.47]}
      />

      {/* Suelo de caucho de colores */}
      {[
        { p: [-3.1, 0.045, 1.7] as Pos, c: "#f4bd34" },
        { p: [0, 0.045, 1.6] as Pos, c: "#38a6da" },
        { p: [2.9, 0.045, -1.4] as Pos, c: "#7abf75" },
      ].map((item, i) => (
        <mesh key={i} position={item.p} receiveShadow>
          <cylinderGeometry args={[1.75, 1.75, 0.055, 40]} />
          <meshStandardMaterial color={item.c} />
        </mesh>
      ))}
    </group>
  );
}

function SwingSet() {
  return (
    <group position={[-5.8, 0, 3.2]}>
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.08, 40]} />
        <meshStandardMaterial color="#448bd0" />
      </mesh>

      {[-1.55, 1.55].map((x) => (
        <group key={x}>
          <Bar from={[x, 0, -0.85]} to={[x, 2.7, 0]} color="#e96532" radius={0.085} />
          <Bar from={[x, 0, 0.85]} to={[x, 2.7, 0]} color="#e96532" radius={0.085} />
        </group>
      ))}

      <Bar from={[-1.55, 2.7, 0]} to={[1.55, 2.7, 0]} color="#f1c92d" radius={0.09} />

      {[-0.8, 0.8].map((x, i) => (
        <group key={x}>
          {[-0.28, 0.28].map((offset) => (
            <Bar
              key={offset}
              from={[x + offset, 2.65, 0]}
              to={[x + offset, 0.65, 0.12]}
              color="#d5dce0"
              radius={0.022}
            />
          ))}
          <Block
            position={[x, 0.62, 0.12]}
            size={[0.7, 0.09, 0.35]}
            color={i === 0 ? "#253d4b" : "#e9a627"}
          />
        </group>
      ))}
    </group>
  );
}

function Seesaw() {
  const beam = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (beam.current) {
      beam.current.rotation.z = Math.sin(clock.elapsedTime * 1.3) * 0.12;
    }
  });

  return (
    <group position={[3.3, 0, 3]}>
      <mesh position={[0, 0.33, 0]} castShadow>
        <coneGeometry args={[0.5, 0.7, 4]} />
        <meshStandardMaterial color="#e2a823" />
      </mesh>

      <group ref={beam} position={[0, 0.75, 0]}>
        <Block position={[0, 0, 0]} size={[3.3, 0.13, 0.28]} color="#eb6342" />
        {[-1.4, 1.4].map((x) => (
          <group key={x}>
            <Block
              position={[x, 0.08, 0]}
              size={[0.58, 0.12, 0.5]}
              color="#297bc1"
            />
            <Pole
              position={[x + (x < 0 ? 0.35 : -0.35), 0.08, 0]}
              height={0.38}
              color="#f0ca37"
            />
          </group>
        ))}
      </group>
    </group>
  );
}

function Roundabout() {
  const rotating = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rotating.current) rotating.current.rotation.y += delta * 0.22;
  });

  return (
    <group position={[5.4, 0, -1.3]}>
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[1.45, 1.45, 0.08, 40]} />
        <meshStandardMaterial color="#38aeb8" />
      </mesh>

      <group ref={rotating}>
        <mesh position={[0, 0.29, 0]} castShadow>
          <cylinderGeometry args={[0.88, 0.88, 0.18, 24]} />
          <meshStandardMaterial color="#f4c52d" />
        </mesh>

        <Pole position={[0, 0.3, 0]} height={1.2} color="#1c91bb" radius={0.08} />

        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <group key={i}>
              <Pole
                position={[Math.cos(a) * 0.75, 0.37, Math.sin(a) * 0.75]}
                height={0.85}
                color={i % 2 ? "#eaa82e" : "#2385c3"}
              />
              <Bar
                from={[0, 1.22, 0]}
                to={[Math.cos(a) * 0.75, 1.22, Math.sin(a) * 0.75]}
                color="#237ca5"
                radius={0.035}
              />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Pergola() {
  return (
    <group position={[5.5, 0, -5.05]}>
      {[-1.7, 1.7].flatMap((x) =>
        [-0.65, 0.65].map((z) => (
          <Pole
            key={`${x}-${z}`}
            position={[x, 0, z]}
            height={2.55}
            color="#544c38"
            radius={0.095}
          />
        ))
      )}

      {Array.from({ length: 9 }, (_, i) => (
        <Block
          key={i}
          position={[-1.8 + i * 0.45, 2.58, 0]}
          size={[0.13, 0.12, 1.85]}
          color="#a87642"
        />
      ))}

      <Bench position={[0, 0, 0]} rotation={0} />
    </group>
  );
}

function Fence() {
  const parts = [];

  // Laterales largos
  for (const z of [-7.2, 7.2]) {
    for (let x = -9; x <= 9; x += 0.45) {
      // Entrada frontal
      if (z === 7.2 && Math.abs(x) < 1.25) continue;
      parts.push(
        <Pole
          key={`z${z}-${x}`}
          position={[x, 0.1, z]}
          height={0.92}
          radius={0.025}
          color="#187444"
        />
      );
    }
  }

  for (const x of [-9, 9]) {
    for (let z = -7.2; z <= 7.2; z += 0.45) {
      parts.push(
        <Pole
          key={`x${x}-${z}`}
          position={[x, 0.1, z]}
          height={0.92}
          radius={0.025}
          color="#187444"
        />
      );
    }
  }

  return (
    <group>
      {parts}

      {[-7.2, 7.2].map((z) =>
        [0.33, 0.85].map((y) => (
          <group key={`${z}-${y}`}>
            <Bar from={[-9, y, z]} to={[-1.35, y, z]} color="#18824c" radius={0.035} />
            <Bar from={[1.35, y, z]} to={[9, y, z]} color="#18824c" radius={0.035} />
          </group>
        ))
      )}

      {[-9, 9].map((x) =>
        [0.33, 0.85].map((y) => (
          <Bar
            key={`${x}-${y}`}
            from={[x, y, -7.2]}
            to={[x, y, 7.2]}
            color="#18824c"
            radius={0.035}
          />
        ))
      )}

      <Pole position={[-1.35, 0, 7.2]} height={1.25} radius={0.085} />
      <Pole position={[1.35, 0, 7.2]} height={1.25} radius={0.085} />
    </group>
  );
}

function ParkGround() {
  return (
    <group>
      {/* Plataforma completa */}
      <Block
        position={[0, -0.16, 0]}
        size={[24, 0.28, 20]}
        color="#d7d3c8"
      />

      {/* Calles exteriores */}
      <Block
        position={[0, -0.005, 9]}
        size={[24, 0.025, 2]}
        color="#646b70"
      />
      <Block
        position={[10.5, -0.005, 0]}
        size={[3, 0.025, 20]}
        color="#646b70"
      />

      {/* Aceras */}
      <Block position={[0, 0.045, 7.85]} size={[19, 0.09, 1.3]} color="#e5d9cb" />
      <Block position={[9.55, 0.045, 0]} size={[1.1, 0.09, 16]} color="#e5d9cb" />

      {/* Césped del parque */}
      <Block position={[0, 0.01, 0]} size={[18, 0.045, 14.4]} color="#70ae65" />

      {/* Base del área de juegos */}
      <Block
        position={[0, 0.055, 0.1]}
        size={[15.3, 0.06, 9.2]}
        color="#e7aa83"
      />

      {/* Suelo multicolor */}
      <Block position={[-4.6, 0.092, 0]} size={[4.6, 0.03, 7.7]} color="#4d9cce" />
      <Block position={[0, 0.092, 0]} size={[4.5, 0.03, 7.7]} color="#79ba83" />
      <Block position={[4.6, 0.092, 0]} size={[4.5, 0.03, 7.7]} color="#e8bb47" />

      {/* Camino de entrada */}
      <Block position={[0, 0.105, 6.6]} size={[2.4, 0.05, 5.2]} color="#db9b83" />

      {/* Jardines perimetrales */}
      {[-6, -3, 0, 3, 6].map((x) => (
        <group key={x}>
          <FlowerBed position={[x, 0.02, -6.35]} />
        </group>
      ))}
    </group>
  );
}

function ParkContent() {
  return (
    <group>
      <ParkGround />
      <Fence />

      <SlidesAndTowers />
      <SwingSet />
      <Seesaw />
      <Roundabout />
      <Pergola />

      {/* Árboles alrededor de los juegos */}
      {[
        [-8, 0.03, -5.6],
        [-5, 0.03, -5.9],
        [-2.5, 0.03, -5.8],
        [1, 0.03, -5.8],
        [8, 0.03, -5.8],
        [-8, 0.03, 5.8],
        [-5, 0.03, 5.9],
        [4, 0.03, 5.9],
        [7.8, 0.03, 5.8],
      ].map((pos, i) => (
        <Tree
          key={i}
          position={pos as Pos}
          scale={0.75 + (i % 3) * 0.13}
        />
      ))}

      <Bench position={[-6.5, 0, -5.6]} />
      <Bench position={[1.5, 0, -5.6]} />
      <Bench position={[6.3, 0, 5.8]} rotation={Math.PI} />

      <FlowerBed position={[-7.5, 0.04, 4.9]} />
      <FlowerBed position={[7.6, 0.04, 4.6]} />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.3}
        scale={25}
        blur={2.8}
        far={12}
      />
    </group>
  );
}

export default function ParkScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{
          position: [19, 17, 22],
          fov: 38,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <color attach="background" args={["#e0eff9"]} />

        <ambientLight intensity={1.7} />

        <directionalLight
          position={[8, 18, 10]}
          intensity={2.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Environment preset="city" />

        <ParkContent />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={14}
          maxDistance={48}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI / 2.25}
          target={[0, 0.6, 0]}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}
