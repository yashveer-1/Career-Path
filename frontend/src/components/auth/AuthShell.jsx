import { BrainCircuit, Route, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthShell({ mode, children }) {
  const isLogin = mode === "login";

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-ink lg:grid-cols-[1.05fr_.95fr]">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />

      <section className="relative z-10 hidden flex-col justify-between p-12 text-white lg:flex xl:p-16">
        <Link to="/" className="font-display text-2xl font-extrabold">
          Path<span className="text-amber">Finder</span>
        </Link>
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
            <Sparkles size={15} />
            Your career journey, remembered
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-tight">
            Turn uncertainty into
            <span className="block text-amber">a path you can follow.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
            Save your readiness analyses, track personal milestones, and return
            to the exact next step whenever you are ready.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              [<BrainCircuit key="analysis" size={20} />, "Skill intelligence"],
              [<Route key="path" size={20} />, "Personal paths"],
              [<ShieldCheck key="secure" size={20} />, "Secure progress"]
            ].map(([icon, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <span className="text-amber">{icon}</span>
                <p className="mt-3 text-xs font-bold leading-5 text-white/75">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/35">
          Personalized career guidance built around your progress.
        </p>
      </section>

      <section className="relative z-10 flex min-h-screen items-center justify-center bg-cream/95 px-5 py-10 backdrop-blur dark:bg-slate-950/95 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 block text-center font-display text-2xl font-extrabold text-ink dark:text-white lg:hidden"
          >
            Path<span className="text-amber">Finder</span>
          </Link>
          {children}
          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "New to PathFinder?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
