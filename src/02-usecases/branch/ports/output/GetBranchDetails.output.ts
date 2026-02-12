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
  };
  operatingHours: {
    open: string;
    close: string;
  };
  updatedAt?: Date;
}