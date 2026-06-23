import { ArrowUpRight, BookOpen, CircleDollarSign } from "lucide-react";

export default function CourseCards({ resources }) {
  if (!resources.length) return null;

  return (
    <section>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
        Curated learning
      </p>
      <h2 className="section-title">Recommended courses</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <article key={resource.skill} className="glass-card-hover overflow-hidden p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <BookOpen size={20} />
              </div>
              <h3 className="font-display font-bold">{resource.skill}</h3>
            </div>
            <div className="space-y-3">
              <a
                href={resource.free.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 transition hover:border-emerald-300 dark:border-emerald-500/15 dark:bg-emerald-500/5"
              >
                <BookOpen size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Free course
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {resource.free.title}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-slate-400 transition group-hover:text-emerald-600"
                />
              </a>
              <a
                href={resource.paid.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3.5 transition hover:border-amber-300 dark:border-amber-500/15 dark:bg-amber-500/5"
              >
                <CircleDollarSign
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Paid course
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {resource.paid.title}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-slate-400 transition group-hover:text-amber-600"
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
