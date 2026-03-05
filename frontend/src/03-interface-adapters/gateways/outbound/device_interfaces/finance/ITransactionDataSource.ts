// This is an inferred interface based on its usage in interactors.
// The `any` type should be replaced with a proper `TransactionJSON` type
// once the entity is fully defined.
export interface ITransactionDataSource {
  save(transaction: any): Promise<void>;
  getAll(): Promise<any[]>;
  getByBranchId(branchId: string): Promise<any[]>;
}