import { readFile } from "fs/promises";
import { supabaseAdmin } from "@/lib/supabase/admin";

type UploadFinalVideoInput = {
  userId: string;
  filePath: string;
  filename: string;
};

export async function uploadFinalVideo({
  userId,
  filePath,
  filename,
}: UploadFinalVideoInput) {
  const fileBuffer = await readFile(filePath);

  const storagePath = `${userId}/final-videos/${filename}`;

  const { error } = await supabaseAdmin.storage
    .from("media")
    .upload(storagePath, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from("media")
    .getPublicUrl(storagePath);

  return {
    videoUrl: data.publicUrl,
    storagePath,
  };
}