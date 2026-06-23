import { Check, LoaderCircle, Sparkles } from "lucide-react";

export default function AnalyzerForm({
  careers,
  careerSkills,
  career,
  selectedSkills,
  loading,
  onCareerChange,
  onSkillToggle,
  onSubmit
}) {
  const skills = careerSkills[career] || [];

  return (
    <form onSubmit={onSubmit} className="glass-card relative z-10 p-6 sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Your target
        </p>
        <h2 className="section-title">Build your readiness profile</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Pick a career, then select every skill you can use confidently today.
        </p>
      </div>

      <label
        htmlFor="career"
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        Target career
      </label>
      <select
        id="career"
        value={career}
        onChange={(event) => onCareerChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        {careers.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Skills you already have
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                type="button"
                key={skill}
                aria-pressed={isSelected}
                onClick={() => onSkillToggle(skill)}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-500/15 dark:text-blue-300"
                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </span>
                {skill}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={loading || !career}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Analyzing your skills…
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Analyze my skill gap
          </>
        )}
      </button>
    </form>
  );
}
