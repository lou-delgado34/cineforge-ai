"use client";

import { useRef, useState } from "react";
import { uploadFile } from "@/lib/supabase/storage";
import { createAsset } from "@/lib/supabase/assets";

const MAX_FILE_SIZE_MB = 50;

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  function chooseFile(selectedFile: File | null) {
    if (!selectedFile) return;

    const fileSizeMb = selectedFile.size / 1024 / 1024;

    if (fileSizeMb > MAX_FILE_SIZE_MB) {
      setMessage(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  }

  async function handleUpload() {
    if (!file) {
      alert("Choose a file first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const uploaded = await uploadFile(file);

      await createAsset({
        title: file.name,
        type: file.type || "file",
        url: uploaded.publicUrl,
        file_path: uploaded.filePath,
      });

      setMessage("Upload successful. Check your Library.");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? `Upload failed: ${error.message}` : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Media Upload</h1>
      <p className="mt-2 text-white/60">Upload images, videos, or audio files.</p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          chooseFile(e.dataTransfer.files?.[0] || null);
        }}
        className="mt-8 max-w-2xl rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-8"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*,audio/*"
          onChange={(e) => chooseFile(e.target.files?.[0] || null)}
        />

        <div className="rounded-xl bg-black p-8 text-center">
          <p className="text-lg font-semibold">Drag and drop a file here</p>
          <p className="mt-2 text-sm text-white/50">or click the button below</p>

          <button
            onClick={() => inputRef.current?.click()}
            className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/10"
          >
            Select File
          </button>
        </div>

        <p className="mt-4 text-sm text-white/60">
          {file ? `Selected: ${file.name}` : "No file selected"}
        </p>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </div>
    </main>
  );
}