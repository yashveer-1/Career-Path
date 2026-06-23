import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, BrainCircuit, Target, TrendingUp } from "lucide-react";
import { api } from "../api/client.js";
import AnalyzerForm from "../components/AnalyzerForm.jsx";
import CourseCards from "../components/CourseCards.jsx";
import HistoryPanel from "../components/HistoryPanel.jsx";
import ReadinessScore from "../components/ReadinessScore.jsx";
import Recommendations from "../components/Recommendations.jsx";
import ReportActions from "../components/ReportActions.jsx";
import RoadmapTimeline from "../components/RoadmapTimeline.jsx";
import SkillChips from "../components/SkillChips.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import PersonalizedCareerPath from "../components/career-path/PersonalizedCareerPath.jsx";
import { useDarkMode } from "../hooks/useDarkMode.js";

const USER_STORAGE_KEY = "pathfinder-user-id";
const TrendChart = lazy(() => import("../components/TrendChart.jsx"));

const readOptionalProfileContext = () => {
  const parseStoredValue = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    } catch {
      return undefined;
    }
  };

  return {
    quizResults:
      parseStoredValue("pathfinder-quiz-results") ||
      parseStoredValue("quizResults"),
    nlpResults:
      parseStoredValue("pathfinder-nlp-results") ||
      parseStoredValue("nlpAnalysisResults"),
    interests:
      parseStoredValue("pathfinder-student-interests") ||
      parseStoredValue("studentInterests")
  };
};

