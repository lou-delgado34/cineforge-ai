"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={logout}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
    >
      Logout
    </button>
  );
}