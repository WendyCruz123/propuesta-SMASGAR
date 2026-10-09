"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import ArbolQR from "./arbolqr";
import {
  Activity, AlertTriangle, Bell, BookOpen, Building2, CalendarDays,
  Camera, CheckCircle2, ClipboardCheck, CloudRain, Database, Droplets,
  Factory, FileText, GraduationCap, Leaf, MapPin, MapPinned,
  Monitor, Recycle, Route, Scale, ShieldCheck, Siren, Smartphone,
  Sprout, Trees, Truck, Users, Waves, Wifi, Wrench,
} from "lucide-react";

type IconType = React.ComponentType<{ size?: number; className?: string }>;
type Vec = [number, number, number];
const ease = [0.22, 1, 0.36, 1] as const;

function Enter({ children, delay = 0, className = "" }: {children: React.ReactNode; delay?: number; className?: string}) {
  return <motion.div className={className} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.65,delay,ease}}>{children}</motion.div>;
}
function Heading({tag,title,accent,subtitle}:{tag:string;title:string;accent?:string;subtitle?:string}) {
  return <Enter className="shrink-0"><p className="mb-2 text-[10px] font-black uppercase tracking-[.2em] text-emerald-700">{tag}</p><h2 className="text-[clamp(1.8rem,3.1vw,3.7rem)] font-black uppercase leading-[1.02] tracking-[-.055em] text-[#17334d]">{title} <span className="text-[#168b86]">{accent}</span></h2>{subtitle&&<p className="mt-2 max-w-4xl text-xs leading-5 text-slate-500">{subtitle}</p>}</Enter>;
}
function Panel({children,className=""}:{children:React.ReactNode;className?:string}){
  return <div className={`min-h-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(19,52,72,.05)] ${className}`}>{children}</div>;
}
function IconInfo({icon:Icon,label,detail}:{icon:IconType;label:string;detail?:string}){
  return <div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Icon size={19}/></div><div><p className="text-xs font-extrabold text-slate-800">{label}</p>{detail&&<p className="mt-1 text-[11px] leading-4 text-slate-500">{detail}</p>}</div></div>;
}

// Geometrías pequeñas compartidas por las escenas técnicas.
function Block({p,s,c}:{p:Vec;s:Vec;c:string}){
 return <mesh position={p} castShadow receiveShadow><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={.8}/></mesh>;
}
function Cylinder({p,r=0.5,h=1,c="#c9d8df",rotation}:{p:Vec;r?:number;h?:number;c?:string;rotation?:Vec}){
 return <mesh position={p} rotation={rotation} castShadow><cylinderGeometry args={[r,r,h,18]}/><meshStandardMaterial color={c} metalness={.08}/></mesh>;
}
function Tree({x,z}:{x:number;z:number}){
 return <group position={[x,0,z]}><Cylinder p={[0,.47,0]} r={.09} h={.95} c="#77533e"/><mesh position={[0,1.42,0]} castShadow><icosahedronGeometry args={[.65,1]}/><meshStandardMaterial color="#39864d" flatShading/></mesh></group>;
}
function OrbitStage({children,zoom=false}:{children:React.ReactNode;zoom?:boolean}){
 return <div className="h-full w-full"><Canvas dpr={[1,1.4]} camera={{position:[10,8,12],fov:40}}><color attach="background" args={["#e3eff3"]}/><ambientLight intensity={2.1}/><directionalLight position={[6,12,8]} intensity={2.6}/><group>{children}</group><OrbitControls enablePan={false} enableZoom={zoom} minDistance={8} maxDistance={25} autoRotate autoRotateSpeed={.28} target={[0,.6,0]}/></Canvas></div>;
}
function MiniCity({kind="risk"}:{kind?:"risk"|"school"|"neighborhood"}){
 return <group><Block p={[0,-.18,0]} s={[11,.3,9]} c="#ded3be"/><Block p={[0,0,0]} s={[2.2,.06,9]} c="#777e83"/>
 {[-3.5,3.5].flatMap((x)=>[-2.8,0,2.8].map((z,i)=><group key={`${x}-${z}`}><Block p={[x,(1.4+i*.35)/2,z]} s={[2.1,1.4+i*.35,2]} c={kind==="school"&&x===-3.5&&z===0?"#e4d7a5":i===1?"#bd795b":"#a96550"}/><Block p={[x,.6,z+(x<0?1:-1)]} s={[.48,.5,.08]} c="#537f95"/></group>))}
 {[-2.5,2.5].map(z=><Tree key={z} x={1.7} z={z}/>)}
 {kind==="risk"&&<><Block p={[0,.10,-1]} s={[2.35,.13,3]} c="#6caac2"/><Cylinder p={[0,2,-3]} r={.2} h={2.6} c="#cf4141"/></>}
 {kind!=="risk"&&<Cylinder p={[0,.7,2.7]} r={.45} h={1.2} c={kind==="school"?"#e5b949":"#319a79"}/>}
 </group>;
}function DrainGrate({
  p,
  clogged = false,
}: {
  p: Vec;
  clogged?: boolean;
}) {
  return (
    <group position={p}>
      {/* base de rejilla */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.62, 0.38]} />
        <meshStandardMaterial color="#4f5960" />
      </mesh>

      {/* líneas de la rejilla */}
      {[-0.22, -0.11, 0, 0.11, 0.22].map((x) => (
        <mesh
          key={x}
          position={[x, 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.018, 0.34]} />
          <meshStandardMaterial color="#7c8a92" />
        </mesh>
      ))}

      {/* lodo encima */}
      {clogged && (
        <>
          <mesh position={[-0.08, 0.03, 0.02]} castShadow>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#7a5a3e" roughness={0.95} />
          </mesh>

          <mesh position={[0.06, 0.025, -0.03]} castShadow>
            <sphereGeometry args={[0.075, 8, 8]} />
            <meshStandardMaterial color="#866447" roughness={0.95} />
          </mesh>

          <mesh position={[0.15, 0.018, 0.05]} castShadow>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#907153" roughness={0.95} />
          </mesh>
        </>
      )}
    </group>
  );
}

