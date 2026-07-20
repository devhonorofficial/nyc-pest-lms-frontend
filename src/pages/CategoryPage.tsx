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

function categoryImage(code: string): string | undefined {
  return assets.categoryImages[code as keyof typeof assets.categoryImages];
}

function categoryLabel(name: string) {
  return name.replace(/^Category [^–]+– /, "").replace(/^CORE – /, "");
}

export default function CategoryPage() {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const state = LAUNCH_STATES.find((s) => slugify(s.name) === stateSlug);

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <p className="font-display text-3xl font-semibold text-ink">State not found</p>
          <p className="max-w-md text-sm text-slate">
            That state isn&apos;t available yet. Pick one from the list to continue.
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
              <span className="text-ink">{state.name}</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={2} />
            </div>

            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                  Step 2 of 4 · {state.code}
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                  {state.name} license categories
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  Choose the category you&apos;re certified in — or working toward — to see approved
                  courses for {state.name}.
                </p>
              </div>
              <Link
                to="/states"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-primary-light bg-white px-4 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-primary-light lg:self-auto"
              >
                ← Change state
              </Link>
            </div>
          </div>
        </section>

        {/* NY context */}
        {state.code === "NY" && (
          <section className="border-b border-primary-light bg-surface">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark">
                  About New York licensing
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Pesticide applicator licensing in New York
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate sm:text-base">
                  {brand.name} supports New York pest management professionals from first license
                  through every recertification cycle. Courses are built and reviewed by{" "}
                  {brand.leadInstructor}, with content aligned to {brand.approvingBody}.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate sm:text-base">
                  Whether you&apos;re renewing or earning your first credential, courses are organized
                  by category so you only study what applies — self-paced within New York seat-time
                  limits, with support if you get stuck.
                </p>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:gap-3"
                >
                  Contact us to get started
                  <span aria-hidden>→</span>
                </a>
              </div>

              <aside className="rounded-2xl bg-primary p-6 text-white shadow-[0_16px_40px_rgba(10,41,77,0.2)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                  NYSDEC seat-time rules
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/85">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-seal" />
                    You may not spend more than 7 hours per day on recertification (CEU) coursework.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-seal" />
                    30-hour Technician Eligibility courses may not exceed 7.5 hours per day.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-seal" />
                    30-hour Technician Eligibility courses cannot be completed in fewer than 4 days.
                  </li>
                </ul>
              </aside>
            </div>
          </section>
        )}

        {/* Category grid */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-ink">Select a category</h2>
            <p className="mt-1 text-sm text-slate">
              {state.categories.length} categories available for {state.name}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {state.categories.map((category) => {
              const image = categoryImage(category.code);
              const courseCount = getCoursesFor(state.code, category.code).length;
              return (
                <Link
                  key={category.code}
                  to={`/states/${stateSlug}/${slugify(category.code)}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.06)] ring-1 ring-primary-light transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,41,77,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary-dark">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66]">
                        <CategoryIcon name={category.icon} className="h-14 w-14 text-seal" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-md bg-seal px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-dark">
                      {category.code}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary-dark transition group-hover:bg-primary group-hover:text-white">
                        <CategoryIcon name={category.icon} className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                          {categoryLabel(category.name)}
                        </h3>
                        <p className="mt-1 text-xs text-slate">
                          {courseCount > 0
                            ? `${courseCount} course${courseCount === 1 ? "" : "s"} available`
                            : "View available courses"}
                        </p>
                      </div>
                    </div>

                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary-dark">
                      View courses
                      <span
                        aria-hidden
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white transition duration-300 group-hover:translate-x-0.5 group-hover:bg-primary-dark"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
