"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import QRCode from "qrcode";

const URL_QR = "https://elaltolimpio.elalto.gob.bo/";
const FONDO = "#f6f1e7";

type Vector = [number, number, number];

type Bloque = {
  posicion: Vector;
  escala: Vector;
  color: string;
};

type Movimiento = {
  progreso: number;
};

type Props = {
  height?: number | string;
  className?: string;
};

function random(seed: number) {
  const valor =
    Math.sin(seed * 127.1 + 311.7) * 43758.5453123;

  return valor - Math.floor(valor);
}

function suavizar(valor: number) {
  const t = THREE.MathUtils.clamp(valor, 0, 1);
  return t * t * (3 - 2 * t);
}

/* ---------------- BLOQUES INSTANCIADOS ---------------- */

function Bloques({
  datos,
  movimiento,
  ocultarArriba = false,
  sombrearCaras = false,
}: {
  datos: Bloque[];
  movimiento: Movimiento;
  ocultarArriba?: boolean;
  sombrearCaras?: boolean;
}) {
  const malla = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  const auxiliar = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useLayoutEffect(() => {
    if (!malla.current) return;

    for (let i = 0; i < datos.length; i++) {
      const bloque = datos[i];

      auxiliar.position.set(...bloque.posicion);
      auxiliar.rotation.set(0, 0, 0);
      auxiliar.scale.set(...bloque.escala);
      auxiliar.updateMatrix();

      malla.current.setMatrixAt(i, auxiliar.matrix);

      color.set(bloque.color);
      malla.current.setColorAt(i, color);
    }

    malla.current.instanceMatrix.needsUpdate = true;

    if (malla.current.instanceColor) {
      malla.current.instanceColor.needsUpdate = true;
    }
  }, [datos, auxiliar, color]);

  useFrame(() => {
    if (!malla.current || !material.current) return;

    const opacidad = ocultarArriba
      ? 1 - suavizar((movimiento.progreso - 0.42) / 0.45)
      : 1;

    material.current.opacity = opacidad;
    malla.current.visible = opacidad > 0.001;
  });

  function colorearCaras(geometria: THREE.BoxGeometry) {
    if (!sombrearCaras) return;

    const normales = geometria.getAttribute("normal");
    const colores = new Float32Array(normales.count * 3);

    // Laterales claros: aspecto de follaje verde.
    // Cara superior oscura: contraste para escanear el QR.
    const superior = new THREE.Color("#61763c");
    const inferior = new THREE.Color("#80935a");
    const lateralClaro = new THREE.Color("#ffffff");
    const lateralOscuro = new THREE.Color("#c5d59b");

    for (let i = 0; i < normales.count; i++) {
      const y = normales.getY(i);
      const x = normales.getX(i);

      const tono =
        y > 0.5
          ? superior
          : y < -0.5
            ? inferior
            : x > 0.5
              ? lateralOscuro
              : lateralClaro;

      colores[i * 3] = tono.r;
      colores[i * 3 + 1] = tono.g;
      colores[i * 3 + 2] = tono.b;
    }

    geometria.setAttribute(
      "color",
      new THREE.BufferAttribute(colores, 3),
    );
  }

  return (
    <instancedMesh
      ref={malla}
      args={[undefined, undefined, datos.length]}
      frustumCulled={false}
    >
      <boxGeometry
        args={[1, 1, 1]}
        onUpdate={colorearCaras}
      />

      <meshBasicMaterial
        ref={material}
        vertexColors={sombrearCaras}
        transparent={ocultarArriba}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ---------------- MARIPOSAS DE BLOQUES ---------------- */

function Mariposa({
  indice,
  movimiento,
  reducirMovimiento,
  margenQR,
}: {
  indice: number;
  movimiento: Movimiento;
  reducirMovimiento: boolean;
  margenQR: number;
}) {
  const grupo = useRef<THREE.Group>(null);
  const izquierda = useRef<THREE.Group>(null);
  const derecha = useRef<THREE.Group>(null);

  const tiempo = useRef(indice * 1.7);

  const destino = useMemo(() => new THREE.Vector3(), []);

  const colores = [
    "#86d9ee",
    "#efca5c",
    "#b9a5e9",
    "#9bdde1",
    "#f0b77f",
    "#8ec8ed",
  ];

  const color = colores[indice % colores.length];

  useFrame((_, delta) => {
    if (!grupo.current) return;

    if (!reducirMovimiento) {
      tiempo.current += Math.min(delta, 0.05);
    }

    const tiempoActual = tiempo.current;
    const t = movimiento.progreso;

    const angulo =
      tiempoActual * (0.22 + indice * 0.012) +
      indice * 1.8;

    const coseno = Math.cos(angulo);
    const seno = Math.sin(angulo);

    const radioArbol =
      3.3 + Math.sin(tiempoActual * 0.6 + indice) * 0.25;

    // Órbita fuera del cuadrado del QR y de su margen libre.
    const radioQR =
      (margenQR + 0.5) /
      Math.max(Math.abs(coseno), Math.abs(seno));

    const radio = THREE.MathUtils.lerp(
      radioArbol,
      radioQR,
      t,
    );

    destino.set(
      coseno * radio,

      THREE.MathUtils.lerp(
        -0.1 +
          Math.sin(tiempoActual * 0.8 + indice) * 1.3,
        1.2 + Math.sin(tiempoActual + indice) * 0.25,
        t,
      ),

      seno * radio,
    );

    const factor = reducirMovimiento
      ? 1
      : 1 - Math.exp(-delta * 4);

    grupo.current.position.lerp(destino, factor);
    grupo.current.rotation.y = -angulo;

    const aleteo = reducirMovimiento
      ? 0.3
      : Math.sin(tiempoActual * 15 + indice) * 0.85;

    if (izquierda.current) {
      izquierda.current.rotation.z = aleteo;
    }

    if (derecha.current) {
      derecha.current.rotation.z = -aleteo;
    }
  });

  return (
    <group
      ref={grupo}
      scale={0.7}
      position={[
        Math.cos(indice * 1.8) * 3.3,
        0,
        Math.sin(indice * 1.8) * 3.3,
      ]}
    >
      {/* Cuerpo */}
      <mesh>
        <boxGeometry args={[0.035, 0.035, 0.24]} />
        <meshBasicMaterial color="#68503a" />
      </mesh>

      {/* Ala derecha */}
      <group ref={derecha}>
        <mesh position={[0.12, 0, -0.04]}>
          <boxGeometry args={[0.22, 0.018, 0.21]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0.09, 0, 0.12]}>
          <boxGeometry args={[0.16, 0.018, 0.12]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0.16, 0.012, -0.04]}>
          <boxGeometry args={[0.045, 0.01, 0.055]} />
          <meshBasicMaterial color="#fff8dc" />
        </mesh>
      </group>

      {/* Ala izquierda */}
      <group ref={izquierda}>
        <mesh position={[-0.12, 0, -0.04]}>
          <boxGeometry args={[0.22, 0.018, 0.21]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[-0.09, 0, 0.12]}>
          <boxGeometry args={[0.16, 0.018, 0.12]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[-0.16, 0.012, -0.04]}>
          <boxGeometry args={[0.045, 0.01, 0.055]} />
          <meshBasicMaterial color="#fff8dc" />
        </mesh>
      </group>
    </group>
  );
}

