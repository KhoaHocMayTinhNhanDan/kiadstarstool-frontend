export interface UserOutput {
  id: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  role: string;
  isActive: boolean;
}