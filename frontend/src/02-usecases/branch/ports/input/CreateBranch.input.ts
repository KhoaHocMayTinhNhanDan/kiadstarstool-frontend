import { type BranchFinancialProps } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { type WeeklyOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

export interface CreateBranchInput {
  name: string;
  code?: string; // Optional: System will generate if not provided
  address: {
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