/* ---------------- CONSTRUCCIÓN DEL ÁRBOL ---------------- */

function construirArbol() {
  const qr = QRCode.create(URL_QR, {
    errorCorrectionLevel: "M",
  });

  const modulo = 0.155;
  const subdivisiones = 3;
  const voxel = modulo / subdivisiones;

  const margen = 4;
  const anchoQR = qr.modules.size * modulo;
  const anchoConMargen =
    (qr.modules.size + margen * 2) * modulo;

  const copa: Bloque[] = [];
  const madera: Bloque[] = [];
  const suelo: Bloque[] = [];
  const cesped: Bloque[] = [];

  const centros: THREE.Vector3[] = [];

  const verdes = [
    "#95ce51",
    "#a5d961",
    "#b1de70",
    "#8ac34a",
    "#9bd357",
    "#b5df76",
  ];

  const marrones = [
    "#79513a",
    "#8a6041",
    "#6e4934",
    "#966b47",
  ];

  // Follaje: cada módulo oscuro del QR contiene 3 × 3 cubitos.
  // Las alturas crean una copa alta e irregular.
  for (let fila = 0; fila < qr.modules.size; fila++) {
    for (
      let columna = 0;
      columna < qr.modules.size;
      columna++
    ) {
      if (!qr.modules.get(fila, columna)) continue;

      const centroX =
        (columna + 0.5 - qr.modules.size / 2) * modulo;

      const centroZ =
        (fila + 0.5 - qr.modules.size / 2) * modulo;

      const distancia =
        Math.sqrt(
          centroX * centroX +
          centroZ * centroZ,
        ) /
        (anchoQR * 0.69);

      const alturaPrincipal =
        -0.55 +
        3.75 *
          Math.sqrt(
            Math.max(0, 1 - distancia * distancia),
          );

      centros.push(
        new THREE.Vector3(
          centroX,
          alturaPrincipal,
          centroZ,
        ),
      );

      for (let subZ = 0; subZ < subdivisiones; subZ++) {
        for (let subX = 0; subX < subdivisiones; subX++) {
          const semilla =
            fila * 10000 +
            columna * 100 +
            subZ * 10 +
            subX;

          const x =
            (columna - qr.modules.size / 2) * modulo +
            (subX + 0.5) * voxel;

          const z =
            (fila - qr.modules.size / 2) * modulo +
            (subZ + 0.5) * voxel;

          // Alturas escalonadas para dar aspecto de bloques.
          const altura =
            Math.round(
              (
                alturaPrincipal +
                (random(semilla + 10) - 0.5) * 0.48
              ) / voxel,
            ) * voxel;

          const altoBloque =
            voxel *
            (2 + Math.floor(random(semilla + 20) * 3));

          const color =
            verdes[
              Math.floor(
                random(semilla + 30) * verdes.length,
              )
            ];

          copa.push({
            posicion: [
              x,
              altura - altoBloque / 2,
              z,
            ],
            escala: [
              voxel * 1.003,
              altoBloque,
              voxel * 1.003,
            ],
            color,
          });

          // Segunda capa de follaje debajo.
          // Conserva exactamente la misma huella vista desde arriba.
          if (random(semilla + 40) > 0.28) {
            copa.push({
              posicion: [
                x,
                altura - altoBloque - voxel * 1.5,
                z,
              ],
              escala: [
                voxel * 1.003,
                voxel * 3,
                voxel * 1.003,
              ],
              color:
                verdes[
                  Math.floor(
                    random(semilla + 50) * verdes.length,
                  )
                ],
            });
          }
        }
      }
    }
  }

  // Tronco de bloques.
  for (let i = 0; i < 35; i++) {
    const y = -2.55 + i * 0.12;
    const ancho = 0.23 - (i / 35) * 0.1;

    madera.push({
      posicion: [
        Math.round(Math.sin(i * 0.11) * 0.4) * 0.04,
        y,
        0,
      ],
      escala: [ancho, 0.125, ancho],
      color: marrones[i % marrones.length],
    });
  }

  // Ramas hechas de cubitos escalonados.
  for (let i = 0; i < 28; i++) {
    const indice = Math.floor(
      random(i + 5000) * centros.length,
    );

    const final = centros[indice].clone();
    final.y -= 0.22;

    const inicio = new THREE.Vector3(
      0,
      -1.1 + random(i + 5100) * 2,
      0,
    );

    const longitud = inicio.distanceTo(final);
    const pasos = Math.max(2, Math.ceil(longitud / 0.09));

    for (let paso = 0; paso <= pasos; paso++) {
      const punto = inicio
        .clone()
        .lerp(final, paso / pasos);

      const grosor =
        0.11 * (1 - paso / pasos * 0.5);

      madera.push({
        posicion: [
          Math.round(punto.x / 0.055) * 0.055,
          Math.round(punto.y / 0.055) * 0.055,
          Math.round(punto.z / 0.055) * 0.055,
        ],
        escala: [grosor, grosor, grosor],
        color:
          marrones[
            Math.floor(
              random(i * 100 + paso) * marrones.length,
            )
          ],
      });
    }
  }

  // Plataforma principal.
  suelo.push({
    posicion: [0, -2.73, 0],
    escala: [6.4, 0.18, 6.4],
    color: "#c8c5b9",
  });

  const baldosas = [
    "#e8e5d8",
    "#dcd9cc",
    "#f0eddf",
    "#d3d0c3",
  ];

  // Baldosas como en la referencia.
  const cantidadBaldosas = 24;
  const tamanoBaldosa = 6.2 / cantidadBaldosas;

  for (let fila = 0; fila < cantidadBaldosas; fila++) {
    for (
      let columna = 0;
      columna < cantidadBaldosas;
      columna++
    ) {
      suelo.push({
        posicion: [
          (columna + 0.5 - cantidadBaldosas / 2) *
            tamanoBaldosa,

          -2.625,

          (fila + 0.5 - cantidadBaldosas / 2) *
            tamanoBaldosa,
        ],

        escala: [
          tamanoBaldosa * 0.99,
          0.035,
          tamanoBaldosa * 0.99,
        ],

        color:
          baldosas[
            Math.floor(
              random(fila * 100 + columna + 7000) *
                baldosas.length,
            )
          ],
      });
    }
  }

  // Césped de bloques delgados en los cuatro bordes.
  for (let i = 0; i < 950; i++) {
    const lado = i % 4;
    const distancia = (random(i + 8000) - 0.5) * 6.1;
    const borde = 2.78 + random(i + 8100) * 0.28;

    const altura = 0.12 + random(i + 8200) * 0.29;

    cesped.push({
      posicion: [
        lado < 2
          ? distancia
          : lado === 2
            ? -borde
            : borde,

        -2.6 + altura / 2,

        lado >= 2
          ? distancia
          : lado === 0
            ? -borde
            : borde,
      ],

      escala: [
        0.025 + random(i + 8300) * 0.018,
        altura,
        0.025 + random(i + 8400) * 0.018,
      ],

      color:
        i % 3 === 0
          ? "#9ac747"
          : i % 3 === 1
            ? "#6aac2d"
            : "#439020",
    });
  }

  return {
    copa,
    madera,
    suelo,
    cesped,
    anchoConMargen,
  };
}

