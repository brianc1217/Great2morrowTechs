import type { TicketPriority } from "../../types/ticket";

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const colors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 font-semibold ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}