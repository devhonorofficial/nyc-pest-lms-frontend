import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { brand } from "../config/brand";
import { assets } from "../config/assets";

const HIGHLIGHTS = [
  "Access purchased courses anytime",
  "Track progress toward certification",
  "NYSDEC-approved training pathways",
] as const;

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  panelTitle?: string;
  panelBody?: string;
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  panelTitle = "Continue your certification journey",
  panelBody = "Sign in to pick up where you left off — courses, progress, and exam prep in one place.",
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
      <Header />

      <main className="relative flex flex-1 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 12%, rgba(10,41,77,0.07), transparent 42%), radial-gradient(circle at 92% 88%, rgba(244,166,35,0.1), transparent 38%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-stretch px-6 py-10 lg:grid-cols-2 lg:gap-0 lg:py-14">
          {/* Brand panel */}
          <aside className="relative hidden overflow-hidden rounded-l-3xl lg:block">
            <img
              src={assets.heroBackground}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark/92 to-primary/80" />
            <div className="relative flex h-full min-h-[560px] flex-col justify-between p-10 text-white">
              <div>
                <Link to="/" className="inline-flex items-center gap-3">
                  <img
                    src={brand.logoUrl}
                    alt=""
                    className="h-11 w-11 rounded-full object-contain ring-1 ring-white/25"
                  />
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {brand.shortName}
                  </span>
                </Link>
                <h2 className="mt-14 max-w-sm font-display text-3xl font-semibold leading-tight xl:text-4xl">
                  {panelTitle}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                  {panelBody}
                </p>
              </div>

              <ul className="space-y-3">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-seal text-primary-dark">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form panel */}
          <section className="relative flex items-center rounded-3xl bg-white shadow-[0_24px_60px_rgba(10,41,77,0.08)] ring-1 ring-primary-light lg:rounded-l-none lg:rounded-r-3xl">
            <div className="w-full px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <img src={brand.logoUrl} alt="" className="h-10 w-10 rounded-full object-contain" />
                <span className="font-display text-base font-semibold text-primary-dark">
                  {brand.shortName}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                Student portal
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">{subtitle}</p>

              <div className="mt-8">{children}</div>
              <div className="mt-8">{footer}</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function AuthField({
  label,
  id,
  children,
  hint,
}: {
  label: string;
  id: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wide text-slate">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-slate">{hint}</p>}
    </div>
  );
}

export const authInputClassName =
  "mt-1.5 w-full rounded-xl border border-primary-light bg-surface/60 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/20";

export const authButtonClassName =
  "inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
