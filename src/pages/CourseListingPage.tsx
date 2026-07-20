import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryIcon from "../components/CategoryIcon";
import StepProgress from "../components/StepProgress";
import { brand } from "../config/brand";
import { assets } from "../config/assets";
import { LAUNCH_STATES } from "../config/licenseCategories";
import { getCoursesFor } from "../config/mockCourses";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function categoryLabel(name: string) {
  return name.replace(/^Category [^–]+– /, "").replace(/^CORE – /, "");
}

function categoryImage(code: string): string | undefined {
  return assets.categoryImages[code as keyof typeof assets.categoryImages];
}

export default function CourseListingPage() {
  const { stateSlug, categorySlug } = useParams<{ stateSlug: string; categorySlug: string }>();
  const state = LAUNCH_STATES.find((s) => slugify(s.name) === stateSlug);
  const category = state?.categories.find((c) => slugify(c.code) === categorySlug);

  if (!state || !category) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <p className="font-display text-3xl font-semibold text-ink">Category not found</p>
          <p className="max-w-md text-sm text-slate">
            That category isn&apos;t available. Go back and pick a state and category to continue.
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

  const courses = getCoursesFor(state.code, category.code);
  const heroImage = categoryImage(category.code);
  const label = categoryLabel(category.name);

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
                {state.name}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">{category.code}</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={3} />
            </div>

            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                  Step 3 of 4 · {state.code} · Category {category.code}
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                  {label}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  Choose a course to review curriculum, pricing, and credit hours — then enroll when
                  you&apos;re ready.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/states/${stateSlug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary-light bg-white px-4 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-primary-light"
                  >
                    ← Change category
                  </Link>
                  <span className="inline-flex items-center rounded-xl bg-primary-light px-3.5 py-2.5 text-xs font-semibold text-primary-dark">
                    {courses.length} course{courses.length === 1 ? "" : "s"} available
                  </span>
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-2xl lg:block">
                {heroImage ? (
                  <img src={heroImage} alt="" className="aspect-[5/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[5/3] items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66]">
                    <CategoryIcon name={category.icon} className="h-16 w-16 text-seal" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-primary-dark shadow-sm backdrop-blur-sm">
                  <CategoryIcon name={category.icon} className="h-4 w-4" />
                  Category {category.code}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course list */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          {courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary-light bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <CategoryIcon name={category.icon} className="h-7 w-7" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
                No courses yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate">
                We&apos;re still adding courses for this category. Check back soon, or contact us for
                availability.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to={`/states/${stateSlug}`}
                  className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Browse other categories
                </Link>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="inline-flex rounded-xl border border-primary-light px-5 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-primary-light"
                >
                  Contact us
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-ink">Available courses</h2>
                <p className="mt-1 text-sm text-slate">
                  Approved for {state.name} · Category {category.code}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {courses.map((course) => {
                  const lessonCount = course.lessons.length;
                  const isInitial = course.courseType === "initial";
                  return (
                    <Link
                      key={course.slug}
                      to={`/courses/${course.slug}`}
                      className="group grid overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.06)] ring-1 ring-primary-light transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,41,77,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark sm:grid-cols-[0.9fr_1.1fr]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-primary-dark sm:aspect-auto sm:min-h-full">
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 via-transparent to-transparent" />
                        <span
                          className={[
                            "absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                            isInitial
                              ? "bg-seal text-primary-dark"
                              : "bg-white/95 text-primary-dark",
                          ].join(" ")}
                        >
                          {isInitial ? "Initial licensing" : "CEU / Recert"}
                        </span>
                      </div>

                      <div className="flex flex-col p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                          {course.approvingBoard} approved
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                          {course.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
                          {course.shortDescription}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-lg bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary-dark">
                            {course.creditHours} credit hrs
                          </span>
                          <span className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-slate ring-1 ring-primary-light">
                            {lessonCount} lesson{lessonCount === 1 ? "" : "s"}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">
                              Tuition
                            </p>
                            <p className="font-display text-2xl font-semibold text-ink">
                              ${course.price}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark">
                            View details
                            <span
                              aria-hidden
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition duration-300 group-hover:translate-x-0.5 group-hover:bg-primary-dark"
                            >
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
