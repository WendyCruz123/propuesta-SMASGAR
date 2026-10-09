"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import type { ReactNode } from "react";

function MiniCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="h-[220px] w-full rounded-[24px] bg-gradient-to-b from-sky-100 to-white">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [5.5, 4.5, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#dff1ff"]} />
        <ambientLight intensity={1.7} />
        <directionalLight
          position={[6, 9, 7]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <hemisphereLight args={["#f3fbff", "#94a87d", 1.1]} />

        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.18}>
          {children}
        </Float>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.25}
          scale={10}
          blur={2.5}
          far={8}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={0.8}
          maxPolarAngle={1.2}
          target={[0, 0.7, 0]}
        />
      </Canvas>
    </div>
  );
}

function BaseGround({
  color = "#d9c8a7",
}: {
  color?: string;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ==========================================
   COMPONENTES AUXILIARES PARA LOS MODELOS 3D
========================================== */

/* ÁRBOLES TIPO PINO */
function PineTree({
  p,
  scale = 1,
}: {
  p: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={p} scale={scale}>
      {/* Tronco */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.56, 8]} />
        <meshStandardMaterial color="#6e4d37" />
      </mesh>

      {/* Copa inferior */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <coneGeometry args={[0.28, 0.48, 8]} />
        <meshStandardMaterial color="#2f7245" flatShading />
      </mesh>

      {/* Copa central */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <coneGeometry args={[0.22, 0.42, 8]} />
        <meshStandardMaterial color="#377c4b" flatShading />
      </mesh>

      {/* Copa superior */}
      <mesh position={[0, 1.06, 0]} castShadow>
        <coneGeometry args={[0.16, 0.3, 8]} />
        <meshStandardMaterial color="#316d43" flatShading />
      </mesh>
    </group>
  );
}

/* VIVIENDAS PARA EL ENTORNO URBANO */
function SmallHouse({
  p,
  body = "#ecebe7",
  roof = "#c47957",
}: {
  p: [number, number, number];
  body?: string;
  roof?: string;
}) {
  return (
    <group position={p}>
      {/* Estructura */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.52, 0.4, 0.42]} />
        <meshStandardMaterial color={body} />
      </mesh>

      {/* Techo */}
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.6, 0.12, 0.5]} />
        <meshStandardMaterial color={roof} />
      </mesh>

      {/* Puerta */}
      <mesh position={[0, 0.15, 0.216]}>
        <planeGeometry args={[0.12, 0.26]} />
        <meshStandardMaterial color="#72685e" />
      </mesh>

      {/* Ventana */}
      <mesh position={[-0.15, 0.27, 0.218]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshStandardMaterial color="#6f9eb2" />
      </mesh>
    </group>
  );
}

/* MONTAÑAS CON CUMBRES NEVADAS */
function SnowMountain({
  p,
  scale = 1,
  color = "#8e8b92",
}: {
  p: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={p} scale={scale}>
      {/* Montaña */}
      <mesh castShadow>
        <coneGeometry args={[0.8, 1.35, 4]} />
        <meshStandardMaterial
          color={color}
          flatShading
          roughness={0.95}
        />
      </mesh>

      {/* Nieve */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <coneGeometry args={[0.32, 0.42, 4]} />
        <meshStandardMaterial
          color="#f3f7fb"
          flatShading
        />
      </mesh>
    </group>
  );
}

/* 1. Emisario Tacachira */
function EmisarioScene() {
  return (
    <group>
      <BaseGround color="#c89c70" />

      {/* ladera principal */}
      <mesh
        position={[0, 0.18, 0]}
        rotation={[-Math.PI / 2, 0, -0.28]}
        receiveShadow
      >
        <planeGeometry args={[8.2, 5.2]} />
        <meshStandardMaterial color="#b78658" />
      </mesh>

      {/* franja de valle al fondo */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.2, 0.03, -2.3]}
        receiveShadow
      >
        <planeGeometry args={[5.2, 1.5]} />
        <meshStandardMaterial color="#8d9d7e" />
      </mesh>

      {/* montañas */}
      {[
        [-3.0, 0.95, -3.0, 1.05],
        [-1.8, 1.1, -3.05, 1.18],
        [-0.3, 1.2, -3.15, 1.3],
        [1.3, 1.08, -3.0, 1.15],
        [2.8, 0.96, -3.05, 1.02],
      ].map(([x, y, z, s], i) => (
        <SnowMountain
          key={i}
          p={[x as number, y as number, z as number]}
          scale={s as number}
          color={i % 2 === 0 ? "#8b868b" : "#7f8893"}
        />
      ))}

      {/* casitas laterales */}
      {[
        [-3.0, 0.06, 1.45],
        [-2.35, 0.12, 1.0],
        [-1.7, 0.18, 0.62],
      ].map((p, i) => (
        <SmallHouse
          key={i}
          p={p as [number, number, number]}
          body={i === 1 ? "#f2f1ee" : "#e6e4de"}
          roof={i === 2 ? "#c98b68" : "#dad8d3"}
        />
      ))}

      {/* árboles tipo pino */}
      {[
        [-1.9, 0.2, 0.75, 0.9],
        [-1.0, 0.35, 0.35, 1.0],
        [0.2, 0.52, -0.15, 1.02],
        [1.25, 0.65, -0.65, 1.06],
        [2.2, 0.78, -1.05, 1.1],
      ].map(([x, y, z, s], i) => (
        <PineTree
          key={i}
          p={[x as number, y as number, z as number]}
          scale={s as number}
        />
      ))}

      {/* rocas */}
      {[
        [-2.1, 0.12, 1.2, 0.22],
        [-1.55, 0.22, 0.92, 0.18],
        [-0.8, 0.3, 0.6, 0.22],
        [0.05, 0.42, 0.2, 0.2],
        [0.9, 0.52, -0.18, 0.24],
        [1.7, 0.64, -0.52, 0.18],
      ].map(([x, y, z, s], i) => (
        <mesh
          key={i}
          position={[x as number, y as number, z as number]}
          rotation={[0.2, i * 0.5, 0.1]}
          scale={s as number}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#9f7753" flatShading />
        </mesh>
      ))}

      {/* tubería principal SIN aros */}
      <mesh
        position={[0.4, 0.82, 0.05]}
        rotation={[0.08, -0.6, Math.PI / 2]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.46, 0.46, 8.2, 28]} />
        <meshStandardMaterial
          color="#1a212c"
          metalness={0.22}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

/* 2. PTAR Tacachira */
function PtarScene() {
  return (
    <group>
      <BaseGround color="#87b06f" />

      {/* ciudad al fondo */}
      {[
        [-3.2, 0.02, -2.7],
        [-2.4, 0.02, -2.75],
        [-1.6, 0.02, -2.7],
        [-0.8, 0.02, -2.8],
        [0.0, 0.02, -2.72],
        [0.85, 0.02, -2.76],
        [1.7, 0.02, -2.68],
        [2.55, 0.02, -2.74],
        [3.3, 0.02, -2.7],
      ].map((p, i) => (
        <SmallHouse
          key={i}
          p={p as [number, number, number]}
          body="#f3f3f1"
          roof={i % 2 === 0 ? "#bf7d5b" : "#c78d6f"}
        />
      ))}

      {/* montañas del fondo */}
      {[
        [-3.2, 0.95, -3.4, 1.05],
        [-1.8, 1.05, -3.45, 1.18],
        [-0.2, 1.15, -3.5, 1.32],
        [1.4, 1.02, -3.42, 1.18],
        [3.0, 0.94, -3.36, 1.02],
      ].map(([x, y, z, s], i) => (
        <SnowMountain
          key={i}
          p={[x as number, y as number, z as number]}
          scale={s as number}
          color={i % 2 === 0 ? "#7e8591" : "#8d9198"}
        />
      ))}

      {/* plataforma general PTAR */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[6.5, 0.16, 4.9]} />
        <meshStandardMaterial color="#dde0e2" />
      </mesh>

      {/* piscinas grandes */}
      {[
        [-1.95, 0.22, -0.95],
        [-0.35, 0.22, -0.95],
        [1.25, 0.22, -0.95],
        [-1.95, 0.22, 0.72],
        [-0.35, 0.22, 0.72],
        [1.25, 0.22, 0.72],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.32, 0.26, 1.18]} />
            <meshStandardMaterial color="#aeb5ba" />
          </mesh>

          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[1.08, 0.05, 0.95]} />
            <meshStandardMaterial color="#224965" />
          </mesh>
        </group>
      ))}

      {/* pasillos */}
      <mesh position={[-0.38, 0.18, -0.1]} receiveShadow>
        <boxGeometry args={[5.4, 0.05, 0.22]} />
        <meshStandardMaterial color="#c7cbcf" />
      </mesh>

      <mesh position={[0.42, 0.18, -1.8]} receiveShadow>
        <boxGeometry args={[0.22, 0.05, 3.75]} />
        <meshStandardMaterial color="#c7cbcf" />
      </mesh>

      {/* edificios blancos */}
      {[
        [-2.1, 0.58, 2.05],
        [-0.15, 0.7, 2.02],
        [2.0, 0.58, 1.95],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, i === 1 ? 1.35 : 1.0, 0.95]} />
            <meshStandardMaterial color="#f7f7f6" />
          </mesh>

          <mesh position={[0, i === 1 ? 0.72 : 0.55, 0]} castShadow>
            <boxGeometry args={[1.24, 0.12, 1.04]} />
            <meshStandardMaterial color="#2f87c5" />
          </mesh>
        </group>
      ))}

      {/* edificio frontal derecho */}
      <group position={[2.4, 0.48, 0.55]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.95, 1.05]} />
          <meshStandardMaterial color="#f4f4f3" />
        </mesh>

        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[1.3, 0.12, 1.15]} />
          <meshStandardMaterial color="#2c7fbc" />
        </mesh>
      </group>

      {/* detalles azules tipo tubería */}
      {[
        [-2.8, 0.24, -1.9],
        [-2.55, 0.24, -1.78],
        [-2.3, 0.24, -1.66],
        [1.4, 0.24, -2.0],
        [1.65, 0.24, -1.88],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.3, 16]} />
          <meshStandardMaterial color="#3b96d0" />
        </mesh>
      ))}

      {/* área verde lateral */}
      {[
        [-3.0, 0, 2.2, 0.78],
        [-2.5, 0, 1.55, 0.65],
        [3.1, 0, 2.25, 0.82],
      ].map(([x, y, z, s], i) => (
        <PineTree
          key={i}
          p={[x as number, y as number, z as number]}
          scale={s as number}
        />
      ))}
    </group>
  );
}

