import { supabase } from "@/lib/supabase";

export async function getScripts() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("scripts")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createScript(script: {
  title: string;
  topic: string;
  audience: string;
  tone: string;
  script: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("scripts")
    .insert({
      ...script,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}