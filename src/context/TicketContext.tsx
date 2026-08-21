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

}

const TicketContext =
  createContext<TicketContextType | null>(null);

const STORAGE_KEY = "g2t-helpdesk-tickets-v1";

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

    const parsed: Array<Omit<Ticket, "status"> & { status: string }> = JSON.parse(saved);

    return parsed.map((ticket) => ({
      ...ticket,
      status: ticket.status === "Open" ? "New" : ticket.status === "Waiting" ? "Waiting on User" : ticket.status as Ticket["status"],
      created: new Date(ticket.created),
      updated: new Date(ticket.updated),
      resolvedAt: ticket.resolvedAt
        ? new Date(ticket.resolvedAt)
        : undefined,
      archivedAt: ticket.archivedAt
        ? new Date(ticket.archivedAt)
        : undefined,
      comments: (ticket.comments ?? []).map((comment) => ({
        ...comment,
        created: new Date(comment.created),
      })),
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

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

// This hook intentionally lives with its context provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useTicketContext() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error(
      "useTicketContext must be used inside TicketProvider."
    );
  }

  return context;
}
