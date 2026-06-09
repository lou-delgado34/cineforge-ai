import { supabase } from "@/lib/supabase";

export async function uploadFile(file: File) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!userData.user) throw new Error("You must be logged in to upload files.");

  const cleanName = file.name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "")
    .toLowerCase();

  const filePath = `${userData.user.id}/${Date.now()}-${cleanName}`;

  const { error } = await supabase.storage.from("media").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(filePath);

  return {
    publicUrl: data.publicUrl,
    filePath,
  };
}

export async function deleteStorageFile(filePath: string) {
  const { error } = await supabase.storage.from("media").remove([filePath]);

  if (error) throw error;
}