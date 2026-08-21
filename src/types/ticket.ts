import type { Comment } from "./comment";

export type TicketPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type TicketStatus =
  | "New"
  | "Assigned"
  | "In Progress"
  | "Waiting on User"
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

  resolutionCategory?: string;

  resolutionTimeMinutes?: number;

  resolvedAt?: Date;

  archivedAt?: Date;

  comments: Comment[];
}
