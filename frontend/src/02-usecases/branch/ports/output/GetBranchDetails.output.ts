import { type BranchFinancialProps } from "@/01-entities/branch/value-objects/BranchFinancial.vo";
import { type WeeklyOperatingHours } from "@/01-entities/branch/value-objects/BranchOperatingHours.vo";

export interface GetBranchDetailsOutput {
  id: string;
  name: string;
  code: string;
  address: string; // Formatted address string
  // Structured address for editing
  houseNumber: string;
  lane: string;
  street: string;
  ward: string;
  province: string;
  postalCode: string;
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