// src/03-interface-adapters/gateways/inbound/repositories/StudentRepository.ts
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import { Student } from '@/01-entities/students/Student.entity';
import { Identifier } from '@/01-entities/shared/Identifier.vo';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';

export class StudentRepository implements IStudentRepository {
  private readonly dataSource: IStudentDataSource;

  constructor(dataSource: IStudentDataSource) {
    this.dataSource = dataSource;
  }

  async getById(id: string): Promise<Student | null> {
    const rawData = await this.dataSource.getById(id);
    if (!rawData) return null;

    const enrollments = (rawData.enrollments || []).map((e: any) => Enrollment.create({
      branchId: e.branchId,
      classId: e.classId,
      status: e.status,
      joinedDate: new Date(e.joinedDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined
    }).getValue());

    return Student.create({
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone,
      status: rawData.status as 'active' | 'banned' | 'archived',
      enrollments: enrollments
    }, Identifier.create(rawData.id)).getValue();
  }

  async getByBranchId(branchId: string): Promise<Student[]> {
    const rawData = await this.dataSource.getByBranchId(branchId);
    return rawData.map(item => {
      const enrollments = (item.enrollments || []).map((e: any) => Enrollment.create({
        branchId: e.branchId,
        classId: e.classId,
        status: e.status,
        joinedDate: new Date(e.joinedDate),
        endDate: e.endDate ? new Date(e.endDate) : undefined
      }).getValue());

      return Student.create({
        name: item.name,
        email: item.email,
        phone: item.phone,
        status: item.status as 'active' | 'banned' | 'archived',
        enrollments: enrollments
      }, Identifier.create(item.id)).getValue();
    });
  }

  async save(student: Student): Promise<void> {
    return this.dataSource.save(student);
  }
}