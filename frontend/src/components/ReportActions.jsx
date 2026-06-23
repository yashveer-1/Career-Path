import { Download, FileJson } from "lucide-react";
import {
  exportAnalysisAsJson,
  exportAnalysisAsPdf
} from "../utils/exportReport.js";

export default function ReportActions({ analysis }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => exportAnalysisAsPdf(analysis)}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        <Download size={16} />
        Download PDF
      </button>
      <button
        type="button"
        onClick={() => exportAnalysisAsJson(analysis)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
      >
        <FileJson size={16} />
        Export JSON
      </button>
    </div>
  );
}
