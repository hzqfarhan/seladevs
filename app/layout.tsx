import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, VT323 } from "next/font/google";
import { InstallPrompt } from "@/components/ui/InstallPrompt";
import { ServiceWorkerRegister } from "@/components/ui/ServiceWorkerRegister";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sd-sans",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sd-mono",
  display: "swap",
});

const pixel = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sd-pixel",
  display: "swap",
});

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('sd-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersLight ? 'light' : 'dark');
    var html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
    html.dataset.theme = theme;
    html.style.colorScheme = theme;
  } catch(e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://seladevs.com"),
  title: {
    default: "SelaDevs — The forge for Malaysia's future builders",
    template: "%s · SelaDevs",
  },
  description:
    "A forge for high-performance builders. We are raising the next generation of technical excellence in Southeast Asia.",
  applicationName: "SelaDevs",
  generator: "Next.js",
  keywords: [
    "seladevs",
    "malaysia developers",
    "southeast asia",
    "sd jobs",
    "bounty board",
    "townhall",
    "guild",
    "community map",
    "devsecops",
    "full stack",
  ],
  authors: [{ name: "SelaDevs" }],
  creator: "SelaDevs",
  publisher: "SelaDevs",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/seladevs-192.png",
    apple: "/icons/seladevs-192.png",
  },
  openGraph: {
    type: "website",
    siteName: "SelaDevs",
    title: "SelaDevs",
    description: "The forge for Malaysia's future builders",
  },
  twitter: {
    card: "summary_large_image",
    title: "SelaDevs",
    description: "The forge for Malaysia's future builders",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0306" },
    { media: "(prefers-color-scheme: light)", color: "#FFF6F8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbMono.variable} ${pixel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh antialiased bg-sd-bg-0 text-sd-ink-soft">
        {children}
        <InstallPrompt />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
