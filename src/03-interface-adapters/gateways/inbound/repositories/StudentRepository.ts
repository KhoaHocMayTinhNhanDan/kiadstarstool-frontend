import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';

export class StudentRepository implements IStudentRepository {
  private readonly dataSource: IStudentDataSource;

  constructor(dataSource: IStudentDataSource) {
    this.dataSource = dataSource;
  }

  async getByBranchId(branchId: string): Promise<StudentListItem[]> {
    const rawData = await this.dataSource.getByBranchId(branchId);
    return rawData.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      status: item.status,
      joinedDate: new Date(item.joinedDate)
    }));
  }
}