/* 3. Agua Potable Noroeste */
function WaterTankScene() {
  return (
    <group>
      <BaseGround color="#c8b083" />

      {/* base */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.2, 4.6]} />
        <meshStandardMaterial color="#d8d8d8" />
      </mesh>

      {/* tanque grande */}
      <mesh position={[-0.9, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1, 2.3, 28]} />
        <meshStandardMaterial color="#d7eef6" />
      </mesh>
      <mesh position={[-0.9, 2.45, 0]} castShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.16, 28]} />
        <meshStandardMaterial color="#2f8ac8" />
      </mesh>

      {/* tanque pequeño */}
      <mesh position={[1.45, 0.8, 0.35]} castShadow>
        <cylinderGeometry args={[0.6, 0.65, 1.5, 24]} />
        <meshStandardMaterial color="#d8eef7" />
      </mesh>
      <mesh position={[1.45, 1.62, 0.35]} castShadow>
        <cylinderGeometry args={[0.72, 0.72, 0.14, 24]} />
        <meshStandardMaterial color="#49a3d8" />
      </mesh>

      {/* caseta */}
      <mesh position={[1.2, 0.45, -1.3]} castShadow>
        <boxGeometry args={[1.2, 0.9, 1.1]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
    </group>
  );
}

/* 4. Agua Segura Distrito Rural 13 */
function RuralWaterScene() {
  return (
    <group>
      <BaseGround color="#c6a977" />

      {/* base verde */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[6, 0.08, 5]} />
        <meshStandardMaterial color="#89b66e" />
      </mesh>

      {/* caseta */}
      <mesh position={[-0.8, 0.45, 0]} castShadow>
        <boxGeometry args={[1.3, 0.9, 1.2]} />
        <meshStandardMaterial color="#dfdfdf" />
      </mesh>
      <mesh position={[-0.8, 1.05, 0]} castShadow>
        <boxGeometry args={[1.45, 0.12, 1.35]} />
        <meshStandardMaterial color="#1d8fd1" />
      </mesh>

      {/* bomba / equipo */}
      <mesh position={[0.6, 0.38, -0.2]} castShadow>
        <boxGeometry args={[0.7, 0.75, 0.7]} />
        <meshStandardMaterial color="#3399cc" />
      </mesh>
      <mesh position={[1.1, 0.5, 0.45]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2b7f56" />
      </mesh>

      {/* tanque */}
      <mesh position={[1.75, 0.75, -0.4]} castShadow>
        <cylinderGeometry args={[0.42, 0.46, 1.4, 20]} />
        <meshStandardMaterial color="#cde8ef" />
      </mesh>

      {/* árboles */}
      {[
        [-2.1, 0, -1.4],
        [-1.8, 0, 1.35],
        [2.45, 0, 1.2],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 1.1, 8]} />
            <meshStandardMaterial color="#71513a" />
          </mesh>
          <mesh position={[0, 1.45, 0]} castShadow>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial color="#499d4f" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* 5. Alcantarillado Sanitario */
function SewerScene() {
  return (
    <group>
      <BaseGround color="#d1b78a" />

      {/* zanja */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.16, 3.2]} />
        <meshStandardMaterial color="#c99969" />
      </mesh>

      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.35, 1.2]} />
        <meshStandardMaterial color="#8f6948" />
      </mesh>

      {/* tubería */}
      <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 5.1, 24]} />
        <meshStandardMaterial color="#2f4d66" />
      </mesh>

      {/* uniones */}
      {[-1.7, 0, 1.7].map((x) => (
        <mesh key={x} position={[x, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.43, 0.05, 12, 24]} />
          <meshStandardMaterial color="#48657b" />
        </mesh>
      ))}

      {/* bordes */}
      <mesh position={[0, 0.17, 1.25]} castShadow>
        <boxGeometry args={[6.2, 0.18, 0.28]} />
        <meshStandardMaterial color="#d7c2a3" />
      </mesh>
      <mesh position={[0, 0.17, -1.25]} castShadow>
        <boxGeometry args={[6.2, 0.18, 0.28]} />
        <meshStandardMaterial color="#d7c2a3" />
      </mesh>
    </group>
  );
}