/* ---------------- CÁMARA Y ESCENA ---------------- */

function Escena({
  vistaQR,
  reducirMovimiento,
}: {
  vistaQR: boolean;
  reducirMovimiento: boolean;
}) {
  const datos = useMemo(() => construirArbol(), []);

  const movimiento = useMemo<Movimiento>(
    () => ({ progreso: 0 }),
    [],
  );

  const avance = useRef(0);
  const tiempo = useRef(0);

  const fondoQR = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    if (!reducirMovimiento) {
      tiempo.current += dt;
    }

    if (reducirMovimiento) {
      avance.current = vistaQR ? 1 : 0;
    } else {
      const paso = dt / 2.3;

      avance.current = vistaQR
        ? Math.min(1, avance.current + paso)
        : Math.max(0, avance.current - paso);
    }

    const t = suavizar(avance.current);
    movimiento.progreso = t;

    // Recorrido desde la vista lateral hasta la vista cenital.
    const polarInicial = Math.PI * 0.31;
    const polar = polarInicial * (1 - t);

    const azimut =
      Math.PI / 4 +
      (
        reducirMovimiento
          ? 0
          : Math.sin(tiempo.current * 0.16) * 0.025
      ) * (1 - t);

    const distancia = 14;

    state.camera.position.set(
      Math.sin(polar) * Math.cos(azimut) * distancia,

      0.35 + Math.cos(polar) * distancia,

      Math.sin(polar) * Math.sin(azimut) * distancia,
    );

    // Arriba del QR corresponde a la dirección -Z.
    state.camera.up.set(0, 1 - t, -t).normalize();
    state.camera.lookAt(0, 0.35, 0);

    if (state.camera instanceof THREE.OrthographicCamera) {
      const aspecto =
        state.size.width / Math.max(state.size.height, 1);

      const altoDeseado = THREE.MathUtils.lerp(
        9.4,
        8.1,
        t,
      );

      const anchoMinimo = THREE.MathUtils.lerp(
        9,
        Math.max(7.5, datos.anchoConMargen + 0.8),
        t,
      );

      const altoVisible = Math.max(
        altoDeseado,
        anchoMinimo / aspecto,
      );

      state.camera.left = -(altoVisible * aspecto) / 2;
      state.camera.right = (altoVisible * aspecto) / 2;
      state.camera.top = altoVisible / 2;
      state.camera.bottom = -altoVisible / 2;
      state.camera.zoom = 1;

      state.camera.updateProjectionMatrix();
    }

    if (fondoQR.current) {
      fondoQR.current.opacity = suavizar(
        (t - 0.4) / 0.6,
      );
    }
  });

  return (
    <>
      <color attach="background" args={[FONDO]} />

      {/* La copa siempre conserva sus bloques */}
      <Bloques
        datos={datos.copa}
        movimiento={movimiento}
        sombrearCaras
      />

      <Bloques
        datos={datos.madera}
        movimiento={movimiento}
        ocultarArriba
      />

      <Bloques
        datos={datos.suelo}
        movimiento={movimiento}
        ocultarArriba
      />

      <Bloques
        datos={datos.cesped}
        movimiento={movimiento}
        ocultarArriba
      />

      {/* Fondo uniforme bajo la copa para leer el QR */}
      <mesh
        position={[0, -2.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[
            datos.anchoConMargen,
            datos.anchoConMargen,
          ]}
        />

        <meshBasicMaterial
          ref={fondoQR}
          color={FONDO}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {Array.from({ length: 8 }, (_, indice) => (
        <Mariposa
          key={indice}
          indice={indice}
          movimiento={movimiento}
          reducirMovimiento={reducirMovimiento}
          margenQR={datos.anchoConMargen / 2}
        />
      ))}
    </>
  );
}

/* ---------------- COMPONENTE PRINCIPAL ---------------- */

export default function ArbolQR({
  height = "100svh",
  className = "",
}: Props) {
  const [vistaQR, setVistaQR] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] =
    useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function actualizar() {
      setReducirMovimiento(consulta.matches);
    }

    actualizar();
    consulta.addEventListener("change", actualizar);

    return () => {
      consulta.removeEventListener("change", actualizar);
    };
  }, []);

  return (
    <button
      type="button"
      className={className}
      aria-label={
        vistaQR
          ? "Volver a la vista del árbol"
          : "Ver el QR desde arriba del árbol"
      }
      aria-pressed={vistaQR}
      onClick={() => setVistaQR((anterior) => !anterior)}
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        height,
        minHeight: 0,
        padding: 0,
        margin: 0,
        border: 0,
        overflow: "hidden",
        background: FONDO,
        cursor: "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <Canvas
        orthographic
        dpr={[1, 1.75]}
        camera={{
          position: [8, 8, 8],
          zoom: 1,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        fallback={
          <span>
            Tu navegador no pudo cargar la escena 3D.
          </span>
        }
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Escena
          vistaQR={vistaQR}
          reducirMovimiento={reducirMovimiento}
        />
      </Canvas>
    </button>
  );
}