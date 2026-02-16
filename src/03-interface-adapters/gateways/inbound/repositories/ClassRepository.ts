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


    async getAll(): Promise<Class[]> {
    
    return this.dataSource.getByBranchId(''); // Assuming getByBranchId with empty string returns all
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    return this.dataSource.getByBranchId(branchId);
  }

  async create(classEntity: Class): Promise<Class> {
    // Gọi dataSource để lưu
    await this.dataSource.save(classEntity);
    // Trả về entity (giả định dataSource đã cập nhật ID vào object này nếu cần)
    return classEntity;
  }

  async update(classEntity: Class): Promise<void> {
    return this.dataSource.save(classEntity);
  }

  async delete(id: string): Promise<void> {
    return this.dataSource.delete(id);
  }
}