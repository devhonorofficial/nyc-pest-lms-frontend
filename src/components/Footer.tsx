import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { assets } from "../config/assets";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Courses", href: "/states" },
  { label: "In-Person Classes", href: "#" },
  { label: "Webinar", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
] as const;

function FooterLink({ label, href }: { label: string; href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className="text-white/70 transition hover:text-white">
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className="text-white/70 transition hover:text-white">
      {label}
    </a>
  );
}

export default function Footer() {
  const phoneHref = `tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={assets.footerLogo}
                alt=""
                className="h-12 w-12 rounded-full object-contain ring-1 ring-white/15"
              />
              <div>
                <p className="font-display text-lg font-semibold">{brand.name}</p>
                <p className="text-xs text-white/55">{brand.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {brand.contact.address}
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/75">
              <a href={phoneHref} className="block transition hover:text-seal">
                {brand.contact.phone}
              </a>
              <a href={`mailto:${brand.contact.email}`} className="block transition hover:text-seal">
                {brand.contact.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-seal">
              Follow us
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={brand.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={brand.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition hover:text-white"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NYC Pest Management School. All rights reserved.</p>
          <p>Approved by {brand.approvingBody}</p>
        </div>
      </div>
    </footer>
  );
}
