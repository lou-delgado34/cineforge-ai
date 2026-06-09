import { supabase } from "@/lib/supabase";

export async function getProjects() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createProject(project: {
  title: string;
  type: string;
  prompt?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...project,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}