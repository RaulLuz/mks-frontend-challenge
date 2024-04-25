import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Providers from "./providers";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata: Metadata = {
  title: "MKS Sistemas",
  description: "MKS Frontend Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
