"use client"

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="p-4 border-b">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-bold">SAMI</h1>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <p>Hi, {session.user?.name}</p>
              <Button onClick={() => signOut()}>Log Out</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => signIn()}>
                Log In
              </Button>
              <Button onClick={() => signIn()}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

