import { useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { useToast } from "../../context/ToastContext";
import { AuthField, authInputClassName, authButtonClassName } from "../../components/AuthShell";

export default function DashboardSettingsPage() {
  const { profile, updateProfile } = useProfile();
  const { success } = useToast();
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setPhone(profile.phone);
  }, [profile]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    updateProfile({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim() });
    success("Profile updated.");
    setSaving(false);
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold text-ink">Settings</h2>
        <p className="mt-1 text-sm text-slate">Update your personal details.</p>
      </div>

      <div className="max-w-xl rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(10,41,77,0.05)] ring-1 ring-primary-light sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthField label="Full name" id="settings-name">
            <input
              id="settings-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className={authInputClassName}
            />
          </AuthField>

          <AuthField label="Email address" id="settings-email">
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={authInputClassName}
            />
          </AuthField>

          <AuthField label="Phone number" id="settings-phone">
            <input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-5555"
              className={authInputClassName}
            />
          </AuthField>

          <button type="submit" disabled={saving} className={authButtonClassName}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
