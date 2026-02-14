import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';
import { Class } from '@/01-entities/classes/Class.entity';
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

export class ClassRepository implements IClassRepository {

  
  private readonly dataSource: IClassDataSource;

  constructor(dataSource: IClassDataSource) {
    this.dataSource = dataSource;
  }

  private mapToEntity(data: any): Class {
    return Class.create({
      id: ClassId.create(data.id),
      branchId: BranchId.create(data.branchId),
      name: data.name,
      code: data.code,
      status: data.status as ClassStatus,
      maxStudents: data.maxStudents,
      currentStudents: data.currentStudents,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      sessions: data.sessions || [], // Map sessions
      teacherName: data.teacherName
    }).getValue();
  }

  async getById(id: string): Promise<Class | null> {
    const data = await this.dataSource.getById(id);
    if (!data) return null;
    return this.mapToEntity(data);
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    const data = await this.dataSource.getByBranchId(branchId);
    return data.map(item => this.mapToEntity(item));
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