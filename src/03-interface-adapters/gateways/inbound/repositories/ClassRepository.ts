import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';
import { Class } from '@/01-entities/classes/Class.entity';

export class ClassRepository implements IClassRepository {

  
  private readonly dataSource: IClassDataSource;

  constructor(dataSource: IClassDataSource) {
    this.dataSource = dataSource;
  }

  async getById(id: string): Promise<Class | null> {
    return this.dataSource.getById(id);
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    return this.dataSource.getByBranchId(branchId);
  }

  async save(classEntity: Class): Promise<void> {
    // DataSource mong đợi entity, và MockDataSource sẽ tự xử lý việc lưu trữ
    // Tuy nhiên, nếu DataSource mong đợi DTO, ta cần map ngược lại ở đây.
    // Với MockClassDataSource hiện tại, nó nhận vào Class entity.
    return this.dataSource.save(classEntity);
  }

  async update(classEntity: Class): Promise<void> {
    return this.dataSource.save(classEntity);
  }

  async delete(id: string): Promise<void> {
    return this.dataSource.delete(id);
  }
}