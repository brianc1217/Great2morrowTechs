import { useMemo, useState } from "react";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketCard from "../components/tickets/TicketCard";

export default function Tickets() {
  const { tickets } = useTickets();
  const [query, setQuery] = useState("");
  const activeTickets = useMemo(() => tickets.filter((ticket) => !ticket.archivedAt), [tickets]);
  const visibleTickets = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return activeTickets;
    return activeTickets.filter((ticket) => [ticket.id, ticket.title, ticket.description, ticket.assignedTo, ticket.status, ticket.priority].join(" ").toLowerCase().includes(term));
  }, [activeTickets, query]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="A+ Hands-On Ticket Lab"
        subtitle={`Work ${activeTickets.length} support scenarios like a help-desk technician.`}
      />

      <div>
        <label className="sr-only" htmlFor="ticket-search">Search active tickets</label>
        <input id="ticket-search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-lg border bg-white p-3" placeholder="Search a scenario by ticket number, issue, or priority" />
      </div>

      <div className="grid gap-6">
        {visibleTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}
        {visibleTickets.length === 0 && <div className="rounded-xl border border-dashed bg-white p-8 text-center text-slate-500">No active tickets match your search.</div>}
      </div>
    </div>
  );
}
