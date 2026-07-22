import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell, { AuthField, authButtonClassName, authInputClassName } from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9.3 3.1 11 7.5a12.3 12.3 0 0 1-4.2 5.1M6.1 6.1A12.4 12.4 0 0 0 1 12.5C2.7 16.9 7 20 12 20c1.4 0 2.7-.2 3.9-.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M1 12.5C2.7 8.1 7 5 12 5s9.3 3.1 11 7.5c-1.7 4.4-6 7.5-11 7.5S2.7 16.9 1 12.5Z" />
      <circle cx="12" cy="12.5" r="3" />
    </svg>
  );
}

export default function RegisterPage() {
  const { register } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      success("Account created — you're signed in.");
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Use the same email you checked out with and we’ll link your purchases automatically."
      panelTitle="Start learning with confidence"
      panelBody="Join NYC Pest Management School and unlock NYSDEC-approved courses designed for certification success."
      footer={
        <p className="text-center text-sm text-slate">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary-dark underline-offset-2 hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField label="Full name" id="register-name" hint="Optional, but helpful on certificates">
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={authInputClassName}
          />
        </AuthField>

        <AuthField label="Email" id="register-email">
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={authInputClassName}
          />
        </AuthField>

        <AuthField label="Password" id="register-password" hint="At least 8 characters">
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className={`${authInputClassName} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate transition hover:text-primary-dark"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </AuthField>

        {error && (
          <div className="rounded-xl border border-danger/20 bg-danger/5 px-3.5 py-2.5 text-sm text-danger" role="alert">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className={authButtonClassName}>
          {loading ? "Creating your account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
