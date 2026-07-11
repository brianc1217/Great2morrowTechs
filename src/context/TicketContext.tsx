import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { tickets as initialTickets } from "../data/tickets";
import type { Ticket } from "../types/ticket";

interface TicketContextType {
  tickets: Ticket[];

  addTicket: (ticket: Ticket) => void;

  updateTicket: (ticket: Ticket) => void;

  deleteTicket: (id: number) => void;
}

const TicketContext = createContext<TicketContextType | null>(null);

export function TicketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tickets, setTickets] = useState(initialTickets);

  function addTicket(ticket: Ticket) {
    setTickets((previous) => [...previous, ticket]);
  }

  function updateTicket(updated: Ticket) {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === updated.id ? updated : ticket
      )
    );
  }

  function deleteTicket(id: number) {
    setTickets((previous) =>
      previous.filter((ticket) => ticket.id !== id)
    );
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error(
      "useTicketContext must be used inside TicketProvider."
    );
  }

  return context;
}