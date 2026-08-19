import { useMemo, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import { useTickets } from "../hooks/useTickets";

export default function TicketHistory() {
  const { tickets, updateTicket } = useTickets();
  const [query, setQuery] = useState("");
  const archivedTickets = useMemo(() => tickets.filter((ticket) => ticket.archivedAt), [tickets]);
  const visibleTickets = useMemo(() => {
    const term = query.trim().toLowerCase();
    return archivedTickets.filter((ticket) => !term || [ticket.id, ticket.title, ticket.description, ticket.resolution, ticket.assignedTo, ticket.resolutionCategory].join(" ").toLowerCase().includes(term));
  }, [archivedTickets, query]);

  function reopen(id: number) {
    const ticket = tickets.find((item) => item.id === id);
    if (!ticket) return;
    updateTicket({ ...ticket, status: "In Progress", archivedAt: undefined, updated: new Date() });
  }

  return <div className="space-y-8">
    <PageHeader title="Ticket History" subtitle={`${archivedTickets.length} resolved or closed tickets`} />
    <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-lg border bg-white p-3" placeholder="Search ticket history" />
    <div className="grid gap-5">
      {visibleTickets.map((ticket) => <article key={ticket.id} className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-slate-500">Ticket #{ticket.id}</p><h2 className="text-xl font-semibold">{ticket.title}</h2></div><StatusBadge status={ticket.status} /></div>
        <p className="mt-3 text-slate-600">{ticket.description}</p>
        {ticket.resolution && <div className="mt-4 rounded-lg bg-slate-50 p-4"><p className="font-semibold">Resolution{ticket.resolutionCategory ? ` · ${ticket.resolutionCategory}` : ""}{ticket.resolutionTimeMinutes !== undefined ? ` · ${ticket.resolutionTimeMinutes} min` : ""}</p><p className="mt-1 text-slate-600">{ticket.resolution}</p></div>}
        <div className="mt-5 flex items-center justify-between gap-4"><p className="text-sm text-slate-500">Archived {ticket.archivedAt?.toLocaleDateString()}</p><button onClick={() => reopen(ticket.id)} className="rounded-lg border px-4 py-2 font-semibold hover:bg-slate-100">Reopen ticket</button></div>
      </article>)}
      {visibleTickets.length === 0 && <div className="rounded-xl border border-dashed bg-white p-8 text-center text-slate-500">No archived tickets match your search.</div>}
    </div>
  </div>;
}
