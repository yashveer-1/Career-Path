import { CheckCircle2, CircleX } from "lucide-react";

export default function SkillChips({ title, skills, variant }) {
  const matched = variant === "matched";
  const Icon = matched ? CheckCircle2 : CircleX;

  return (
    <section className="glass-card-hover p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon
          size={20}
          className={matched ? "text-emerald-500" : "text-rose-500"}
        />
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800">
          {skills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                matched
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {matched ? "No matched skills yet." : "No missing skills—excellent work."}
          </p>
        )}
      </div>
    </section>
  );
}
