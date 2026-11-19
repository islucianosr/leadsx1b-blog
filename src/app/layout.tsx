import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BLOG_URL || "https://www.leads1xb.pro"),
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
