import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "keshav's network",
  description: "A showcase of my web projects, experiments, and creative endeavors.",
  keywords: ["web development", "projects", "experiments", "portfolio", "keshav"],
  authors: [{ name: "Keshav" }],
  openGraph: {
    title: "keshav's network",
    description: "A showcase of my web projects, experiments, and creative endeavors.",
    url: "https://keshav.social/",
    type: "website",
    images: [
      {
        url: "/public/images/keshav-network-banner.png",
        width: 1200,
        height: 630,
        alt: "Keshav Network Banner",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
