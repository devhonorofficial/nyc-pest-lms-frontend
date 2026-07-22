import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-surface font-body text-ink">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-14 lg:py-16">
        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(10,41,77,0.1)] ring-1 ring-primary-light">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-linear-to-br from-primary via-primary-dark to-[#0d3a66] px-8 py-10 text-white sm:px-10 lg:py-14">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-seal">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                Order confirmed
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Payment successful 🎉
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                Your enrollment is in place, and your account details were captured at checkout.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <div className="rounded-2xl bg-primary-light/50 px-5 py-4 ring-1 ring-primary-light">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-dark">
                  What happens next
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Your order is confirmed and you're enrolled. We’ve created your account using the
                  email address you entered at checkout.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-primary-light">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                    Access dashboard
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Your student dashboard is ready — sign in anytime to watch your course videos and
                    track your progress.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 ring-1 ring-primary-light">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                    Support
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Need help? Reach out to our team if you want confirmation details or have any
                    questions about your enrollment.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.75 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl border border-primary-light bg-surface px-5 py-2.75 text-sm font-semibold text-primary-dark transition hover:bg-primary-light"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
