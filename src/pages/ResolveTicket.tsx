import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, type FormEvent } from "react";

import { useTickets } from "../hooks/useTickets";
import PageHeader from "../components/common/PageHeader";
import { ticketScenarios } from "../data/aPlusStudy";
import { useStudyProgress } from "../hooks/useStudyProgress";

const categories = ["Hardware", "Software", "Network", "Access", "Account", "Other"];

export default function ResolveTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, updateTicket } = useTickets();
  const ticket = tickets.find((item) => item.id === Number(id));
  const [resolution, setResolution] = useState(ticket?.resolution ?? "");
  const [category, setCategory] = useState(ticket?.resolutionCategory ?? "Software");
  const [timeMinutes, setTimeMinutes] = useState(ticket?.resolutionTimeMinutes?.toString() ?? "");
  const [diagnosis, setDiagnosis] = useState("");
  const [error, setError] = useState("");
  const { markCorrect } = useStudyProgress();

  if (!ticket || ticket.archivedAt) {
    return <Navigate to="/tickets" replace />;
  }

  const currentTicket = ticket;
  const scenario = ticketScenarios.find((item) => item.ticketId === currentTicket.id);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const minutes = Number(timeMinutes);

    if (!resolution.trim() || !Number.isFinite(minutes) || minutes < 0) return;
    if (scenario && Number(diagnosis) !== scenario.answer) {
      setError("That diagnosis is not correct yet. Return to the ticket, review the investigation checklist, and try again.");
      return;
    }

    const now = new Date();
    updateTicket({
      ...currentTicket,
      status: "Resolved",
      resolution: resolution.trim(),
      resolutionCategory: category,
      resolutionTimeMinutes: minutes,
      resolvedAt: now,
      archivedAt: now,
      updated: now,
    });
    if (scenario) markCorrect(`ticket-${scenario.ticketId}`);
    navigate("/history");
  }

  return (
    <div className="space-y-8">
      <PageHeader title={`Resolve Ticket #${currentTicket.id}`} subtitle={currentTicket.title} />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div>
          <label className="mb-2 block font-semibold" htmlFor="resolution">Resolution notes</label>
          <textarea id="resolution" required rows={7} value={resolution} onChange={(event) => setResolution(event.target.value)} className="w-full rounded-lg border p-3" placeholder="Describe what fixed the issue." />
        </div>
        {scenario && <div><label className="mb-2 block font-semibold" htmlFor="diagnosis">Final A+ diagnosis</label><select id="diagnosis" required value={diagnosis} onChange={(event) => { setDiagnosis(event.target.value); setError(""); }} className="w-full rounded-lg border p-3"><option value="">Choose the best next action</option>{scenario.choices.map((choice, index) => <option key={choice} value={index}>{String.fromCharCode(65 + index)}. {choice}</option>)}</select><p className="mt-2 text-sm text-slate-500">A correct diagnosis awards 100 XP when this ticket is resolved.</p>{error && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-amber-900">{error}</p>}</div>}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold" htmlFor="category">Resolution category</label>
            <select id="category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border p-3">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-semibold" htmlFor="time">Time worked (minutes)</label>
            <input id="time" required min="0" type="number" value={timeMinutes} onChange={(event) => setTimeMinutes(event.target.value)} className="w-full rounded-lg border p-3" placeholder="30" />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(`/tickets/${currentTicket.id}`)} className="rounded-lg border px-6 py-3 font-semibold hover:bg-slate-100">Cancel</button>
          <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">Resolve & archive ticket</button>
        </div>
      </form>
    </div>
  );
}
