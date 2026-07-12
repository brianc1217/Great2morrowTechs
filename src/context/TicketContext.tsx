import {
  createContext,
  useContext,
  useEffect,
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

const TicketContext =
  createContext<TicketContextType | null>(null);

const STORAGE_KEY = "g2t-tickets";

export function TicketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return initialTickets;
    }

    const parsed: Ticket[] = JSON.parse(saved);

    return parsed.map((ticket) => ({
      ...ticket,
      created: new Date(ticket.created),
      updated: new Date(ticket.updated),
    }));
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tickets)
    );
  }, [tickets]);

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
      previous.filter(
        (ticket) => ticket.id !== id
      )
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