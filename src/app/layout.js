import "./globals.css";
import {
  Inter,
  Playfair_Display,
  Cookie,
  Dancing_Script,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-elegant",
});
const coockie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-coockie",
});

export const metadata = {
  title: "Cami - Mis Quince Años",
  description: "Una celebración única - 15 años de Cami",

  // Meta tags para redes sociales
  openGraph: {
    title: "Cami - Mis Quince Años",
    description: "Una celebración única - 15 años de Cami",
    url: "https://tu-dominio.vercel.app", // Cambia por tu URL
    siteName: "Quinceañera de Cami",
    images: [
      {
        url: "/favicon.ico", // o el path de tu favicon
        width: 32,
        height: 32,
        alt: "Cami - Mis Quince Años",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary",
    title: "Cami - Mis Quince Años",
    description: "Una celebración única - 15 años de Cami",
    images: ["/favicon.ico"], // o el path de tu favicon
  },

  // Meta tags adicionales
  robots: {
    index: true,
    follow: true,
  },

  // Favicons y iconos
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dancing.variable} ${coockie.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Meta tags adicionales para mejor SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="author" content="Cami" />
        <meta
          name="keywords"
          content="quinceañera, cami, 15 años, celebración, fiesta"
        />

        {/* Preload de recursos importantes */}
        <link rel="preload" href="/favicon.ico" as="image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
