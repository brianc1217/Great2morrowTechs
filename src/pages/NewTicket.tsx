import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import type {
  Ticket,
  TicketPriority,
} from "../types/ticket";

export default function NewTicket() {
  const navigate = useNavigate();

  const { tickets, addTicket } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<TicketPriority>("Medium");

  function createTicket(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    const nextId =
      tickets.length > 0
        ? Math.max(...tickets.map((t) => t.id)) + 1
        : 1001;

    const ticket: Ticket = {
      id: nextId,
      title,
      description,
      priority,
      status: "Open",
      assignedTo: "Brian",
      created: new Date(),
      updated: new Date(),
    };

    addTicket(ticket);

    navigate("/tickets");
  }

  return (
    <div className="mx-auto max-w-4xl rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-3xl font-bold">
        Create New Ticket
      </h1>

      <form
        onSubmit={createTicket}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block font-semibold">
            Title
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            className="w-full rounded-lg border p-3"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select
            className="rounded-lg border p-3"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as TicketPriority
              )
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
}