"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HeaderCredits() {
  const [credits, setCredits] = useState(25);

  useEffect(() => {
    async function loadCredits() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) return;

      const response = await fetch(
        `/api/credits/${data.session.user.id}`
      );

      const result = await response.json();

      setCredits(result.balance || 25);
    }

    loadCredits();
  }, []);

  return (
    <div className="rounded-full border border-white/10 px-4 py-2">
      {credits} Credits
    </div>
  );
}