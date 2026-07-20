export const NY_LICENSE_CATEGORIES = [
  { code: "7A", name: "Category 7A – Structural & Rodent Control", icon: "shield" },
  { code: "7C", name: "Category 7C – Termite Control", icon: "shield" },
  { code: "7D", name: "Category 7D – Wood Destroying Insects", icon: "tree" },
] as const;

export const NJ_LICENSE_CATEGORIES = [
  { code: "CORE", name: "CORE – Core Certification", icon: "book" },
  { code: "7A", name: "Category 7A – General & Household", icon: "shield" },
  { code: "7C", name: "Category 7C – Fumigation", icon: "wind" },
] as const;

export const VA_LICENSE_CATEGORIES = [
  { code: "7A", name: "Category 7A – General Pest Control", icon: "shield" },
  { code: "7B", name: "Category 7B – Termite Control", icon: "shield" },
] as const;

export const DE_LICENSE_CATEGORIES = [
  { code: "7A", name: "Category 7A – General Pest Control", icon: "shield" },
  { code: "7B", name: "Category 7B – Termite Control", icon: "shield" },
] as const;

export const LAUNCH_STATES = [
  { code: "NY", name: "New York", categories: NY_LICENSE_CATEGORIES },
  { code: "NJ", name: "New Jersey", categories: NJ_LICENSE_CATEGORIES },
  { code: "VA", name: "Virginia", categories: VA_LICENSE_CATEGORIES },
  { code: "DE", name: "Delaware", categories: DE_LICENSE_CATEGORIES },
] as const;
