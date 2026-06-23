import { CheckCircle2, Flag, ListChecks } from "lucide-react";

export default function PathProgressTracker({ progress }) {
  const completedDaily = progress.dailyTasks.filter((item) => item.completed).length;
  const completedWeekly = progress.weeklyGoals.filter((item) => item.completed).length;
  const completedMonthly = progress.monthlyMilestones.filter(
    (item) => item.completed
  ).length;

  return (
    <section className="glass-card overflow-hidden p-6 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full p-2"
          style={{
            background: `conic-gradient(#2563eb ${progress.completionPercentage * 3.6}deg, rgba(148,163,184,.2) 0deg)`
          }}
        >
          <div className="grid h-full w-full place-items-center rounded-full bg-white text-center dark:bg-slate-900">
            <span>
              <strong className="block font-display text-2xl">
                {progress.completionPercentage}%
              </strong>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Complete
              </span>
            </span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Your accountability tracker
          </p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Small wins become career momentum
          </h3>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          [
            <CheckCircle2 key="daily" size={17} />,
            completedDaily,
            progress.dailyTasks.length,
            "Today"
          ],
          [
            <ListChecks key="weekly" size={17} />,
            completedWeekly,
            progress.weeklyGoals.length,
            "Weeks"
          ],
          [
            <Flag key="monthly" size={17} />,
            completedMonthly,
            progress.monthlyMilestones.length,
            "Months"
          ]
        ].map(([icon, completed, total, label]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-100 bg-white/60 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40"
          >
            <span className="mx-auto block w-fit text-blue-600 dark:text-blue-400">
              {icon}
            </span>
            <p className="mt-1 font-display text-lg font-bold">
              {completed}/{total}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
