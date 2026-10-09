
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Sky,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Pos = [number, number, number];

const CITY = 36;
const ROAD = 4.8;

function rand(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Box({
  position,
  size,
  color,
  rotation,
  metalness = 0,
  roughness = 0.85,
}: {
  position: Pos;
  size: Pos;
  color: string;
  rotation?: Pos;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}

/* ========== ÁRBOLES ========== */

function Tree({
  position,
  scale = 1,
  variant = 0,
}: {
  position: Pos;
  scale?: number;
  variant?: number;
}) {
  const crown = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (crown.current) {
      crown.current.rotation.z =
        Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.018;
    }
  });

  const greens = ["#287a43", "#36984f", "#4ca65b", "#6bb76a"];
  const green = greens[variant % greens.length];

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.6, 9]} />
        <meshStandardMaterial color="#77523b" />
      </mesh>

      <group ref={crown}>
        {[
          [0, 2.05, 0, 0.88],
          [-0.43, 1.65, 0.12, 0.62],
          [0.42, 1.72, -0.12, 0.67],
          [0, 2.65, 0, 0.58],
        ].map(([x, y, z, s], i) => (
          <mesh
            key={i}
            position={[x, y, z]}
            castShadow
          >
            <icosahedronGeometry args={[s, 2]} />
            <meshStandardMaterial
              color={i % 2 ? green : greens[(variant + 1) % 4]}
              roughness={0.95}
              flatShading
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ========== EDIFICIOS ========== */

function Building({
  position,
  width,
  depth,
  height,
  seed,
}: {
  position: Pos;
  width: number;
  depth: number;
  height: number;
  seed: number;
}) {
  const colors = [
    "#c9b4a0",
    "#b87860",
    "#d5c7b4",
    "#b8c6c3",
    "#d1a489",
    "#c3b8a7",
  ];

  const color = colors[Math.floor(seed * colors.length) % colors.length];
  const floors = Math.max(2, Math.floor(height / 0.85));
  const cols = Math.max(2, Math.floor(width / 0.8));

  return (
    <group position={position}>
      <Box
        position={[0, height / 2, 0]}
        size={[width, height, depth]}
        color={color}
      />

      {/* Zócalo */}
      <Box
        position={[0, 0.2, depth / 2 + 0.025]}
        size={[width + 0.05, 0.4, 0.08]}
        color="#8b8177"
      />

      {/* Cornisa */}
      <Box
        position={[0, height + 0.07, 0]}
        size={[width + 0.22, 0.14, depth + 0.22]}
        color="#e3ded3"
      />

      {/* Ventanas frontales */}
      {Array.from({ length: floors }).flatMap((_, f) =>
        Array.from({ length: cols }).map((_, c) => {
          const x = -width / 2 + ((c + 0.5) * width) / cols;
          const y = 0.65 + f * 0.85;
          const lit = rand(seed * 100 + f * 17 + c) > 0.76;

          return (
            <group key={`front-${f}-${c}`}>
              <Box
                position={[x, y, depth / 2 + 0.012]}
                size={[0.43, 0.49, 0.035]}
                color={lit ? "#e6c994" : "#567f88"}
                metalness={0.25}
                roughness={0.3}
              />
              <Box
                position={[x, y, depth / 2 + 0.038]}
                size={[0.025, 0.49, 0.015]}
                color="#e6e3dc"
              />
              <Box
                position={[x, y - 0.26, depth / 2 + 0.06]}
                size={[0.5, 0.045, 0.12]}
                color="#a8a39a"
              />
            </group>
          );
        })
      )}

      {/* Ventanas laterales */}
      {Array.from({ length: floors }).flatMap((_, f) =>
        Array.from({ length: Math.max(1, Math.floor(depth / 0.95)) }).map(
          (_, c) => (
            <Box
              key={`side-${f}-${c}`}
              position={[
                width / 2 + 0.015,
                0.65 + f * 0.85,
                -depth / 2 + 0.55 + c * 0.95,
              ]}
              size={[0.035, 0.46, 0.42]}
              color="#638c93"
              metalness={0.2}
            />
          )
        )
      )}

      {/* Puerta */}
      <Box
        position={[0, 0.48, depth / 2 + 0.055]}
        size={[0.58, 0.96, 0.08]}
        color="#554b44"
      />

      {/* Tanque de agua */}
      {seed > 0.5 && (
        <group position={[width * 0.23, height + 0.15, 0]}>
          <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.72, 12]} />
            <meshStandardMaterial color="#2d3335" />
          </mesh>
          <mesh position={[0, 0.74, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.07, 12]} />
            <meshStandardMaterial color="#222729" />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ========== CASAS DE LADRILLO ========== */

function House({
  position,
  seed,
}: {
  position: Pos;
  seed: number;
}) {
  const h = 1.8 + rand(seed + 3) * 1.5;
  const color = rand(seed) > 0.5 ? "#a85c43" : "#c27956";

  return (
    <group position={position}>
      <Box
        position={[0, h / 2, 0]}
        size={[2.5, h, 2.4]}
        color={color}
      />

      {/* Líneas de ladrillo */}
      {Array.from({ length: Math.floor(h / 0.23) }).map((_, i) => (
        <Box
          key={i}
          position={[0, 0.23 + i * 0.23, 1.207]}
          size={[2.5, 0.013, 0.015]}
          color="#d39b7c"
        />
      ))}

      <Box
        position={[0, h + 0.07, 0]}
        size={[2.7, 0.14, 2.6]}
        color="#a7a8a1"
      />

      {[-0.7, 0.7].map((x) => (
        <group key={x}>
          <Box
            position={[x, h * 0.64, 1.215]}
            size={[0.55, 0.62, 0.04]}
            color="#456e7b"
          />
          <Box
            position={[x, h * 0.64, 1.245]}
            size={[0.035, 0.62, 0.02]}
            color="#d6d5cc"
          />
        </group>
      ))}

      <Box
        position={[0, 0.55, 1.25]}
        size={[0.65, 1.1, 0.08]}
        color="#51483e"
      />

      {/* Muro bajo */}
      <Box
        position={[0, 0.38, 1.65]}
        size={[2.8, 0.76, 0.14]}
        color="#b7a89a"
      />
    </group>
  );
}

/* ========== CALLES Y ACERAS ========== */

function Roads() {
  const axes = [-12, 0, 12];

  return (
    <group>
      {/* Terreno */}
      <Box
        position={[0, -0.32, 0]}
        size={[CITY + 2, 0.6, CITY + 2]}
        color="#91ae83"
      />

      {/* Base de ciudad */}
      <Box
        position={[0, -0.04, 0]}
        size={[CITY, 0.08, CITY]}
        color="#a6b69b"
      />

      {axes.map((v) => (
        <group key={v}>
          {/* Calle vertical */}
          <Box
            position={[v, 0.035, 0]}
            size={[ROAD, 0.07, CITY]}
            color="#454d51"
          />

          {/* Calle horizontal */}
          <Box
            position={[0, 0.04, v]}
            size={[CITY, 0.07, ROAD]}
            color="#454d51"
          />

          {/* Líneas discontinuas */}
          {Array.from({ length: 17 }).map((_, i) => {
            const p = -17 + i * 2;

            return (
              <group key={i}>
                <Box
                  position={[v, 0.086, p]}
                  size={[0.055, 0.008, 0.85]}
                  color="#e9d99d"
                />
                <Box
                  position={[p, 0.09, v]}
                  size={[0.85, 0.008, 0.055]}
                  color="#e9d99d"
                />
              </group>
            );
          })}
        </group>
      ))}

      {/* Pasos peatonales */}
      {axes.flatMap((x) =>
        axes.flatMap((z) =>
          [-3.15, 3.15].flatMap((offset) =>
            Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={`${x}-${z}-${offset}-${i}`}
                position={[x - 1.35 + i * 0.67, 0.095, z + offset]}
                size={[0.42, 0.012, 0.17]}
                color="#e8e9e5"
              />
            ))
          )
        )
      )}

      {/* Aceras en manzanas */}
      {[-6, 6].flatMap((x) =>
        [-6, 6].map((z) => (
          <group key={`${x}-${z}`}>
            <Box
              position={[x, 0.12, z]}
              size={[7.05, 0.2, 7.05]}
              color="#c9c7ba"
            />
            <Box
              position={[x, 0.235, z]}
              size={[6.45, 0.035, 6.45]}
              color="#a4b995"
            />
          </group>
        ))
      )}
    </group>
  );
}

/* ========== PARQUE CENTRAL ========== */

function Park() {
  return (
    <group position={[6, 0.27, 6]}>
      <Box
        position={[0, 0.01, 0]}
        size={[6.3, 0.05, 6.3]}
        color="#6fa56d"
      />

      {/* Senderos */}
      <Box
        position={[0, 0.055, 0]}
        size={[0.75, 0.025, 6.25]}
        color="#d7c9a8"
      />
      <Box
        position={[0, 0.06, 0]}
        size={[6.25, 0.025, 0.75]}
        color="#d7c9a8"
      />

      {/* Plaza circular */}
      <mesh
        position={[0, 0.085, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.25, 40]} />
        <meshStandardMaterial color="#d8d0bd" />
      </mesh>

      {/* Fuente */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.24, 32]} />
        <meshStandardMaterial color="#c4c8c5" />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.05, 32]} />
        <meshStandardMaterial
          color="#4da5b5"
          metalness={0.25}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.055, 0.09, 0.6, 12]} />
        <meshStandardMaterial color="#9bdbe5" transparent opacity={0.75} />
      </mesh>

      {[
        [-2.15, 0, -2.1],
        [2.15, 0, -2.1],
        [-2.15, 0, 2.1],
        [2.15, 0, 2.1],
      ].map((p, i) => (
        <Tree
          key={i}
          position={p as Pos}
          scale={0.65}
          variant={i}
        />
      ))}

      {/* Bancas */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.7, 0.1, 0]}>
          <Box
            position={[0, 0.25, 0]}
            size={[0.32, 0.12, 0.9]}
            color="#815b3d"
          />
          <Box
            position={[s * 0.12, 0.48, 0]}
            size={[0.1, 0.45, 0.9]}
            color="#815b3d"
          />
        </group>
      ))}
    </group>
  );
}

