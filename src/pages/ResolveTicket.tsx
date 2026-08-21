import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, type FormEvent } from "react";

import { useTickets } from "../hooks/useTickets";
import PageHeader from "../components/common/PageHeader";

const categories = ["Hardware", "Software", "Network", "Access", "Account", "Other"];

export default function ResolveTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, updateTicket } = useTickets();
  const ticket = tickets.find((item) => item.id === Number(id));
  const [resolution, setResolution] = useState(ticket?.resolution ?? "");
  const [category, setCategory] = useState(ticket?.resolutionCategory ?? "Software");
  const [timeMinutes, setTimeMinutes] = useState(ticket?.resolutionTimeMinutes?.toString() ?? "");

  if (!ticket || ticket.archivedAt) {
    return <Navigate to="/tickets" replace />;
  }

  const currentTicket = ticket;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const minutes = Number(timeMinutes);

    if (!resolution.trim() || !Number.isFinite(minutes) || minutes < 0) return;
    const now = new Date();
    updateTicket({
      ...currentTicket,
      status: "Resolved",
      resolution: resolution.trim(),
      resolutionCategory: category,
      resolutionTimeMinutes: minutes,
      resolvedAt: now,
      updated: now,
    });
    navigate("/tickets");
  }

  return (
    <div className="space-y-8">
      <PageHeader title={`Resolve Ticket #${currentTicket.id}`} subtitle={currentTicket.title} />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div>
          <label className="mb-2 block font-semibold" htmlFor="resolution">Resolution notes</label>
          <textarea id="resolution" required rows={7} value={resolution} onChange={(event) => setResolution(event.target.value)} className="w-full rounded-lg border p-3" placeholder="Describe what fixed the issue." />
        </div>
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
