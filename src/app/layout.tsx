import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Kanit } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

const kanit = Kanit({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-kanit-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tangka Point of Sale App",
  description: "A comprehensive solution for managing your store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${kanit.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
