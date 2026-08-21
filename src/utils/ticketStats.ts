import type { Ticket } from "../types/ticket";

export function getOpenTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "New").length;
}

export function getInProgressTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "In Progress").length;
}

export function getWaitingTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "Waiting on User").length;
}

export function getClosedTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "Closed").length;
}
