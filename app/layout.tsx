import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Music Player - Danz-dev",
  description: "A music player developed by Danz-dev",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  )
}



import './globals.css'