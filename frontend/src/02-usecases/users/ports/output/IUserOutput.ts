export interface UserOutput {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  phone?: string;
  role: string;
  isActive: boolean;
}