"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PalmTree } from "@/components/ui/icons"
import { motion } from "framer-motion"

export function Navbar() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "signup">("login")

  const openLogin = () => {
    setAuthTab("login")
    setShowAuthDialog(true)
  }

  const openSignup = () => {
    setAuthTab("signup")
    setShowAuthDialog(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <PalmTree className="h-6 w-6 text-coral" />
            </motion.div>
            <span className="text-xl font-bold text-teal">Tropical Explorer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-coral">
              Home
            </Link>
            <Link href="/listings" className="font-medium transition-colors hover:text-coral">
              Explore
            </Link>
            <Link href="/destinations" className="font-medium transition-colors hover:text-coral">
              Destinations
            </Link>
            <Link href="/about-us" className="font-medium transition-colors hover:text-coral">
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden md:inline-flex hover:bg-coral/10 hover:text-coral transition-all"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-coral hover:bg-coral/90">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs
            defaultValue={authTab}
            value={authTab}
            onValueChange={(value) => setAuthTab(value as "login" | "signup")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <DialogHeader>
                <DialogTitle>Welcome back!</DialogTitle>
                <DialogDescription>Enter your credentials to access your account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" />
                </div>
                <Link href="#" className="text-sm text-right text-skyBlue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-coral hover:bg-coral/90">
                  Log in
                </Button>
              </DialogFooter>
            </TabsContent>
            <TabsContent value="signup" className="mt-4">
              <DialogHeader>
                <DialogTitle>Create an account</DialogTitle>
                <DialogDescription>Enter your details to create a new account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-coral hover:bg-coral/90">
                  Sign up
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
