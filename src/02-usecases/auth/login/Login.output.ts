export interface LoginOutput {
  userId: string;
  displayName: string;
  accessToken: string;
  refreshToken?: string;
}
