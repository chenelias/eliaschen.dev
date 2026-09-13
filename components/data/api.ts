/**
 * Types and runtime parsers for the JSON this site consumes.
 *
 * `response.json()` hands back `any`, so a shape change upstream would
 * otherwise flow straight into JSX and only surface as a blank or broken
 * card in the browser. Every payload is narrowed here before it reaches a
 * component, and each parser is total: it always returns a valid array,
 * falling back to sane defaults rather than throwing.
 */

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const asNumber = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];

/** A pinned GitHub repository, from https://pinned.berrysauce.dev */
export interface PinnedRepo {
  author: string;
  name: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
}

export const parsePinnedRepos = (value: unknown): PinnedRepo[] => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (!isRecord(entry)) return [];

    const author = asString(entry.author);
    const name = asString(entry.name);
    // Both halves build the repo URL, so an entry missing either is unusable.
    if (!author || !name) return [];

    return [
      {
        author,
        name,
        description: asString(entry.description) || undefined,
        language: asString(entry.language) || undefined,
        languageColor: asString(entry.languageColor) || undefined,
        stars: asNumber(entry.stars),
        forks: asNumber(entry.forks),
      },
    ];
  });
};

/** An article, from https://dev.to/api/articles */
export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  tags?: string;
  tag_list: string[];
  comments_count: number;
  public_reactions_count: number;
  reading_time_minutes?: number;
  readable_publish_date?: string;
}

export const parseDevToArticles = (value: unknown): DevToArticle[] => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (!isRecord(entry)) return [];

    const id = asNumber(entry.id, -1);
    const title = asString(entry.title);
    const url = asString(entry.url);
    if (id < 0 || !title || !url) return [];

    return [
      {
        id,
        title,
        url,
        tags: typeof entry.tags === "string" ? entry.tags : undefined,
        tag_list: asStringArray(entry.tag_list),
        comments_count: asNumber(entry.comments_count),
        public_reactions_count: asNumber(entry.public_reactions_count),
        reading_time_minutes:
          typeof entry.reading_time_minutes === "number"
            ? entry.reading_time_minutes
            : undefined,
        readable_publish_date:
          asString(entry.readable_publish_date) || undefined,
      },
    ];
  });
};

/** A playlist entry, from the YouTube Data API via /api/music-playlist */
export interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    position: number;
    playlistId: string;
    resourceId: { videoId: string };
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
    thumbnails: {
      standard: { url: string };
      medium: { url: string };
    };
  };
}

const thumbnailUrl = (thumbnails: unknown, size: string): string => {
  if (!isRecord(thumbnails)) return "";
  const entry = thumbnails[size];
  return isRecord(entry) ? asString(entry.url) : "";
};

/**
 * The player indexes the playlist by `snippet.position`, so entries are
 * normalized in place rather than dropped — discarding one would desync
 * every position after it from its array index.
 */
export const parsePlaylistItems = (value: unknown): PlaylistItem[] => {
  if (!Array.isArray(value)) return [];

  return value.map((entry, index) => {
    const record = isRecord(entry) ? entry : {};
    const snippet = isRecord(record.snippet) ? record.snippet : {};
    const resourceId = isRecord(snippet.resourceId) ? snippet.resourceId : {};

    // YouTube omits `standard` on some videos; medium is always present.
    const medium = thumbnailUrl(snippet.thumbnails, "medium");
    const standard = thumbnailUrl(snippet.thumbnails, "standard") || medium;

    return {
      id: asString(record.id, `item-${index}`),
      snippet: {
        title: asString(snippet.title),
        position: asNumber(snippet.position, index),
        playlistId: asString(snippet.playlistId),
        resourceId: { videoId: asString(resourceId.videoId) },
        videoOwnerChannelId: asString(snippet.videoOwnerChannelId),
        videoOwnerChannelTitle: asString(snippet.videoOwnerChannelTitle),
        thumbnails: {
          standard: { url: standard },
          medium: { url: medium },
        },
      },
    };
  });
};
