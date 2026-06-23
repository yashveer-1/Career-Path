import { CalendarDays, ChevronRight, History } from "lucide-react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));

export default function HistoryPanel({ history, activeId, onSelect }) {
  return (
    <section className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          <History size={19} />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Analysis history</h2>
          <p className="text-xs text-slate-500">{history.length} saved reports</p>
        </div>
      </div>

      <div className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
        {history.length ? (
          history.map((analysis) => {
            const isActive = analysis._id === activeId;
            return (
              <button
                key={analysis._id}
                type="button"
                onClick={() => onSelect(analysis)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  isActive
                    ? "border-blue-300 bg-blue-50 dark:border-blue-500/40 dark:bg-blue-500/10"
                    : "border-slate-100 bg-white/50 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-800/40"
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 font-display text-xs font-bold text-blue-700 dark:bg-slate-700 dark:text-blue-300">
                  {analysis.readinessScore}%
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">
                    {analysis.targetCareer}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <CalendarDays size={12} />
                    {formatDate(analysis.createdAt)}
                  </span>
                </span>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            );
          })
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-sm text-slate-500 dark:border-slate-700">
            Your completed analyses will appear here.
          </p>
        )}
      </div>
    </section>
  );
}
