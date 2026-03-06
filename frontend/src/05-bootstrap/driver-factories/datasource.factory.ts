// src/05-bootstrap/driver-factories/datasource.factory.ts

import { DATA_MODE } from '@/shared/config/env'

// Mock DataSources
import { MockActivityDataSource } from '@/04-frameworks-and-drivers/devices/activity/MockActivityDataSource';
import { MockUserProfileDataSource } from '@/04-frameworks-and-drivers/devices/user/MockUserProfileDataSource';
import { MockStudentDataSource } from '@/04-frameworks-and-drivers/devices/students/MockStudentDataSource';
import { MockClassDataSource } from '@/04-frameworks-and-drivers/devices/class/MockClassDataSource';
import { MockAttendanceDataSource } from '@/04-frameworks-and-drivers/devices/attendance/MockAttendanceDataSource';
import { MockBranchDataSource } from '@/04-frameworks-and-drivers/devices/branch/MockBranchDataSource';
import { MockTransactionDataSource } from '@/04-frameworks-and-drivers/devices/transaction/MockTransactionDataSource';

// Firebase DataSources
import { FirebaseActivityDataSource } from '@/04-frameworks-and-drivers/devices/activity/FirebaseActivityDataSource';
import { FirebaseUserProfileDataSource } from '@/04-frameworks-and-drivers/devices/user/FirebaseUserProfileDataSource';
import { FirebaseStudentDataSource } from '@/04-frameworks-and-drivers/devices/students/FirebaseStudentDataSource';
import { FirebaseClassDataSource } from '@/04-frameworks-and-drivers/devices/class/FirebaseClassDataSource';
import { FirebaseAttendanceDataSource } from '@/04-frameworks-and-drivers/devices/attendance/FirebaseAttendanceDataSource';
import { FirebaseBranchDataSource } from '@/04-frameworks-and-drivers/devices/branch/FirebaseBranchDataSource';
import { FirebaseTransactionDataSource } from '@/04-frameworks-and-drivers/devices/transaction/FirebaseTransactionDataSource';
import { db } from '@/shared/config/firebase'

// Interfaces
import type { IActivityDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/activity/IActivityDataSource';
import type { IUserProfileDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserProfileDataSource';
import type { IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import type { IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';
import type { IAttendanceDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/attendance/IAttendanceDataSource';
import type { IBranchDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource';
import type { ITransactionDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/finance/ITransactionDataSource';

/* ------------------------------------------------------------------
 * Helper
 * ------------------------------------------------------------------ */

function selectDataSource<T>(mockFactory: () => T, firebaseFactory: () => T): T {
  return DATA_MODE === 'mock'
    ? mockFactory()
    : firebaseFactory()
}

/* ------------------------------------------------------------------
 * DataSource Factories
 * ------------------------------------------------------------------ */

export function createActivityDataSource(): IActivityDataSource {
  return selectDataSource<IActivityDataSource>(
    () => new MockActivityDataSource(),
    () => new FirebaseActivityDataSource(db)
  )
}

export function createUserProfileDataSource(): IUserProfileDataSource {
  return selectDataSource<IUserProfileDataSource>(
    () => new MockUserProfileDataSource(),
    () => new FirebaseUserProfileDataSource(db)
  )
}

export function createStudentDataSource(): IStudentDataSource {
  return selectDataSource<IStudentDataSource>(
    () => new MockStudentDataSource(),
    () => new FirebaseStudentDataSource(db)
  )
}

export function createClassDataSource(): IClassDataSource {
  return selectDataSource<IClassDataSource>(
    () => new MockClassDataSource(),
    () => new FirebaseClassDataSource(db)
  )
}

export function createAttendanceDataSource(): IAttendanceDataSource {
  return selectDataSource<IAttendanceDataSource>(
    () => new MockAttendanceDataSource(),
    () => new FirebaseAttendanceDataSource(db)
  )
}

export function createBranchDataSource(): IBranchDataSource {
  return selectDataSource<IBranchDataSource>(
    () => new MockBranchDataSource(),
    () => new FirebaseBranchDataSource(db)
  )
}

export function createTransactionDataSource(): ITransactionDataSource {
  return selectDataSource<ITransactionDataSource>(
    () => new MockTransactionDataSource(),
    () => new FirebaseTransactionDataSource(db)
  )
}