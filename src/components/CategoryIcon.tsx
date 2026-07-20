const paths: Record<string, string> = {
  book: "M4 5a2 2 0 0 1 2-2h8v18H6a2 2 0 0 1-2-2V5Zm10-2h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
  leaf: "M5 19c8-1 14-7 15-15-8 1-14 7-15 15Zm0 0c1-4 3-7 6-9",
  tree: "M12 3 7 10h3l-4 6h4v5h4v-5h4l-4-6h3L12 3Z",
  seed: "M12 21c-4 0-7-3-7-7 0-6 7-11 7-11s7 5 7 11c0 4-3 7-7 7Z",
  droplet: "M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z",
  shield: "M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3Z",
  wind: "M3 8h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 20h9",
  package: "M21 8 12 3 3 8l9 5 9-5Zm0 0v9l-9 5m0-9v9m0-9L3 8m0 0v9l9 5",
  cross: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5v-9Z",
};

export default function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const d = paths[name] ?? paths.shield;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
