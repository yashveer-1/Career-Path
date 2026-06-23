import { BriefcaseBusiness, Code2, GraduationCap } from "lucide-react";

const icons = {
  learning: GraduationCap,
  project: Code2,
  career: BriefcaseBusiness
};

export default function RoadmapTimeline({ roadmap }) {
  return (
    <section className="glass-card p-6 sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
        Personalized plan
      </p>
      <h2 className="section-title">Your month-by-month roadmap</h2>
      <div className="relative mt-8">
        <div className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 sm:left-6" />
        <div className="space-y-5">
          {roadmap.map((item, index) => {
            const Icon = icons[item.type] || GraduationCap;
            return (
              <article
                key={`${item.month}-${item.title}`}
                className="relative flex gap-4 animate-fade-up sm:gap-5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 sm:h-12 sm:w-12">
                  <Icon size={19} />
                </div>
                <div className="flex-1 rounded-2xl border border-slate-100 bg-white/65 p-4 transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/45 dark:hover:border-blue-500/40 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Month {item.month}
                  </p>
                  <h3 className="mt-1 font-display font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
