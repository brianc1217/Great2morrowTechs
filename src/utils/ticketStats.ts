import type { Ticket } from "../types/ticket";

export function getOpenTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "Open").length;
}

export function getInProgressTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "In Progress").length;
}

export function getWaitingTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "Waiting").length;
}

export function getClosedTickets(tickets: Ticket[]) {
  return tickets.filter((t) => t.status === "Closed").length;
}