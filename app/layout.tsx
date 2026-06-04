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
    var stored = localStorage.getItem('uthm-theme');
    var legacy = localStorage.getItem('sd-theme');
    if (!stored && legacy) { stored = legacy; try { localStorage.setItem('uthm-theme', legacy); } catch(e){} }
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
  metadataBase: new URL("https://uthmforge.uthm.edu.my"),
  title: {
    default: "UTHM Forge — The forge for UTHM's future builders",
    template: "%s · UTHM Forge",
  },
  description:
    "UTHM Forge is a student and staff community for builders at Universiti Tun Hussein Onn Malaysia. Ship open source, earn bounties, find collaborators, and run events — all from Parit Raja.",
  applicationName: "UTHM Forge",
  generator: "Next.js",
  keywords: [
    "uthm",
    "uthm forge",
    "uthm developers",
    "universiti tun hussein onn malaysia",
    "parit raja",
    "batu pahat",
    "johor",
    "uthm students",
    "fsktm",
    "fkmp",
    "fke",
    "bounty board",
    "townhall",
    "guild",
    "campus map",
    "open source",
  ],
  authors: [{ name: "UTHM Forge" }],
  creator: "UTHM Forge",
  publisher: "UTHM Forge",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/uthmforge-192.png",
    apple: "/icons/uthmforge-192.png",
  },
  openGraph: {
    type: "website",
    siteName: "UTHM Forge",
    title: "UTHM Forge",
    description: "The forge for UTHM's future builders",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTHM Forge",
    description: "The forge for UTHM's future builders",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0306" },
    { media: "(prefers-color-scheme: light)", color: "#FBF6EC" },
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
