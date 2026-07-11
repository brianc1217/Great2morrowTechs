import { useTicketContext } from "../context/TicketContext";

export function useTickets() {
  return useTicketContext();
}