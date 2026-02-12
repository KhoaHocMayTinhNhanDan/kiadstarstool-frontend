export interface GetBranchDetailsOutput {
  id: string;
  name: string;
  code: string;
  address: string; // Formatted address string
  isActive: boolean;
  capacity: {
    current: number;
    max: number;
  };
  operatingHours: {
    open: string;
    close: string;
  };
}