import { type BranchFinancialProps } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { type WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

export interface UpdateBranchInfoInput {
  branchId: string;
  name?: string;
  code?: string;
  address?: {
    houseNumber?: string;
    lane?: string;
    street: string;
    ward: string;
    province: string;
    postalCode?: string;
  };
  maxStudents?: number;
  totalRooms?: number;
  financial?: Partial<BranchFinancialProps>;
  operatingHours?: Partial<WeeklyOperatingHours>;
}