export default function SkillGapAnalyzer() {
  const initialized = useRef(false);
  const resultsRef = useRef(null);
  const [isDark, toggleDarkMode] = useDarkMode();
  const [options, setOptions] = useState({ careers: [], careerSkills: {} });
  const [userId, setUserId] = useState("");
  const [career, setCareer] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [careerProgress, setCareerProgress] = useState(null);
  const [pathLoading, setPathLoading] = useState(false);
  const [pathError, setPathError] = useState("");
  const [updatingProgressId, setUpdatingProgressId] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initialize() {
      try {
        const savedUserId = localStorage.getItem(USER_STORAGE_KEY);
        const [optionsResponse, sessionResponse] = await Promise.all([
          api.get("/skill-gap/options"),
          api.post("/users/guest-session", { userId: savedUserId })
        ]);

        const nextOptions = optionsResponse.data.data;
        const nextUserId = sessionResponse.data.data._id;
        const defaultCareer = nextOptions.careers[0] || "";

        localStorage.setItem(USER_STORAGE_KEY, nextUserId);
        setOptions(nextOptions);
        setCareer(defaultCareer);
        setUserId(nextUserId);

        const historyResponse = await api.get(`/skill-gap/history/${nextUserId}`);
        const savedHistory = historyResponse.data.data;
        setHistory(savedHistory);

        if (savedHistory.length) {
          setAnalysis(savedHistory[0]);
          setCareer(savedHistory[0].targetCareer);
          setSelectedSkills(savedHistory[0].selectedSkills);
        }
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setInitializing(false);
      }
    }

    initialize();
  }, []);

  useEffect(() => {
    if (!analysis?._id || !userId) {
      setCareerProgress(null);
      return;
    }

    let cancelled = false;

    async function loadCareerPath() {
      setPathLoading(true);
      setPathError("");
      setCareerProgress(null);

      try {
        const response = await api.post("/career-path/generate", {
          userId,
          analysisId: analysis._id,
          profileContext: readOptionalProfileContext()
        });

        if (!cancelled) setCareerProgress(response.data.data);
      } catch (requestError) {
        if (!cancelled) setPathError(requestError.message);
      } finally {
        if (!cancelled) setPathLoading(false);
      }
    }

    loadCareerPath();
    return () => {
      cancelled = true;
    };
  }, [analysis?._id, userId]);

  const handleCareerChange = (nextCareer) => {
    setCareer(nextCareer);
    setSelectedSkills([]);
    setError("");
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  const handleAnalyze = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/skill-gap/analyze", {
        userId,
        career,
        selectedSkills
      });
      const nextAnalysis = response.data.data;
      setAnalysis(nextAnalysis);
      setHistory((current) => [
        nextAnalysis,
        ...current.filter((item) => item._id !== nextAnalysis._id)
      ]);
      window.setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (savedAnalysis) => {
    setAnalysis(savedAnalysis);
    setCareer(savedAnalysis.targetCareer);
    setSelectedSkills(savedAnalysis.selectedSkills);
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProgressToggle = async (taskType, item) => {
    if (!careerProgress) return;

    setUpdatingProgressId(item._id);
    setPathError("");

    try {
      const response = await api.patch("/career-path/task-complete", {
        userId,
        progressId: careerProgress._id,
        taskType,
        itemId: item._id,
        completed: !item.completed
      });
      setCareerProgress(response.data.data);
    } catch (requestError) {
      setPathError(requestError.message);
    } finally {
      setUpdatingProgressId("");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="relative bg-ink text-white">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="font-display text-xl font-extrabold">
            Path<span className="text-amber">Finder</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-semibold text-white/60 sm:block">
              Skill Gap Analyzer
            </span>
            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-28 lg:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
              <BrainCircuit size={15} />
              Career intelligence
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Know the gap.
              <span className="block bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
                Build the path.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              Compare your current abilities with real career requirements, then
              turn every missing skill into a clear, personalized learning plan.
            </p>
            <a
              href="#analyzer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 font-display text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              Start your analysis
              <ArrowDown size={17} />
            </a>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[
                [<Target key="target" size={17} />, "7", "Career paths"],
                [<TrendingUp key="trend" size={17} />, "Live", "Progress tracking"],
                [<BrainCircuit key="brain" size={17} />, "100%", "Personalized"]
              ].map(([icon, value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4"
                >
                  <span className="mb-2 block text-amber">{icon}</span>
                  <p className="font-display text-lg font-bold">{value}</p>
                  <p className="text-[10px] text-white/50 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="analyzer">
            {initializing ? (
              <div className="glass-card grid min-h-[440px] place-items-center p-8 text-ink dark:text-white">
                <div className="text-center">
                  <BrainCircuit className="mx-auto animate-pulse text-blue-600" size={38} />
                  <p className="mt-4 font-display font-bold">Preparing your analyzer…</p>
                </div>
              </div>
            ) : (
              <AnalyzerForm
                careers={options.careers}
                careerSkills={options.careerSkills}
                career={career}
                selectedSkills={selectedSkills}
                loading={loading}
                onCareerChange={handleCareerChange}
                onSkillToggle={handleSkillToggle}
                onSubmit={handleAnalyze}
              />
            )}
            {error && (
              <div
                role="alert"
                className="mt-3 rounded-xl border border-rose-300/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-100"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </header>

      {analysis ? (
        <div
          ref={resultsRef}
          className="relative mx-auto max-w-7xl space-y-10 px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Latest report
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                Your {analysis.targetCareer} pathway
              </h2>
            </div>
            <ReportActions analysis={analysis} />
          </div>

          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <ReadinessScore
              score={analysis.readinessScore}
              career={analysis.targetCareer}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <SkillChips
                title="Matched skills"
                skills={analysis.matchedSkills}
                variant="matched"
              />
              <SkillChips
                title="Missing skills"
                skills={analysis.missingSkills}
                variant="missing"
              />
              <div className="sm:col-span-2">
                <Recommendations
                  category={analysis.readinessCategory}
                  recommendations={analysis.recommendations}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <Suspense
              fallback={
                <div className="glass-card min-h-[320px] animate-pulse bg-slate-100/70 dark:bg-slate-900/60" />
              }
            >
              <TrendChart
                history={history}
                activeCareer={analysis.targetCareer}
              />
            </Suspense>
            <HistoryPanel
              history={history}
              activeId={analysis._id}
              onSelect={handleHistorySelect}
            />
          </div>

          <RoadmapTimeline roadmap={analysis.roadmap} />
          <CourseCards resources={analysis.resources} />
          <PersonalizedCareerPath
            progress={careerProgress}
            loading={pathLoading}
            error={pathError}
            updatingId={updatingProgressId}
            onToggle={handleProgressToggle}
          />
        </div>
      ) : (
        !initializing && (
          <section className="mx-auto max-w-3xl px-5 py-20 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              <Target size={30} />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">
              Your roadmap starts with one honest snapshot
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
              Select the skills you already have and run your first analysis.
              Your report and future progress will be saved automatically.
            </p>
          </section>
        )
      )}

      <footer className="border-t border-slate-200/70 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        PathFinder — turn career uncertainty into a path you can follow.
      </footer>
    </main>
  );
}
