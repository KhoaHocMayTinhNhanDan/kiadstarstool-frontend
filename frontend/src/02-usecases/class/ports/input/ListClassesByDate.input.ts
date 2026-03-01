/**
 * ListClassesByDateInput
 * 
 * Input parameters for the ListClassesByDate use case
 */
export interface ListClassesByDateInput {
  /**
   * Target date to filter classes by
   * Format: ISO 8601 date string (e.g., '2026-02-15')
   */
  date: string;

  /**
   * Optional: Filter by specific branch
   */
  branchId?: string;
}
