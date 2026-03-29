import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId =
    process.env.YOUTUBE_PLAYLIST_ID || "PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8";

  if (!apiKey) {
    return res.status(200).json([]);
  }

  try {
    const query = new URLSearchParams({
      part: "snippet",
      playlistId,
      key: apiKey,
      maxResults: "1000",
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${query.toString()}`
    );

    if (!response.ok) {
      return res.status(200).json([]);
    }

    const data = await response.json();
    return res.status(200).json(Array.isArray(data?.items) ? data.items : []);
  } catch {
    return res.status(200).json([]);
  }
}
