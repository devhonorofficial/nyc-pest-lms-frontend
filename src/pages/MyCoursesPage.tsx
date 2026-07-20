import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

interface EnrollmentRow {
  courseSlug: string;
  courseTitle: string;
  stateCode: string;
  categoryCode: string;
  creditHours: number;
  purchasedAt: string;
}

export default function MyCoursesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/api/enrollments/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load enrollments");
        return res.json();
      })
      .then((data) => setEnrollments(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong"))
      .finally(() => setLoading(false));
  }, [token]);

  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      <Header />

      <main>
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
              <span className="text-ink">My Courses</span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">Your learning dashboard</p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                My Courses
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {user ? `Signed in as ${user.email}` : "Manage your purchased courses in one place."}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-14">
          {loading && (
            <div className="rounded-2xl bg-white px-6 py-10 text-center shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
              <p className="font-display text-xl font-semibold text-ink">Loading your courses…</p>
              <p className="mt-2 text-sm text-slate">We’re pulling your enrollments now.</p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-danger/20 bg-danger/5 px-5 py-4 text-sm text-danger">
              {error}
            </div>
          )}

          {!loading && !error && enrollments.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-primary-light bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(10,41,77,0.05)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
                  <path d="M8 9.5h8M8 13h5" />
                </svg>
              </div>
              <p className="mt-6 font-display text-3xl font-semibold text-ink">No courses yet</p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate">
                Your purchased training will appear here as soon as checkout is complete.
              </p>
              <Link
                to="/states"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.75 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Browse courses
              </Link>
            </div>
          )}

          {!loading && enrollments.length > 0 && (
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">Enrollment history</h2>
                  <p className="mt-1 text-sm text-slate">
                    {enrollments.length} purchased course{enrollments.length === 1 ? "" : "s"}
                  </p>
                </div>
                <Link to="/states" className="text-sm font-semibold text-primary-dark transition hover:underline">
                  Find more courses
                </Link>
              </div>

              <ul className="space-y-4">
                {enrollments.map((e) => (
                  <li
                    key={e.courseSlug}
                    className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
                        {e.stateCode} · Category {e.categoryCode}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{e.courseTitle}</h3>
                      <p className="mt-1 text-xs text-slate">
                        {e.creditHours} credit hrs · Purchased {new Date(e.purchasedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span className="rounded-full bg-primary-light px-3.5 py-1 text-[11px] font-semibold text-primary-dark">
                        Video access coming soon
                      </span>
                      <Link
                        to="/states"
                        className="text-xs font-semibold text-primary-dark transition hover:underline"
                      >
                        View course details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
