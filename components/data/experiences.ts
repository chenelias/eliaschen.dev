/**
 * Experience entries rendered as cards by <ExperienceCard />.
 *
 * Only `name` is required; every other field is dropped from the card when
 * absent, so a partially filled entry still renders cleanly.
 */
export interface Experience {
  /** What the experience was — the card's headline. */
  name: string;
  /** Placing, award, or role. Rendered as the accent badge. */
  result?: string;
  /** Track, division, or other detail. */
  description?: string;
  /** Free-form, e.g. "2026" or "2024 August". Rendered right-aligned. */
  date?: string;
  /** Optional external link; makes the whole card clickable. */
  url?: string;
}

export const Experiences: Experience[] = [
  {
    name: "SITCON Hackathon 2026",
    description: "3-day GEN-AI hackathon by SITCON x FUTUREMODE",
    url: "https://hackathon2026.sitcon.org",
    date: "2026.09",
  },
  {
    name: "Taipei Capital Cup WorldSkills Competition",
    result: "Merit Award",
    description: "Mobile Application Development",
    date: "2026.05",
  },
  {
    name: "SITCON 2026",
    description: "Dev Team",
    date: "2026.03",
    url: "https://sitcon.org/2026",
  },
  {
    name: "48th WSC & 3rd WSA 2nd Competitor Selection",
    description: "Mobile Application Development",
    date: "2025.09",
  },
  {
    name: "COSUP 2025",
    description: "Attendee",
    date: "2025.08",
    url: "https://coscup.org/2025",
  },
  {
    name: "48th WSC & 3rd WSA Competitor Selection",
    result: "3rd Place",
    description: "Mobile Application Development",
    date: "2025.07",
  },
  {
    name: "55th National Skills Competition",
    result: "1st Place",
    description: "Mobile Application Development",
    date: "2025.07",
  },
  {
    name: "55th Regional Skills Competition (Northern Division)",
    result: "3rd Place",
    description: "Mobile Application Development",
    date: "2025.03",
  },
  {
    name: "SITCON 2025",
    description: "Attendee",
    date: "2025.03",
    url: "https://sitcon.org/2025",
  },
  {
    name: "Hackathon with Lewis 2024",
    result: "Qualified",
    date: "2024.08",
    url: "https://hackathon.lewismenelaws.com/",
  },
  {
    name: "AIS3 Pre-exam",
    date: "2024.07",
  },
];
