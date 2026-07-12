import type { Comment } from "./comment";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type TicketStatus =
  | "Open"
  | "Assigned"
  | "In Progress"
  | "Waiting"
  | "Resolved"
  | "Closed";

export interface Ticket {
  id: number;

  title: string;

  description: string;

  priority: TicketPriority;

  status: TicketStatus;

  assignedTo: string;

  created: Date;

  updated: Date;

  resolution?: string;

  comments: Comment[];
}