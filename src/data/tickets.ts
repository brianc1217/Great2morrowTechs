import type { Ticket } from "../types/ticket";

export const tickets: Ticket[] = [
  {
    id: 1001,
    title: "Outlook won't open",
    description: "User receives an error after login.",
    priority: "High",
    status: "Open",
    assignedTo: "Brian",
    created: new Date(),
    updated: new Date(),
  },

  {
    id: 1002,
    title: "Printer Offline",
    description: "Accounting printer unavailable.",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Brian",
    created: new Date(),
    updated: new Date(),
  },

  {
    id: 1003,
    title: "Password Reset",
    description: "User forgot password.",
    priority: "Low",
    status: "Closed",
    assignedTo: "Brian",
    created: new Date(),
    updated: new Date(),
    resolution: "Password reset in Active Directory.",
  },

  {
    id: 1004,
    title: "VPN Connection",
    description: "Remote user unable to connect.",
    priority: "Critical",
    status: "Waiting",
    assignedTo: "Brian",
    created: new Date(),
    updated: new Date(),
  },
];