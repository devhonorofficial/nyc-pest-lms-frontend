import { Link } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import { MOCK_ENROLLMENTS } from "../../config/mockEnrollments";
import { UserIcon } from "../../components/dashboard/icons";

export default function DashboardProfilePage() {
  const { profile } = useProfile();
  const initials =
    profile.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";

  const fields = [
    { label: "Full name", value: profile.fullName || "—" },
    { label: "Email address", value: profile.email || "—" },
    { label: "Phone number", value: profile.phone || "Not provided" },
    {
      label: "Member since",
      value: new Date(profile.registeredAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { label: "Courses purchased", value: String(MOCK_ENROLLMENTS.length) },
  ];

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">My Profile</h2>
          <p className="mt-1 text-sm text-slate">Your account details on file.</p>
        </div>
        <Link
          to="/dashboard/settings"
          className="text-sm font-semibold text-primary-dark transition hover:underline"
        >
          Edit profile
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-xl font-semibold text-primary-dark">
            {initials === "?" ? <UserIcon className="h-7 w-7" /> : initials}
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink">{profile.fullName || "Student"}</p>
            <p className="text-sm text-slate">{profile.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="rounded-xl bg-surface px-4 py-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
