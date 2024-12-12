import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";

const poppins = localFont({
  src: "../fonts/Poppins-normal.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: "Morocco Grove Naturals",
  description: "From the heart of Morocco to the soul of your beauty.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Header />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#000000", color: "#FFFFFF" },
            }}
          />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
