import { supabase } from "@/lib/supabase";

export async function getVoices() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("voices")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createVoice(voice: {
  title: string;
  script: string;
  voice_style: string;
  status?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("voices")
    .insert({
      ...voice,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}