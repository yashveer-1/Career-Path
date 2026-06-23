export default function ReadinessScore({ score, career }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section className="glass-card-hover flex flex-col items-center justify-center p-7 text-center">
      <div className="relative h-52 w-52">
        <svg className="-rotate-90" viewBox="0 0 180 180" role="img">
          <title>{`${score}% career readiness for ${career}`}</title>
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            key={score}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              "--circumference": circumference,
              "--progress-offset": offset,
              strokeDashoffset: offset
            }}
            className="animate-progress-in"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-content-center">
          <span className="font-display text-5xl font-extrabold text-ink dark:text-white">
            {score}%
          </span>
          <span className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            Ready
          </span>
        </div>
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">Career Readiness</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{career}</p>
    </section>
  );
}
