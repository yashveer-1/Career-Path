import {
  BadgeCheck,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function MentorInsights({ progress }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="glass-card p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
            <ShieldCheck size={21} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              Transparent guidance
            </p>
            <h3 className="font-display text-xl font-bold">
              Why this path was chosen
            </h3>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {progress.reasoning.map((reason) => (
            <div key={reason} className="flex gap-3">
              <BadgeCheck
                size={18}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {reason}
              </p>
            </div>
          ))}
        </div>
        {progress.contextUsed.length > 0 && (
          <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Personalized using your {progress.contextUsed.join(", ")}.
          </p>
        )}
      </section>

      <section className="glass-card relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white sm:p-7">
        <Sparkles className="absolute -right-5 -top-5 text-white/10" size={120} />
        <div className="relative">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
            <HeartHandshake size={23} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
            Confidence booster
          </p>
          <blockquote className="mt-3 font-display text-2xl font-bold leading-snug">
            “{progress.motivationalMessage}”
          </blockquote>
          <p className="mt-5 text-sm leading-6 text-blue-100/80">
            You do not need to finish the whole path today. You only need to
            complete today&apos;s next action.
          </p>
        </div>
      </section>

      <section className="lg:col-span-2">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <Quote size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Proof from relatable journeys
            </p>
            <h3 className="font-display text-xl font-bold">
              Students who followed similar paths
            </h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {progress.successStories.map((story) => (
            <article key={story.name} className="glass-card-hover p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber to-orange-500 font-display text-lg font-bold text-white">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold">{story.name}</h4>
                  <p className="text-xs text-slate-500">{story.background}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-rose-50 p-3 dark:bg-rose-500/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Started
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {story.started}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Outcome
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {story.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
