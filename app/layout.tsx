import { Navbar } from "@/components/Organisms/Navbar";
import { Footer } from "@/components/Organisms/Footer";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unscripted Fiasco",
  description: "Just another blog about tech and stuff, but with a twist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const svgBackgroundCss = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.87"><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.091" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence><feSpecularLighting surfaceScale="24" specularConstant="0.2" specularExponent="20" lighting-color="%23ffffff" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting"><feDistantLight azimuth="3" elevation="100"></feDistantLight></feSpecularLighting></filter></defs><rect width="700" height="700" fill="%23000000ff"></rect><rect width="700" height="700" fill="%23ffffff" filter="url(%23nnnoise-filter)"></rect></svg>')`;

  const bodyStyles = {
    backgroundImage: svgBackgroundCss,
    backgroundSize: "cover",
    backgroundAttachment: "fixed", // Mantener el fondo estático
  };

  const contentContainerStyles = {
    backgroundColor: "transparent",
    position: "relative" as const,
    zIndex: 1,
  };

  return (
    <html lang="en" className="bg-[#000000ff] text-white" style={bodyStyles}>
      
      <body className={inter.className}>
        <Navbar />
        <div style={contentContainerStyles}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
