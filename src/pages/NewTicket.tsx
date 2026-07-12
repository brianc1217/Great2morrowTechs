import { useNavigate } from "react-router-dom";

import { useTickets } from "../hooks/useTickets";

import PageHeader from "../components/common/PageHeader";
import TicketForm from "../components/tickets/TicketForm";

import type { Ticket } from "../types/ticket";

export default function NewTicket() {
  const navigate = useNavigate();

  const { addTicket } = useTickets();

  function handleCreate(ticket: Ticket) {
    addTicket(ticket);

    navigate("/tickets");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create New Ticket"
        subtitle="Enter the ticket information below."
      />

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <TicketForm
          submitText="Create Ticket"
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}