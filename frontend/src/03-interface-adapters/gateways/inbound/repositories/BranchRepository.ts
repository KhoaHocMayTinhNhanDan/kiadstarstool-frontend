import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type IBranchDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource';

export class BranchRepository implements IBranchRepository {
  private readonly dataSource: IBranchDataSource;

  constructor(dataSource: IBranchDataSource) {
    this.dataSource = dataSource;
  }

  async save(branch: Branch): Promise<void> {
    await this.dataSource.save(branch);
  }

  async getById(id: BranchId): Promise<Branch | null> {
    return await this.dataSource.getById(id.toString());
  }

  async delete(id: BranchId): Promise<void> {
    await this.dataSource.delete(id.toString());
  }

  async findAll(): Promise<Branch[]> {
    return await this.dataSource.findAll();
  }

  async exists(code: string): Promise<boolean> {
    return await this.dataSource.exists(code);
  }

  saveInBatch(branch: Branch, batch: any): void {
    this.dataSource.saveInBatch(branch, batch);
  }

  async findLastSequenceForPrefix(prefix: string): Promise<number> {
    return await this.dataSource.findLastSequenceForPrefix(prefix);
  }
}