const STORAGE_KEY = "nyc_pms_course_progress";

type ProgressMap = Record<string, number[]>;

function readAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getCompletedLessons(courseSlug: string): number[] {
  return readAll()[courseSlug] ?? [];
}

export function toggleLessonComplete(courseSlug: string, index: number): number[] {
  const all = readAll();
  const set = new Set(all[courseSlug] ?? []);
  if (set.has(index)) {
    set.delete(index);
  } else {
    set.add(index);
  }
  const next = Array.from(set).sort((a, b) => a - b);
  all[courseSlug] = next;
  writeAll(all);
  return next;
}

export function getProgressPercent(courseSlug: string, totalLessons: number): number {
  if (totalLessons <= 0) return 0;
  return Math.round((getCompletedLessons(courseSlug).length / totalLessons) * 100);
}
