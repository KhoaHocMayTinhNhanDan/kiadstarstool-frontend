// src/shared/config/env.ts

export type DataMode = 'mock' | 'firebase';
export type PreAuthRole = 'admin' | 'manager' | 'teacher' | 'staff' | 'none';

export const DATA_MODE: DataMode =
  (import.meta.env.VITE_DATA_MODE as DataMode) ?? 'mock';

export const PRE_AUTHENTICATE_AS: PreAuthRole =
  (import.meta.env.VITE_PRE_AUTHENTICATE_AS as PreAuthRole) ?? 'none';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';