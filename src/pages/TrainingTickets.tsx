import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { trainingScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function TrainingTickets() {
  const { correctAnswers } = useStudyProgress();
  return <div className="space-y-8"><PageHeader title="Training Ticket Queue" subtitle="Solve each help-desk scenario correctly to earn 100 XP." />
    <div className="space-y-4">{trainingScenarios.map((scenario) => { const complete = correctAnswers.includes(scenario.id); return <article key={scenario.id} className={`rounded-xl border p-6 shadow-sm ${complete ? "border-green-300 bg-green-50" : "bg-white"}`}><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><div className="flex flex-wrap gap-2 text-sm font-semibold"><span className="text-blue-700">{scenario.ticketNumber}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{scenario.domain}</span><span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900">{scenario.urgency} priority</span></div><h2 className="mt-3 text-xl font-bold">{scenario.problem}</h2><p className="mt-2 text-slate-600">Customer: {scenario.requester} · {scenario.objective} · {scenario.points} XP</p></div><Link to={`/training/${scenario.id}`} className={`shrink-0 rounded-lg px-5 py-3 text-center font-semibold ${complete ? "bg-green-700 text-white" : "bg-slate-900 text-white"}`}>{complete ? "Review solution" : "Work ticket"}</Link></div></article>; })}</div>
  </div>;
}
