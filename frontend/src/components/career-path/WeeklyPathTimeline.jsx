import { Check, ChevronRight, ListChecks } from "lucide-react";

export default function WeeklyPathTimeline({ goals, updatingId, onToggle }) {
  return (
    <section className="glass-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          <ListChecks size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            First 30 days
          </p>
          <h3 className="font-display text-xl font-bold">Weekly direction</h3>
        </div>
      </div>
      <div className="relative mt-6 grid gap-3 md:grid-cols-2">
        {goals.map((goal) => (
          <article
            key={goal._id}
            className={`rounded-2xl border p-5 transition ${
              goal.completed
                ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                : "border-slate-200 bg-white/65 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-600 font-display text-xs font-bold text-white">
                W{goal.week}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-display font-bold">{goal.title}</h4>
                <ul className="mt-3 space-y-2">
                  {goal.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex gap-2 text-xs leading-5 text-slate-600 dark:text-slate-400"
                    >
                      <ChevronRight size={14} className="mt-0.5 shrink-0 text-blue-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              disabled={updatingId === goal._id}
              onClick={() => onToggle("weekly", goal)}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                goal.completed
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-700 dark:text-slate-200"
              }`}
            >
              <Check size={14} />
              {goal.completed ? "Week completed" : "Mark week complete"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
