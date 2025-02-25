import "@/styles/globals.css"

import type { Metadata } from "next"
import * as React from "react"
import { env } from "@/env"

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs"
import { Sidebar } from "@/components/sidebar/sidebar"

export const metadata: Metadata = {
  title: "Contently",
  description: "AI Content Strategist",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <React.Suspense fallback={<div>Loading authentication...</div>}>
          <ClerkProvider
            signInForceRedirectUrl={env.CLERK_SIGN_IN_FORCE_REDIRECT_URL}
            signUpForceRedirectUrl={env.CLERK_SIGN_UP_FORCE_REDIRECT_URL}
          >
            <SignedOut>
              <div className="flex h-screen items-center justify-center">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto p-6">
                  {children}
                </main>
              </div>
            </SignedIn>
          </ClerkProvider>
        </React.Suspense>
      </body>
    </html>
  )
}
