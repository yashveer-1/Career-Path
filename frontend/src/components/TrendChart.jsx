import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const shortDate = (value) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(value)
  );

export default function TrendChart({ history, activeCareer }) {
  const data = history
    .filter((analysis) => analysis.targetCareer === activeCareer)
    .slice()
    .reverse()
    .map((analysis) => ({
      date: shortDate(analysis.createdAt),
      score: analysis.readinessScore
    }));

  if (data.length < 2) {
    return (
      <section className="glass-card p-6">
        <h2 className="font-display text-lg font-bold">Readiness trend</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Complete another {activeCareer} analysis to unlock your progress chart.
        </p>
      </section>
    );
  }

  const change = data.at(-1).score - data.at(-2).score;

  return (
    <section className="glass-card p-5 sm:p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Readiness trend
          </p>
          <h2 className="mt-1 font-display text-lg font-bold">{activeCareer}</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            change >= 0
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}% vs last time
        </span>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Readiness"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
