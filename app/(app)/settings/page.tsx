"use client";

import { useEffect, useState } from "react";
import { getDevUser } from "@/lib/dev-auth";

export default function SettingsPage() {
  const [email, setEmail] = useState("User");
  const [workspace, setWorkspace] = useState("My AI Studio");

  useEffect(() => {
    const user = getDevUser();

    if (user) {
      setEmail(user);
    }

    const savedWorkspace = localStorage.getItem("cineforge_workspace");

    if (savedWorkspace) {
      setWorkspace(savedWorkspace);
    }
  }, []);

  function saveSettings() {
    localStorage.setItem("cineforge_workspace", workspace);
    alert("Settings saved.");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-white/60">Manage your workspace.</p>

      <div className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <label className="text-sm text-white/60">Account Email</label>
        <input
          value={email}
          disabled
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white/50 outline-none"
        />

        <label className="mt-6 block text-sm text-white/60">
          Workspace Name
        </label>
        <input
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
        />

        <button
          onClick={saveSettings}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          Save Settings
        </button>
      </div>
    </main>
  );
}