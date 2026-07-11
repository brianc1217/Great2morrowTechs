import { useNavigate } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketCard from "../components/tickets/TicketCard";

export default function Tickets() {
  const { tickets } = useTickets();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ticket Queue"
        subtitle={`${tickets.length} Active Tickets`}
        actionText="+ New Ticket"
        onAction={() => navigate("/tickets/new")}
      />

      <div className="grid gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </div>
    </div>
  );
}