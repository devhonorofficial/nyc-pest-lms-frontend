import { Link } from "react-router-dom";
import { MOCK_ENROLLMENTS } from "../../config/mockEnrollments";
import { getCourseBySlug, type Course } from "../../config/mockCourses";
import { getProgressPercent } from "../../utils/courseProgress";

interface EnrollmentRow {
  enrollment: (typeof MOCK_ENROLLMENTS)[number];
  course: Course;
  percent: number;
}

export default function DashboardEnrolledCoursesPage() {
  const rows: EnrollmentRow[] = [];
  for (const enrollment of MOCK_ENROLLMENTS) {
    const course = getCourseBySlug(enrollment.courseSlug);
    if (!course) continue;
    rows.push({ enrollment, course, percent: getProgressPercent(enrollment.courseSlug, course.lessons.length) });
  }

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Enrolled Courses</h2>
          <p className="mt-1 text-sm text-slate">
            {rows.length} purchased course{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link to="/states" className="text-sm font-semibold text-primary-dark transition hover:underline">
          Find more courses
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-primary-light bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(10,41,77,0.05)]">
          <p className="font-display text-2xl font-semibold text-ink">No courses yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate">
            Your purchased training will appear here as soon as checkout is complete.
          </p>
          <Link
            to="/states"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.75 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {rows.map(({ enrollment, course, percent }) => (
            <div
              key={enrollment.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light"
            >
              <img src={course.thumbnail} alt="" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
                  {course.stateCode} · Category {course.categoryCode}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-slate">
                  {course.creditHours} credit hrs · {course.lessons.length} lessons
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-slate">{percent}%</span>
                </div>

                <Link
                  to={`/dashboard/courses/${course.slug}`}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  {percent === 0 ? "Start course" : percent === 100 ? "Watch again" : "Continue learning"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
