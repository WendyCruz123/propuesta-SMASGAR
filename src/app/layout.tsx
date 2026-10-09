
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cumbres Distritales 2026–2030 | SMASGAR",
  description:
    "Presentación institucional interactiva del Gobierno Autónomo Municipal de El Alto, con proyectos de impacto y visualizaciones 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
