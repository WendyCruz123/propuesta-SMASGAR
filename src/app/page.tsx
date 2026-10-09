
"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  Leaf,
  Trees,
  Sprout,
  Droplets,
  Recycle,
  ShieldCheck,
  Building2,
  MapPinned,
  CalendarDays,
  ScanEye,
  ChevronDown,
  Waves,
  Mountain,
  Wind,
  Play,
  Pause,
  CircleHelp,
  X,
} from "lucide-react";
import Image from "next/image";

// MODELOS 3D EXISTENTES
const CityScene = dynamic(
  () => import("@/components/CityScene"),
  { ssr: false }
);



const Slide09 = dynamic(
  () => import("@/components/Slides09to13").then((m) => m.Slide09),
  { ssr: false }
);

const Slide10 = dynamic(
  () => import("@/components/Slides09to13").then((m) => m.Slide10),
  { ssr: false }
);

const Slide11 = dynamic(
  () => import("@/components/Slides09to13").then((m) => m.Slide11),
  { ssr: false }
);

const Slide12 = dynamic(
  () => import("@/components/Slides09to13").then((m) => m.Slide12),
  { ssr: false }
);

const Slide13 = dynamic(
  () => import("@/components/Slides09to13").then((m) => m.Slide13),
  { ssr: false }
);

const Slide28 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide28),
  { ssr: false }
);

const Slide29 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide29),
  { ssr: false }
);

const Slide30 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide30),
  { ssr: false }
);

const Slide32 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide32),
  { ssr: false }
);

const Slide33 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide33),
  { ssr: false }
);

const Slide34 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide34),
  { ssr: false }
);

const Slide35 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide35),
  { ssr: false }
);

const Slide36 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide36),
  { ssr: false }
);

const Slide38 = dynamic(
  () => import("@/components/Slides28to38").then(m => m.Slide38),
  { ssr: false }
);

// ORDEN REAL DE LA PRESENTACIÓN


const slides = [
  { original: 1, title: "Cumbres Distritales" },
  { original: 2, title: "Pachamama Marka" },
  { original: 7, title: "Venas Verdes" },
  
  { original: 9, title: "Parques y áreas verdes" },
  { original: 11, title: "Agua potable y alcantarillado" },
  { original: 12, title: "Importancia del drenaje pluvial" },
  
  { original: 28, title: "Sistema de alerta temprana" },
  { original: 29, title: "Brigadas escolares de emergencia" },
  { original: 32, title: "Monitoreo de aseo urbano" },
  { original: 33, title: "Ríos del municipio" },
  { original: 34, title: "Aprovechamiento de residuos de construcción" },
  { original: 35, title: "CARSU Bajo Milluni" },
  { original: 36, title: "Preclasificación El Ingenio" },
  { original: 38, title: "Instrumentos normativos" },
];



const ease = [0.22, 1, 0.36, 1] as const;

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    scale: 0.975,
    filter: "blur(8px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -90 : 90,
    scale: 0.975,
    filter: "blur(8px)",
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
        light
          ? "border-white/20 bg-white/10 text-white"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {children}
    </div>
  );
}

// DIAPOSITIVA ORIGINAL 1

