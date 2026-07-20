import { assets } from "./assets";

export interface Lesson {
  title: string;
  durationMin: number;
}

export interface Course {
  slug: string;
  title: string;
  stateCode: string;
  categoryCode: string;
  price: number;
  creditHours: number;
  courseType: "initial" | "ceu";
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  approvingBoard: string;
  lessons: Lesson[];
}

export const MOCK_COURSES: Course[] = [
  {
    slug: "ny-7a-30-hour-dec-eligibility",
    title: "30-Hour DEC Eligibility: 7A – Structural and Rodent",
    stateCode: "NY",
    categoryCode: "7A",
    price: 350,
    creditHours: 30,
    courseType: "initial",
    thumbnail: assets.categoryImages["7A"],
    shortDescription:
      "The full 30-hour NYSDEC eligibility course for new Category 7A applicators, covering structural pest and rodent control.",
    fullDescription:
      "This 30-hour course meets NYSDEC's eligibility requirement for first-time Category 7A applicators. It covers pesticide laws and regulations, safe handling and PPE, structural pest identification and biology, rodent control and exclusion methods, and application equipment. Content is delivered in self-paced video lessons, with a final exam required to complete the course. Per NYSDEC rules, this course cannot be completed in fewer than 4 days and daily seat time is capped at 7.5 hours.",
    approvingBoard: "NYSDEC",
    lessons: [
      { title: "Pesticide Laws & Regulations", durationMin: 60 },
      { title: "Worker Safety & PPE", durationMin: 55 },
      { title: "Structural Pest Identification", durationMin: 70 },
      { title: "Rodent Biology & Behavior", durationMin: 65 },
      { title: "Exclusion & Control Techniques", durationMin: 50 },
      { title: "Application Equipment & Calibration", durationMin: 45 },
      { title: "IPM Documentation & Recordkeeping", durationMin: 30 },
      { title: "Final Exam", durationMin: 60 },
    ],
  },
  {
    slug: "nj-core-2-credit-recertification",
    title: "2 Credits: 1 Hour – Core Recertification",
    stateCode: "NJ",
    categoryCode: "CORE",
    price: 35,
    creditHours: 2,
    courseType: "ceu",
    thumbnail: assets.learningOptions.onlineLearning,
    shortDescription:
      "A short, NJDEP-approved CORE recertification course covering general pesticide safety and regulatory updates.",
    fullDescription:
      "This 1-hour course awards 2 CORE recertification credits, approved by the New Jersey DEP. It covers general pesticide safety practices and current regulatory requirements applicable to all New Jersey applicator categories. Note: per NJDEP rules, only up to 25% of your total recertification credits for a 5-year cycle (due every 5 years by October 31st) may be completed online — this course counts toward that online portion, not your full recertification requirement.",
    approvingBoard: "NJDEP",
    lessons: [
      { title: "General Pesticide Safety Review", durationMin: 30 },
      { title: "NJDEP Regulatory Updates", durationMin: 20 },
      { title: "Final Quiz", durationMin: 10 },
    ],
  },
];

export function getCoursesFor(stateCode: string, categoryCode: string): Course[] {
  return MOCK_COURSES.filter(
    (c) => c.stateCode === stateCode && c.categoryCode === categoryCode
  );
}

export function getCourseBySlug(slug: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.slug === slug);
}
