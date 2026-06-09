"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
        />

        <button
          onClick={login}
          className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
        >
          Login
        </button>

        {message && <p className="mt-4 text-sm text-red-400">{message}</p>}

        <Link href="/forgot-password" className="mt-4 block text-sm text-white">
          Forgot password?
        </Link>

        <p className="mt-6 text-sm text-white/50">
          No account?{" "}
          <Link href="/signup" className="text-white">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}