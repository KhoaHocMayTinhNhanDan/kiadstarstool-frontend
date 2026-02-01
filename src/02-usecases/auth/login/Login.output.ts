export interface LoginOutput {
  userId: string;
  displayName: string;
  role: string;
  permissions: string[];
  accessToken: string;
  refreshToken?: string;
}
