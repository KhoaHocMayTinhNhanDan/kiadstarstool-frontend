export interface ListUsersInput {
  filters?: {
    role?: string;
    isActive?: boolean;
    searchQuery?: string;
  };
  pagination?: {
    page: number;
    limit: number;
  };
}