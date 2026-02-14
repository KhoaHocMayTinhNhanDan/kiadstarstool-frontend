export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface ClassSession {
  day: DayOfWeek;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  roomId?: string;   // Mở rộng cho tương lai
}

export const DAY_MAP: Record<DayOfWeek, string> = {
  Mon: 'T2', Tue: 'T3', Wed: 'T4', Thu: 'T5', Fri: 'T6', Sat: 'T7', Sun: 'CN'
};