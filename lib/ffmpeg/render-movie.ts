import { randomUUID } from "crypto";
import { mkdir, writeFile, readFile, rm } from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

type RenderMovieInput = {
  sceneVideoUrls: string[];
  narrationAudioUrl?: string;
  musicAudioUrl?: string;
};

type RenderMovieResult = {
  outputPath: string;
  filename: string;
};

async function downloadToFile(url: string, filePath: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download asset: ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(filePath, buffer);
}

async function runFfmpeg(args: string[]) {
  await execFileAsync("ffmpeg", args);
}

export async function renderMovie({
  sceneVideoUrls,
  narrationAudioUrl,
  musicAudioUrl,
}: RenderMovieInput): Promise<RenderMovieResult> {
  if (!sceneVideoUrls.length) {
    throw new Error("No scene videos provided.");
  }

  const jobId = randomUUID();
  const workDir = path.join("/tmp", `cineforge-render-${jobId}`);

  await mkdir(workDir, { recursive: true });

  try {
    const scenePaths: string[] = [];

    for (let index = 0; index < sceneVideoUrls.length; index++) {
      const filePath = path.join(workDir, `scene-${index}.mp4`);
      await downloadToFile(sceneVideoUrls[index], filePath);
      scenePaths.push(filePath);
    }

    const concatListPath = path.join(workDir, "concat.txt");

    await writeFile(
      concatListPath,
      scenePaths.map((scenePath) => `file '${scenePath}'`).join("\n")
    );

    const mergedVideoPath = path.join(workDir, "merged-scenes.mp4");

    await runFfmpeg([
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatListPath,
      "-c",
      "copy",
      mergedVideoPath,
    ]);

    let currentVideoPath = mergedVideoPath;

    let narrationPath = "";

    if (narrationAudioUrl) {
      narrationPath = path.join(workDir, "narration.mp3");
      await downloadToFile(narrationAudioUrl, narrationPath);
    }

    let musicPath = "";

    if (musicAudioUrl) {
      musicPath = path.join(workDir, "music.mp3");
      await downloadToFile(musicAudioUrl, musicPath);
    }

    const filename = `cineforge-final-${jobId}.mp4`;
    const outputPath = path.join(workDir, filename);

    if (narrationPath && musicPath) {
      await runFfmpeg([
        "-y",
        "-i",
        currentVideoPath,
        "-i",
        narrationPath,
        "-i",
        musicPath,
        "-filter_complex",
        "[2:a]volume=0.2[music];[1:a][music]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map",
        "0:v",
        "-map",
        "[aout]",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-shortest",
        outputPath,
      ]);
    } else if (narrationPath) {
      await runFfmpeg([
        "-y",
        "-i",
        currentVideoPath,
        "-i",
        narrationPath,
        "-map",
        "0:v",
        "-map",
        "1:a",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-shortest",
        outputPath,
      ]);
    } else if (musicPath) {
      await runFfmpeg([
        "-y",
        "-i",
        currentVideoPath,
        "-i",
        musicPath,
        "-filter:a",
        "volume=0.2",
        "-map",
        "0:v",
        "-map",
        "1:a",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-shortest",
        outputPath,
      ]);
    } else {
      const finalBuffer = await readFile(currentVideoPath);
      await writeFile(outputPath, finalBuffer);
    }

    return {
      outputPath,
      filename,
    };
  } catch (error) {
    await rm(workDir, { recursive: true, force: true });

    throw error;
  }
}