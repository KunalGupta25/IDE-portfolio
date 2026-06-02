import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TabsProvider } from "@/contexts/TabsContext";
import { IDELayout } from "@/components/IDE/IDELayout";
import ParticlesBackground from "@/components/Background/ParticlesBackground";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import CelestialObjectWrapper from "@/components/CelestialObjectWrapper";
import DatadogInit from "@/components/datadog/datadog-init";
import { getProfile, getSiteConfig } from "@/lib/content-fetchers";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - IDE Style",
  description: "A developer portfolio styled like a modern IDE",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  const githubBranch = await getSiteConfig("githubBranch");
  const wakatimeBadgeUrl = await getSiteConfig("wakatimeBadgeUrl");
  const siteTitle = await getSiteConfig("siteTitle");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.className} text-sm antialiased`}
      >
        <DatadogInit />
        <ParticlesBackground />
        <CelestialObjectWrapper />
        <ClerkProvider>
          <TabsProvider>
            <IDELayout 
              footerConfig={{
                githubBranch,
                salesforceUrl: profile.salesforceUrl,
                linkedinUrl: profile.linkedinUrl,
                wakatimeBadgeUrl,
                githubUrl: profile.githubUrl,
              }}
              siteTitle={siteTitle}
            >
              {children}
              <SpeedInsights />
              <Analytics />
              <Toaster richColors position="top-right" />
            </IDELayout>
          </TabsProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
