import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StepProgress from "../components/StepProgress";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

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
              <span className="text-ink">Cart</span>
            </nav>

            <div className="mt-8">
              <StepProgress current={4} />
            </div>

            <div className="mt-8 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                {itemCount > 0 ? "Step 4 of 4 · Review order" : "Your cart"}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Review your cart
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Choose your course lineup, confirm the order, and continue to secure checkout.
              </p>
            </div>
          </div>
        </section>

        {items.length === 0 ? (
          <section className="mx-auto max-w-4xl px-6 py-14">
            <div className="rounded-[28px] border border-dashed border-primary-light bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(10,41,77,0.05)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
                </svg>
              </div>
              <p className="mt-6 font-display text-3xl font-semibold text-ink">Your cart is empty</p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate">
                Browse approved courses to find one that fits your license category and add it to your cart.
              </p>
              <Link
                to="/states"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.75 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Browse courses
              </Link>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-6xl px-6 py-12 lg:py-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
              <div>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">Order items</h2>
                    <p className="mt-1 text-sm text-slate">
                      {itemCount} course{itemCount === 1 ? "" : "s"} selected · one seat each
                    </p>
                  </div>
                  <Link to="/states" className="text-sm font-semibold text-primary-dark transition hover:underline">
                    Keep browsing
                  </Link>
                </div>

                <ul className="space-y-4">
                  {items.map(({ course, quantity }) => (
                    <li
                      key={course.slug}
                      className="flex gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:p-5"
                    >
                      <img src={course.thumbnail} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24" />
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
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span className="font-display text-xl font-semibold text-ink">
                            ${(course.price * quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(course.slug)}
                            className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-slate ring-1 ring-primary-light transition hover:bg-danger/10 hover:text-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl bg-primary-light/50 px-5 py-4 text-sm text-primary-dark ring-1 ring-primary-light">
                  <p className="font-semibold">Before you continue</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate">
                    Each course is a single seat tied to your account. Once payment is complete, you’ll receive enrollment confirmation and access details by email.
                  </p>
                </div>
              </div>

              <aside className="h-fit lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(10,41,77,0.1)] ring-1 ring-primary-light">
                  <div className="bg-gradient-to-br from-primary via-primary-dark to-[#0d3a66] px-6 py-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
                      Order summary
                    </p>
                    <p className="mt-2 font-display text-4xl font-semibold">${subtotal.toFixed(2)}</p>
                    <p className="mt-1 text-sm text-white/70">Taxes calculated at checkout</p>
                  </div>

                  <div className="space-y-5 px-6 py-6">
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate">Items</dt>
                        <dd className="font-semibold text-ink">{itemCount}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-slate">Subtotal</dt>
                        <dd className="font-semibold text-ink">${subtotal.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-primary-light pt-3">
                        <dt className="font-medium text-ink">Total due</dt>
                        <dd className="font-display text-xl font-semibold text-ink">${subtotal.toFixed(2)}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      onClick={() => navigate("/checkout")}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-seal px-4 py-3.5 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-[#ffb84a]"
                    >
                      Proceed to checkout
                    </button>

                    <Link
                      to="/states"
                      className="block text-center text-xs font-semibold text-primary-dark transition hover:underline"
                    >
                      ← Continue browsing
                    </Link>

                    <p className="text-center text-xs text-slate">One seat per purchase. Secure payment via Stripe.</p>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
