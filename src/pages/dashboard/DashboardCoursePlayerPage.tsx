import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCourseBySlug } from "../../config/mockCourses";
import { getEnrollmentBySlug } from "../../config/mockEnrollments";
import { useCourseProgress } from "../../hooks/useCourseProgress";
import { useToast } from "../../context/ToastContext";
import { CheckCircleIcon, PlayCircleIcon } from "../../components/dashboard/icons";

export default function DashboardCoursePlayerPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { success } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);

  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;
  const enrollment = courseSlug ? getEnrollmentBySlug(courseSlug) : undefined;
  const { completed, toggleLesson, percent } = useCourseProgress(
    courseSlug ?? "",
    course?.lessons.length ?? 0,
  );

  if (!course || !enrollment) {
    return <Navigate to="/dashboard/courses" replace />;
  }

  const activeLesson = enrollment.lessons[activeIndex];
  const isActiveComplete = completed.includes(activeIndex);

  function handleMarkComplete() {
    toggleLesson(activeIndex);
    success(isActiveComplete ? "Lesson marked as not watched." : "Lesson marked as complete.");
  }

  return (
    <div>
      <Link
        to="/dashboard/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-dark transition hover:underline"
      >
        ← Back to enrolled courses
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
            {course.stateCode} · Category {course.categoryCode}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{course.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          {percent}% complete
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-black shadow-[0_16px_40px_rgba(10,41,77,0.12)]">
            <video
              key={activeLesson.videoUrl}
              controls
              poster={course.thumbnail}
              className="aspect-video w-full"
            >
              <source src={activeLesson.videoUrl} type="video/mp4" />
            </video>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
                  Lesson {activeIndex + 1} of {enrollment.lessons.length}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{activeLesson.title}</h3>
                <p className="mt-1 text-xs text-slate">{activeLesson.durationMin} min</p>
              </div>
              <button
                type="button"
                onClick={handleMarkComplete}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                  isActiveComplete
                    ? "bg-success/10 text-[#16803c] hover:bg-success/15"
                    : "bg-primary text-white hover:bg-primary-dark",
                ].join(" ")}
              >
                <CheckCircleIcon className="h-4 w-4" />
                {isActiveComplete ? "Completed" : "Mark as complete"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
          <p className="px-1.5 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate">
            Course lessons
          </p>
          <ol className="space-y-1">
            {enrollment.lessons.map((lesson, i) => {
              const isActive = i === activeIndex;
              const isDone = completed.includes(i);
              return (
                <li key={lesson.title}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={[
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                      isActive ? "bg-primary-light text-primary-dark" : "text-ink hover:bg-surface",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        isDone ? "bg-success/15 text-success" : "bg-surface text-slate",
                      ].join(" ")}
                    >
                      {isDone ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : (
                        <PlayCircleIcon className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{lesson.title}</span>
                      <span className="block text-xs text-slate">{lesson.durationMin} min</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
