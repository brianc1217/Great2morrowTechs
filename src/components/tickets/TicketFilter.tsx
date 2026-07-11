import type { TicketPriority, TicketStatus } from "../../types/ticket";

interface TicketFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  priority: string;
  onPriorityChange: (value: string) => void;
}

export default function TicketFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}: TicketFiltersProps) {
  return (
    <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="🔍 Search tickets..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-lg border p-3"
        />

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Statuses</option>

          <option value={"Open" satisfies TicketStatus}>Open</option>
          <option value={"Assigned" satisfies TicketStatus}>Assigned</option>
          <option value={"In Progress" satisfies TicketStatus}>
            In Progress
          </option>
          <option value={"Waiting" satisfies TicketStatus}>Waiting</option>
          <option value={"Resolved" satisfies TicketStatus}>Resolved</option>
          <option value={"Closed" satisfies TicketStatus}>Closed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Priorities</option>

          <option value={"Low" satisfies TicketPriority}>Low</option>
          <option value={"Medium" satisfies TicketPriority}>Medium</option>
          <option value={"High" satisfies TicketPriority}>High</option>
          <option value={"Critical" satisfies TicketPriority}>
            Critical
          </option>
        </select>
      </div>
    </div>
  );
}