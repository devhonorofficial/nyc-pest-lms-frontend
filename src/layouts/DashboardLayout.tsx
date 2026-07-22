import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { useToast } from "../context/ToastContext";
import { BookIcon, GearIcon, HomeIcon, LogoutIcon, ReceiptIcon, UserIcon } from "../components/dashboard/icons";

const MAIN_NAV = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon, end: true },
  { to: "/dashboard/profile", label: "My Profile", icon: UserIcon, end: false },
  { to: "/dashboard/courses", label: "Enrolled Courses", icon: BookIcon, end: false },
  { to: "/dashboard/orders", label: "Order History", icon: ReceiptIcon, end: false },
] as const;

export default function DashboardLayout() {
  const { user, loading, logout } = useAuth();
  const { profile } = useProfile();
  const { success } = useToast();
  const navigate = useNavigate();

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  function handleLogout() {
    logout();
    success("You've been signed out.");
    navigate("/");
  }

  const navLinkClass = (isActive: boolean) =>
    [
      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
      isActive
        ? "bg-primary-light text-primary-dark"
        : "text-ink hover:bg-surface hover:text-primary-dark",
    ].join(" ");

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
          <div className="relative mx-auto max-w-6xl px-6 py-10 sm:py-12">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-slate" aria-label="Breadcrumb">
              <Link to="/" className="transition hover:text-primary-dark">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">Dashboard</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seal">
                  Student dashboard
                </p>
                <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  Welcome{profile.fullName ? `, ${profile.fullName}` : ""}
                </h1>
                <p className="mt-2 text-sm text-slate">{user?.email}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light">
                <nav className="space-y-1" aria-label="Dashboard">
                  {MAIN_NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => navLinkClass(isActive)}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <p className="mt-5 mb-2 px-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
                  Account
                </p>
                <nav className="space-y-1" aria-label="Account">
                  <NavLink to="/dashboard/settings" className={({ isActive }) => navLinkClass(isActive)}>
                    <GearIcon className="h-5 w-5 shrink-0" />
                    Settings
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-slate transition hover:bg-red-50 hover:text-danger"
                  >
                    <LogoutIcon className="h-5 w-5 shrink-0" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            <div className="min-w-0">
              <Outlet />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
