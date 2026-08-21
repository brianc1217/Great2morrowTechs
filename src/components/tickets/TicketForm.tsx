import { useState } from "react";

import type {
  Ticket,
  TicketPriority,
} from "../../types/ticket";

interface TicketFormProps {
  initialTicket?: Ticket;

  submitText: string;

  onSubmit: (ticket: Ticket) => void;
}

export default function TicketForm({
  initialTicket,
  submitText,
  onSubmit,
}: TicketFormProps) {
  const [title, setTitle] = useState(
    initialTicket?.title ?? ""
  );

  const [description, setDescription] =
    useState(initialTicket?.description ?? "");

  const [priority, setPriority] =
    useState<TicketPriority>(
      initialTicket?.priority ?? "Medium"
    );

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      id: initialTicket?.id ?? Date.now(),
      title,
      description,
      priority,
      status: initialTicket?.status ?? "New",
      assignedTo:
        initialTicket?.assignedTo ?? "Unassigned",
      created:
        initialTicket?.created ?? new Date(),
      updated: new Date(),
      resolution:
        initialTicket?.resolution,
      resolutionCategory:
        initialTicket?.resolutionCategory,
      resolutionTimeMinutes:
        initialTicket?.resolutionTimeMinutes,
      resolvedAt: initialTicket?.resolvedAt,
      archivedAt: initialTicket?.archivedAt,
      comments: initialTicket?.comments ?? [],
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
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
            setDescription(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <div>
          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as TicketPriority
              )
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

      </div>

      <button
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
