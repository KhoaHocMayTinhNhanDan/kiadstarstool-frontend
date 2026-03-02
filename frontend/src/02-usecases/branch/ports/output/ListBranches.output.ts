import { type WeeklyOperatingHours } from "@/01-entities/branch/value-objects/BranchOperatingHours.vo";

export interface BranchListItem {
  id: string;
  name: string;
  code: string;
  address: string;
  isActive: boolean;
  studentCount: number;
  capacity: {
    current: number;
    max: number;
  };
  operatingHours: WeeklyOperatingHours;
  updatedAt: Date;
}

export type ListBranchesOutput = BranchListItem[];