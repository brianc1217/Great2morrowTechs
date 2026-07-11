import type { TicketStatus } from "../../types/ticket";

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const colors = {
    Open: "bg-blue-100 text-blue-700",
    Assigned: "bg-indigo-100 text-indigo-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Waiting: "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}