function Slide01() {
  return (
    <div className="slide-surface relative h-full w-full overflow-hidden bg-[#f5f4ef]">

      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d6e8d8]/60 blur-[110px]" />

      {/* Distribución adaptable */}
      <div className="relative z-10 grid h-full min-h-0 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[43%_57%] lg:grid-rows-1">

        {/* SECCIÓN IZQUIERDA: TÍTULO */}
        <div className="relative z-20 flex min-h-0 flex-col justify-center px-5 py-5 sm:px-8 sm:py-7 md:px-12 lg:px-7 lg:py-6 xl:px-12 2xl:px-16">

          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.13 }}
            className="space-y-3 sm:space-y-4 lg:space-y-5"
          >

            {/* Identificación institucional */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-800 sm:text-[11px] lg:text-[clamp(9px,0.75vw,12px)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                Gobierno Autónomo Municipal de El Alto
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.div variants={itemVariants}>

              <h1 className="font-black uppercase leading-[0.98] tracking-[-0.055em] text-[#102d45] text-[clamp(1.8rem,6.5vw,3.8rem)] lg:text-[clamp(2rem,3.35vw,4.5rem)]">

                CUMBRES
                <br />
                DISTRITALES
                <br />
                DE
                <br />
                PLANIFICACIÓN

              </h1>

              {/* Gestión */}
              <div className="mt-3 font-black leading-none tracking-[-0.065em] text-[#dca437] text-[clamp(2.5rem,9vw,4.6rem)] lg:text-[clamp(3rem,4.7vw,6rem)]">
                2026–2030
              </div>

            </motion.div>

            {/* Descripción */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl border-l-4 border-[#dda939] pl-4 text-[clamp(0.8rem,2.5vw,1rem)] leading-relaxed text-[#506277] lg:text-[clamp(0.85rem,1.1vw,1.2rem)]"
            >
              Diseñando, concertando el futuro de El Alto
              desde nuestro Distrito SMASGAR.
            </motion.p>

            {/* Pie del contenido */}
            <motion.div
              variants={itemVariants}
              className="hidden items-center gap-3 pt-2 sm:flex"
            >
              <div className="h-px w-8 bg-[#a9aba6]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#73818b]">
                SMASGAR · El Alto, Bolivia
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* SECCIÓN DERECHA: VIDEO */}
        <div className="relative min-h-0 overflow-hidden bg-[#dce7df]">

          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/WhatsApp%20Video%202026-10-09%20at%2001.57.26.mp4"
              type="video/mp4"
            />
          </video>

          {/* Degradado de unión con el fondo */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-[#f5f4ef] to-transparent lg:block" />

          {/* Indicador del video */}
          <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-xl border border-white/50 bg-[#102d45]/75 px-3 py-2 backdrop-blur-md sm:bottom-6 sm:right-6">
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#46d69b]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
                Planificación urbana
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


// DIAPOSITIVA ORIGINAL 2
const sectors = [
  {
    name: "Saneamiento básico",
    detail: "Recursos hídricos y control ambiental",
    Icon: Droplets,
    color: "#1474b8",
    bg: "#e5f2fd",
  },
  {
    name: "Gestión integral",
    detail: "de residuos",
    Icon: Recycle,
    color: "#1b9464",
    bg: "#e4f5eb",
  },
  {
    name: "Gestión de riesgos",
    detail: "Prevención y respuesta",
    Icon: ShieldCheck,
    color: "#a16b22",
    bg: "#fcf2de",
  },
  {
    name: "Forestación",
    detail: "y áreas protegidas",
    Icon: Trees,
    color: "#5c8f39",
    bg: "#edf5e2",
  },
];


function Slide02() {
  return (
    <div className="slide-surface relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f4f7f4] text-[#102d45]">

      {/* Fondo decorativo institucional */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-100/60 blur-[110px]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-[1700px] flex-col justify-center px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-6 xl:px-20">

        {/* =========== ENCABEZADO =========== */}

        <motion.div
          initial={{ opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-5 text-center lg:mb-6"
        >

          {/* Indicador del eje */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[#008F89]" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#087b70]">
              Eje Estratégico 6
            </span>
          </motion.div>

          {/* Título */}
          <h2 className="font-black uppercase leading-[0.95] tracking-[-0.055em] text-[clamp(2.1rem,6vw,5.5rem)]">

            <span className="text-[#102d45]">
              PACHAMAMA
            </span>

            <span className="ml-2 text-[#348e5d] sm:ml-4">
              MARKA
            </span>

          </h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-3 max-w-[850px] text-[clamp(0.9rem,1.6vw,1.4rem)] font-semibold leading-snug text-[#587084]"
          >
            Municipio Humano y Ambientalmente Responsable
          </motion.p>

        </motion.div>

        {/* =========== ORGANIGRAMA =========== */}

        <div className="relative mx-auto flex w-full max-w-[1450px] flex-col items-center">

          {/* SECRETARÍA PRINCIPAL */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.45,
              duration: 0.7,
              ease,
            }}
            className="relative z-20 w-full max-w-[740px]"
          >

            <div className="relative overflow-hidden rounded-lg border border-[#0e817b] bg-[#006B68] px-5 py-5 text-center shadow-[0_14px_35px_rgba(0,107,104,0.18)] sm:px-8 lg:py-6">

              {/* Decoración */}
              <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full border border-white/10" />

              <div className="relative flex flex-col items-center gap-2">

                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/15">
                  <Building2 size={25} className="text-white" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/75">
                  Gobierno Autónomo Municipal de El Alto
                </span>

                <h3 className="max-w-[620px] text-sm font-black uppercase leading-snug tracking-[0.025em] text-white sm:text-base lg:text-xl">
                  Secretaría Municipal de Agua, Saneamiento,
                  Gestión Ambiental y Riesgos
                </h3>

                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#9de4d2]">
                  SMASGAR
                </span>

              </div>
            </div>

          </motion.div>

          {/* LÍNEA VERTICAL PRINCIPAL */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.95, duration: 0.45 }}
            style={{ transformOrigin: "top" }}
            className="h-7 w-[3px] bg-[#008F89] lg:h-9"
          />

          {/* CONECTOR HORIZONTAL EN ESCRITORIO */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 1.25,
              duration: 0.65,
              ease,
            }}
            className="hidden h-[3px] w-[75%] origin-center bg-[#008F89] lg:block"
          />

          {/* =========== CUATRO ÁREAS =========== */}

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">

            {sectors.map((sector, i) => {
              const Icon = sector.Icon;

              return (
                <div
                  key={sector.name}
                  className="relative flex flex-col items-center"
                >

                  {/* Conector individual */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: 1.55 + i * 0.12,
                      duration: 0.4,
                    }}
                    style={{ transformOrigin: "top" }}
                    className="hidden h-7 w-[3px] bg-[#008F89] lg:block"
                  />

                  {/* Tarjeta */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 45,
                      scale: 0.94,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: 1.6 + i * 0.16,
                      duration: 0.65,
                      ease,
                    }}
                    whileHover={{
                      y: -7,
                      transition: { duration: 0.25 },
                    }}
                    className="group relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border border-[#dce7e0] bg-white px-4 py-5 text-center shadow-[0_8px_28px_rgba(16,55,45,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(16,55,45,0.13)] sm:min-h-[180px] lg:min-h-[210px] lg:px-5 lg:py-6"
                  >

                    {/* Línea superior de color */}
                    <div
                      className="absolute left-0 top-0 h-[4px] w-full"
                      style={{ backgroundColor: sector.color }}
                    />

                    {/* Ícono */}
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                      }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg lg:h-16 lg:w-16"
                      style={{ backgroundColor: sector.bg }}
                    >
                      <Icon
                        size={30}
                        style={{ color: sector.color }}
                      />
                    </motion.div>

                    {/* Nombre */}
                    <h4 className="text-base font-black leading-tight tracking-tight text-[#173647] sm:text-lg lg:text-[clamp(1rem,1.4vw,1.4rem)]">
                      {sector.name}
                    </h4>

                    {/* Descripción */}
                    <p className="mt-2 text-xs leading-relaxed text-[#667984] lg:text-sm">
                      {sector.detail}
                    </p>

                    {/* Decoración inferior */}
                    <div
                      className="mt-auto pt-5"
                    >
                      <div
                        className="h-[3px] w-10 rounded-sm transition-all duration-300 group-hover:w-20"
                        style={{ backgroundColor: sector.color }}
                      />
                    </div>

                  </motion.div>

                </div>
              );
            })}

          </div>

          {/* =========== PIE =========== */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.35,
              duration: 0.5,
            }}
            className="mt-5 flex w-full items-center justify-center gap-3 lg:mt-7"
          >
            <div className="h-px w-8 bg-[#b0c7ba]" />

            <span className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b9188] sm:text-xs">
              Plan Autonómico de Desarrollo Municipal
            </span>

            <div className="h-px w-8 bg-[#b0c7ba]" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}


// DIAPOSITIVA ORIGINAL 7
const forestStats = [
  {
    value: "54.647",
    unit: "m",
    label: "Longitud de intervención",
    Icon: MapPinned,
  },
  {
    value: "15.005",
    unit: "unid.",
    label: "Plantines proyectados",
    Icon: Sprout,
  },
  {
    value: "157.045",
    unit: "m²",
    label: "Superficie de intervención",
    Icon: Trees,
  },
];


function Slide07() {
  const avenues = [
    "Av. 6 de Marzo",
    "Av. Juan Pablo II",
    "Av. Bolivia",
    "Ladislao Cabrera",
    "Néstor Galindo",
    "Tiahuanaco",
    "Integración",
    "Julio César Valdez",
    "Mariscal Quiroga",
    "Santa Cruz",
    "Venancio Condori",
    "Estructurante",
  ];

  const activities = [
    "Forestación con especies adaptadas",
    "Preparación y acondicionamiento del suelo",
    "Riego",
    "Seguimiento y mantenimiento",
  ];

  return (
    <div className="slide-surface relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f2f5f2] text-[#102d45]">

      {/* Fondo ambiental */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#d7eadd]/50 blur-[110px]" />

      <div className="relative mx-auto grid min-h-full w-full max-w-[1900px] grid-cols-1 gap-5 px-4 py-5 sm:px-7 lg:h-full lg:min-h-0 lg:grid-cols-[53%_47%] lg:gap-6 lg:px-10 lg:py-7">

        {/* ===================================== */}
        {/* IZQUIERDA: PROYECCIÓN Y MODELO 3D */}
        {/* ===================================== */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex min-h-0 flex-col"
        >

          {/* Encabezado del modelado */}
          <div className="mb-4 flex shrink-0 items-center justify-between gap-3">

            <div>
              <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#008F89] sm:text-xs">
                Programa de forestación urbana
              </p>

              <h2 className="text-[clamp(2rem,4vw,4.5rem)] font-black uppercase leading-none tracking-[-0.055em] text-[#102d45]">
                PROYECCIÓN
              </h2>
            </div>

            <div className="hidden items-center gap-2 rounded-md border border-[#b8ded0] bg-[#e4f5eb] px-3 py-2 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#008F89]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#08746a]">
                Modelo 3D
              </span>
            </div>

          </div>

          {/* Contenedor principal 3D */}
          
{/* Contenedor principal 3D */}
<div className="relative h-[300px] min-h-0 w-full overflow-hidden rounded-lg border border-[#d7e5de] bg-[#dce9e1] shadow-lg sm:h-[400px] lg:h-auto lg:flex-1">

  <CityScene />

  {/* Etiqueta superior */}
  <div className="pointer-events-none absolute left-4 top-4 rounded-md border border-white/70 bg-white/85 px-3 py-2 shadow-sm backdrop-blur-md">
    <div className="flex items-center gap-2">
      <Trees size={18} className="text-[#168b5b]" />

      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#244d37]">
        Arborización urbana
      </span>
    </div>
  </div>

  {/* Indicaciones */}
  <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-md border border-white/60 bg-white/85 px-3 py-3 shadow-sm backdrop-blur-md">

    <span className="text-[10px] font-semibold text-[#47675a] sm:text-xs">
      Arrastra para girar · Acerca para explorar
    </span>

    <ScanEye
      size={19}
      className="shrink-0 text-[#008F89]"
    />

  </div>

</div>

        </motion.div>

        {/* ===================================== */}
        {/* DERECHA: INFORMACIÓN DEL PROYECTO */}
        {/* ===================================== */}

        <div className="flex min-h-0 flex-col gap-4 lg:overflow-y-auto lg:pr-1">

          {/* Encabezado informativo */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="shrink-0 border-l-4 border-[#dda939] pl-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#008F89] sm:text-xs">
              Plan de intervención
            </p>

            <h3 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-[#173647] sm:text-2xl lg:text-[clamp(1.2rem,1.8vw,2rem)]">
              Forestación proyectada
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-[#687b78] sm:text-sm">
              Intervención en avenidas principales, plazas y
              unidades educativas del municipio de El Alto.
            </p>
          </motion.div>

          {/* ===================================== */}
          {/* INDICADORES PRINCIPALES */}
          {/* ===================================== */}

          <div className="grid shrink-0 grid-cols-3 gap-2 sm:gap-3">

            {forestStats.map((stat, i) => {
              const Icon = stat.Icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 35,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    duration: 0.6,
                    ease,
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="relative min-w-0 overflow-hidden rounded-md border border-[#dce8e2] bg-white p-2.5 shadow-[0_8px_28px_rgba(16,55,45,0.05)] sm:p-4"
                >

                  <div className="absolute inset-x-0 top-0 h-[4px] bg-[#008F89]" />

                  <Icon
                    size={22}
                    className="mb-3 text-[#168b75]"
                  />

                  <div className="break-words text-[clamp(0.95rem,1.85vw,2rem)] font-black leading-tight tracking-[-0.045em] text-[#173647]">
                    {stat.value}
                  </div>

                  <span className="mt-1 block text-xs font-bold text-[#008F89]">
                    {stat.unit}
                  </span>

                  <p className="mt-2 text-[10px] font-semibold leading-snug text-[#6b7f7d] sm:text-xs">
                    {stat.label}
                  </p>

                </motion.div>
              );
            })}

          </div>

          {/* ===================================== */}
          {/* ÁREAS DE INTERVENCIÓN */}
          {/* ===================================== */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.85,
              duration: 0.65,
              ease,
            }}
            className="shrink-0 overflow-hidden rounded-md border border-[#dce6e1] bg-white shadow-sm"
          >

            {/* Encabezado */}
            <div className="flex items-center gap-3 bg-[#176b87] px-4 py-3 text-white">

              <MapPinned size={19} className="shrink-0" />

              <h4 className="text-xs font-black uppercase tracking-[0.12em] sm:text-sm">
                Áreas de intervención
              </h4>

            </div>

            <div className="p-4">

              <p className="mb-3 text-xs leading-relaxed text-[#667b81]">
                Avenidas principales, plazas y unidades
                educativas contempladas en la proyección.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                {avenues.map((avenue, i) => (
                  <motion.div
                    key={avenue}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.95 + i * 0.045,
                      duration: 0.35,
                    }}
                    className="flex min-w-0 items-center gap-2 rounded-sm border border-[#e0ebe6] bg-[#f4f8f6] px-2.5 py-2"
                  >

                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#008F89]" />

                    <span className="text-[10px] font-semibold leading-snug text-[#345d61] sm:text-[11px]">
                      {avenue}
                    </span>

                  </motion.div>
                ))}

              </div>

            </div>

          </motion.div>

          {/* ===================================== */}
          {/* ACTIVIDADES DE INTERVENCIÓN */}
          {/* ===================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.15,
              duration: 0.65,
              ease,
            }}
            className="shrink-0 rounded-md border border-[#dce6e1] bg-white p-4 shadow-sm"
          >

            <div className="mb-3 flex items-center gap-2">
              <Sprout size={20} className="text-[#168b5b]" />

              <h4 className="text-xs font-black uppercase tracking-[0.11em] text-[#173647] sm:text-sm">
                Actividades previstas
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

              {activities.map((activity, i) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.3 + i * 0.12,
                    duration: 0.4,
                  }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 rounded-sm border border-[#e2ebe5] bg-[#f6f9f6] px-3 py-2.5"
                >

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#e2f3e8] text-[11px] font-black text-[#168b5b]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[11px] font-semibold leading-snug text-[#416457]">
                    {activity}
                  </span>

                </motion.div>
              ))}

            </div>

          </motion.div>

          {/* Pie institucional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex shrink-0 items-center justify-between gap-2 border-t border-[#d6e4dc] pt-3"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#718981]">
              SMASGAR · GAMEA
            </span>

            <span className="text-[10px] font-semibold text-[#718981]">
              Proyección de forestación urbana
            </span>
          </motion.div>

        </div>

      </div>
    </div>
  );
}

// DIAPOSITIVA ORIGINAL 8
const interventionSteps = [
  "Forestación con especies adaptadas",
  "Preparación y acondicionamiento del suelo",
  "Riego",
  "Seguimiento y mantenimiento",
];

function Slide08() {
  return (
    <div className="slide-surface flex h-full min-h-0 flex-col overflow-hidden bg-[#f3f7f3] px-7 pb-6 pt-9 md:px-14 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex shrink-0 flex-wrap items-end justify-between gap-4"
      >
        <div>
          <Eyebrow>Dirección de Forestación y Áreas Protegidas</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.8rem,3.8vw,4.7rem)] font-black uppercase leading-[1.03] tracking-[-0.05em] text-[#143d30]">
            Áreas de intervención
            <br className="hidden md:block" />
            <span className="text-[#3d9d65]"> para forestación</span>
          </h2>
        </div>

        <p className="max-w-[310px] pb-2 text-sm leading-6 text-[#687c70]">
          Comparación visual del estado actual y la
          proyección de recuperación ambiental.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="relative mt-5 min-h-0 flex-1 overflow-hidden rounded-[24px] border border-white bg-[#dcebf2] shadow-[0_20px_60px_rgba(11,51,40,0.12)]"
      >
        

        <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-[#923f3a] px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg">
          Estado actual
        </div>

        <div className="pointer-events-none absolute right-5 top-5 rounded-full bg-[#1d8751] px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg">
          Proyección
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 w-[min(92%,440px)] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-center shadow-xl backdrop-blur-lg">
          <p className="text-xs font-extrabold text-[#244d37]">
            Transformación urbana en 3D
          </p>
          <p className="mt-1 text-[11px] text-[#78847b]">
            Arrastra para girar · Rueda para acercar
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42 }}
        className="mt-4 grid shrink-0 grid-cols-2 gap-2 lg:grid-cols-4"
      >
        {interventionSteps.map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-3 rounded-xl border border-[#dce9dc] bg-white px-3 py-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9f5eb] text-xs font-black text-[#2a9359]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-semibold leading-snug text-[#476250]">
              {step}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// SELECCIÓN DE DIAPOSITIVAS

function SlideContent({ index }: { index: number }) {
  switch (index) {
    case 0: return <Slide01 />;
    case 1: return <Slide02 />;
    case 2: return <Slide07 />;
    case 3: return <Slide09 />;
    case 4: return <Slide11 />;
    case 5: return <Slide12 />;
    case 6: return <Slide28 />;
    case 7: return <Slide29 />;
    case 8: return <Slide32 />;
    case 9: return <Slide33 />;
    case 10: return <Slide34 />;
    case 11: return <Slide35 />;
    case 12: return <Slide36 />;
    case 13: return <Slide38 />;
    default: return null;
  }
}



export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const total = slides.length;

  const navigate = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(total - 1, next));

      setCurrent((previous) => {
        if (previous === target) return previous;
        setDirection(target > previous ? 1 : -1);
        return target;
      });
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    navigate(current + 1);
  }, [current, navigate]);

  const previousSlide = useCallback(() => {
    navigate(current - 1);
  }, [current, navigate]);

  // NAVEGACIÓN POR TECLADO
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        nextSlide();
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
      ) {
        event.preventDefault();
        previousSlide();
      }

      if (event.key.toLowerCase() === "f" && !event.repeat) {
        event.preventDefault();

        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }

      if (event.key === "Home") navigate(0);
      if (event.key === "End") navigate(total - 1);
      if (event.key === "Escape") setShowHelp(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, previousSlide, navigate, total]);

  // DETECTAR PANTALLA COMPLETA
  useEffect(() => {
    const update = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", update);
    return () => {
      document.removeEventListener("fullscreenchange", update);
    };
  }, []);

  // AVANCE AUTOMÁTICO OPCIONAL
  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setCurrent((previous) => {
        if (previous >= total - 1) {
          setAutoPlay(false);
          return previous;
        }

        setDirection(1);
        return previous + 1;
      });
    }, 14000);

    return () => window.clearInterval(timer);
  }, [autoPlay, total]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Algunos navegadores pueden bloquear la solicitud.
    }
  };

  return (
  <main className="presentation-root relative flex h-dvh w-full flex-col overflow-hidden bg-[#0c1d2d] text-white">
    
      {/* ENCABEZADO SUPERIOR */}
      <header className="relative z-30 flex h-[58px] shrink-0 items-center justify-between gap-2 bg-[#006B68] px-2 sm:h-[65px] sm:px-4 lg:h-[82px] lg:px-9">
        
{/* LOGOTIPOS INSTITUCIONALES */}
<div className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3">
  {/* LOGO DEL ALCALDE */}
  <div className="relative h-[38px] w-[62px] shrink-0 sm:h-[46px] sm:w-[95px] lg:h-[56px] lg:w-[115px]">
    <Image
      src="/logoAlcalde1.png"
      alt="Logo institucional de la Alcaldía de El Alto"
      fill
      sizes="(max-width: 768px) 125px, 200px"
      className="object-contain object-left"
      priority
    />
  </div>

  {/* BARRA DE SEPARACIÓN */}
  <div className="h-[43px] w-px shrink-0 bg-white/45" />

  {/* LOGO SMASGAR */}
  <div className="relative h-[38px] w-[85px] shrink-0 sm:h-[46px] sm:w-[120px] lg:h-[56px] lg:w-[160px]">
    <Image
      src="/SMASGAR.png"
      alt="Logo de la Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos"
      fill
      sizes="(max-width: 768px) 120px, 160px"
      className="object-contain object-left"
      priority
    />
  </div>

</div>


        
<div className="hidden text-center md:block">
  <span className="text-[18px] font-extrabold uppercase tracking-[0.12em] text-white">
    {slides[current].title}
  </span>
</div>


        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setAutoPlay((value) => !value)}
            title={autoPlay ? "Detener avance" : "Avance automático"}
            aria-label={autoPlay ? "Detener avance" : "Avance automático"}
            className={`presentation-icon-button ${
  autoPlay ? "bg-[#008F89]/30 text-[#7ff3ee]" : ""
}`}
          >
            {autoPlay ? <Pause size={17} /> : <Play size={17} />}
          </button>

          <button
            type="button"
            onClick={() => setShowHelp((value) => !value)}
            title="Ayuda"
            aria-label="Ayuda"
            className="presentation-icon-button"
          >
            <CircleHelp size={18} />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title="Pantalla completa"
            aria-label="Pantalla completa"
            className="presentation-icon-button"
          >
            {isFullscreen ? (
              <Minimize2 size={18} />
            ) : (
              <Maximize2 size={18} />
            )}
          </button>
        </div>
      </header>
<div className="brand-divider" />
      {/* SUPERFICIE PRINCIPAL */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.65,
              ease,
            }}
            className="absolute inset-0"
          >
            <SlideContent index={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BARRA DE CONTROL */}
      
      {/* VENTANA DE AYUDA */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#081621]/75 p-5 backdrop-blur-md"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#142b3d] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold">
                  Controles de presentación
                </h3>

                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  aria-label="Cerrar ayuda"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-7 space-y-4 text-sm text-slate-300">
                <p>→ / Espacio: siguiente diapositiva</p>
                <p>← : diapositiva anterior</p>
                <p>Home / End: primera y última</p>
                <p>F: activar o salir de pantalla completa</p>
                <p>Mouse: girar y acercar modelos 3D</p>
                <p>Play: avanzar automáticamente cada 14 segundos</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
