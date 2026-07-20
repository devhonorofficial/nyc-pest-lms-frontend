import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand } from "../config/brand";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Courses", href: "/states" },
  { label: "In-Person Classes", href: "#" },
  { label: "Webinar", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Blog", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
] as const;

function NavItem({
  label,
  href,
  onNavigate,
  mobile = false,
}: {
  label: string;
  href: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const { pathname } = useLocation();
  const isActive = href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const className = mobile
    ? [
        "block py-3.5 text-sm font-medium transition-colors duration-200",
        isActive ? "text-primary-dark" : "text-ink hover:text-primary-dark",
      ].join(" ")
    : [
        "relative py-1 text-[13px] font-medium tracking-wide transition-colors duration-200",
        isActive ? "text-primary-dark" : "text-slate hover:text-primary-dark",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-seal after:transition-transform after:duration-200",
        isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
      ].join(" ");

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onNavigate}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onNavigate}>
      {label}
    </a>
  );
}

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  );
}

function PhoneIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const { success } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const phoneHref = `tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    success("You've been signed out.");
  }

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-[box-shadow,background-color] duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_8px_30px_rgba(10,41,77,0.08)] backdrop-blur-md"
          : "bg-white",
      ].join(" ")}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-primary-dark/10 bg-primary text-primary-light sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-[11px] tracking-wide">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-seal" />
              NYSDEC-Approved Training
            </span>
            <a
              href={`mailto:${brand.contact.email}`}
              className="hidden text-white/75 transition hover:text-white md:inline"
            >
              {brand.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1.5 font-medium text-white transition hover:text-seal"
            >
              <PhoneIcon className="h-3 w-3" />
              {brand.contact.phone}
            </a>
            <span className="hidden h-3 w-px bg-white/20 lg:block" />
            <span className="hidden text-white/60 lg:inline">{brand.contact.address}</span>
          </div>
        </div>
      </div>

      {/* Brand + actions */}
      <div className="border-b border-primary-light">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
          <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="relative shrink-0">
              <span className="absolute inset-0 rounded-full bg-primary-light opacity-0 transition group-hover:opacity-100" />
              <img
                src={brand.logoUrl}
                alt=""
                className="relative h-12 w-12 rounded-full object-contain ring-1 ring-primary-light transition group-hover:ring-primary/20"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold leading-tight text-primary-dark sm:text-base">
                {brand.name}
              </span>
              <span className="mt-0.5 hidden truncate text-[11px] text-slate sm:block">
                {brand.tagline}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-lg border border-primary-light bg-surface px-3 py-2 transition hover:border-primary/30 hover:bg-primary-light md:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <PhoneIcon className="h-3.5 w-3.5" />
              </span>
              <span className="pr-1 text-left">
                <span className="block text-[10px] uppercase tracking-wider text-slate">Call us</span>
                <span className="block text-sm font-semibold text-primary-dark">{brand.contact.phone}</span>
              </span>
            </a>

            <Link
              to="/cart"
              aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary-light text-ink transition hover:border-primary/25 hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-seal px-1 text-[10px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/my-courses"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-primary-light hover:text-primary-dark"
                >
                  My Courses
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-xs text-slate transition hover:bg-red-50 hover:text-danger"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark sm:inline-flex"
              >
                Log in
              </Link>
            )}

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-light text-primary-dark transition hover:bg-primary-light lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden border-b border-primary-light bg-surface/80 lg:block" aria-label="Primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.label} {...link} />
            ))}
          </div>
          <a
            href="https://lms.nycpestmanagementschool.com/dashboard/"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary-dark/80 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-dark transition hover:bg-primary hover:text-white"
          >
            LMS Login
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={[
          "border-b border-primary-light bg-white lg:hidden",
          "origin-top transition-[max-height,opacity] duration-300 ease-out",
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 overflow-hidden opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl space-y-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="border-b border-primary-light/70 last:border-0">
              <NavItem {...link} mobile onNavigate={closeMenu} />
            </div>
          ))}

          <div className="flex flex-col gap-2 pt-4">
            {user ? (
              <>
                <Link
                  to="/my-courses"
                  onClick={closeMenu}
                  className="rounded-lg bg-primary-light px-4 py-3 text-sm font-medium text-primary-dark"
                >
                  My Courses
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-4 py-3 text-left text-sm text-slate hover:bg-red-50 hover:text-danger"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Log in
              </Link>
            )}
            <a
              href="https://lms.nycpestmanagementschool.com/dashboard/"
              className="rounded-lg border border-primary-dark px-4 py-3 text-center text-sm font-semibold text-primary-dark"
            >
              LMS Login
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm font-medium text-primary-dark sm:hidden"
            >
              <PhoneIcon />
              {brand.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
