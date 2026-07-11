export type Technician = {
  name: string;
  clockedIn: boolean;
  clockInTime: Date | null;
  totalHoursThisWeek: number;
  xp: number;
  level: number;
};