import { useNavigate } from "react-router-dom";

import PriorityBadge from "../common/PriorityBadge";
import StatusBadge from "../common/StatusBadge";

import type { Ticket } from "../../types/ticket";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({
  ticket,
}: TicketCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">
            Ticket #{ticket.id}
          </div>

          <h2 className="mt-1 text-2xl font-semibold">
            {ticket.title}
          </h2>

          <p className="mt-3 text-gray-600">
            {ticket.description}
          </p>
        </div>

        <PriorityBadge priority={ticket.priority} />
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <StatusBadge status={ticket.status} />

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
          👤 {ticket.assignedTo}
        </span>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
          📅 {ticket.created.toLocaleDateString()}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          className="rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
          View
        </button>

        <button
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          className="rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
          Edit
        </button>

        <button
          onClick={() =>
            navigate(`/tickets/${ticket.id}/resolve`)
          }
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Resolve
        </button>
      </div>
    </div>
  );
}