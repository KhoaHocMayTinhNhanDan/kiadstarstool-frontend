import { type Class } from '@/01-entities/classes/Class.entity';

/**
 * IClassRepository
 * 
 * Repository interface for Class entity operations
 */
export interface IClassRepository {
  
  /**
   * Create a new class
   */
  create(cls: Class): Promise<Class>;
  
  
  /**
   * Fetch all classes
   */
  getAll(): Promise<Class[]>;

  /**
   * Fetch a class by ID
   */
  getById(id: string): Promise<Class | null>;

  /**
   * Fetch classes by branch ID
   */
  getByBranchId(branchId: string): Promise<Class[]>;

  /**
   * Update an existing class
   */
  update(cls: Class): Promise<void>;

  /**
   * Delete a class by ID
   */
  delete(id: string): Promise<void>;

  updateInBatch(cls: Class, batch: any): void;
}
