import { useState } from "react";
import { LockKeyhole, Mail, UserRound, UserRoundPlus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthField from "../components/auth/AuthField.jsx";
import AuthShell from "../components/auth/AuthShell.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function Register() {
  const navigate = useNavigate();
  const { currentUser, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (currentUser) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", {
        replace: true,
        state: {
          notice: "Account created successfully. Your PathFinder journey begins now."
        }
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell mode="register">
      <div className="glass-card p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          Start your journey
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Save your progress and build a career plan that grows with you.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <AuthField
            id="name"
            label="Full name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="John Doe"
            icon={<UserRound size={18} />}
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />
          <AuthField
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
          <AuthField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            icon={<LockKeyhole size={18} />}
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value
              }))
            }
          />
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserRoundPlus
              size={18}
              className={submitting ? "animate-pulse" : ""}
            />
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
