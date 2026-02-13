// src/01-entities/classes/ClassStatus.enum.ts
export const ClassStatus = {
  PLANNED: 'planned',     // Đang lên kế hoạch
  ACTIVE: 'active',       // Đang diễn ra
  COMPLETED: 'completed', // Đã kết thúc
  CANCELLED: 'cancelled', // Đã hủy
  PAUSED: 'paused'        // Tạm ngưng
} as const;

export type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus];