import { Check, Flag, Trophy } from "lucide-react";

export default function MonthlyMilestones({
  milestones,
  updatingId,
  onToggle
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          <Flag size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Six-month destination map
          </p>
          <h3 className="font-display text-xl font-bold">Monthly milestones</h3>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <article
            key={milestone._id}
            className={`glass-card-hover relative overflow-hidden p-5 ${
              milestone.completed ? "ring-2 ring-emerald-400/50" : ""
            }`}
          >
            <span className="absolute right-4 top-4 font-display text-4xl font-extrabold text-slate-100 dark:text-slate-800">
              {milestone.month}
            </span>
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl ${
                milestone.completed
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                  : "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
              }`}
            >
              {milestone.completed ? <Trophy size={20} /> : <Flag size={19} />}
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Month {milestone.month}
            </p>
            <h4 className="mt-1 font-display text-lg font-bold">
              {milestone.title}
            </h4>
            <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {milestone.description}
            </p>
            <button
              type="button"
              disabled={updatingId === milestone._id}
              onClick={() => onToggle("monthly", milestone)}
              className={`mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                milestone.completed
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <Check size={14} />
              {milestone.completed ? "Completed" : "Mark complete"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
