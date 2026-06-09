"use client";

import { useEffect, useState } from "react";
import { getDevUser, setDevUser, clearDevUser } from "@/lib/dev-auth";

export default function AuthTestPage() {
  const [message, setMessage] = useState("Checking user...");

  function refresh() {
    const user = getDevUser();
    setMessage(user ? `Logged in as: ${user}` : "No user is logged in.");
  }

  function forceLogin() {
    setDevUser("test@cineforge.ai");
    refresh();
  }

  function logout() {
    clearDevUser();
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl font-bold">Auth Test</h1>
        <p className="mt-4 text-white/60">{message}</p>

        <button
          onClick={forceLogin}
          className="mt-6 rounded-xl bg-white px-4 py-3 font-medium text-black"
        >
          Force Test Login
        </button>

        <button
          onClick={logout}
          className="ml-3 rounded-xl border border-white/10 px-4 py-3 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}