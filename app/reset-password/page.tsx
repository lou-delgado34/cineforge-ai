"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function updatePassword() {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated. Redirecting to login...");
    setTimeout(() => router.push("/login"), 1000);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-bold">Create New Password</h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
        />

        <button
          onClick={updatePassword}
          className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
        >
          Update Password
        </button>

        {message && <p className="mt-4 text-sm text-white/60">{message}</p>}
      </div>
    </main>
  );
}