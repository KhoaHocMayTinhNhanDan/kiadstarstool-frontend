export interface ListUsersInput {
  filters?: {
    role?: string;
    isActive?: boolean;
    searchQuery?: string;
    branchId?: string;
  };
  pagination?: {
    page: number;
    limit: number;
  };
}