/* ========== ALUMBRADO PÚBLICO ========== */

function StreetLamp({ position }: { position: Pos }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.075, 2.7, 8]} />
        <meshStandardMaterial color="#505d5c" metalness={0.5} />
      </mesh>
      <Box
        position={[0.32, 2.7, 0]}
        size={[0.65, 0.07, 0.07]}
        color="#505d5c"
      />
      <Box
        position={[0.62, 2.63, 0]}
        size={[0.32, 0.08, 0.2]}
        color="#fff3cf"
      />
    </group>
  );
}

/* ========== VEHÍCULOS ANIMADOS ========== */

function Vehicle({
  position,
  color,
  speed,
  axis = "z",
  direction = 1,
  kind = "car",
}: {
  position: Pos;
  color: string;
  speed: number;
  axis?: "x" | "z";
  direction?: number;
  kind?: "car" | "bus";
}) {
  const ref = useRef<THREE.Group>(null);
  const length = kind === "bus" ? 2.25 : 1.15;
  const width = kind === "bus" ? 0.83 : 0.72;

  useFrame((_, delta) => {
    if (!ref.current) return;

    const p = ref.current.position;
    p[axis] += speed * direction * Math.min(delta, 0.05);

    if (p[axis] > 19) p[axis] = -19;
    if (p[axis] < -19) p[axis] = 19;
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={[0, axis === "x" ? Math.PI / 2 : 0, 0]}
    >
      <Box
        position={[0, 0.29, 0]}
        size={[width, 0.32, length]}
        color={color}
        metalness={0.18}
        roughness={0.35}
      />

      <Box
        position={[0, kind === "bus" ? 0.64 : 0.53, -0.04]}
        size={[
          width * 0.83,
          kind === "bus" ? 0.55 : 0.32,
          length * 0.57,
        ]}
        color={kind === "bus" ? color : "#86afba"}
        metalness={0.2}
        roughness={0.3}
      />

      {/* Parabrisas */}
      <Box
        position={[0, 0.56, length * 0.3]}
        size={[width * 0.68, 0.24, 0.035]}
        color="#8bbbc7"
      />

      {/* Ruedas */}
      {[-1, 1].flatMap((side) =>
        [-1, 1].map((end) => (
          <mesh
            key={`${side}-${end}`}
            position={[
              side * (width / 2 + 0.015),
              0.17,
              end * length * 0.3,
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.17, 0.17, 0.09, 12]} />
            <meshStandardMaterial color="#202427" />
          </mesh>
        ))
      )}

      {/* Luces */}
      {[-0.23, 0.23].map((x) => (
        <group key={x}>
          <Box
            position={[x, 0.31, length / 2 + 0.012]}
            size={[0.15, 0.09, 0.025]}
            color="#fff0c0"
          />
          <Box
            position={[x, 0.31, -length / 2 - 0.012]}
            size={[0.15, 0.09, 0.025]}
            color="#bc3434"
          />
        </group>
      ))}
    </group>
  );
}

/* ========== CIUDAD COMPLETA ========== */

function City() {
  const structures = useMemo(() => {
    const result: {
      position: Pos;
      seed: number;
      house: boolean;
      height: number;
      width: number;
      depth: number;
    }[] = [];

    const centers = [-6, 6];

    for (const cx of centers) {
      for (const cz of centers) {
        // Una manzana será parque
        if (cx === 6 && cz === 6) continue;

        for (let ix = 0; ix < 2; ix++) {
          for (let iz = 0; iz < 2; iz++) {
            const x = cx + (ix ? 1.65 : -1.65);
            const z = cz + (iz ? 1.65 : -1.65);
            const seed = rand(x * 13 + z * 17);

            result.push({
              position: [x, 0.26, z],
              seed,
              house: seed < 0.38,
              height: 2.8 + seed * 6.2,
              width: 2.6,
              depth: 2.6,
            });
          }
        }
      }
    }

    return result;
  }, []);

  const outerBuildings = useMemo(() => {
    const result: {
      position: Pos;
      seed: number;
      height: number;
    }[] = [];

    for (const x of [-15.2, 15.2]) {
      for (const z of [-15, -11, -7, -3, 3, 7, 11, 15]) {
        const seed = rand(x * 5 + z * 11);
        result.push({
          position: [x, 0.06, z],
          seed,
          height: 2.5 + seed * 7,
        });
      }
    }

    for (const z of [-15.2, 15.2]) {
      for (const x of [-11, -7, -3, 3, 7, 11]) {
        const seed = rand(x * 9 + z * 5);
        result.push({
          position: [x, 0.06, z],
          seed,
          height: 3 + seed * 6,
        });
      }
    }

    return result;
  }, []);

  const trees = useMemo(() => {
    const result: Pos[] = [];

    // Arbolado de avenidas
    for (const road of [-12, 0, 12]) {
      for (let p = -17; p <= 17; p += 3.1) {
        if ([-12, 0, 12].some((cross) => Math.abs(p - cross) < 3.1))
          continue;

        result.push([road - 2.85, 0.12, p]);
        result.push([road + 2.85, 0.12, p]);
        result.push([p, 0.12, road - 2.85]);
        result.push([p, 0.12, road + 2.85]);
      }
    }

    // Vegetación exterior
    for (let x = -18; x <= 18; x += 2.3) {
      for (const z of [-17.5, 17.5]) {
        if (rand(x * 8 + z) > 0.3) result.push([x, 0.08, z]);
      }
    }

    return result;
  }, []);

  return (
    <group>
      <Roads />

      {structures.map((b, i) =>
        b.house ? (
          <House key={`h${i}`} position={b.position} seed={b.seed} />
        ) : (
          <Building
            key={`b${i}`}
            position={b.position}
            height={b.height}
            width={b.width}
            depth={b.depth}
            seed={b.seed}
          />
        )
      )}

      {outerBuildings.map((b, i) => (
        <Building
          key={`outer${i}`}
          position={b.position}
          height={b.height}
          width={2.3}
          depth={2.4}
          seed={b.seed}
        />
      ))}

      <Park />

      {trees.map((p, i) => (
        <Tree
          key={`tree${i}`}
          position={p}
          scale={0.48 + rand(i * 7) * 0.25}
          variant={i % 4}
        />
      ))}

      {/* Alumbrado */}
      {[-12, 0, 12].flatMap((road) =>
        [-8, -4, 4, 8].map((p) => (
          <StreetLamp
            key={`${road}-${p}`}
            position={[road + 2.8, 0.12, p]}
          />
        ))
      )}

      {/* Autos en distintas avenidas */}
      <Vehicle position={[-12.8, 0.1, -15]} color="#d8e1e0" speed={2.5} />
      <Vehicle
        position={[-11.2, 0.1, 12]}
        color="#d04e43"
        speed={2}
        direction={-1}
      />
      <Vehicle position={[0.8, 0.1, -9]} color="#e2ae44" speed={2.7} />
      <Vehicle
        position={[-0.8, 0.1, 14]}
        color="#f3f3ed"
        speed={2.2}
        direction={-1}
      />
      <Vehicle position={[12.8, 0.1, -12]} color="#357f96" speed={2.1} />
      <Vehicle
        position={[11.2, 0.1, 10]}
        color="#d8d9d6"
        speed={2.5}
        direction={-1}
      />

      <Vehicle
        position={[-15, 0.1, -0.8]}
        color="#c5c9c7"
        speed={2.3}
        axis="x"
      />
      <Vehicle
        position={[13, 0.1, 0.8]}
        color="#5b9b7b"
        speed={2.5}
        axis="x"
        direction={-1}
      />
      <Vehicle
        position={[-10, 0.1, 12.8]}
        color="#e9e7df"
        speed={2.2}
        axis="x"
      />
      <Vehicle
        position={[10, 0.1, 11.2]}
        color="#d75e46"
        speed={2}
        axis="x"
        direction={-1}
      />

      {/* Bus urbano */}
      <Vehicle
        position={[0.8, 0.1, -17]}
        color="#258f86"
        speed={1.7}
        kind="bus"
      />

      <ContactShadows
        position={[0, -0.015, 0]}
        opacity={0.23}
        scale={43}
        blur={2.8}
        far={15}
      />
    </group>
  );
}

/* ========== ESCENA PRINCIPAL ========== */

export default function CityScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{
          position: [33, 31, 39],
          fov: 39,
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.25} />

        <hemisphereLight
          args={["#dbeeff", "#7c986f", 1.5]}
        />

        <directionalLight
          position={[20, 35, 15]}
          intensity={2.7}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-bias={-0.0003}
        />

        <Environment preset="city" />

        <City />

        <OrbitControls
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.055}
          minDistance={19}
          maxDistance={78}
          minPolarAngle={0.15}
          maxPolarAngle={Math.PI / 2.15}
          autoRotate
          autoRotateSpeed={0.3}
          target={[0, 2, 0]}
        />
      </Canvas>
    </div>
  );
}
