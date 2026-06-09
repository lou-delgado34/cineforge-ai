"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendResetEmail() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3002/reset-password",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-bold">Reset Password</h1>

        <input
          type="email"
          placeholder="Your account email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-black px-4 py-3"
        />

        <button
          onClick={sendResetEmail}
          className="mt-4 w-full rounded-xl bg-white px-4 py-3 font-medium text-black"
        >
          Send Reset Link
        </button>

        {message && <p className="mt-4 text-sm text-white/60">{message}</p>}

        <Link href="/login" className="mt-6 block text-sm text-white/60">
          Back to login
        </Link>
      </div>
    </main>
  );
}