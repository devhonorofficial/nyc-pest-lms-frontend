import { Link } from "react-router-dom";
import { MOCK_ENROLLMENTS } from "../../config/mockEnrollments";
import { getCourseBySlug, type Course } from "../../config/mockCourses";
import { getProgressPercent } from "../../utils/courseProgress";
import { BookIcon, PlayCircleIcon, CheckCircleIcon } from "../../components/dashboard/icons";

interface EnrollmentRow {
  enrollment: (typeof MOCK_ENROLLMENTS)[number];
  course: Course;
  percent: number;
}

export default function DashboardOverviewPage() {
  const rows: EnrollmentRow[] = [];
  for (const enrollment of MOCK_ENROLLMENTS) {
    const course = getCourseBySlug(enrollment.courseSlug);
    if (!course) continue;
    rows.push({ enrollment, course, percent: getProgressPercent(enrollment.courseSlug, course.lessons.length) });
  }

  const enrolledCount = rows.length;
  const activeCount = rows.filter((r) => r.percent > 0 && r.percent < 100).length;
  const completedCount = rows.filter((r) => r.percent === 100).length;

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCount,
      icon: BookIcon,
      iconBg: "bg-primary-light text-primary-dark",
      cardBg: "bg-primary-light/50",
      valueColor: "text-primary-dark",
    },
    {
      label: "Active Courses",
      value: activeCount,
      icon: PlayCircleIcon,
      iconBg: "bg-seal/15 text-seal",
      cardBg: "bg-seal/10",
      valueColor: "text-[#b5760f]",
    },
    {
      label: "Completed Courses",
      value: completedCount,
      icon: CheckCircleIcon,
      iconBg: "bg-success/15 text-success",
      cardBg: "bg-success/10",
      valueColor: "text-[#16803c]",
    },
  ] as const;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Overview</h2>
          <p className="mt-1 text-sm text-slate">A quick look at your training progress.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl ${stat.cardBg} p-6 text-center ring-1 ring-primary-light`}
          >
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${stat.iconBg}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className={`mt-4 font-display text-4xl font-semibold ${stat.valueColor}`}>{stat.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink">Continue learning</h3>
          <Link to="/dashboard/courses" className="text-sm font-semibold text-primary-dark transition hover:underline">
            View all courses
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary-light bg-white px-6 py-10 text-center text-sm text-slate">
            No purchased courses yet.{" "}
            <Link to="/states" className="font-semibold text-primary-dark hover:underline">
              Browse courses
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {rows.map(({ enrollment, course, percent }) => (
              <li
                key={enrollment.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:flex-row sm:items-center"
              >
                <img
                  src={course.thumbnail}
                  alt=""
                  className="h-20 w-full shrink-0 rounded-xl object-cover sm:w-32"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
                    {course.stateCode} · Category {course.categoryCode}
                  </p>
                  <h4 className="mt-1 truncate font-display text-base font-semibold text-ink">
                    {course.title}
                  </h4>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-1.5 w-full max-w-55 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-slate">{percent}%</span>
                  </div>
                </div>
                <Link
                  to={`/dashboard/courses/${course.slug}`}
                  className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  {percent > 0 ? "Continue" : "Start course"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
