import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_CONFIG } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.blogDomain),
  title: "Leadsx1B Insights",
  description: "Bilingual blog with insights on B2B lead generation and sales.",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body>{children}</body>
    </html>
  )
}