function WaterPuddle({
  p,
  s = [1, 1, 1] as Vec,
}: {
  p: Vec;
  s?: Vec;
}) {
  return (
    <mesh
      position={p}
      scale={s}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[0.5, 24]} />
      <meshStandardMaterial
        color="#6eaed1"
        transparent
        opacity={0.72}
        roughness={0.18}
        metalness={0.08}
      />
    </mesh>
  );
}

function MudPatch({
  p,
  s = [1, 1, 1] as Vec,
}: {
  p: Vec;
  s?: Vec;
}) {
  return (
    <mesh
      position={p}
      scale={s}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[0.5, 18]} />
      <meshStandardMaterial color="#876548" roughness={0.98} />
    </mesh>
  );
}

function StreetLight({
  p,
}: {
  p: Vec;
}) {
  return (
    <group position={p}>
      <Cylinder p={[0, 0.95, 0]} r={0.05} h={1.9} c="#7e8d95" />
      <Block p={[0.16, 1.8, 0]} s={[0.34, 0.05, 0.05]} c="#8b989f" />
      <Block p={[0.29, 1.72, 0]} s={[0.12, 0.12, 0.12]} c="#f0e3a3" />
    </group>
  );
}

function DrainagePluvialCity() {
  return (
    <group>
      {/* base general */}
      <Block p={[0, -0.18, 0]} s={[12, 0.3, 10]} c="#d8cfbf" />

      {/* calles */}
      <Block p={[0, 0, 0]} s={[2.7, 0.06, 10]} c="#6f767c" />
      <Block p={[0, 0.01, 0]} s={[12, 0.06, 2.7]} c="#6f767c" />

      {/* aceras */}
      <Block p={[-2.25, 0.05, 0]} s={[0.45, 0.08, 10]} c="#cfd5d8" />
      <Block p={[2.25, 0.05, 0]} s={[0.45, 0.08, 10]} c="#cfd5d8" />
      <Block p={[0, 0.05, -2.25]} s={[12, 0.08, 0.45]} c="#cfd5d8" />
      <Block p={[0, 0.05, 2.25]} s={[12, 0.08, 0.45]} c="#cfd5d8" />

      {/* marcas viales */}
      {[-3.8, -2.4, -1, 0.4, 1.8, 3.2].map((z) => (
        <Block key={`v-${z}`} p={[0, 0.05, z]} s={[0.08, 0.01, 0.72]} c="#efe6b1" />
      ))}
      {[-4.6, -3, -1.4, 0.2, 1.8, 3.4, 5].map((x) => (
        <Block key={`h-${x}`} p={[x, 0.05, 0]} s={[0.72, 0.01, 0.08]} c="#efe6b1" />
      ))}

      {/* edificios */}
      {[
        [-4.2, 0, -3.4, 1.8, 2.0, 1.8, "#b86b58"],
        [-4.2, 0, 3.35, 1.9, 2.15, 1.7, "#a46555"],
        [4.1, 0, -3.35, 1.9, 2.25, 1.8, "#c27d63"],
        [4.05, 0, 3.3, 2.0, 2.0, 1.8, "#b8725f"],
        [-0.1, 0, -4.0, 2.8, 2.2, 1.4, "#c8b49f"],
        [0.2, 0, 4.0, 2.7, 2.0, 1.5, "#b7c7c9"],
      ].map(([x, y, z, w, h, d, c], i) => (
        <group key={i}>
          <Block
            p={[x as number, (h as number) / 2, z as number]}
            s={[w as number, h as number, d as number]}
            c={c as string}
          />
          <Block
            p={[x as number, h as number, z as number]}
            s={[(w as number) + 0.15, 0.1, (d as number) + 0.15]}
            c="#e8ecee"
          />
        </group>
      ))}

      {/* árboles */}
      {[
        [-5.0, -1.3],
        [-5.0, 1.4],
        [5.0, -1.2],
        [5.0, 1.3],
        [-1.2, -5.0],
        [1.4, -5.0],
        [-1.5, 5.0],
        [1.3, 5.0],
      ].map(([x, z], i) => (
        <Tree key={i} x={x as number} z={z as number} />
      ))}

      {/* charcos de agua */}
      <WaterPuddle p={[-0.85, 0.06, -1.2]} s={[1.45, 1, 1]} />
      <WaterPuddle p={[0.95, 0.06, 1.05]} s={[1.2, 1, 0.92]} />
      <WaterPuddle p={[-2.15, 0.06, 0.85]} s={[0.95, 1, 0.78]} />
      <WaterPuddle p={[2.15, 0.06, -0.95]} s={[0.92, 1, 0.8]} />
      <WaterPuddle p={[0.05, 0.06, 2.3]} s={[1.3, 1, 0.72]} />

      {/* lodo acumulado */}
      <MudPatch p={[-2.2, 0.061, 1.15]} s={[0.78, 1, 0.55]} />
      <MudPatch p={[2.05, 0.061, -1.25]} s={[0.82, 1, 0.58]} />
      <MudPatch p={[0.45, 0.061, 2.55]} s={[0.68, 1, 0.45]} />

      {/* alcantarillas / drenajes */}
      <DrainGrate p={[-2.2, 0.07, 1.15]} clogged />
      <DrainGrate p={[2.1, 0.07, -1.2]} clogged />
      <DrainGrate p={[0.4, 0.07, 2.52]} clogged />
      <DrainGrate p={[-2.2, 0.07, -1.35]} />
      <DrainGrate p={[2.1, 0.07, 1.4]} />

      {/* luminarias */}
      <StreetLight p={[-2.8, 0, -2.8]} />
      <StreetLight p={[2.8, 0, 2.8]} />
      <StreetLight p={[-2.8, 0, 2.8]} />
      <StreetLight p={[2.8, 0, -2.8]} />

      {/* aviso de zona crítica */}
      <Cylinder p={[0, 1.35, -3.2]} r={0.08} h={1.7} c="#8f969a" />
      <mesh position={[0, 2.15, -3.2]} castShadow>
        <boxGeometry args={[0.75, 0.55, 0.08]} />
        <meshStandardMaterial color="#d4504f" />
      </mesh>
    </group>
  );
}
function Conveyor({x=0,z=0}:{x?:number;z?:number}){
 const roll=useRef<THREE.Group>(null); useFrame(({clock})=>{if(roll.current)roll.current.position.x=Math.sin(clock.elapsedTime*1.5)*.2});
 return <group position={[x,0,z]}><Block p={[0,.85,0]} s={[3.4,.18,.9]} c="#344f60"/><Block p={[0,.98,0]} s={[3.1,.07,.7]} c="#4d8f9c"/><group ref={roll}>{[-.8,0,.85].map((v,i)=><Block key={i} p={[v,1.12,0]} s={[.42,.22,.35]} c={i===0?"#bc7750":i===1?"#8b8f8c":"#6aa367"}/>)}</group>{[-1.2,1.2].map(v=><Block key={v} p={[v,.42,0]} s={[.1,.82,.12]} c="#647581"/>)}</group>;
}
function Facility({kind}:{kind:"rdc"|"compost"|"sorting"}){
 return <group><Block p={[0,-.17,0]} s={[11,.3,8]} c="#d3c2a9"/>
 {kind==="rdc"?<>
 <Block p={[-3,.26,-1]} s={[3,.45,2.4]} c="#ae9880"/>{Array.from({length:16},(_,i)=><mesh key={i} position={[-4.1+(i%4)*.72,.58+Math.floor(i/4)*.13,-1.8+Math.floor(i/4)*.45]} rotation={[i*.2,0,i*.15]}><icosahedronGeometry args={[.27,0]}/><meshStandardMaterial color={i%3===0?"#b36d51":"#8b8c82"} flatShading/></mesh>)}
 <Conveyor x={-.1}/><Block p={[3,.7,0]} s={[1.9,1.4,2.4]} c="#b8c6c8"/><Block p={[3,1.45,0]} s={[2.2,.18,2.6]} c="#5e8293"/>
 {[-2.2,-1.5,-.8,.1].map((x,i)=><Block key={i} p={[x,.22,2.7]} s={[.65,.35,.8]} c={i%2?"#c07b69":"#999999"}/>)}
 </>:kind==="compost"?<>
 {[-2.8,-.9,1,2.9].map((x,i)=><group key={i}><Block p={[x,.15,-1.3]} s={[1.45,.27,3]} c="#9b8066"/><mesh position={[x,.52,-1.3]} rotation={[0,0,0]}><coneGeometry args={[.68,.85,4]}/><meshStandardMaterial color={i%2?"#66854a":"#876947"}/></mesh></group>)}<Conveyor z={2}/>{[-4.5,4.5].map(x=><Tree key={x} x={x} z={-3}/>)}</>:<>
 <Conveyor x={-2.4}/><Conveyor x={1.3} z={0}/><Block p={[3.7,.9,0]} s={[1.2,1.7,1.8]} c="#387895"/>
 {[-3,-1.4,.2,1.8,3.4].map((x,i)=><Block key={i} p={[x,.3,2.4]} s={[1.2,.55,1.2]} c={i%2?"#b68d6b":"#699d85"}/>)}
 </>}
 </group>;
}

