import { type BranchFinancialProps } from "@/01-entities/branch/value-objects/BranchFinancial.vo";

export interface OperatingHours {
  open: string;
  close: string;
}
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type WeeklyOperatingHours = Record<DayOfWeek, OperatingHours>;

export interface GetBranchDetailsOutput {
  id: string;
  name: string;
  code: string;
  address: string; // Formatted address string
  // Structured address for editing
  street: string;
  ward: string;
  district: string;
  city: string;
  isActive: boolean;
  capacity: {
    current: number;
    max: number;
    totalRooms?: number;
  };
  financial?: Partial<BranchFinancialProps>;
  operatingHours: WeeklyOperatingHours;
  updatedAt?: Date;
}