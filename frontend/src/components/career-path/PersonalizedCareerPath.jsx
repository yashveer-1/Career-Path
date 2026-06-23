import { BrainCircuit, LoaderCircle, Route } from "lucide-react";
import MentorInsights from "./MentorInsights.jsx";
import MonthlyMilestones from "./MonthlyMilestones.jsx";
import PathProgressTracker from "./PathProgressTracker.jsx";
import TodayActions from "./TodayActions.jsx";
import WeeklyPathTimeline from "./WeeklyPathTimeline.jsx";

export default function PersonalizedCareerPath({
  progress,
  loading,
  error,
  updatingId,
  onToggle
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-blue-200/70 bg-gradient-to-br from-blue-50/80 via-white/70 to-violet-50/80 p-5 shadow-2xl shadow-blue-900/10 dark:border-blue-500/20 dark:from-blue-950/30 dark:via-slate-900/70 dark:to-violet-950/30 sm:p-8">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="relative">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <Route size={15} />
              Your personal mentor plan
            </div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Your Personalized Career Path
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              A practical route from where you are today to a portfolio,
              interview preparation, and internship applications.
            </p>
          </div>
          {progress && (
            <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-right shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
              <p className="text-xs text-slate-500">Mentor path for</p>
              <p className="font-display font-bold text-blue-700 dark:text-blue-300">
                {progress.career}
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="glass-card grid min-h-72 place-items-center">
            <div className="text-center">
              <LoaderCircle
                size={34}
                className="mx-auto animate-spin text-blue-600"
              />
              <p className="mt-4 font-display font-bold">
                Building your personal action plan…
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Turning skill gaps into clear next steps.
              </p>
            </div>
          </div>
        ) : error && !progress ? (
          <div className="glass-card grid min-h-56 place-items-center p-8 text-center">
            <div>
              <BrainCircuit size={34} className="mx-auto text-rose-500" />
              <p className="mt-4 font-display font-bold">
                Your mentor plan could not be loaded
              </p>
              <p className="mt-2 text-sm text-slate-500">{error}</p>
            </div>
          </div>
        ) : progress ? (
          <div className="space-y-6">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
              >
                {error}
              </div>
            )}
            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <PathProgressTracker progress={progress} />
              <TodayActions
                tasks={progress.dailyTasks}
                updatingId={updatingId}
                onToggle={onToggle}
              />
            </div>
            <WeeklyPathTimeline
              goals={progress.weeklyGoals}
              updatingId={updatingId}
              onToggle={onToggle}
            />
            <MonthlyMilestones
              milestones={progress.monthlyMilestones}
              updatingId={updatingId}
              onToggle={onToggle}
            />
            <MentorInsights progress={progress} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
