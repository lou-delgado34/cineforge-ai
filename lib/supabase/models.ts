import { supabase } from "@/lib/supabase";

export async function getModels() {
  const { data } = await supabase
    .from("models")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createModel(model: {
  name: string;
  provider: string;
  category: string;
}) {
  const { data, error } = await supabase
    .from("models")
    .insert(model)
    .select()
    .single();

  if (error) throw error;

  return data;
}