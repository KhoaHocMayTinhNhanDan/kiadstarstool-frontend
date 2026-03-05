// src/05-bootstrap/bootstrap/repositories.factory.ts
import { TransactionRepository } from '@/03-interface-adapters/gateways/inbound/repositories/TransactionRepository';

import {
  createActivityDataSource,
  createUserProfileDataSource,
  createStudentDataSource,
  createClassDataSource,
  createAttendanceDataSource,
  createBranchDataSource,
  createTransactionDataSource,
} from '../driver-factories/datasource.factory.ts';

import { ActivityRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ActivityRepository';
import { UserRepository } from '@/03-interface-adapters/gateways/inbound/repositories/UserRepository';
import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import { ClassRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ClassRepository';
import { AttendanceRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AttendanceRepository';
import { BranchRepository } from '@/03-interface-adapters/gateways/inbound/repositories/BranchRepository';

export function createActivityRepository() {
  return new ActivityRepository(createActivityDataSource());
}

export function createUserRepository() {
  return new UserRepository(createUserProfileDataSource());
}

export function createStudentRepository() {
  return new StudentRepository(createStudentDataSource());
}

export function createClassRepository() {
  return new ClassRepository(createClassDataSource());
}

export function createAttendanceRepository() {
  return new AttendanceRepository(createAttendanceDataSource());
}

export function createBranchRepository() {
  return new BranchRepository(createBranchDataSource());
}

export function createTransactionRepository(): TransactionRepository {
  return new TransactionRepository(createTransactionDataSource());
}