import { useCallback, useEffect, useState } from "react";
import { getCompletedLessons, toggleLessonComplete } from "../utils/courseProgress";

export function useCourseProgress(courseSlug: string, totalLessons: number) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getCompletedLessons(courseSlug));
  }, [courseSlug]);

  const toggleLesson = useCallback(
    (index: number) => {
      setCompleted(toggleLessonComplete(courseSlug, index));
    },
    [courseSlug],
  );

  const percent = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;

  return { completed, toggleLesson, percent };
}
