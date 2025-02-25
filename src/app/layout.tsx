import "@/styles/globals.css"

import type { Metadata } from "next"
import { Suspense } from "react"

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
        <Suspense fallback={<div>Loading authentication...</div>}>
          <ClerkProvider>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  )
}
