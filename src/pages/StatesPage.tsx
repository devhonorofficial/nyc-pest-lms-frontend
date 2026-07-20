import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StepProgress from "../components/StepProgress";
import { brand } from "../config/brand";
import { LAUNCH_STATES } from "../config/licenseCategories";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function StateTileGraphic({ code, featured }: { code: string; featured?: boolean }) {
  return (
    <div
      className={[
        "relative flex h-40 items-center justify-center overflow-hidden",
        featured
          ? "bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66]"
          : "bg-gradient-to-br from-primary-light via-surface to-[#dce8f4]",
      ].join(" ")}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: featured
            ? "radial-gradient(circle at 20% 30%, rgba(244,166,35,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.12), transparent 40%)"
            : "radial-gradient(circle at 18% 25%, rgba(10,41,77,0.08), transparent 40%), radial-gradient(circle at 85% 75%, rgba(244,166,35,0.15), transparent 35%)",
        }}
        aria-hidden
      />
      <div
        className={[
          "relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg ring-1 transition duration-300 group-hover:scale-105",
          featured
            ? "bg-white/10 ring-white/25 backdrop-blur-sm"
            : "bg-white ring-primary/10",
        ].join(" ")}
      >
        <span
          className={[
            "font-display text-2xl font-semibold tracking-tight",
            featured ? "text-white" : "text-primary-dark",
          ].join(" ")}
        >
          {code}
        </span>
      </div>
      {featured && (
        <span className="absolute left-4 top-4 rounded-full bg-seal px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-dark">
          Launch state
        </span>
      )}
    </div>
  );
}

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      <Header />

      <main>
        {/* Intro band */}
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
            <nav className="flex items-center gap-2 text-xs text-slate" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-primary-dark">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">States</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={1} />
            </div>

            <div className="mt-8 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                Step 1 of 4
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Find your state&apos;s approved courses
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Course content, exam requirements, and certificates follow each state&apos;s licensing
                board. Choose the state where your license is — or will be — issued.
              </p>
            </div>
          </div>
        </section>

        {/* State grid */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Available states</h2>
              <p className="mt-1 text-sm text-slate">
                {LAUNCH_STATES.length} states ready · more coming soon
              </p>
            </div>
            <p className="text-xs text-slate">
              Need help?{" "}
              <a
                href={`tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`}
                className="font-semibold text-primary-dark hover:underline"
              >
                {brand.contact.phone}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {LAUNCH_STATES.map((state) => {
              const featured = state.code === brand.launchState.code;
              return (
                <Link
                  key={state.code}
                  to={`/states/${slugify(state.name)}`}
                  className={[
                    "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,41,77,0.06)] ring-1 transition duration-300",
                    "hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,41,77,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark",
                    featured ? "ring-seal/50" : "ring-primary-light",
                  ].join(" ")}
                >
                  <StateTileGraphic code={state.code} featured={featured} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold text-ink">{state.name}</h3>
                    <p className="mt-1 text-sm text-slate">
                      {state.categories.length} license categor
                      {state.categories.length === 1 ? "y" : "ies"}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {state.categories.map((cat) => (
                        <li
                          key={cat.code}
                          className="rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-dark"
                        >
                          {cat.code}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary-dark">
                      Select {state.name}
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

          <div className="mt-12 overflow-hidden rounded-2xl bg-primary px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                  Don&apos;t see your state?
                </p>
                <p className="mt-1 max-w-lg text-sm text-white/70">
                  We&apos;re expanding approved training across more boards. Reach out and we&apos;ll
                  help you find the right path.
                </p>
              </div>
              <a
                href={`mailto:${brand.contact.email}`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-seal px-5 py-3 text-sm font-semibold text-primary-dark transition hover:bg-[#ffb84a]"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
