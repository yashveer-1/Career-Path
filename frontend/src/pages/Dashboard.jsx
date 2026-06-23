import { useEffect, useState } from "react";
import { CheckCircle2, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import SkillGapAnalyzer from "./SkillGapAnalyzer.jsx";

export default function Dashboard() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [notice, setNotice] = useState(location.state?.notice || "");

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
    <>
      <div className="fixed right-4 top-4 z-[120] flex items-center gap-2">
        <div className="hidden rounded-xl border border-white/15 bg-ink/80 px-3 py-2 text-right text-white shadow-lg backdrop-blur sm:block">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Signed in as
          </p>
          <p className="max-w-44 truncate text-xs font-bold">
            {currentUser?.name}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-ink/80 text-white shadow-lg backdrop-blur transition hover:bg-rose-600"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed left-1/2 top-4 z-[130] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <CheckCircle2 size={18} />
          {notice}
        </div>
      )}
      <SkillGapAnalyzer />
    </>
  );
}
