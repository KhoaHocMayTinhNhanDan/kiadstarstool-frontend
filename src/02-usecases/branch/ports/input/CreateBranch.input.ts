export interface CreateBranchInput {
  name: string;
  code: string;
  address: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  maxStudents?: number;
}