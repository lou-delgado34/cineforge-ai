import { supabase } from "@/lib/supabase";

export async function getBrandKits() {
  const { data } = await supabase
    .from("brand_kits")
    .select("*")
    .order("created_at", { ascending: false });

  return data || [];
}

export async function createBrandKit(brandKit: {
  name: string;
  primary_color: string;
  audience: string;
  tone: string;
}) {
  const { data, error } = await supabase
    .from("brand_kits")
    .insert(brandKit)
    .select()
    .single();

  if (error) throw error;

  return data;
}