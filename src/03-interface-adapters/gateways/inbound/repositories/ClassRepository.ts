import { Class } from '@/01-entities/classes/Class.entity';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';

export class ClassRepository implements IClassRepository {
  private readonly dataSource: IClassDataSource;

  constructor(dataSource: IClassDataSource) {
    this.dataSource = dataSource;
  }

  async getByBranchId(branchId: BranchId): Promise<Class[]> {
    return this.dataSource.getByBranchId(branchId.toString());
  }

  async save(classEntity: Class): Promise<void> {
    return this.dataSource.save(classEntity);
  }
}