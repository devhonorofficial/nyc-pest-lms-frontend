import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryIcon from "../components/CategoryIcon";
import { brand } from "../config/brand";
import { LAUNCH_STATES } from "../config/licenseCategories";
import { assets } from "../config/assets";

const LEARNING_OPTIONS = [
  {
    key: "liveWebinar" as const,
    title: "Live Webinar",
    description:
      "Join scheduled sessions with real-time instruction and the chance to ask questions as you learn.",
  },
  {
    key: "inPersonClasses" as const,
    title: "In-Person Classes",
    description:
      "Train hands-on at our Brooklyn campus with direct access to instructors and equipment.",
  },
  {
    key: "onlineLearning" as const,
    title: "Online Learning",
    description:
      "Move through self-paced coursework anytime, anywhere, and pick up exactly where you left off.",
  },
];

const WHY_POINTS = [
  {
    title: "NYSDEC-approved curriculum",
    body: "Course pathways built for New York pesticide applicator certification requirements.",
  },
  {
    title: "Flexible study formats",
    body: "Choose webinars, in-person classes, or self-paced online learning that fits your schedule.",
  },
  {
    title: "Exam-ready preparation",
    body: "Clear lessons and practical guidance so you walk into your exam confident and prepared.",
  },
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function HomePage() {
  const nyState = LAUNCH_STATES[0];
  const phoneHref = `tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="min-h-screen bg-white font-body text-ink">
      <Header />

      <main>
        {/* Hero — one composition, full-bleed image */}
        <section className="relative isolate min-h-[min(88vh,780px)] overflow-hidden bg-primary-dark">
          <img
            src={assets.heroBackground}
            alt=""
            className="absolute inset-0 h-full w-full object-cover animate-[hero-zoom_8s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/88 to-primary-dark/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-primary-dark/20" />

          <div className="relative mx-auto flex min-h-[min(88vh,780px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-20 sm:pt-24">
            <div className="max-w-2xl animate-[fade-up_700ms_ease-out]">
              <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                {brand.name}
              </p>
              <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-4xl md:text-5xl">
                Build your career in pest management with confidence
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                NYSDEC-approved training that prepares you for certification — online, live, or
                in person at our Brooklyn campus.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/states"
                  className="inline-flex items-center justify-center rounded-lg bg-seal px-6 py-3.5 text-sm font-semibold text-primary-dark shadow-lg shadow-black/20 transition hover:bg-[#ffb84a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Browse Online Courses
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  In-Person Classes
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditation */}
        <section className="border-b border-primary-light bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark">
              Trusted credentials & affiliations
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              <img
                src={assets.accreditationLogos.entomologicalSociety}
                alt="Entomological Society of America"
                className="h-16 w-auto opacity-80 transition duration-300 hover:opacity-100 sm:h-20"
              />
              <img
                src={assets.accreditationLogos.npma}
                alt="NPMA"
                className="h-16 w-auto opacity-80 transition duration-300 hover:opacity-100 sm:h-20"
              />
              <img
                src={assets.accreditationLogos.ace}
                alt="ACE – Associate Certified Entomologist"
                className="h-16 w-auto opacity-80 transition duration-300 hover:opacity-100 sm:h-20"
              />
            </div>
          </div>
        </section>

        {/* License categories */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">New York</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              License categories that match your path
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Explore NYSDEC specialty categories and find the courses that fit where you want to
              work.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {nyState.categories.map((category, index) => (
              <Link
                key={category.code}
                to={`/states/${slugify(nyState.name)}/${slugify(category.code)}`}
                className="group relative overflow-hidden rounded-2xl bg-primary-dark p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,41,77,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-seal"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-seal/20 blur-2xl transition duration-500 group-hover:bg-seal/35"
                  aria-hidden
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-seal ring-1 ring-white/10 transition group-hover:bg-seal group-hover:text-primary-dark">
                  <CategoryIcon name={category.icon} className="h-6 w-6" />
                </div>
                <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                  Category {category.code}
                </p>
                <h3 className="relative mt-2 font-display text-xl font-semibold leading-snug">
                  {category.name.replace(/^Category [^–]+– /, "")}
                </h3>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition group-hover:text-white">
                  View courses
                  <span aria-hidden className="transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/states"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition hover:gap-3"
            >
              Browse all states & categories
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Learning formats */}
        <section className="relative overflow-hidden border-y border-primary-light bg-surface">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, rgba(10,41,77,0.08), transparent 40%), radial-gradient(circle at 88% 70%, rgba(244,166,35,0.12), transparent 35%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark">
                How you learn
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Train on a schedule that works for you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Every format leads to the same NYSDEC-aligned preparation — pick the one that fits
                your life.
              </p>
            </div>

            <div className="mt-14 space-y-10">
              {LEARNING_OPTIONS.map((option, index) => {
                const reverse = index % 2 === 1;
                return (
                  <article
                    key={option.key}
                    className={[
                      "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                      reverse ? "lg:[&>*:first-child]:order-2" : "",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={assets.learningOptions[option.key]}
                        alt=""
                        className="aspect-[16/10] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                      />
                    </div>
                    <div>
                      <span className="font-display text-5xl font-semibold text-primary-light">
                        0{index + 1}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                        {option.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
                        {option.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Instructor / why choose */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary-light via-seal/20 to-transparent animate-[soft-pulse_5s_ease-in-out_infinite]"
                aria-hidden
              />
              <img
                src={assets.instructorPhoto}
                alt={brand.leadInstructor}
                className="relative aspect-square w-full rounded-[1.5rem] object-cover object-top shadow-[0_24px_60px_rgba(10,41,77,0.18)]"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                Lead instruction
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Learn from an Associate Certified Entomologist
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Guided by {brand.leadInstructor}, our programs combine field-ready knowledge with
                clear exam preparation approved by {brand.approvingBody}.
              </p>
              <ul className="mt-10 space-y-6">
                {WHY_POINTS.map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{point.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{point.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-primary">
          <img
            src={assets.whyChooseUsBanner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary-dark/90" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ready to start your certification journey?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Choose your state, pick a category, and enroll in a course built for real exam
                success.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/states"
                className="inline-flex items-center justify-center rounded-lg bg-seal px-6 py-3.5 text-sm font-semibold text-primary-dark transition hover:bg-[#ffb84a]"
              >
                Get started
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call {brand.contact.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
