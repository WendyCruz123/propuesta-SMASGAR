
"use client";

import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "motion/react";
import {
  Trees,
  Waves,
  Droplets,
  MapPin,
  Users,
  CalendarDays,
  Wallet,
  ArrowRight,
  ShieldCheck,
  House,
  CloudRain,
  Leaf,
  Activity,
  Construction,
  Route,
  CircleCheck,
} from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ParkScene = dynamic(
  () => import("./ParkScene"),
  { ssr: false }
);

const RiverScene = dynamic(
    () => import("./RiverScene"), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({
  children,
  color = "green",
}: {
  children: React.ReactNode;
  color?: "green" | "blue";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] ${
        color === "blue"
          ? "border-sky-200 bg-sky-50 text-sky-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {children}
    </span>
  );
}

function SmallStat({
  value,
  label,
  Icon,
  color = "#157954",
}: {
  value: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}16` }}
      >
        <Icon size={18} color={color} />
      </div>
      <div className="min-w-0">
        <p
          className="break-words text-base font-black leading-tight"
          style={{ color }}
        >
          {value}
        </p>
        <p className="text-[10px] leading-tight text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

// ======================================
// ORIGINAL 9 - PARQUES Y ÁREAS VERDES
// ======================================


export function Slide09() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f3f7f3] text-[#173647]">

      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-100/60 blur-[110px]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-[1800px] flex-col px-4 py-5 sm:px-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-6">

        {/* ENCABEZADO GENERAL */}
        <Fade className="mb-5 shrink-0">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5">
                <Trees size={15} className="text-[#008F89]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#087b70]">
                  DFAP · Recuperación ambiental
                </span>
              </div>

              <h2 className="text-[clamp(1.8rem,3.4vw,3.8rem)] font-black uppercase leading-none tracking-[-0.055em] text-[#153d31]">
                PARQUES Y{" "}
                <span className="text-[#348e5d]">
                  CORREDORES VERDES
                </span>
              </h2>
            </div>

            <div className="hidden border-l-4 border-[#dda939] pl-4 xl:block">
              <p className="text-xs font-bold uppercase tracking-wider text-[#62796c]">
                Municipio de El Alto
              </p>
              <p className="mt-1 text-sm font-extrabold text-[#173647]">
                Recuperación de espacios públicos
              </p>
            </div>

          </div>

        </Fade>

        {/* DOS COLUMNAS */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">

          {/* ================================= */}
          {/* IZQUIERDA: RÍOS SECO Y SEKE */}
          {/* ================================= */}

          <Fade
            delay={0.15}
            className="flex min-h-0 flex-col overflow-hidden rounded-md border border-[#d8e5e9] bg-white shadow-[0_10px_35px_rgba(20,70,90,0.07)]"
          >

            {/* Encabezado */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#dce9ee] bg-[#edf6fa] px-4 py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#d9eef7]">
                <Waves size={22} className="text-[#168bb5]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#168bb5]">
                  Corredores ecológicos
                </p>

                <h3 className="text-lg font-black uppercase leading-tight text-[#173647] sm:text-xl">
                  Ríos Seco y Seke
                </h3>
              </div>

            </div>

            {/* MODELADO DEL RÍO */}
            <div className="relative h-[280px] shrink-0 overflow-hidden bg-[#cbdfea] sm:h-[350px] lg:h-auto lg:min-h-[200px] lg:flex-1">

              <RiverScene />

              <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/50 bg-white/85 px-3 py-2 shadow-sm backdrop-blur-md">
                <span className="text-[10px] font-bold text-[#21647c]">
                  Modelo 3D · Corredor fluvial
                </span>
              </div>

            </div>

            {/* INFORMACIÓN DEL RÍO */}
            <div className="grid shrink-0 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="border-l-[3px] border-[#168bb5] pl-3"
              >
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#168bb5]">
                  Objetivo
                </p>

                <p className="text-xs leading-relaxed text-[#506b73] sm:text-sm">
                  Recuperar las riberas y habilitar corredores
                  ecológicos con espacios de recreación y descanso.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="border-l-[3px] border-[#168bb5] pl-3"
              >
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#168bb5]">
                  Intervención
                </p>

                <p className="text-xs font-semibold leading-relaxed text-[#506b73] sm:text-sm">
                  Ríos Seco y Seke: arborización, senderos
                  y recuperación de espacios públicos.
                </p>
              </motion.div>

            </div>

          </Fade>

          {/* ================================= */}
          {/* DERECHA: PARQUES Y ÁREAS VERDES */}
          {/* ================================= */}

          <Fade
            delay={0.28}
            className="flex min-h-0 flex-col overflow-hidden rounded-md border border-[#d9e7df] bg-white shadow-[0_10px_35px_rgba(20,80,50,0.07)]"
          >

            {/* Encabezado */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#dce9df] bg-[#edf7ef] px-4 py-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#def1e4]">
                <Trees size={22} className="text-[#168b5b]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#168b5b]">
                  Espacios recreativos
                </p>

                <h3 className="text-lg font-black uppercase leading-tight text-[#173647] sm:text-xl">
                  Parques y áreas verdes
                </h3>
              </div>

            </div>

            {/* MODELADO DEL PARQUE */}
            <div className="relative h-[280px] shrink-0 overflow-hidden bg-[#dce9e1] sm:h-[350px] lg:h-auto lg:min-h-[200px] lg:flex-1">

              <ParkScene />

              <div className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-white/50 bg-white/85 px-3 py-2 shadow-sm backdrop-blur-md">
                <span className="text-[10px] font-bold text-[#287d50]">
                  Modelo 3D · Parque recreativo
                </span>
              </div>

            </div>

            {/* INFORMACIÓN DEL PARQUE */}
            <div className="grid shrink-0 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="border-l-[3px] border-[#168b5b] pl-3"
              >
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#168b5b]">
                  Objetivo
                </p>

                <p className="text-xs leading-relaxed text-[#506b61] sm:text-sm">
                  Recuperar áreas verdes abandonadas mediante
                  parques infantiles y espacios recreativos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="border-l-[3px] border-[#168b5b] pl-3"
              >
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#168b5b]">
                  Intervención
                </p>

                <p className="text-xs font-semibold leading-relaxed text-[#506b61] sm:text-sm">
                  14 distritos de El Alto, priorizando espacios
                  cercanos a unidades educativas.
                </p>
              </motion.div>

            </div>

          </Fade>

        </div>

        {/* PIE INSTITUCIONAL */}
        <Fade delay={0.7} className="mt-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d7e4dc] pt-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#718981]">
              Dirección de Forestación y Áreas Protegidas
            </span>

            <span className="text-[10px] font-semibold text-[#718981]">
              GAMEA · SMASGAR
            </span>
          </div>
        </Fade>

      </div>
    </section>
  );
}

// ======================================
// ORIGINAL 10 - RÍOS SECO Y SEKE
// ======================================
export function Slide10() {
  return (
    <section className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#f1f6f3] px-7 pb-5 pt-7 md:px-12 xl:px-20">
      <Fade className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div>
          <Kicker>DFAP · Implementación Venas Verdes</Kicker>
          <h2 className="mt-3 text-[clamp(2rem,3.6vw,4.5rem)] font-black uppercase leading-none tracking-[-0.06em] text-[#183f32]">
            Ríos <span className="text-[#269c68]">Seco y Seke</span>
          </h2>
        </div>
        <p className="max-w-sm text-xs leading-5 text-[#627a6c]">
          Aprovechamiento de los corredores fluviales para nuevos
          espacios públicos, plazas, plazuelas y áreas de descanso.
        </p>
      </Fade>

      <Fade delay={0.2} className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-3xl border border-white bg-[#cbdfea] shadow-xl">
        <RiverScene />

        <div className="pointer-events-none absolute left-4 top-4 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Waves size={17} /> Corredor ecológico urbano
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Propuesta conceptual basada en Río Seco
          </p>
        </div>
      </Fade>

      <Fade delay={0.37} className="mt-4 grid shrink-0 grid-cols-3 gap-3">
        {[
          ["01", "Recuperación de riberas"],
          ["02", "Arborización y áreas verdes"],
          ["03", "Espacios de descanso"],
        ].map(([n, title]) => (
          <div key={n} className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3">
            <span className="text-lg font-black text-emerald-600">{n}</span>
            <span className="text-xs font-semibold text-[#385d48]">{title}</span>
          </div>
        ))}
      </Fade>
    </section>
  );
}

// ======================================
// MINIATURAS 3D PARA LOS 5 PROYECTOS
// ======================================
type ModelType = "pipe" | "plant" | "tank" | "rural" | "sewer";

function Box({
  p,
  s,
  color,
}: {
  p: [number, number, number];
  s: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function MiniTree({
  p,
  scale = 1,
}: {
  p: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={p} scale={scale}>
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.76, 8]} />
        <meshStandardMaterial color="#6f4d35" />
      </mesh>

      <mesh position={[0, 0.95, 0]} castShadow>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial color="#4ea658" flatShading />
      </mesh>

      <mesh position={[-0.14, 0.84, 0.04]} castShadow>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#62b364" flatShading />
      </mesh>

      <mesh position={[0.16, 0.86, -0.04]} castShadow>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color="#3f8f47" flatShading />
      </mesh>
    </group>
  );
}

function MiniHouse({
  p,
  body = "#d6c5b1",
  roof = "#c76b4d",
  w = 0.7,
  h = 0.45,
  d = 0.55,
}: {
  p: [number, number, number];
  body?: string;
  roof?: string;
  w?: number;
  h?: number;
  d?: number;
}) {
  return (
    <group position={p}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={body} />
      </mesh>

      <mesh position={[0, h + 0.08, 0]} castShadow>
        <boxGeometry args={[w + 0.08, 0.12, d + 0.08]} />
        <meshStandardMaterial color={roof} />
      </mesh>
    </group>
  );
}

function MiniMountain({
  p,
  scale = 1,
  color = "#c9b090",
}: {
  p: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={p} scale={scale} castShadow>
      <coneGeometry args={[0.9, 1.2, 4]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}
function PineTree({
  p,
  scale = 1,
}: {
  p: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={p} scale={scale}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.56, 8]} />
        <meshStandardMaterial color="#6e4d37" />
      </mesh>

      <mesh position={[0, 0.65, 0]} castShadow>
        <coneGeometry args={[0.28, 0.48, 8]} />
        <meshStandardMaterial color="#2f7245" flatShading />
      </mesh>

      <mesh position={[0, 0.88, 0]} castShadow>
        <coneGeometry args={[0.22, 0.42, 8]} />
        <meshStandardMaterial color="#377c4b" flatShading />
      </mesh>

      <mesh position={[0, 1.06, 0]} castShadow>
        <coneGeometry args={[0.16, 0.3, 8]} />
        <meshStandardMaterial color="#316d43" flatShading />
      </mesh>
    </group>
  );
}

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
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.52, 0.4, 0.42]} />
        <meshStandardMaterial color={body} />
      </mesh>

      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.6, 0.12, 0.5]} />
        <meshStandardMaterial color={roof} />
      </mesh>
    </group>
  );
}

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
      <mesh castShadow>
        <coneGeometry args={[0.8, 1.35, 4]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>

      <mesh position={[0, 0.38, 0]} castShadow>
        <coneGeometry args={[0.32, 0.42, 4]} />
        <meshStandardMaterial color="#f3f7fb" flatShading />
      </mesh>
    </group>
  );
}
function BackNeighborhood() {
  return (
    <group>
      {[
        [-2.7, 0.12, -2.0],
        [-1.8, 0.12, -2.1],
        [-0.9, 0.12, -2.05],
        [0.1, 0.12, -2.1],
        [1.1, 0.12, -2.0],
        [2.0, 0.12, -1.95],
      ].map((p, i) => (
        <MiniHouse
          key={i}
          p={p as [number, number, number]}
          body={i % 2 === 0 ? "#d7c5b5" : "#cfa884"}
          roof={i % 2 === 0 ? "#ba654d" : "#8f6fae"}
          w={0.62}
          h={0.38}
          d={0.48}
        />
      ))}

      {[
        [-3.4, 0.2, -2.9],
        [-1.4, 0.2, -3.15],
        [0.8, 0.2, -3.1],
        [3.0, 0.2, -2.95],
      ].map((p, i) => (
        <MiniMountain
          key={i}
          p={p as [number, number, number]}
          scale={1 + i * 0.15}
          color={i % 2 === 0 ? "#bfa486" : "#ccb798"}
        />
      ))}
    </group>
  );
}

function PipeLineLong({
  y = 0.55,
  length = 4.8,
  radius = 0.34,
  color = "#1f3b57",
  ring = "#466786",
}: {
  y?: number;
  length?: number;
  radius?: number;
  color?: string;
  ring?: string;
}) {
  return (
    <group rotation={[0, -0.38, Math.PI / 2]}>
      <mesh position={[0, y, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, length, 24]} />
        <meshStandardMaterial color={color} metalness={0.18} roughness={0.6} />
      </mesh>

      {[-1.6, -0.55, 0.55, 1.6].map((x) => (
        <mesh key={x} position={[x, y, 0]}>
          <torusGeometry args={[radius + 0.01, 0.05, 10, 24]} />
          <meshStandardMaterial color={ring} />
        </mesh>
      ))}
    </group>
  );
}

function WaterFacility({ type }: { type: ModelType }) {
  if (type === "pipe") {
  return (
    <group>
      {/* base general */}
      <Box p={[0, -0.15, 0]} s={[8.2, 0.24, 6.2]} color="#b98b61" />

      {/* ladera principal */}
      <mesh
        position={[-0.4, 0.38, 0.2]}
        rotation={[-0.16, 0.02, -0.32]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.4, 0.22, 4.3]} />
        <meshStandardMaterial color="#a9754b" />
      </mesh>

      {/* ladera secundaria */}
      <mesh
        position={[1.2, 0.12, -1.35]}
        rotation={[-0.08, 0.03, -0.18]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[7.4, 0.18, 2.2]} />
        <meshStandardMaterial color="#b78458" />
      </mesh>

      {/* valle al fondo */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.0, 0.03, -2.15]}
        receiveShadow
      >
        <planeGeometry args={[5.8, 1.8]} />
        <meshStandardMaterial color="#8da27e" />
      </mesh>

      {/* montañas lejanas */}
      {[
        [-3.0, 1.0, -3.1, 1.2, "#87765f"],
        [-1.6, 1.15, -3.0, 1.45, "#8e7c65"],
        [0.1, 1.25, -3.05, 1.7, "#7f7565"],
        [1.8, 1.05, -3.0, 1.45, "#8f816e"],
        [3.2, 0.95, -3.15, 1.2, "#887761"],
      ].map(([x, y, z, s, color], i) => (
        <group key={i} position={[x as number, y as number, z as number]} scale={s as number}>
          <mesh castShadow>
            <coneGeometry args={[0.85, 1.45, 4]} />
            <meshStandardMaterial color={color as string} flatShading />
          </mesh>

          <mesh position={[0, 0.42, 0]} castShadow>
            <coneGeometry args={[0.42, 0.52, 4]} />
            <meshStandardMaterial color="#eef4fb" flatShading />
          </mesh>
        </group>
      ))}

      {/* árboles tipo pino en ladera */}
      {[
        [-3.1, 0.48, -1.2, 1.15],
        [-2.6, 0.62, -0.3, 1.05],
        [-2.15, 0.42, 0.8, 0.95],
        [-1.6, 0.56, -1.45, 0.95],
        [-0.9, 0.5, -0.65, 0.9],
        [0.2, 0.4, -1.1, 0.85],
        [1.1, 0.34, -0.55, 0.78],
      ].map(([x, y, z, s], i) => (
        <PineTree
          key={i}
          p={[x as number, y as number, z as number]}
          scale={s as number}
        />
      ))}

      {/* rocas */}
      {[
        [-2.9, 0.18, 1.45, 0.4],
        [-2.15, 0.3, 1.05, 0.28],
        [-1.35, 0.24, 0.9, 0.32],
        [-0.2, 0.18, 1.25, 0.36],
        [1.0, 0.14, 1.1, 0.3],
        [2.2, 0.1, 0.85, 0.34],
      ].map(([x, y, z, s], i) => (
        <mesh
          key={i}
          position={[x as number, y as number, z as number]}
          rotation={[0.2, i * 0.4, 0.15]}
          scale={s as number}
          castShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#9e7755" flatShading />
        </mesh>
      ))}

      {/* tubería principal en diagonal */}
      <group position={[0.2, 0.95, 0.45]} rotation={[0.16, -0.62, Math.PI / 2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 8.8, 28]} />
          <meshStandardMaterial
            color="#1d2430"
            metalness={0.28}
            roughness={0.5}
          />
        </mesh>

        {/* uniones metálicas */}
        {[-3.1, -1.75, 0, 1.85, 3.45].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <torusGeometry args={[0.52, 0.08, 14, 28]} />
            <meshStandardMaterial
              color="#8fa1b5"
              metalness={0.65}
              roughness={0.28}
            />
          </mesh>
        ))}
      </group>

      {/* pequeños bloques / soportes */}
      <Box p={[-2.8, 0.22, 1.18]} s={[0.9, 0.22, 0.7]} color="#a87850" />
      <Box p={[2.45, 0.1, -0.95]} s={[1.1, 0.18, 0.8]} color="#9c6f49" />
    </group>
  );
}

  if (type === "plant") {
    return (
      <group>
        <Box p={[0, -0.12, 0]} s={[6.8, 0.2, 5.4]} color="#7daa64" />
        <BackNeighborhood />

        <Box p={[0, 0.02, 0]} s={[6.1, 0.1, 4.7]} color="#d7d8d9" />

        {[
          [-1.95, 0.18, -0.75],
          [-0.65, 0.18, -0.75],
          [0.65, 0.18, -0.75],
          [1.95, 0.18, -0.75],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <Box p={[0, 0, 0]} s={[0.95, 0.22, 1.38]} color="#9faab2" />
            <Box p={[0, 0.04, 0]} s={[0.76, 0.04, 1.12]} color="#3d8db8" />
          </group>
        ))}

        {[
          [-1.7, 0.48, 1.05],
          [0, 0.48, 1.05],
          [1.7, 0.48, 1.05],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <Box p={[0, 0, 0]} s={[1.15, 0.9, 0.9]} color="#f4f4f2" />
            <Box p={[0, 0.46, 0]} s={[1.22, 0.12, 0.98]} color="#3d7cb8" />
          </group>
        ))}

        <Box p={[0, 0.14, 2.0]} s={[5.4, 0.05, 0.22]} color="#c6c6c6" />
      </group>
    );
  }

  if (type === "tank") {
    return (
      <group>
        <Box p={[0, -0.12, 0]} s={[6.8, 0.2, 5.4]} color="#c8ac7b" />
        <BackNeighborhood />

        <Box p={[0, 0.02, 0]} s={[5.8, 0.12, 4.2]} color="#d9d9d9" />

        <group position={[-1.0, 0, 0.15]}>
          <mesh position={[0, 1.12, 0]} castShadow>
            <cylinderGeometry args={[0.88, 0.94, 2.2, 28]} />
            <meshStandardMaterial color="#ddeff4" />
          </mesh>
          <mesh position={[0, 2.28, 0]} castShadow>
            <cylinderGeometry args={[0.98, 0.98, 0.14, 28]} />
            <meshStandardMaterial color="#2a8bc6" />
          </mesh>
        </group>

        <group position={[1.35, 0, 0.4]}>
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.54, 0.6, 1.45, 24]} />
            <meshStandardMaterial color="#d8ecf4" />
          </mesh>
          <mesh position={[0, 1.53, 0]} castShadow>
            <cylinderGeometry args={[0.68, 0.68, 0.12, 24]} />
            <meshStandardMaterial color="#48a0d5" />
          </mesh>
        </group>

        <Box p={[1.3, 0.42, -1.25]} s={[1.1, 0.84, 1]} color="#efefef" />
        <Box p={[1.3, 0.88, -1.25]} s={[1.18, 0.1, 1.08]} color="#1e8fd0" />
      </group>
    );
  }

  if (type === "rural") {
    return (
      <group>
        <Box p={[0, -0.12, 0]} s={[6.8, 0.2, 5.4]} color="#c9a977" />

        <Box p={[0, 0.02, 0]} s={[6.0, 0.08, 4.8]} color="#88b46d" />

        <Box p={[-1.0, 0.45, 0]} s={[1.35, 0.88, 1.15]} color="#e4e4e2" />
        <Box p={[-1.0, 0.93, 0]} s={[1.48, 0.1, 1.28]} color="#1e8fd0" />

        <Box p={[0.45, 0.34, -0.1]} s={[0.62, 0.68, 0.58]} color="#3a99c9" />
        <mesh position={[1.05, 0.5, 0.35]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.92, 14]} />
          <meshStandardMaterial color="#327b58" />
        </mesh>

        <mesh position={[1.8, 0.72, -0.35]} castShadow>
          <cylinderGeometry args={[0.38, 0.42, 1.28, 18]} />
          <meshStandardMaterial color="#d1e7ee" />
        </mesh>

        <MiniTree p={[-2.2, 0, -1.25]} scale={0.92} />
        <MiniTree p={[-1.9, 0, 1.28]} scale={0.88} />
        <MiniTree p={[2.35, 0, 1.12]} scale={1.02} />
      </group>
    );
  }

  return (
    <group>
      <Box p={[0, -0.12, 0]} s={[6.8, 0.2, 5.4]} color="#d0b486" />
      <BackNeighborhood />

      <Box p={[0, 0.04, 0]} s={[6.4, 0.12, 3.5]} color="#ca9a69" />
      <Box p={[0, 0.18, 0]} s={[5.9, 0.26, 1.3]} color="#8f6948" />

      <group rotation={[0, -0.18, Math.PI / 2]}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 5.35, 24]} />
          <meshStandardMaterial color="#2e4d67" />
        </mesh>

        {[-1.85, 0, 1.85].map((x) => (
          <mesh key={x} position={[x, 0.52, 0]}>
            <torusGeometry args={[0.41, 0.05, 10, 24]} />
            <meshStandardMaterial color="#4f6c82" />
          </mesh>
        ))}
      </group>

      <Box p={[0, 0.14, 1.35]} s={[6.2, 0.16, 0.24]} color="#dbc4a4" />
      <Box p={[0, 0.14, -1.35]} s={[6.2, 0.16, 0.24]} color="#dbc4a4" />
    </group>
  );
}


const waterProjects: {
  name: string;
  district: string;
  cost: string;
  people: string;
  duration: string;
  type: ModelType;
  color: string;
}[] = [
  {
    name: "Const. Emisario Tacachira",
    district: "D11",
    cost: "67.803 Familias",
    people: "271.212 hab.",
    duration: "250 días",
    type: "pipe",
    color: "#115bb0",
  },
  {
    name: "Ampliación PTAR Tacachira Fase II",
    district: "D11",
    cost: "67.803 familias",
    people: "271.212 hab.",
    duration: "680 días",
    type: "plant",
    color: "#7724a4",
  },
  {
    name: "Ampliacion y mejoramiento agua potable noroeste",
    district: "D7 y D14",
    cost: "",
    people: "3.081 hab.",
    duration: "365 días",
    type: "tank",
    color: "#168abe",
  },
  {
    name: "Agua Segura Distrito Rural 13",
    district: "D13",
    cost: "",
    people: "694 hab.",
    duration: "150 días",
    type: "rural",
    color: "#168e92",
  },
  {
    name: "Ampliacion alcantarillado sanitario Noroeste II",
    district: "D7 y D14",
    cost: "",
    people: "49.762 hab.",
    duration: "300 días",
    type: "sewer",
    color: "#138349",
  },
];

/* VIDEO DE CADA PROYECTO */
function ProjectVideo({ number }: { number: number }) {
  return (
    <div className="relative h-[230px] w-full overflow-hidden bg-[#dcecf8] sm:h-[250px] lg:h-[220px] xl:h-[clamp(170px,29vh,290px)]">
      <video
        key={number}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={`/${number}.mp4`} type="video/mp4" />
        Tu navegador no admite videos MP4.
      </video>
    </div>
  );
}

// ======================================
// ORIGINAL 11 - AGUA Y ALCANTARILLADO
// ======================================

export function Slide11() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f1f5f8] text-[#15384f]">

      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-sky-100/50 blur-[110px]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-[1900px] flex-col px-4 py-5 sm:px-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-6">

        {/* ENCABEZADO */}
        <Fade className="mb-5 shrink-0">

          <div className="flex flex-wrap items-end justify-between gap-4">

            <div className="min-w-0">

              <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-sky-200 bg-[#e7f3fa] px-3 py-2">

                <Droplets
                  size={16}
                  className="text-[#168fc7]"
                />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#176b91]">
                  Saneamiento básico · Recursos hídricos
                </span>

              </div>

              <h2 className="text-[clamp(1.9rem,3.35vw,4.1rem)] font-black uppercase leading-[1.02] tracking-[-0.055em] text-[#123850]">

                AGUA POTABLE Y{" "}

                <span className="text-[#168fc7]">
                  ALCANTARILLADO
                </span>

              </h2>

              <p className="mt-2 text-xs font-medium text-[#698091] sm:text-sm">
                Proyectos estratégicos priorizados para el municipio de El Alto
              </p>

            </div>

            {/* Contador de proyectos */}
            <div className="flex items-center gap-3 rounded-md border border-[#cddfe9] bg-white px-4 py-3 shadow-sm">

              <span className="text-3xl font-black leading-none text-[#168fc7]">
                05
              </span>

              <div className="border-l border-[#d8e5ea] pl-3">
                <p className="text-[11px] font-black uppercase tracking-wide text-[#234d62]">
                  Proyectos
                </p>

                <p className="text-[10px] text-[#738998]">
                  Agua y saneamiento
                </p>
              </div>

            </div>

          </div>

        </Fade>

        {/* TARJETAS DE PROYECTOS */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3">

          {waterProjects.map((project, i) => (

            <motion.div
              key={project.name}

              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              transition={{
                delay: 0.12 + i * 0.11,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}

              whileHover={{
                y: -5,
                transition: { duration: 0.22 },
              }}

              className="group flex min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-[#dce7ef] bg-white shadow-[0_8px_28px_rgba(16,55,75,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(16,55,75,0.13)]"
            >

              {/* Nombre del proyecto */}
              <div
                className="relative flex min-h-[78px] shrink-0 items-center justify-center overflow-hidden px-3 py-3 text-center"
                style={{
                  backgroundColor: project.color,
                }}
              >

                {/* Número de proyecto */}
                <span className="absolute left-2 top-2 text-[10px] font-black text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="relative z-10 text-[clamp(0.75rem,0.95vw,0.95rem)] font-black uppercase leading-snug tracking-[0.015em] text-white">
                  {project.name}
                </h3>

                {/* Línea de acento */}
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/25" />

              </div>

              {/* ÁREA 3D */}
              <div className="relative min-h-0 shrink-0 overflow-hidden bg-[#dcecf8]">

                <ProjectVideo number={i + 1} />

                {/* Indicador inferior */}
                <div className="pointer-events-none absolute bottom-2 right-2 rounded-sm border border-white/60 bg-white/85 px-2 py-1 backdrop-blur-sm">

                  <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#315b70]">
  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#008F89]" />
  Video del proyecto
</span>

                </div>

              </div>

              {/* INFORMACIÓN */}
              <div className="flex flex-1 flex-col gap-3 px-4 py-4">

                {/* Distrito */}
                <div className="flex items-center justify-between gap-2">

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#8999a5]">
                    Ubicación
                  </span>

                  <span
                    className="rounded-sm border px-2.5 py-1 text-[11px] font-black"
                    style={{
                      borderColor: `${project.color}30`,
                      backgroundColor: `${project.color}10`,
                      color: project.color,
                    }}
                  >
                    {project.district}
                  </span>

                </div>

                {/* Familias beneficiadas, si existe dato */}
                {project.cost && (
                  <div className="border-t border-[#e6edf1] pt-3">

                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.09em] text-[#8495a2]">
                      Familias beneficiadas
                    </p>

                    <p
                      className="text-[clamp(1rem,1.4vw,1.35rem)] font-black leading-tight"
                      style={{ color: project.color }}
                    >
                      {project.cost}
                    </p>

                  </div>
                )}

                {/* Beneficiarios y plazo */}
                <div className="mt-auto space-y-3 border-t border-[#e6edf1] pt-3">

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm"
                      style={{
                        backgroundColor: `${project.color}12`,
                      }}
                    >
                      <Users
                        size={18}
                        style={{ color: project.color }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-[#8193a0]">
                        Población beneficiada
                      </p>

                      <p className="text-sm font-black text-[#25485c]">
                        {project.people}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm"
                      style={{
                        backgroundColor: `${project.color}12`,
                      }}
                    >
                      <CalendarDays
                        size={18}
                        style={{ color: project.color }}
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#8193a0]">
                        Plazo de ejecución
                      </p>

                      <p className="text-sm font-black text-[#25485c]">
                        {project.duration}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Línea inferior */}
              <div
                className="h-[4px] w-full shrink-0"
                style={{
                  backgroundColor: project.color,
                }}
              />

            </motion.div>

          ))}

        </div>

        {/* PIE INSTITUCIONAL */}
        <Fade delay={0.8} className="mt-4 shrink-0">

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d5e2e9] pt-3">

            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#718796]">
              Dirección de Saneamiento Básico, Recursos Hídricos y Control Ambiental
            </p>

            <p className="text-[10px] font-semibold text-[#718796]">
              GAMEA · SMASGAR
            </p>

          </div>

        </Fade>

      </div>

    </section>
  );
}


// ======================================
// ESCENA DE LLUVIA E INUNDACIÓN
// ======================================
function AnimatedRain() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 240;

  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: ((i * 37) % 115) / 10 - 5.7,
        y: ((i * 53) % 85) / 10 + 1,
        z: ((i * 71) % 95) / 10 - 4.75,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const dummy = new THREE.Object3D();
    drops.forEach((drop, i) => {
      const y = ((drop.y - clock.elapsedTime * 5 + 1000) % 9);
      dummy.position.set(drop.x, y, drop.z);
      dummy.scale.set(0.018, 0.25, 0.018);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#64baf3" transparent opacity={0.72} />
    </instancedMesh>
  );
}


function FloodScene() {
  const water = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (water.current) {
      water.current.position.y =
        0.38 + Math.sin(clock.elapsedTime * 1.2) * 0.018;
    }
  });

  const houses = [
    { x: -3.6, z: -2.4, color: "#c6ac8f", roof: "#514e4b" },
    { x: 3.4, z: -2.2, color: "#9eb7be", roof: "#544638" },
    { x: -3.2, z: 2.5, color: "#bf9979", roof: "#594f4b" },
    { x: 3.5, z: 2.6, color: "#d3b9a0", roof: "#53575a" },
  ];

  return (
    <group>

      {/* Terreno cortado tipo maqueta */}
      <Box
        p={[0, -0.75, 0]}
        s={[11.5, 1.5, 9]}
        color="#987554"
      />

      <Box
        p={[0, -0.08, 0]}
        s={[11.5, 0.16, 9]}
        color="#78736d"
      />

      {/* Camino urbano */}
      <Box
        p={[0, 0.025, 0]}
        s={[3, 0.055, 9]}
        color="#525b61"
      />

      <Box
        p={[0, 0.026, 0]}
        s={[11.5, 0.05, 2.1]}
        color="#525b61"
      />

      {/* Viviendas */}
      {houses.map((house, i) => (
        <group
          key={i}
          position={[house.x, 0, house.z]}
        >
          {/* Paredes */}
          <Box
            p={[0, 0.95, 0]}
            s={[2.25, 1.9, 2]}
            color={house.color}
          />

          {/* Techo inclinado */}
          <mesh
            position={[0, 2.2, 0]}
            rotation={[0, Math.PI / 4, 0]}
            castShadow
          >
            <coneGeometry args={[1.85, 0.95, 4]} />
            <meshStandardMaterial
              color={house.roof}
              roughness={0.95}
            />
          </mesh>

          {/* Puerta */}
          <Box
            p={[0.35, 0.5, 1.015]}
            s={[0.45, 1, 0.045]}
            color="#4a555b"
          />

          {/* Ventanas */}
          {[-0.6, 0.6].map((x) => (
            <Box
              key={x}
              p={[x, 1.25, 1.025]}
              s={[0.4, 0.42, 0.04]}
              color="#6d929d"
            />
          ))}

          {/* Porche */}
          <Box
            p={[0, 0.25, 1.28]}
            s={[1.75, 0.12, 0.65]}
            color="#b9b3aa"
          />

        </group>
      ))}

      {/* Árboles urbanos */}
      {[
        [-5.0, -0.7],
        [-5.0, 1.1],
        [5.0, -0.4],
        [5.0, 1.2],
        [-1.9, -3.8],
        [2.0, 3.8],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.16, 1.45, 8]} />
            <meshStandardMaterial color="#66513e" />
          </mesh>

          <mesh position={[0, 1.9, 0]} castShadow>
            <icosahedronGeometry args={[0.82, 2]} />
            <meshStandardMaterial
              color={i % 2 ? "#385e3d" : "#426c42"}
              roughness={0.9}
            />
          </mesh>

          <mesh position={[-0.32, 1.62, 0.1]} castShadow>
            <icosahedronGeometry args={[0.48, 1]} />
            <meshStandardMaterial color="#4b7646" />
          </mesh>
        </group>
      ))}

      {/* Automóviles parcialmente sumergidos */}
      {[
        { x: -0.95, z: 2.2, color: "#a7abad" },
        { x: 0.85, z: -1.6, color: "#817a6e" },
      ].map((car, i) => (
        <group
          key={i}
          position={[car.x, 0.30, car.z]}
          rotation={[0, i === 0 ? 0.12 : -0.25, 0]}
        >
          <Box
            p={[0, 0.15, 0]}
            s={[0.85, 0.35, 1.55]}
            color={car.color}
          />

          <Box
            p={[0, 0.43, -0.08]}
            s={[0.7, 0.32, 0.8]}
            color="#617681"
          />

          {[-0.48, 0.48].map((x) =>
            [-0.5, 0.5].map((z) => (
              <mesh
                key={`${x}-${z}`}
                position={[x, 0.05, z]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.18, 0.18, 0.1, 12]} />
                <meshStandardMaterial color="#252a2c" />
              </mesh>
            ))
          )}
        </group>
      ))}

      {/* Agua acumulada, semitransparente */}
      <mesh
        ref={water}
        position={[0, 0.38, 0]}
        receiveShadow
      >
        <boxGeometry args={[11.25, 0.075, 8.75]} />

        <meshPhysicalMaterial
          color="#655f54"
          transparent
          opacity={0.76}
          roughness={0.19}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Sedimentos y lodo */}
      {[
        [-1.3, 0.43, 3.1],
        [1.5, 0.43, -2.6],
        [-4.7, 0.43, 0.2],
        [4.3, 0.43, 1.5],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          scale={[1.1, 0.09, 0.65]}
          rotation={[0, i * 0.65, 0]}
        >
          <sphereGeometry args={[0.7, 10, 8]} />
          <meshStandardMaterial color="#665442" />
        </mesh>
      ))}

      {/* Objetos arrastrados por el agua */}
      <Box
        p={[-0.4, 0.49, 3.05]}
        s={[0.36, 0.12, 0.65]}
        color="#286899"
      />

      <Box
        p={[2.2, 0.48, -0.35]}
        s={[0.55, 0.1, 0.2]}
        color="#4e4034"
      />

      {/* Lluvia animada */}
      <AnimatedRain />

    </group>
  );
}


function RainCanvas() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [10, 9, 13], fov: 40 }}
    >
      <color attach="background" args={["#c9d4dc"]} />
      <ambientLight intensity={1.7} />
      <directionalLight position={[8, 12, 7]} intensity={2.2} />
      <FloodScene />
      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={28}
        target={[0, 1, 0]}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
}


export function Slide12() {
  const problems = [
    {
      title: "Inundaciones y anegamientos",
      detail: "Acumulación de agua durante lluvias.",
    },
    {
      title: "Afectación a la movilidad",
      detail: "Dificultades para vehículos y peatones.",
    },
    {
      title: "Viviendas vulnerables",
      detail: "Riesgos para hogares e infraestructura.",
    },
    {
      title: "Drenaje insuficiente",
      detail: "Capacidad limitada frente a lluvias intensas.",
    },
  ];

  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f1f5f8] text-[#15384f]">

      <div className="mx-auto flex min-h-full w-full max-w-[2000px] flex-col px-3 py-3 sm:px-5 lg:h-full lg:min-h-0 lg:px-7 lg:py-4">

        {/* ENCABEZADO */}
        <Fade className="mb-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#008F89]">
                Infraestructura · Gestión del agua
              </p>

              <h2 className="text-[clamp(1.5rem,2.8vw,3.4rem)] font-black uppercase leading-none tracking-[-0.05em] text-[#143a56]">
                DRENAJE{" "}
                <span className="text-[#168fbd]">
                  PLUVIAL
                </span>
              </h2>

              <p className="mt-1.5 text-[11px] text-[#667b8a] sm:text-xs">
                Problemática urbana y proyectos de intervención priorizados
              </p>
            </div>

            

          </div>
        </Fade>

        {/* DISTRIBUCIÓN 35% / 65% */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[35fr_65fr]">

          {/* =================================== */}
          {/* IZQUIERDA: PROBLEMA ACTUAL */}
          {/* =================================== */}
          <Fade
            delay={0.12}
            className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-rose-100 bg-white shadow-sm"
          >

            <div className="flex shrink-0 items-center gap-2 border-b border-rose-100 bg-[#fff0f1] px-3 py-2.5">
              <CloudRain size={18} className="text-rose-700" />

              <h3 className="text-xs font-black uppercase tracking-wide text-rose-800">
                Problema actual
              </h3>
            </div>

            {/* Ciudad inundada 3D */}
            <div className="relative h-[260px] shrink-0 overflow-hidden bg-[#cdd8de] sm:h-[340px] lg:h-auto lg:min-h-[180px] lg:flex-[1.2]">
              <RainCanvas />

              <div className="pointer-events-none absolute bottom-2 left-2 right-2 rounded-sm border border-white/50 bg-white/90 px-3 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-extrabold text-[#194b66]">
                  Anegamiento urbano
                </p>

                <p className="text-[9px] text-[#637786]">
                  Modelo 3D conceptual · Calles inundadas
                </p>
              </div>
            </div>

            {/* Problemas resumidos */}
            <div className="grid shrink-0 grid-cols-1 gap-2 p-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">

              {problems.map((problem, i) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.4,
                  }}
                  className="rounded-sm border border-rose-100 bg-[#fff5f5] p-2.5"
                >
                  <p className="text-[11px] font-black leading-snug text-rose-800">
                    {i + 1}. {problem.title}
                  </p>

                  <p className="mt-1 text-[10px] leading-relaxed text-[#6d6570]">
                    {problem.detail}
                  </p>
                </motion.div>
              ))}

            </div>

          </Fade>

          {/* =================================== */}
          {/* DERECHA: PROYECTOS Y EMBOVEDADO */}
          {/* =================================== */}
          <div className="flex min-h-0 min-w-0 flex-col gap-2">

            <Fade
              delay={0.2}
              className="flex shrink-0 items-center justify-between rounded-sm bg-[#176b91] px-3 py-2.5 text-white"
            >
              <div className="flex items-center gap-2">
                <Construction size={17} />

                <h3 className="text-[11px] font-black uppercase tracking-wide sm:text-xs">
                  Proyectos priorizados de drenaje pluvial
                </h3>
              </div>

              <span className="rounded-sm bg-white/15 px-2 py-1 text-[10px] font-bold">
                08 obras
              </span>
            </Fade>

            {/* PROYECTOS A LA IZQUIERDA Y 3D A LA DERECHA */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 xl:grid-cols-[64fr_36fr]">

              {/* OCHO PROYECTOS */}
              <div className="grid min-h-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-4">

                {drainageProjects.map((project, i) => (
                  <Fade
                    key={project.name}
                    delay={0.23 + i * 0.055}
                    className="flex min-h-[130px] min-w-0 flex-col overflow-hidden rounded-md border border-[#d9e7ee] bg-white shadow-sm sm:min-h-0"
                  >

                    <div className="flex min-h-[35px] items-center gap-2 bg-gradient-to-r from-[#1265a4] to-[#198db8] px-2.5 py-2 text-white">
                      <span className="text-sm font-black">
                        {i + 1}
                      </span>

                      <h4 className="text-[10px] font-extrabold uppercase leading-tight">
                        {project.name}
                      </h4>
                    </div>

                    <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2">

                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="rounded-sm bg-sky-50 px-2 py-0.5 text-[9px] font-bold text-[#176b91]">
                          Distrito {project.district.replace("D", "")}
                        </span>

                        <span className="text-[clamp(0.8rem,1vw,1rem)] font-black text-[#115a91]">
                          {project.cost}
                        </span>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-slate-100 pt-1.5">

                        <span className="flex items-center gap-1 text-[9px] text-[#52697b]">
                          <Users size={12} className="shrink-0" />
                          {project.beneficiaries}
                        </span>

                        <span className="flex items-center gap-1 text-[9px] text-[#52697b]">
                          <CalendarDays size={12} className="shrink-0" />
                          {project.days}
                        </span>

                      </div>

                    </div>

                  </Fade>
                ))}

              </div>

              {/* MODELADO EMBOVEDADO */}
              <Fade
                delay={0.3}
                className="relative h-[310px] min-h-0 overflow-hidden rounded-md border border-[#cee0e9] bg-[#d7e8f0] sm:h-[400px] xl:h-auto xl:min-h-[270px]"
              >
                <DrainageModelCanvas />

                <div className="pointer-events-none absolute left-2 right-2 top-2 rounded-sm bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Construction
                      size={17}
                      className="shrink-0 text-[#176b91]"
                    />

                    <div>
                      <p className="text-[11px] font-black text-[#164e75]">
                        Embovedado pluvial
                      </p>

                      <p className="text-[9px] text-[#718596]">
                        Conductos de hormigón
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-2 left-2 right-2 rounded-sm bg-white/90 px-2 py-2 text-center backdrop-blur-sm">
                  <p className="text-[9px] font-semibold text-[#506c7c]">
                    Representación conceptual, no plano constructivo
                  </p>
                </div>

              </Fade>

            </div>

          </div>

        </div>

        {/* PIE */}
        <Fade delay={0.75} className="mt-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-[#103e66] px-4 py-2.5">
            <p className="text-[10px] font-semibold text-white">
              Obras para reducir el riesgo de inundaciones y proteger la infraestructura urbana
            </p>

            <p className="text-[10px] font-bold text-sky-200">
              GAMEA · SMASGAR
            </p>
          </div>
        </Fade>

      </div>
    </section>
  );
}


// ======================================
// ORIGINAL 13 - 8 PROYECTOS DE DRENAJE
// ======================================

const drainageProjects = [
  {
    name: "Const. Embovedado Emisario Av. Jacha Tupu",
    district: "D8",
    cost: "Bs 63,56 M",
    beneficiaries: "≈15.000 familias",
    days: "365 días",
  },
  {
    name: "Const. Embovedado Emisario Av. Ballivián",
    district: "D8",
    cost: "Bs 44,83 M",
    beneficiaries: "S/I",
    days: "S/I",
  },
  {
    name: "Const. Embovedado Emisario Ecológico Los Pinos",
    district: "D8",
    cost: "Bs 9,44 M",
    beneficiaries: "6 zonas beneficiadas",
    days: "540 días",
  },
  {
    name: "Const. Embovedado Emisario Comp. Ecológico Los Pinos (Central A)",
    district: "D8",
    cost: "Bs 12,94 M",
    beneficiaries: "7.700 habitantes",
    days: "365 días",
  },
  {
    name: "Embovedado Emisario Av. 6 de Marzo, Este (Tramo Sur)",
    district: "D8",
    cost: "Bs 59,53 M",
    beneficiaries: "165.800 habitantes",
    days: "320 días",
  },
  {
    name: "Embovedado Emisario El Ingenio UV2",
    district: "D5",
    cost: "Bs 3,25 M",
    beneficiaries: "1.475 habitantes",
    days: "240 días",
  },
  {
    name: "Const. Embovedado Emisario Av. Litoral (Tramo I)",
    district: "D2",
    cost: "Bs 17,43 M",
    beneficiaries: "6.880 habitantes",
    days: "300 días",
  },
  {
    name: "Const. Embovedado Emisario Arica Fase II",
    district: "D8",
    cost: "Bs 91,81 M",
    beneficiaries: "4.939 habitantes",
    days: "500 días",
  },
];



function CulvertModel() {
  const waterA = useRef<THREE.Mesh>(null);
  const waterB = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (waterA.current) {
      waterA.current.position.y =
        0.18 + Math.sin(t * 1.5) * 0.025;
    }

    if (waterB.current) {
      waterB.current.position.y =
        0.18 + Math.sin(t * 1.5 + 1) * 0.025;
    }
  });

  return (
    <group>

      {/* Terreno excavado */}
      <Box
        p={[0, -0.55, 0]}
        s={[9, 1.1, 7]}
        color="#b18a63"
      />

      {/* Cimentación */}
      <Box
        p={[0, 0, 0]}
        s={[6.8, 0.22, 5.2]}
        color="#aab4b8"
      />

      {/* Dos conductos rectangulares */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>

          {/* Solera de hormigón */}
          <Box
            p={[0, 0.08, 0]}
            s={[3.1, 0.16, 5]}
            color="#b9c3c8"
          />

          {/* Muro exterior izquierdo */}
          <Box
            p={[-1.48, 0.78, 0]}
            s={[0.24, 1.55, 5]}
            color="#cbd3d6"
          />

          {/* Muro exterior derecho */}
          <Box
            p={[1.48, 0.78, 0]}
            s={[0.24, 1.55, 5]}
            color="#cbd3d6"
          />

          {/* Cubierta de hormigón */}
          <Box
            p={[0, 1.65, 0]}
            s={[3.25, 0.23, 5.15]}
            color="#b7c0c5"
          />

          {/* Agua dentro del conducto */}
          <mesh
            ref={i === 0 ? waterA : waterB}
            position={[0, 0.18, 0]}
          >
            <boxGeometry args={[2.65, 0.14, 4.95]} />

            <meshPhysicalMaterial
              color="#338fb8"
              transparent
              opacity={0.82}
              roughness={0.17}
              metalness={0.07}
              clearcoat={0.5}
              depthWrite={false}
            />
          </mesh>

          {/* Ondas de agua */}
          {[-1.6, -0.6, 0.5, 1.5].map((z, j) => (
            <Box
              key={j}
              p={[0, 0.275, z]}
              s={[2.25, 0.018, 0.045]}
              color="#8bd0e6"
            />
          ))}

        </group>
      ))}

      {/* Muro central divisorio */}
      <Box
        p={[0, 0.8, 0]}
        s={[0.28, 1.6, 5.1]}
        color="#aeb8bc"
      />

      {/* Losa superior / vía */}
      <Box
        p={[0, 1.86, -1.15]}
        s={[7.1, 0.26, 3.5]}
        color="#858d90"
      />

      {/* Franja de pavimento */}
      <Box
        p={[0, 2.01, -1.15]}
        s={[7, 0.04, 3.3]}
        color="#555e65"
      />

      {/* Bordes de protección vial */}
      <Box
        p={[-3.5, 2.14, -1.15]}
        s={[0.14, 0.27, 3.4]}
        color="#d9dddc"
      />

      <Box
        p={[3.5, 2.14, -1.15]}
        s={[0.14, 0.27, 3.4]}
        color="#d9dddc"
      />

      {/* Marcas de la calzada */}
      {[-2.2, -0.75, 0.75, 2.2].map((x) => (
        <Box
          key={x}
          p={[x, 2.04, -1.15]}
          s={[0.65, 0.015, 0.06]}
          color="#eae7d7"
        />
      ))}

      {/* Terreno lateral */}
      <Box
        p={[-4.1, 0.1, 0]}
        s={[0.75, 0.8, 6.5]}
        color="#a98561"
      />

      <Box
        p={[4.1, 0.1, 0]}
        s={[0.75, 0.8, 6.5]}
        color="#a98561"
      />

      {/* Vegetación alrededor de la obra */}
      {[
        [-4.15, -2.6],
        [-4.15, 2.6],
        [4.15, -2.6],
        [4.15, 2.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.2, z]}>

          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 0.7, 8]} />
            <meshStandardMaterial color="#715443" />
          </mesh>

          <mesh position={[0, 0.9, 0]}>
            <icosahedronGeometry args={[0.45, 1]} />
            <meshStandardMaterial
              color="#50865c"
              flatShading
            />
          </mesh>

        </group>
      ))}

    </group>
  );
}


function DrainageModelCanvas() {
  return (
    <Canvas dpr={[1, 1.3]} camera={{ position: [7, 5, 8], fov: 38 }}>
      <color attach="background" args={["#d7e8f0"]} />
      <ambientLight intensity={1.9} />
      <directionalLight position={[4, 8, 6]} intensity={2.1} />
      <CulvertModel />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.55}
        target={[0, 0.6, 0]}
      />
    </Canvas>
  );
}

export function Slide13() {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f3f6fb] px-6 pb-5 pt-5 md:px-12 xl:px-16">
      <Fade className="flex shrink-0 items-end justify-between gap-4">
        <div>
          <Kicker color="blue">Infraestructura · Proyectos priorizados</Kicker>
          <h2 className="mt-2 text-[clamp(1.65rem,3.1vw,3.8rem)] font-black uppercase leading-none tracking-[-0.06em] text-[#143a56]">
            Proyectos de <span className="text-[#148bba]">drenaje pluvial</span>
          </h2>
        </div>
        <div className="rounded-xl bg-[#0b5d9b] px-5 py-3 text-right text-white">
          <p className="text-[10px] uppercase tracking-wider text-sky-100">
            Inversión total referencial
          </p>
          <p className="text-[clamp(1.25rem,2.15vw,2.2rem)] font-black">
            Bs 302,79 M
          </p>
        </div>
      </Fade>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-[67%_33%] gap-3">
        <div className="grid min-h-0 grid-cols-4 grid-rows-2 gap-2">
          {drainageProjects.map((project, i) => (
            <Fade
              key={project.name}
              delay={0.06 + i * 0.065}
              className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm"
            >
              <div className="flex items-start gap-2 bg-gradient-to-r from-[#1265a4] to-[#198db8] px-3 py-3 text-white">
                <span className="shrink-0 text-lg font-black leading-none">
                  {i + 1}
                </span>
                <p className="text-[clamp(0.58rem,0.83vw,0.85rem)] font-extrabold leading-tight">
                  {project.name}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <span className="self-start rounded bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700">
                  Distrito {project.district.replace("D", "")}
                </span>

                <p className="mt-3 text-[clamp(0.9rem,1.3vw,1.4rem)] font-black text-[#115a91]">
                  {project.cost}
                </p>

                <div className="mt-auto space-y-1 pt-3">
                  <p className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Users size={12} /> {project.beneficiaries}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-slate-600">
                    <CalendarDays size={12} /> {project.days}
                  </p>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade
          delay={0.24}
          className="relative min-h-0 overflow-hidden rounded-2xl border border-white bg-[#d7e8f0]"
        >
          <DrainageModelCanvas />

          <div className="pointer-events-none absolute left-4 right-4 top-4 rounded-xl bg-white/90 p-3 backdrop-blur-lg">
            <p className="flex items-center gap-2 text-xs font-extrabold text-[#164e75]">
              <Construction size={17} /> Embovedado pluvial
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Modelo de conductos de hormigón
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 p-3 text-center backdrop-blur-lg">
            <p className="text-[10px] text-slate-500">
              Representación conceptual, no plano constructivo
            </p>
          </div>
        </Fade>
      </div>

      <Fade delay={0.6} className="mt-3 flex shrink-0 items-center justify-between rounded-xl bg-[#103e66] px-5 py-3">
        <p className="text-xs font-semibold text-white">
          Obras para reducir el riesgo de inundaciones y mejorar la resiliencia urbana
        </p>
        <p className="text-[10px] text-sky-200">
          8 proyectos priorizados
        </p>
      </Fade>
    </section>
  );
}
