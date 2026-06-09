import { supabase } from "@/lib/supabase";

export async function getLipSyncJobs() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data } = await supabase
    .from("lip_sync_jobs")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createLipSyncJob(job: {
  title: string;
  avatar_name: string;
  script: string;
  voice_style: string;
  status?: string;
}) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("lip_sync_jobs")
    .insert({
      ...job,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}