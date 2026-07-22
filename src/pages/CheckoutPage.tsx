import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StepProgress from "../components/StepProgress";
import { brand } from "../config/brand";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CheckoutPage() {
  const { items, subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const { error: showError } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.course.slug,
            title: i.course.title,
            price: i.course.price,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout session creation failed");
      const data = await res.json();
      window.location.href = data.url;
    } catch {
      const message = "Something went wrong starting checkout. Please try again.";
      setError(message);
      showError(message);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary-dark">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>
          </div>
          <p className="font-display text-3xl font-semibold text-ink">Your cart is empty</p>
          <p className="max-w-md text-sm text-slate">
            Add a course before checkout so we can start your secure Stripe payment.
          </p>
          <Link
            to="/states"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            ← Browse courses
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
              <Link to="/cart" className="transition hover:text-primary-dark">
                Cart
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">Checkout</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={4} />
            </div>

            <div className="mt-8 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                Step 4 of 4 · Secure payment
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Checkout
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Review your order, then continue to Stripe to complete payment securely.
              </p>
            </div>
          </div>
        </section>

        {/* Order + pay */}
        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
            {/* Order items */}
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">Order summary</h2>
                  <p className="mt-1 text-sm text-slate">
                    {itemCount} course{itemCount === 1 ? "" : "s"} · one seat each
                  </p>
                </div>
                <Link
                  to="/cart"
                  className="text-sm font-semibold text-primary-dark transition hover:underline"
                >
                  Edit cart
                </Link>
              </div>

              <ul className="space-y-4">
                {items.map(({ course, quantity }) => (
                  <li
                    key={course.slug}
                    className="flex gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:p-5"
                  >
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">
                        {course.stateCode} · Category {course.categoryCode}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate">
                        {course.creditHours} credit hrs · Qty {quantity} · {course.approvingBoard}
                      </p>
                      <p className="mt-3 font-display text-xl font-semibold text-ink">
                        ${(course.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-primary-light/50 px-5 py-4 text-sm text-primary-dark ring-1 ring-primary-light">
                <p className="font-semibold">After payment</p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  You&apos;ll get enrollment confirmation by email. Course access is tied to your
                  account — use the same email when you register or log in.
                </p>
              </div>
            </div>

            {/* Payment panel */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(10,41,77,0.1)] ring-1 ring-primary-light">
                <div className="bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66] px-6 py-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                    Amount due
                  </p>
                  <p className="mt-2 font-display text-4xl font-semibold">
                    ${subtotal.toFixed(2)}
                  </p>
                  <p className="mt-1 text-sm text-white/70">Taxes calculated by Stripe if applicable</p>
                </div>

                <div className="space-y-5 px-6 py-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Subtotal</dt>
                      <dd className="font-semibold text-ink">${subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate">Items</dt>
                      <dd className="font-semibold text-ink">{itemCount}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-primary-light pt-3">
                      <dt className="font-medium text-ink">Total</dt>
                      <dd className="font-display text-xl font-semibold text-ink">
                        ${subtotal.toFixed(2)}
                      </dd>
                    </div>
                  </dl>

                  {error && (
                    <div
                      className="rounded-xl border border-danger/20 bg-danger/5 px-3.5 py-2.5 text-sm text-danger"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-seal px-4 py-3.5 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-[#ffb84a] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      "Redirecting to payment…"
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Pay ${subtotal.toFixed(2)} with Stripe
                      </>
                    )}
                  </button>

                  <ul className="space-y-2 text-xs text-slate">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-success" aria-hidden>
                        ✓
                      </span>
                      Encrypted checkout powered by Stripe
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-success" aria-hidden>
                        ✓
                      </span>
                      One seat per course purchase
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-success" aria-hidden>
                        ✓
                      </span>
                      Instant enrollment confirmation by email
                    </li>
                  </ul>

                  <Link
                    to="/cart"
                    className="block text-center text-xs font-medium text-slate transition hover:text-primary-dark"
                  >
                    ← Return to cart
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate">
                Questions?{" "}
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-semibold text-primary-dark hover:underline"
                >
                  {brand.contact.email}
                </a>
              </p>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
