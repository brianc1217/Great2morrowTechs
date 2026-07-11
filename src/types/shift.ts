export type Shift = {
  clockInTime: Date | null;
  clockOutTime: Date | null;
  currentShiftSeconds: number;
  totalHoursToday: number;
  totalHoursWeek: number;
};