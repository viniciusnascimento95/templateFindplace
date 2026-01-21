import "@/app/globals.css"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import type React from "react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FindePlace - Encontre o local perfeito para seu evento",
  description: "Plataforma para encontrar locais para eventos corporativos, casamentos, reuniões e treinamentos",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
