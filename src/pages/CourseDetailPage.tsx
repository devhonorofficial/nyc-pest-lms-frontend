import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StepProgress from "../components/StepProgress";
import { getCourseBySlug } from "../config/mockCourses";
import { LAUNCH_STATES } from "../config/licenseCategories";
import { brand } from "../config/brand";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function formatHours(minutes: number) {
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} hr${hours === 1 ? "" : "s"}`;
}

export default function CourseDetailPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { success } = useToast();
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;
  const [justAdded, setJustAdded] = useState(false);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <p className="font-display text-3xl font-semibold text-ink">Course not found</p>
          <p className="max-w-md text-sm text-slate">
            That course isn&apos;t available. Browse states to find an approved program.
          </p>
          <Link
            to="/states"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            ← Back to state selection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const state = LAUNCH_STATES.find((s) => s.code === course.stateCode);
  const stateSlug = state ? slugify(state.name) : slugify(course.stateCode);
  const categorySlug = slugify(course.categoryCode);
  const alreadyInCart = items.some((i) => i.course.slug === course.slug);
  const totalMinutes = course.lessons.reduce((sum, l) => sum + l.durationMin, 0);
  const isInitial = course.courseType === "initial";

  function handleAddToCart() {
    addItem(course!);
    setJustAdded(true);
    success("Course added to your cart.");
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      <Header />

      <main>
        {/* Intro */}
        <section className="relative overflow-hidden border-b border-primary-light bg-white">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 0% 0%, rgba(10,41,77,0.06), transparent 45%), radial-gradient(circle at 100% 100%, rgba(244,166,35,0.1), transparent 40%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-slate" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-primary-dark">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link to="/states" className="transition hover:text-primary-dark">
                States
              </Link>
              <span aria-hidden>/</span>
              <Link to={`/states/${stateSlug}`} className="transition hover:text-primary-dark">
                {state?.name ?? course.stateCode}
              </Link>
              <span aria-hidden>/</span>
              <Link
                to={`/states/${stateSlug}/${categorySlug}`}
                className="transition hover:text-primary-dark"
              >
                {course.categoryCode}
              </Link>
              <span aria-hidden>/</span>
              <span className="max-w-[12rem] truncate text-ink sm:max-w-none">{course.title}</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={3} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span
                className={[
                  "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                  isInitial ? "bg-seal text-primary-dark" : "bg-primary-light text-primary-dark",
                ].join(" ")}
              >
                {isInitial ? "Initial licensing" : "CEU / Recertification"}
              </span>
              <span className="rounded-md bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate ring-1 ring-primary-light">
                Category {course.categoryCode}
              </span>
              <span className="rounded-md bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate ring-1 ring-primary-light">
                {course.approvingBoard} approved
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
              {course.shortDescription}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
            <div>
              <div className="overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(10,41,77,0.12)]">
                <img
                  src={course.thumbnail}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                  About this course
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  What you&apos;ll learn
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">{course.fullDescription}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Credit hours", value: String(course.creditHours) },
                  { label: "Lessons", value: String(course.lessons.length) },
                  { label: "Runtime", value: formatHours(totalMinutes) },
                  { label: "Board", value: course.approvingBoard },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white px-4 py-3 ring-1 ring-primary-light"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-ink">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark">
                      Curriculum
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                      Lesson outline
                    </h2>
                  </div>
                  <p className="text-xs text-slate">{course.lessons.length} lessons</p>
                </div>

                <ol className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
                  {course.lessons.map((lesson, i) => (
                    <li
                      key={lesson.title}
                      className="flex items-center justify-between gap-4 border-b border-primary-light px-5 py-4 last:border-b-0"
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-sm font-semibold text-primary-dark">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-sm font-medium text-ink">{lesson.title}</span>
                      </span>
                      <span className="shrink-0 rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-slate">
                        {lesson.durationMin} min
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Purchase panel */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(10,41,77,0.1)] ring-1 ring-primary-light">
                <div className="bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66] px-6 py-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                    Tuition
                  </p>
                  <p className="mt-2 font-display text-4xl font-semibold">${course.price}</p>
                  <p className="mt-1 text-sm text-white/70">One seat · account-linked access</p>
                </div>

                <div className="space-y-4 px-6 py-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Credit hours</dt>
                      <dd className="font-semibold text-ink">{course.creditHours}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Approving board</dt>
                      <dd className="font-semibold text-ink">{course.approvingBoard}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Total runtime</dt>
                      <dd className="font-semibold text-ink">{formatHours(totalMinutes)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Lessons</dt>
                      <dd className="font-semibold text-ink">{course.lessons.length}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">State</dt>
                      <dd className="font-semibold text-ink">{state?.name ?? course.stateCode}</dd>
                    </div>
                  </dl>

                  {alreadyInCart ? (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                      >
                        View cart
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/checkout")}
                        className="w-full rounded-xl border border-primary-light bg-surface px-4 py-3 text-sm font-semibold text-primary-dark transition hover:bg-primary-light"
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-full rounded-xl bg-seal px-4 py-3.5 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-[#ffb84a]"
                    >
                      {justAdded ? "Added to cart ✓" : "Add to cart"}
                    </button>
                  )}

                  <Link
                    to={`/states/${stateSlug}/${categorySlug}`}
                    className="block text-center text-xs font-medium text-slate transition hover:text-primary-dark"
                  >
                    ← Back to category courses
                  </Link>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-primary-light/60 px-5 py-4 text-sm text-primary-dark ring-1 ring-primary-light">
                <p className="font-semibold">Need help choosing?</p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  Our team can confirm the right category and course for your license path.
                </p>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="mt-3 inline-flex text-xs font-semibold underline-offset-2 hover:underline"
                >
                  Contact support →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