type ProjectCardProps = {
  title: string;
  district: string;
  subtitle: string;
  children: ReactNode;
  accent: string;
};

function ProjectCard({
  title,
  district,
  subtitle,
  children,
  accent,
}: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-xl shadow-slate-900/5">
      <div
        className="px-4 py-3 text-center text-sm font-extrabold uppercase leading-5 text-white"
        style={{ backgroundColor: accent }}
      >
        {title}
      </div>

      <MiniCanvas>{children}</MiniCanvas>

      <div className="px-4 pb-5 pt-4 text-center">
        <div className="inline-block rounded-xl border border-slate-200 px-4 py-1 text-lg font-extrabold text-slate-800">
          {district}
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function ProjectModelsRow() {
  return (
    <section className="bg-[#f4f8fb] px-6 py-24 md:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-4 inline-block rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              Proyectos priorizados
            </span>
            <h2 className="max-w-[900px] text-4xl font-extrabold tracking-[-0.05em] text-[#16384d] md:text-6xl">
              Mini modelados 3D
              <br />
              de proyectos de agua y saneamiento.
            </h2>
          </div>

          <p className="max-w-[380px] text-base leading-8 text-slate-500">
            Representación conceptual en 3D de los proyectos
            priorizados, mostrados en una sola fila para una
            presentación más visual e interactiva.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-5">
          <ProjectCard
            title="Const. Emisario Tacachira"
            district="D11"
            subtitle="Tubería principal"
            accent="#0b62b5"
          >
            <EmisarioScene />
          </ProjectCard>

          <ProjectCard
            title="Ampliación PTAR Tacachira Fase II"
            district="D11"
            subtitle="Planta de tratamiento"
            accent="#8426c7"
          >
            <PtarScene />
          </ProjectCard>

          <ProjectCard
            title="Ampliación y Mejoramiento Agua Potable Noroeste"
            district="D7 y D14"
            subtitle="Tanques y sistema"
            accent="#1296d8"
          >
            <WaterTankScene />
          </ProjectCard>

          <ProjectCard
            title="Agua Segura Distrito Rural 13"
            district="D13"
            subtitle="Módulo rural"
            accent="#11a8c6"
          >
            <RuralWaterScene />
          </ProjectCard>

          <ProjectCard
            title="Ampliación Alcantarillado Sanitario Noroeste II"
            district="D7 D14"
            subtitle="Red sanitaria"
            accent="#17a14c"
          >
            <SewerScene />
          </ProjectCard>
        </div>
      </div>
    </section>
  );
}