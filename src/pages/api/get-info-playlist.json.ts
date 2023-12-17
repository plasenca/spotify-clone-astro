import type { APIContext } from "astro";

import { allPlaylists, playlists, songs } from "@/data/music";

export async function GET({ params, request }: APIContext) {
  const { url } = request;

  // First Way to get params from URL
  // const [, querystring] = url.split("?");
  // const searchParams = new URLSearchParams(querystring);

  // Best way to get paramas from URL
  const { searchParams } = new URL(url);

  const id = searchParams.get("id");

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const song = songs.find((song) => song.albumId === playlist?.albumId);

  return new Response(
    JSON.stringify({
      playlist,
      song,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
