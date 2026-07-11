import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import type { TicketStatus } from "../types/ticket";

export default function TicketDetails() {
  const { id } = useParams();

  const { tickets, updateTicket } = useTickets();

  const ticket = tickets.find(
    (t) => t.id === Number(id)
  );

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  const [status, setStatus] = useState<TicketStatus>(
    ticket.status
  );

  const [notes, setNotes] = useState(
    ticket.resolution ?? ""
  );

  function saveTicket() {
    updateTicket({
      ...ticket,
      status,
      resolution: notes,
      updated: new Date(),
    });

    alert("Ticket Updated");
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500">
            Ticket #{ticket.id}
          </p>

          <h1 className="text-4xl font-bold">
            {ticket.title}
          </h1>
        </div>

        <button
          onClick={saveTicket}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-xl font-semibold">
          Description
        </h2>

        <p>{ticket.description}</p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold">
            Ticket Information
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block font-semibold">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TicketStatus
                  )
                }
                className="w-full rounded-lg border p-3"
              >
                <option>Open</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Waiting</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Priority
              </label>

              <div className="rounded-lg bg-slate-100 p-3">
                {ticket.priority}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Assigned Technician
              </label>

              <div className="rounded-lg bg-slate-100 p-3">
                {ticket.assignedTo}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Created
              </label>

              <div className="rounded-lg bg-slate-100 p-3">
                {ticket.created.toLocaleString()}
              </div>
            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold">
            Technician Notes
          </h2>

          <textarea
            rows={14}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full rounded-lg border p-4"
            placeholder="Document troubleshooting steps..."
          />

        </div>

      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Activity Timeline
        </h2>

        <div className="space-y-4">

          <div>
            ✅ Ticket Created
          </div>

          <div>
            👤 Assigned to {ticket.assignedTo}
          </div>

          <div>
            📝 Last Updated {ticket.updated.toLocaleString()}
          </div>

        </div>

      </div>

    </div>
  );
}