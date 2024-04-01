import type { Metadata } from "next";
import styles from "./Home.module.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "NeighborhoodPins",
  description: "For a safer neighborhood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' /></head>
      <body className={styles.html}><Navbar/>{children}</body>
    </html>
  );
}
