import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Situación Límite",
  description: "El juego de los dilemas extremos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
