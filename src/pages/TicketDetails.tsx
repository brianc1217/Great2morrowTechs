import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketForm from "../components/tickets/TicketForm";

import type { Ticket } from "../types/ticket";

export default function TicketDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { tickets, updateTicket } = useTickets();

  const ticket = tickets.find(
    (t) => t.id === Number(id)
  );

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  function handleSave(updatedTicket: Ticket) {
    updateTicket(updatedTicket);

    navigate("/tickets");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Ticket #${ticket.id}`}
        subtitle="Edit ticket information"
      />

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <TicketForm
          initialTicket={ticket}
          submitText="Save Changes"
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}