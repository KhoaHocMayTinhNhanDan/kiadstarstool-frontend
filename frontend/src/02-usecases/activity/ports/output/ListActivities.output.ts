export interface ActivityOutput {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  details?: string; // A stringified version for the UI
}

export type ListActivitiesOutput = ActivityOutput[];