import type { Metadata } from "next";
import "./globals.css";
// Fonts loaded via @import in globals.css (Fraunces + Cabinet Grotesk)
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Portrait & Event Photographer - Distinctshoot",
  description: "Capturing stories with intention. Portrait and editorial photography by Distinct Shoot.",
  keywords: ["photography", "portrait", "editorial", "Lagos", "Nigeria"],
  openGraph: {
    title: "Distinct Shoot",
    description: "Capturing stories with intention.",
    type: "website",
  },
  icons: {
    icon: "/distinctLogo.png",
    apple: "/distinctLogo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
