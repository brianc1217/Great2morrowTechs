import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketForm from "../components/tickets/TicketForm";
import { ticketScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

import type { Ticket } from "../types/ticket";

export default function TicketDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { tickets, updateTicket } = useTickets();

  const ticket = tickets.find(
    (t) => t.id === Number(id)
  );

  const [comment, setComment] = useState("");
  const [checks, setChecks] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const { correctAnswers, markCorrect } = useStudyProgress();

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  const currentTicket = ticket;
  const scenario = ticketScenarios.find((item) => item.ticketId === currentTicket.id);
  const solved = scenario ? correctAnswers.includes(`ticket-${scenario.ticketId}`) : false;
  const answered = result !== null || solved;

  function chooseAnswer(index: number) {
    if (!scenario || solved || result === "correct") return;
    setSelectedAnswer(index);
  }

  function submitResolution() {
    if (!scenario || selectedAnswer === null) return;
    if (selectedAnswer === scenario.answer) {
      markCorrect(`ticket-${scenario.ticketId}`);
      setResult("correct");
    } else {
      setResult("incorrect");
    }
  }

  function handleSave(updatedTicket: Ticket) {
    updateTicket(updatedTicket);

    navigate("/tickets");
  }

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = comment.trim();
    if (!message) return;

    updateTicket({
      ...currentTicket,
      updated: new Date(),
      comments: [
        ...currentTicket.comments,
        { id: Date.now(), author: "Brian", message, created: new Date() },
      ],
    });
    setComment("");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Ticket #${currentTicket.id}`}
        subtitle={scenario ? `${scenario.domain} hands-on A+ scenario` : "Edit ticket information"}
      />

      {scenario ? <section className="rounded-xl border bg-white p-8 shadow-sm space-y-7">
        <div><p className="text-sm font-bold text-blue-700">SCENARIO GOAL</p><h2 className="mt-2 text-2xl font-semibold">{scenario.goal}</h2><p className="mt-3 text-slate-600">Use the checklist like you would at a real help desk. Add your own notes below as you work.</p></div>
        <div><h3 className="font-semibold">Investigation checklist</h3><div className="mt-3 space-y-3">{scenario.checks.map((check) => <label key={check} className="flex gap-3 rounded-lg bg-slate-50 p-4"><input type="checkbox" checked={checks.includes(check)} onChange={() => setChecks((current) => current.includes(check) ? current.filter((item) => item !== check) : [...current, check])} /><span>{check}</span></label>)}</div></div>
        <div><h3 className="font-semibold">Your diagnosis</h3><p className="mt-1 text-slate-600">After working through the checks, choose the best next action, then submit your resolution.</p><p className="mt-4 text-lg font-semibold">{scenario.question}</p><div className="mt-4 space-y-3">{scenario.choices.map((choice, index) => { const state = answered ? index === scenario.answer ? "border-green-500 bg-green-50" : index === selectedAnswer ? "border-red-400 bg-red-50" : "border-slate-200" : index === selectedAnswer ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400"; return <button key={choice} onClick={() => chooseAnswer(index)} className={`block w-full rounded-lg border p-4 text-left ${state}`}>{String.fromCharCode(65 + index)}. {choice}</button>; })}</div>
          {!answered && <button disabled={selectedAnswer === null} onClick={submitResolution} className="mt-5 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">Submit Resolution (+100 XP)</button>}
          {answered && <div className={`mt-5 rounded-lg p-5 ${solved || result === "correct" ? "bg-green-50 text-green-950" : "bg-amber-50 text-amber-950"}`}><p className="font-bold">{solved || result === "correct" ? `Ticket resolved — +${scenario.points} XP earned.` : "That is not the best next action."}</p><p className="mt-1">{scenario.explanation}</p>{result === "incorrect" && <button onClick={() => { setResult(null); setSelectedAnswer(null); }} className="mt-4 rounded-lg border border-amber-800 px-4 py-2 font-semibold">Try another diagnosis</button>}</div>}
          <button onClick={() => navigate(`/tickets/${currentTicket.id}/resolve`)} className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white">Document & Resolve Ticket</button>
        </div>
      </section> : <div className="rounded-xl border bg-white p-8 shadow-sm"><TicketForm initialTicket={currentTicket} submitText="Save Changes" onSubmit={handleSave} /></div>}

      <section className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <p className="mt-1 text-slate-500">Keep a record of troubleshooting updates and customer communication.</p>
        <div className="mt-6 space-y-4">
          {currentTicket.comments.length === 0 ? (
            <p className="rounded-lg bg-slate-50 p-4 text-slate-500">No comments yet.</p>
          ) : currentTicket.comments.map((item) => (
            <article key={item.id} className="rounded-lg bg-slate-50 p-4">
              <div className="flex justify-between gap-4"><strong>{item.author}</strong><span className="text-sm text-slate-500">{item.created.toLocaleString()}</span></div>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">{item.message}</p>
            </article>
          ))}
        </div>
        <form onSubmit={addComment} className="mt-6 space-y-3">
          <label className="block font-semibold" htmlFor="comment">Add a comment</label>
          <textarea id="comment" rows={4} value={comment} onChange={(event) => setComment(event.target.value)} className="w-full rounded-lg border p-3" placeholder="Add a troubleshooting note or update." />
          <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Post comment</button>
        </form>
      </section>
    </div>
  );
}
