export default function AuthField({
  icon,
  label,
  id,
  error,
  ...inputProps
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-slate-400">
          {icon}
        </span>
        <input
          id={id}
          className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
            error
              ? "border-rose-400"
              : "border-slate-200 dark:border-slate-700"
          }`}
          {...inputProps}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
