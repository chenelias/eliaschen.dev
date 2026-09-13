import Link from "next/link";
import type { Experience } from "./data/experiences";

const hasText = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * One experience, rendered as a card. Wraps itself in a link only when the
 * entry carries a `url`, so link-less entries stay plain markup.
 */
export default function ExperienceCard({
  name,
  result,
  description,
  date,
  url,
}: Experience) {
  // Only linked cards are clickable, so only they get hover feedback —
  // `group-hover:` is inert without the `group` ancestor the <Link> adds.
  const interactive = hasText(url);

  const card = (
    <div
      className={
        "p-3 flex justify-between items-center gap-3 border-[1px] border-zinc-200 dark:border-zinc-800 rounded-lg" +
        (interactive
          ? " transition duration-200 group-hover:-translate-y-[0.15rem] group-hover:shadow-lg"
          : "")
      }
    >
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="font-bold tracking-tight dark:text-zinc-200 text-zinc-900 leading-snug !m-0">
          {name}
        </h3>

        {hasText(description) && (
          <p className="text-sm leading-normal dark:text-zinc-400 text-zinc-600 !m-0">
            {description}
          </p>
        )}
        {hasText(result) && (
          <p className="self-start rounded-md px-1 py-[2px] text-[10px] font-bold dark:bg-purple-900/50 dark:text-purple-200 bg-purple-200 text-purple-900">
            {result}
          </p>
        )}
      </div>
      {hasText(date) && (
        <p className="text-xs font-code whitespace-nowrap dark:text-zinc-400 text-zinc-500 !m-0">
          {date}
        </p>
      )}
    </div>
  );

  if (!interactive) {
    return <li className="list-none">{card}</li>;
  }

  return (
    <li className="list-none">
      <Link
        className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name + " (open in new tab)"}
      >
        {card}
      </Link>
    </li>
  );
}
