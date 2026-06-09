import { supabase } from "@/lib/supabase";

export async function getAvatars() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("avatars")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createAvatar(avatar: {
  name: string;
  style: string;
  language: string;
  status?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("avatars")
    .insert({
      ...avatar,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}