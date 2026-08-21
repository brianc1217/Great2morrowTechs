import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { trainingScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

export default function TrainingTicketDetail() {
  const { id } = useParams(); const scenario = trainingScenarios.find((item) => item.id === id); const { correctAnswers, markCorrect } = useStudyProgress();
  const [selected, setSelected] = useState<number | null>(null); const alreadyComplete = scenario ? correctAnswers.includes(scenario.id) : false;
  if (!scenario) return <div><PageHeader title="Ticket not found" subtitle="Return to the training ticket queue and choose a scenario." /><Link className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-white" to="/training">Back to tickets</Link></div>;
  const answered = selected !== null || alreadyComplete;
  const selectedAnswer = selected ?? scenario.answer;
  const choose = (choice: number) => { if (answered) return; setSelected(choice); if (choice === scenario.answer) markCorrect(scenario.id); };
  return <div className="space-y-8"><PageHeader title={`Training Ticket ${scenario.ticketNumber}`} subtitle={`${scenario.domain} · Submitted by ${scenario.requester} · ${scenario.urgency} priority`} />
    <section className="rounded-xl border bg-white p-7 shadow-sm"><p className="text-sm font-semibold text-slate-500">PROBLEM</p><h2 className="mt-3 text-2xl font-bold leading-relaxed">{scenario.problem}</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-lg bg-slate-50 p-4"><p className="font-semibold">Symptoms</p><p className="mt-1 text-slate-600">{scenario.symptoms}</p></div><div className="rounded-lg bg-slate-50 p-4"><p className="font-semibold">Environment</p><p className="mt-1 text-slate-600">{scenario.environment}</p></div></div><p className="mt-5 text-sm font-semibold text-slate-500">{scenario.objective}</p><p className="mt-7 text-sm font-semibold text-slate-500">POSSIBLE ACTIONS</p><div className="mt-3 space-y-3">{scenario.choices.map((choice, index) => { const state = answered ? index === scenario.answer ? "border-green-500 bg-green-50" : index === selectedAnswer ? "border-red-400 bg-red-50" : "border-slate-200" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50"; return <button key={choice} onClick={() => choose(index)} className={`block w-full rounded-lg border p-4 text-left font-medium ${state}`}>{String.fromCharCode(65 + index)}. {choice}</button>; })}</div>
      {answered && <div className={`mt-6 rounded-lg p-5 ${selectedAnswer === scenario.answer ? "bg-green-50 text-green-950" : "bg-amber-50 text-amber-950"}`}><p className="font-bold">{selectedAnswer === scenario.answer ? `Ticket resolved — +${scenario.points} XP earned!` : "Ticket needs more work."}</p><p className="mt-1">{scenario.explanation}</p>{selectedAnswer !== scenario.answer && <p className="mt-3 text-sm">Review the explanation, then come back to this ticket later to try again.</p>}</div>}
    </section><Link to="/training" className="inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">Back to training tickets</Link>
  </div>;
}
