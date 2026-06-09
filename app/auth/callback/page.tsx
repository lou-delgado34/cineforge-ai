"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finishLogin() {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        await supabase.from("profiles").upsert({
          id: data.session.user.id,
          email: data.session.user.email,
          credits: 100,
        });

        router.push("/dashboard");
        return;
      }

      router.push("/login");
    }

    finishLogin();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <p>Logging you in...</p>
    </main>
  );
}