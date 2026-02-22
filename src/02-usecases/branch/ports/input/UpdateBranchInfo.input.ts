import { type BranchFinancialProps } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { type WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

export interface UpdateBranchInfoInput {
  branchId: string;
  name?: string;
  code?: string;
  address?: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  maxStudents?: number;
  totalRooms?: number;
  financial?: Partial<BranchFinancialProps>;
  operatingHours?: Partial<WeeklyOperatingHours>;
}