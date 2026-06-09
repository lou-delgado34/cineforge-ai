import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  return user;
}