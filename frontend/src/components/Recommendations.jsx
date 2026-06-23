import { ArrowUpRight, Lightbulb } from "lucide-react";

const categoryStyles = {
  Beginner: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  Advanced: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"
};

export default function Recommendations({ category, recommendations }) {
  return (
    <section className="glass-card p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          <Lightbulb size={21} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recommendation level
          </p>
          <h2 className="font-display text-xl font-bold">Your next best moves</h2>
        </div>
        <span
          className={`ml-auto rounded-full px-3 py-1.5 text-xs font-bold ${categoryStyles[category]}`}
        >
          {category}
        </span>
      </div>
      <div className="mt-6 grid gap-3">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation}
            className="flex gap-3 rounded-xl border border-slate-100 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-800/50"
          >
            <ArrowUpRight
              size={18}
              className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
            />
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {recommendation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
