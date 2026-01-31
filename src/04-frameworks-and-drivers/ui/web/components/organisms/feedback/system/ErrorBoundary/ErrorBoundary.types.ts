import { type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}