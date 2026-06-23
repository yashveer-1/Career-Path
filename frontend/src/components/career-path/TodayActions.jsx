import { CalendarCheck2, Check, Clock3 } from "lucide-react";

export default function TodayActions({ tasks, updatingId, onToggle }) {
  return (
    <section className="glass-card p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          <CalendarCheck2 size={22} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Your clear next step
          </p>
          <h3 className="font-display text-xl font-bold">Today&apos;s action</h3>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <button
            type="button"
            key={task._id}
            disabled={updatingId === task._id}
            onClick={() => onToggle("daily", task)}
            className={`group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
              task.completed
                ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                : "border-slate-200 bg-white/70 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60"
            }`}
          >
            <span
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition ${
                task.completed
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 group-hover:border-blue-500 dark:border-slate-600"
              }`}
            >
              {task.completed && <Check size={15} strokeWidth={3} />}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block text-sm font-bold ${
                  task.completed ? "text-emerald-800 line-through dark:text-emerald-300" : ""
                }`}
              >
                {task.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                {task.description}
              </span>
            </span>
            <Clock3 size={15} className="mt-1 shrink-0 text-slate-400" />
          </button>
        ))}
      </div>
    </section>
  );
}
