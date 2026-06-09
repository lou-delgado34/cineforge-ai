"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function UserMenu() {
  const [email, setEmail] = useState("User");

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await supabase.auth.getSession();
        setEmail(data.session?.user.email || "User");
      } catch {
        setEmail("User");
      }
    }

    loadUser();
  }, []);

  return (
    <div className="hidden items-center gap-3 md:flex">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
        {email.charAt(0).toUpperCase()}
      </div>

      <div>
        <p className="max-w-40 truncate text-sm font-medium">{email}</p>
        <p className="text-xs text-white/50">Free Plan</p>
      </div>
    </div>
  );
}