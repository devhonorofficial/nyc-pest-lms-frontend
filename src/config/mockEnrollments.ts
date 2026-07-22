import { getCourseBySlug } from "./mockCourses";

export interface EnrolledLesson {
  title: string;
  durationMin: number;
  videoUrl: string;
}

export interface EnrollmentRecord {
  id: string;
  courseSlug: string;
  orderNumber: string;
  purchasedAt: string;
  pricePaid: number;
  paymentMethod: string;
  lessons: EnrolledLesson[];
}

// Placeholder CC0 sample clips so the video player has something real to
// play in this frontend-only build. Swap for real lesson video URLs once
// the backend serves course media.
const SAMPLE_VIDEOS = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
] as const;

function buildLessons(lessons: { title: string; durationMin: number }[]): EnrolledLesson[] {
  return lessons.map((lesson, i) => ({
    ...lesson,
    videoUrl: SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length],
  }));
}

const course1 = getCourseBySlug("ny-7a-30-hour-dec-eligibility");
const course2 = getCourseBySlug("nj-core-2-credit-recertification");

export const MOCK_ENROLLMENTS: EnrollmentRecord[] = [
  course1 && {
    id: "enr-1",
    courseSlug: course1.slug,
    orderNumber: "NYC-20260614-1042",
    purchasedAt: "2026-06-14T15:22:00Z",
    pricePaid: course1.price,
    paymentMethod: "Visa •••• 4242",
    lessons: buildLessons(course1.lessons),
  },
  course2 && {
    id: "enr-2",
    courseSlug: course2.slug,
    orderNumber: "NYC-20260710-3391",
    purchasedAt: "2026-07-10T09:05:00Z",
    pricePaid: course2.price,
    paymentMethod: "Mastercard •••• 8891",
    lessons: buildLessons(course2.lessons),
  },
].filter((record): record is EnrollmentRecord => Boolean(record));

export function getEnrollmentBySlug(slug: string): EnrollmentRecord | undefined {
  return MOCK_ENROLLMENTS.find((e) => e.courseSlug === slug);
}
