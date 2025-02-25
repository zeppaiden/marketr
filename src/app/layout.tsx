import "@/styles/globals.css"

import type { Metadata } from "next"
import React from "react"
import { env } from "@/env"

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Marketr",
  description: "Marketr",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <React.Suspense fallback={<div>Loading authentication...</div>}>
          <ClerkProvider
            signInForceRedirectUrl={env.CLERK_SIGN_IN_FORCE_REDIRECT_URL}
            signUpForceRedirectUrl={env.CLERK_SIGN_UP_FORCE_REDIRECT_URL}
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </ClerkProvider>
        </React.Suspense>
      </body>
    </html>
  )
}
