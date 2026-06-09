import { supabase } from "@/lib/supabase";

async function getSessionUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

export async function getAssets() {
  const user = await getSessionUser();

  if (!user) return [];

  const { data } = await supabase
    .from("assets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createAsset(asset: {
  title: string;
  type: string;
  url?: string;
  file_path?: string;
}) {
  const user = await getSessionUser();

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("assets")
    .insert({
      ...asset,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteAsset(id: string) {
  const user = await getSessionUser();

  if (!user) throw new Error("User not logged in");

  const { error } = await supabase
    .from("assets")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
}