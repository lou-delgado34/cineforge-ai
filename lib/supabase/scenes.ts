import { supabase } from "@/lib/supabase";

export async function getScenes() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("scenes")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createScene(scene: {
  title: string;
  description: string;
  camera_move: string;
  duration: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("scenes")
    .insert({
      ...scene,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}