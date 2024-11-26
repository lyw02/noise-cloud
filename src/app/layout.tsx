import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Container from "@/components/container";
import AuthWrapper from "@/components/auth-wrapper";
import MapAPIWrapper from "@/components/map-api-wrapper";
import QueryClientWrapper from "@/components/query-client-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll`}
      >
        <QueryClientWrapper>
          <MapAPIWrapper>
            <AuthWrapper>
              <Container>
                <Header />
                {children}
              </Container>
            </AuthWrapper>
          </MapAPIWrapper>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
