"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { UserMenu } from "./user-menu";
import { LogoutButton } from "./logout-button";
import { getCredits } from "@/lib/credit-store";

export function AppHeader() {
  const [credits, setCredits] = useState(100);

  useEffect(() => {
    setCredits(getCredits());
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-neutral-950 px-6 text-white">
      <Link href="/" className="flex items-center gap-2 font-bold">
        <Sparkles className="h-5 w-5" />
        CineForge AI
      </Link>

      <div className="hidden text-sm text-white/50 md:block">
        AI Video Workspace
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/credits"
          className="rounded-full border border-white/10 px-4 py-2 text-sm"
        >
          {credits} Credits
        </Link>

        <Link
          href="/create"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Create
        </Link>

        <UserMenu />

        <LogoutButton />
      </div>
    </header>
  );
}