// 10ª PANTALLA - ORIGINAL 28


export function Slide28() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f2f5f8] text-[#15384f]">

      <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col gap-3 px-4 py-4 sm:px-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-5">

        {/* ENCABEZADO INSTITUCIONAL */}
        <div className="shrink-0">

          <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[#d2d5ed] bg-[#f0edfa] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#7435b6]" />

            <span className="text-[10px] font-black uppercase tracking-[0.13em] text-[#65339d]">
              Dirección de Gestión de Riesgos
            </span>
          </div>

          <h2 className="text-[clamp(1.45rem,2.6vw,3rem)] font-black uppercase leading-[1.08] tracking-[-0.045em] text-[#15384f]">

            SISTEMA INTEGRAL DE{" "}

            <span className="text-[#7136aa]">
              GESTIÓN DE RIESGOS
            </span>

            <span className="block text-[0.62em] tracking-[-0.02em] text-[#526b82]">
              Y ALERTA TEMPRANA
            </span>

          </h2>
        </div>

        {/* CONTENIDO: 60% IZQUIERDA / 40% DERECHA */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[58fr_42fr]">

          {/* ============================== */}
          {/* IZQUIERDA: VIDEO Y OBJETIVO */}
          {/* ============================== */}
          <div className="flex min-h-0 min-w-0 flex-col gap-3">

            {/* VIDEO SIN TARJETA NI ENCABEZADO */}
            <div className="relative h-[280px] min-h-0 w-full shrink-0 overflow-hidden rounded-sm bg-[#152c42] sm:h-[400px] lg:h-auto lg:flex-1">

              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                className="absolute inset-0 h-full w-full object-contain"
              >
                <source
                  src="/Sistemadgr.mp4"
                  type="video/mp4"
                />
                Tu navegador no admite videos MP4.
              </video>

            </div>

            {/* OBJETIVO DEBAJO DEL VIDEO */}
            <div className="shrink-0 border-l-4 border-[#7538a7] bg-white px-4 py-3 shadow-sm sm:px-5">

              <p className="mb-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#7538a7]">
                Objetivo
              </p>

              <p className="text-xs leading-relaxed text-[#465e72] sm:text-sm">
                Centralizar mapas de riesgos y vulnerabilidades en
                una plataforma web y móvil, generando boletines,
                avisos y alertas tempranas para fortalecer la
                prevención, preparación y respuesta municipal
                ante eventos adversos.
              </p>

            </div>

          </div>

          {/* ============================== */}
          {/* DERECHA: IMAGEN Y ÁRBOL QR */}
          {/* ============================== */}
          <div className="grid min-h-0 min-w-0 grid-rows-[240px_330px] gap-3 sm:grid-rows-[300px_380px] lg:grid-rows-[30fr_50fr]">

            {/* IMAGEN SOLA */}
            <div className="relative min-h-0 overflow-hidden rounded-sm bg-[#e9f0f5]">

             

            </div>


{/* DERECHA: IMAGEN DEL SISTEMA */}
<div className="relative h-[300px] min-h-0 min-w-0 overflow-hidden rounded-sm bg-[#e9f0f5] sm:h-[420px] lg:h-auto lg:self-stretch">

  <Image
    src="/dgr.png"
    alt="Sistema de información de gestión de riesgos y alerta temprana"
    fill
    sizes="(max-width: 1024px) 100vw, 42vw"
    className="object-contain"
    priority
  />

</div>


          </div>

        </div>

        {/* PIE INSTITUCIONAL */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#d9e3eb] pt-2">

          <span className="text-[10px] font-bold uppercase tracking-wide text-[#73889a]">
            Gestión de Riesgos · GAMEA
          </span>

          <span className="text-[10px] font-semibold text-[#73889a]">
            SMASGAR · El Alto
          </span>

        </div>

      </div>

    </section>
  );
}

// 11ª PANTALLA - ORIGINAL 29
export function Slide29() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f3f6f8] text-[#15384f]">
      <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col gap-3 px-4 py-4 sm:px-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-5">

        {/* ENCABEZADO */}
        <div className="shrink-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[#d7e0e8] bg-[#eef5f7] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#168b86]" />
            <span className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1b6c75]">
              Preparación comunitaria y escolar
            </span>
          </div>

          <h2 className="text-[clamp(1.45rem,2.6vw,3rem)] font-black uppercase leading-[1.08] tracking-[-0.045em] text-[#15384f]">
            BRIGADAS ESCOLARES
            <span className="text-[#168b86]"> Y C.O.E.B.s</span>

            <span className="block text-[0.62em] tracking-[-0.02em] text-[#526b82]">
              Organización ante emergencias
            </span>
          </h2>
        </div>

        {/* CONTENIDO */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[58fr_42fr]">

          {/* IZQUIERDA: DOS VIDEOS */}
          <div className="grid min-h-0 min-w-0 grid-cols-1 gap-4 lg:grid-rows-2">

            {/* VIDEO 1 */}
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-sm border border-[#d6e2e8] bg-white shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-[#e4edf2] px-4 py-2.5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#168b86]">
                    Brigadas escolares
                  </p>
                  <h3 className="text-sm font-extrabold text-[#173d59]">
                    B.R.E.s
                  </h3>
                </div>

                <span className="rounded-sm bg-[#e8f6ee] px-2.5 py-1 text-[10px] font-black text-[#23724e]">
                  VIDEO
                </span>
              </div>

              <div className="relative h-[220px] min-h-0 bg-[#152c42] sm:h-[280px] lg:h-auto lg:flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  <source src="/v1.mp4" type="video/mp4" />
                  Tu navegador no admite videos MP4.
                </video>
              </div>

              <div className="border-t border-[#e4edf2] px-4 py-3">
                <p className="text-[11px] leading-relaxed text-[#4c6374] sm:text-xs">
                  Implementar Brigadas Escolares de Emergencia (B.R.E.s)
                  consolidadas en Unidades Educativas priorizadas para la
                  preparación y respuesta frente a eventos adversos,
                  reduciendo la vulnerabilidad de nuestra población y
                  municipio.
                </p>
              </div>
            </div>

            {/* VIDEO 2 */}
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-sm border border-[#d6e2e8] bg-white shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-[#e4edf2] px-4 py-2.5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#168b86]">
                    Organización barrial
                  </p>
                  <h3 className="text-sm font-extrabold text-[#173d59]">
                    C.O.E.B.s
                  </h3>
                </div>

                <span className="rounded-sm bg-[#e8f6ee] px-2.5 py-1 text-[10px] font-black text-[#23724e]">
                  VIDEO
                </span>
              </div>

              <div className="relative h-[220px] min-h-0 bg-[#152c42] sm:h-[280px] lg:h-auto lg:flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  <source src="/v2.mp4" type="video/mp4" />
                  Tu navegador no admite videos MP4.
                </video>
              </div>

              <div className="border-t border-[#e4edf2] px-4 py-3">
                <p className="text-[11px] leading-relaxed text-[#4c6374] sm:text-xs">
                  Implementar los Comités Operativos de Emergencia Barrial
                  (C.O.E.B.s) en barrios priorizados para la preparación y
                  respuesta frente a eventos adversos, reduciendo la
                  vulnerabilidad de nuestra población y municipio.
                </p>
              </div>
            </div>

          </div>

          {/* DERECHA: FOTO */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-sm border border-[#d6e2e8] bg-white shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-[#e4edf2] px-4 py-2.5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#168b86]">
                  Imagen referencial
                </p>
                <h3 className="text-sm font-extrabold text-[#173d59]">
                  Fortalecimiento comunitario
                </h3>
              </div>

              <span className="rounded-sm bg-[#edf5fb] px-2.5 py-1 text-[10px] font-black text-[#245d86]">
                FOTO
              </span>
            </div>

            <div className="relative h-[340px] min-h-0 flex-1 bg-[#eef3f7] sm:h-[420px] lg:h-auto">
              <Image
                src="/Imagen1.jpg"
                alt="Imagen de fortalecimiento comunitario y respuesta ante emergencias"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain"
              />
            </div>

            <div className="border-t border-[#e4edf2] px-4 py-3">
              <p className="text-[11px] leading-relaxed text-[#4c6374] sm:text-xs">
                Acciones de organización y preparación comunitaria para
                fortalecer la respuesta ante eventos adversos en el
                municipio.
              </p>
            </div>
          </div>

        </div>

        {/* PIE */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#d9e3eb] pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#73889a]">
            Gestión de Riesgos · GAMEA
          </span>

          <span className="text-[10px] font-semibold text-[#73889a]">
            SMASGAR · El Alto
          </span>
        </div>
      </div>
    </section>
  );
}

// 12ª PANTALLA - ORIGINAL 30
export function Slide30(){
 return <section className="flex h-full min-h-0 flex-col bg-[#f2f6f7] px-7 py-6 md:px-12 xl:px-16"><Heading tag="Gestión comunitaria · Original 30" title="Organización barrial" accent="ante emergencias" subtitle="Implementar Comités Operativos de Emergencia Barrial (C.O.E.B.s) en barrios priorizados para la preparación y respuesta frente a eventos adversos."/>
 <div className="mt-5 grid min-h-0 flex-1 grid-cols-[57%_43%] gap-4"><Enter delay={.18} className="min-h-0 rounded-2xl bg-[#e0edf1]"><OrbitStage><MiniCity kind="neighborhood"/></OrbitStage></Enter><Enter delay={.3} className="flex min-h-0 flex-col gap-3"><Panel><IconInfo icon={Users} label="C.O.E.B.s" detail="Comités Operativos de Emergencia Barrial"/></Panel><Panel><IconInfo icon={ShieldCheck} label="Preparación comunitaria" detail="Fortalecer capacidades en barrios priorizados."/></Panel><Panel><IconInfo icon={Siren} label="Respuesta organizada" detail="Actuación frente a eventos adversos."/></Panel><Panel className="mt-auto"><p className="text-xs font-semibold text-emerald-800">Meta del programa: reducir la vulnerabilidad de los barrios y del municipio.</p></Panel></Enter></div></section>
}

// 13ª PANTALLA - ORIGINAL 32

export function Slide32() {
  const componentes = [
    {
      Icon: MapPinned,
      title: "Plataforma georreferenciada",
      detail: "Visualización territorial",
    },
    {
      Icon: Route,
      title: "Rutas y frecuencias",
      detail: "Seguimiento operativo",
    },
    {
      Icon: Truck,
      title: "Ingreso y salida de vehículos",
      detail: "Control del servicio",
    },
    {
      Icon: Scale,
      title: "Pesaje de residuos",
      detail: "Registro de cantidades",
    },
    {
      Icon: AlertTriangle,
      title: "Registro de incidencias",
      detail: "Seguimiento de reportes",
    },
    {
      Icon: MapPin,
      title: "Puntos críticos",
      detail: "Ubicación de incidencias",
    },
    {
      Icon: Monitor,
      title: "Indicadores para autoridades",
      detail: "Información consolidada",
    },
    {
      Icon: Camera,
      title: "Integración GPS y cámaras",
      detail: "Implementación progresiva",
    },
  ];

  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f2f6f5] text-[#173647]">

      <div className="mx-auto flex min-h-full w-full max-w-[1900px] flex-col gap-3 px-4 py-4 sm:px-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-5">

        {/* ENCABEZADO */}
        <Enter className="shrink-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[#b9e4db] bg-[#e7f6f1] px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#008F89]" />

            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#087b70]">
              Gestión integral de residuos
            </span>
          </div>

          <h2 className="text-[clamp(1.5rem,2.8vw,3.3rem)] font-black uppercase leading-[1.05] tracking-[-0.05em] text-[#173647]">
            CENTRO MUNICIPAL DE{" "}
            <span className="text-[#008F89]">
              MONITOREO
            </span>

            <span className="block text-[0.72em] text-[#506b75]">
              Y CONTROL DE ASEO URBANO
            </span>
          </h2>
        </Enter>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[58fr_42fr]">

          {/* IZQUIERDA: IMAGEN Y OBJETIVO */}
          <div className="flex min-h-0 min-w-0 flex-col gap-3">

            <Enter
              delay={0.12}
              className="relative h-[280px] min-h-0 overflow-hidden rounded-sm bg-[#e4eff1] sm:h-[400px] lg:h-auto lg:flex-1"
            >
              <Image
                src="/dgir.jpg"
                alt="Centro Municipal de Monitoreo y Control de Aseo Urbano"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
              />
            </Enter>

            <Enter
              delay={0.2}
              className="shrink-0 border-l-4 border-[#008F89] bg-white px-4 py-3 shadow-sm"
            >
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.13em] text-[#008F89]">
                Objetivo
              </p>

              <p className="text-xs leading-relaxed text-[#4f6870] sm:text-sm">
                Centralizar la información del servicio de aseo
                urbano para mejorar el monitoreo de rutas,
                vehículos, residuos e incidencias, facilitando
                la toma de decisiones municipales.
              </p>
            </Enter>

          </div>

          {/* DERECHA: FUNCIONES Y ÁRBOL QR */}
          <div className="flex min-h-0 min-w-0 flex-col gap-3">

            {/* FUNCIONES DEL SISTEMA */}
            <Enter
              delay={0.2}
              className="shrink-0"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.1em] text-[#173647]">
                  Componentes del sistema
                </h3>

                <span className="text-[10px] font-bold text-[#008F89]">
                  08 componentes
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">

                {componentes.map(({ Icon, title, detail }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.25 + i * 0.055,
                      duration: 0.4,
                    }}
                    whileHover={{ y: -3 }}
                    className="flex min-w-0 items-start gap-2 rounded-sm border border-[#dce9e5] bg-white p-2.5 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#e6f4ef] text-[#008F89]">
                      <Icon size={17} />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold leading-snug text-[#244a4a] sm:text-[11px]">
                        {title}
                      </p>

                      <p className="mt-1 text-[9px] leading-snug text-[#83928f]">
                        {detail}
                      </p>
                    </div>
                  </motion.div>
                ))}

              </div>
            </Enter>

            {/* ÁRBOL QR INTERACTIVO */}
            <Enter
              delay={0.38}
              className="relative h-[340px] min-h-0 overflow-hidden rounded-sm border border-[#dbe8d7] bg-[#f6f1e7] sm:h-[420px] lg:h-auto lg:min-h-[200px] lg:flex-1"
            >

              <div className="absolute inset-0">
                <ArbolQR
                  height="100%"
                  className="block h-full w-full"
                />
              </div>

              <div className="pointer-events-none absolute bottom-2 left-3 right-3 z-10 bg-white/85 px-3 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold text-[#287e4b]">
                  Haz clic en el árbol para visualizar el QR
                </p>
              </div>

            </Enter>

          </div>

        </div>

        {/* PIE */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#d9e3eb] pt-2">

          <span className="text-[10px] font-bold uppercase tracking-wide text-[#73889a]">
            Gestión Integral de Residuos · GAMEA
          </span>

          <span className="text-[10px] font-semibold text-[#73889a]">
            SMASGAR · El Alto
          </span>

        </div>

      </div>
    </section>
  );
}

// 14ª PANTALLA - ORIGINAL 33

/* =====================================================
   DIAPOSITIVA 33
   PLAN MAESTRO - PLANTA PILOTO DE TRATAMIENTO RCD
===================================================== */

export function Slide33() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#f4f6f5] text-[#173647]">

      {/* Fondo decorativo suave */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-[100px]" />

      <div className="relative mx-auto grid min-h-full w-full max-w-[1900px] grid-cols-1 items-center gap-5 px-5 py-6 sm:px-8 lg:h-full lg:min-h-0 lg:grid-cols-[46%_54%] lg:gap-8 lg:px-12 lg:py-7">

        {/* ========================================= */}
        {/* IZQUIERDA: INFORMACIÓN DEL PLAN MAESTRO */}
        {/* ========================================= */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex min-w-0 flex-col justify-center"
        >

          {/* Identificación del proyecto */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 border border-[#b8e5d5] bg-[#e9f6ee] px-3 py-2">

            <span className="h-2 w-2 rounded-full bg-[#008F89]" />

            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#087b70]">
              Gestión Integral de Residuos
            </span>

          </div>

          {/* Título */}
          <div className="border-l-[5px] border-[#ed792f] pl-5 sm:pl-7">

            <p className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-[#008F89]">
              PLAN MAESTRO
            </p>

            <h2 className="text-[clamp(2rem,3.8vw,4.6rem)] font-black uppercase leading-[1.06] tracking-[-0.055em] text-[#20343b]">

              PLANTA PILOTO

              <span className="block">
                DE TRATAMIENTO
              </span>

              <span className="block text-[#008F89]">
                RCD
              </span>

              <span className="block">
                EL ALTO
              </span>

            </h2>

          </div>

          {/* Subtítulo */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-7"
          >

            <p className="max-w-[590px] text-[clamp(1rem,1.5vw,1.6rem)] font-medium leading-snug text-[#526774]">
              Criterios técnicos, ambientales y legales para
              la selección del predio.
            </p>

          </motion.div>

          {/* Línea divisoria */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.75 }}
            className="my-7 h-[2px] w-full max-w-[480px] origin-left bg-gradient-to-r from-[#ed792f] via-[#008F89] to-transparent"
          />

          {/* Mensaje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65 }}
          >

            <p className="max-w-[530px] text-[clamp(1.15rem,1.9vw,2rem)] font-medium leading-snug tracking-tight text-[#345363]">

              Transformando el residuo en{" "}

              <span className="font-black text-[#008F89]">
                recurso urbano.
              </span>

            </p>

          </motion.div>

          {/* Pie institucional */}
          <div className="mt-9 flex items-center gap-3 border-t border-[#d8e4df] pt-4">

            <span className="h-2 w-2 rounded-full bg-[#008F89]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#74877e]">
              GAMEA · SMASGAR
            </p>

          </div>

        </motion.div>

        {/* ========================================= */}
        {/* DERECHA: IMAGEN SIN CONTENEDOR */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.15,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-[330px] min-h-0 w-full sm:h-[460px] lg:h-[85%] lg:min-h-[390px]"
        >

          <Image
            src="/planta.jpg"
            alt="Plan Maestro de Planta Piloto de Tratamiento de Residuos de Construcción y Demolición en El Alto"
            fill
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-contain object-center"
            priority
          />

        </motion.div>

      </div>

    </section>
  );
}


// 15ª PANTALLA - ORIGINAL 34
const rcdStages=["Recepción de RCD","Trituración y clasificación","Separación de materiales","Moldeado y prensado","Losetas tipo Doble S"];
export function Slide34(){const [step,setStep]=useState(0);
 return <section className="flex h-full min-h-0 flex-col bg-[#f2f6f7] px-7 py-6 md:px-12 xl:px-16"><Heading tag="Economía circular · Original 34" title="De residuos de construcción" accent="a nuevas oportunidades" subtitle="Recuperación de residuos de construcción y demolición (RCD) para la fabricación de losetas tipo Doble S."/>
 <div className="mt-5 grid min-h-0 flex-1 grid-cols-[61%_39%] gap-4"><Enter delay={.14} className="min-h-0 overflow-hidden rounded-2xl bg-[#e5eff1]"><OrbitStage><Facility kind="rdc"/></OrbitStage></Enter><Enter delay={.25} className="flex min-h-0 flex-col gap-2">{rcdStages.map((name,i)=><button type="button" key={name} onClick={()=>setStep(i)} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${step===i?"border-cyan-500 bg-cyan-50":"border-slate-200 bg-white"}`}><span className="font-black text-cyan-800">0{i+1}</span><span className="text-xs font-bold text-slate-700">{name}</span></button>)}<Panel className="mt-auto"><p className="text-xs text-slate-600">Etapa seleccionada: <strong>{rcdStages[step]}</strong></p></Panel></Enter></div></section>
}

// 16ª PANTALLA - ORIGINAL 35
export function Slide35(){return <section className="flex h-full min-h-0 flex-col bg-[#f1f6f3] px-7 py-6 md:px-12 xl:px-16"><Heading tag="CARSU · Original 35" title="Aprovechamiento de" accent="residuos sólidos urbanos" subtitle="Complejo de Aprovechamiento de Residuos Sólidos Urbanos · Bajo Milluni / Distrito 13"/>
 <div className="mt-5 grid min-h-0 flex-1 grid-cols-[60%_40%] gap-4"><Enter delay={.15} className="min-h-0 rounded-2xl bg-[#e1eddf]"><OrbitStage><Facility kind="compost"/></OrbitStage></Enter><Enter delay={.25} className="flex min-h-0 flex-col gap-3"><Panel><IconInfo icon={Sprout} label="Línea orgánica — compostaje" detail="Transformación aeróbica de residuos vegetales y restos de poda en compost agrícola enriquecido."/></Panel><Panel><IconInfo icon={Recycle} label="Línea inorgánica — clasificación" detail="Segregación semi-mecanizada y prensado de PET, cartón, metales y vidrio."/></Panel><Panel><IconInfo icon={Truck} label="Destino de rechazos" detail="Los residuos no aprovechables se transfieren al Relleno Sanitario de Villa Ingenio."/></Panel></Enter></div></section>}

// 17ª PANTALLA - ORIGINAL 36
export function Slide36(){return <section className="flex h-full min-h-0 flex-col bg-[#f1f6f7] px-7 py-6 md:px-12 xl:px-16"><Heading tag="Gestión de residuos · Original 36" title="Planta de preclasificación" accent="El Ingenio" subtitle="Ubicación: El Ingenio / Distrito 13. Separación previa de materiales orgánicos y secos antes de la disposición final."/>
 <div className="mt-5 grid min-h-0 flex-1 grid-cols-[61%_39%] gap-4"><Enter delay={.15} className="min-h-0 rounded-2xl bg-[#e1ebed]"><OrbitStage><Facility kind="sorting"/></OrbitStage></Enter><Enter delay={.25} className="flex min-h-0 flex-col gap-3"><Panel><p className="text-[10px] font-bold uppercase text-emerald-700">Desvío proyectado de disposición final</p><p className="mt-2 text-[clamp(2rem,3.2vw,4rem)] font-black text-emerald-700">48%–58%</p><p className="mt-1 text-xs leading-5 text-slate-500">Del volumen total de residuos crudos según la proyección del documento.</p></Panel><Panel><IconInfo icon={Droplets} label="Menos lixiviados" detail="Separación de materiales biodegradables antes del confinamiento."/></Panel><Panel><IconInfo icon={Leaf} label="Mitigación de biogás" detail="Menor humedad en las celdas y reducción esperada de emisiones."/></Panel></Enter></div></section>}

// 18ª PANTALLA - ORIGINAL 38
const laws=[
 {title:"Ley Municipal de Economía Circular",priority:"Media",detail:"Objetivos, incentivos y articulación económica para aprovechar residuos de industrias, domicilios e instituciones." ,Icon:Recycle},
 {title:"Reglamento de Compras Públicas Sostenibles",priority:"Media",detail:"Adquisición municipal preferente de productos reciclados cuando sea técnica y económicamente viable.",Icon:ClipboardCheck},
 {title:"Actualización de tasas de aseo",priority:"Alta",detail:"Revisión del costo y subvención del servicio de aseo urbano.",Icon:Scale},
 {title:"Reglamento de Residuos Sólidos",priority:"Alta",detail:"Control y ejecución de multas por infracciones leves, graves y gravísimas.",Icon:FileText},
];
export function Slide38(){return <section className="flex h-full min-h-0 flex-col bg-[#f3f5f8] px-7 py-6 md:px-12 xl:px-16"><Heading tag="Gestión institucional · Original 38" title="Instrumentos operativos" accent="y control normativo" subtitle="Propuestas regulatorias y operativas con prioridades consignadas en el material de origen."/>
 <div className="mt-5 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">{laws.map(({title,priority,detail,Icon},i)=><Enter key={title} delay={.1+i*.1} className="min-h-0"><Panel className="h-full"><div className="flex items-center justify-between gap-2"><Icon size={25} className="text-[#166b83]"/><span className={`rounded-full px-3 py-1 text-[10px] font-black ${priority==="Alta"?"bg-rose-100 text-rose-700":"bg-amber-100 text-amber-800"}`}>Prioridad {priority}</span></div><h3 className="mt-4 text-[clamp(1rem,1.55vw,1.6rem)] font-black leading-tight text-[#173a52]">{title}</h3><p className="mt-2 text-[clamp(.7rem,.9vw,.9rem)] leading-relaxed text-slate-500">{detail}</p></Panel></Enter>)}</div><Enter delay={.6} className="mt-3 shrink-0 rounded-xl bg-[#123f62] px-5 py-3 text-center text-xs font-semibold text-white">El documento señala una subvención del 87% del costo del servicio, Bs 227 millones y 800 toneladas por día. Valores presentados como cifras del documento.</Enter></section>}
