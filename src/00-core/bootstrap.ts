// src/00-core/bootstrap.ts

import { AppContext, type AppContextType } from './app-context'
import { createMockAuthDriver, MockAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/MockAuthDriver'
import { createFirebaseAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver'
import { AuthRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AuthRepository'
import { UserProfileRepository } from '@/03-interface-adapters/gateways/inbound/repositories/UserProfileRepository'
import { BranchRepository } from '@/03-interface-adapters/gateways/inbound/repositories/BranchRepository'
import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication';
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement';
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession';
import { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'
import { LoginInteractor } from '@/02-usecases/auth/Login.interactor'
import { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor'
import { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import { CheckPermissionInteractor } from '@/02-usecases/authorization/CheckPermission.interactor'
import { GetUserPermissionsInteractor } from '@/02-usecases/authorization/GetUserPermissions.interactor'
import { GrantUserPermissionInteractor } from '@/02-usecases/authorization/GrantUserPermission.interactor'
import { RevokeUserPermissionInteractor } from '@/02-usecases/authorization/RevokeUserPermission.interactor'
import { AuthorizationController } from '@/03-interface-adapters/controllers/Authorization.controller'
import { GetUserInteractor } from '@/02-usecases/users/GetUser.interactor';
import { ListUsersInteractor } from '@/02-usecases/users/ListUsers.interactor';
import { UsersController } from '@/03-interface-adapters/controllers/Users.controller';
import { MockBranchDataSource } from '@/04-frameworks-and-drivers/devices/branch/MockBranchDataSource';
import { CreateBranchInteractor } from '@/02-usecases/branch/CreateBranch.interactor';
import { UpdateBranchInfoInteractor } from '@/02-usecases/branch/UpdateBranchInfo.interactor';
import { GetBranchDetailsInteractor } from '@/02-usecases/branch/GetBranchDetails.interactor';
import { ListBranchesInteractor } from '@/02-usecases/branch/ListBranches.interactor';
import { DeleteBranchInteractor } from '@/02-usecases/branch/DeleteBranch.interactor';
import { BranchController } from '@/03-interface-adapters/controllers/Branch.controller';
import { MockClassDataSource } from '@/04-frameworks-and-drivers/devices/class/MockClassDataSource';
import { ClassRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ClassRepository';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { GetClassDetailsInteractor } from '@/02-usecases/class/GetClassDetails.interactor';
import { ListClassesByDateInteractor } from '@/02-usecases/class/ListClassesByDate.interactor';
import { UpdateClassInfoInteractor } from '@/02-usecases/class/UpdateClassInfo.interactor';
import { DeleteClassInteractor } from '@/02-usecases/class/DeleteClass.interactor';
import { ClassesController } from '@/03-interface-adapters/controllers/Classes.controller';
import { MockStudentDataSource } from '@/04-frameworks-and-drivers/devices/students/MockStudentDataSource';
import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import { ListStudentsByBranchInteractor } from '@/02-usecases/students/ListStudentsByBranch.interactor';
import { CreateStudentInteractor } from '@/02-usecases/students/CreateStudent.interactor';
import { GetStudentDetailsInteractor } from '@/02-usecases/students/GetStudentDetails.interactor';
import { TransferStudentInteractor } from '@/02-usecases/students/TransferStudent.interactor';
import { StudentsController } from '@/03-interface-adapters/controllers/Students.controller';
import { MockDashboardDataSource } from '@/04-frameworks-and-drivers/devices/dashboard/MockDashboardDataSource';
import { DashboardRepository } from '@/03-interface-adapters/gateways/inbound/repositories/DashboardRepository';
import { GetDashboardStatsInteractor } from '@/02-usecases/dashboard/GetDashboardStats.interactor';
import { DashboardController } from '@/03-interface-adapters/controllers/Dashboard.controller';
import { MockAttendanceDataSource } from '@/04-frameworks-and-drivers/devices/attendance/MockAttendanceDataSource';
import { AttendanceRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AttendanceRepository';
import { ListAttendanceByClassInteractor } from '@/02-usecases/attendance/ListAttendanceByClass.interactor';
import { MarkAttendanceInteractor } from '@/02-usecases/attendance/MarkAttendance.interactor';
import { MarkBatchAttendanceInteractor } from '@/02-usecases/attendance/MarkBatchAttendance.interactor';
import { AttendanceController } from '@/03-interface-adapters/controllers/Attendance.controller';

export interface BootstrapOptions {
  useMockAuth?: boolean;
  apiBaseUrl?: string;
  enableLogging?: boolean;
  // New option for testing: pre-authenticate a mock user
  preAuthenticateAs?: 'admin' | 'teacher' | 'none';
}

/**
 * Bootstrap với authentication đầy đủ
 */
export async function bootstrapApp(options: BootstrapOptions = {}): Promise<void> {
  const {
    useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true',
    apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    enableLogging = true,
    preAuthenticateAs = (import.meta.env.VITE_PRE_AUTHENTICATE_AS as 'admin' | 'teacher' | 'none') || 'none'
  } = options

  console.log('[bootstrap] Initializing application...', { useMockAuth })

  // 1. Initialize Authentication Driver
  let authDriver: IAuthAuthentication & IAuthAccountManagement & IAuthSession;
  
  if (useMockAuth) {
    authDriver = createMockAuthDriver();
    console.log('[bootstrap] Using MockAuthDriver');
  } else {
    try {
      authDriver = createFirebaseAuthDriver();
      console.log('[bootstrap] Using FirebaseAuthDriver');
    } catch (error) {
      console.error('[bootstrap] Failed to initialize FirebaseAuthDriver, falling back to MockAuthDriver', error);
      authDriver = createMockAuthDriver();
      console.log('[bootstrap] Fallback to MockAuthDriver');
    }
  }

  // For testing: Pre-authenticate a mock user if requested
  if (useMockAuth && preAuthenticateAs !== 'none') {
    const mockDriver = authDriver as MockAuthDriver; // Cast to MockAuthDriver
    let mockUserEmail = '';
    let mockUserPassword = 'password123';
    let mockUserRoles: string[] = [];

    if (preAuthenticateAs === 'admin') {
      mockUserEmail = 'admin@example.com';
      mockUserRoles = ['admin'];
    } else if (preAuthenticateAs === 'teacher') {
      mockUserEmail = 'teacher@example.com';
      mockUserRoles = ['teacher'];
    }

    // Ensure the user exists in the mock driver's internal list (idempotent for mock)
    mockDriver.addMockUser({
      email: mockUserEmail,
      password: mockUserPassword,
      roles: mockUserRoles,
      emailVerified: true,
    });
    // Set this user as the current authenticated user
    await mockDriver.signInWithEmailAndPassword(mockUserEmail, mockUserPassword); // Await to ensure state is set before app renders
  }
  
  const authRepository = new AuthRepository(authDriver)
  const userRepository = new UserProfileRepository()
  const authPresenter = new AuthPresenter()
  
  const loginInteractor = new LoginInteractor(authRepository)
  const logoutInteractor = new LogoutInteractor(authRepository)
  
  const authController = new AuthController(loginInteractor, logoutInteractor)

  // 1.1 Initialize Authorization (New)
  const checkPermissionInteractor = new CheckPermissionInteractor(userRepository)
  const getUserPermissionsInteractor = new GetUserPermissionsInteractor(userRepository)
  const grantUserPermissionInteractor = new GrantUserPermissionInteractor(userRepository)
  const revokeUserPermissionInteractor = new RevokeUserPermissionInteractor(userRepository)

  const authorizationController = new AuthorizationController(
    checkPermissionInteractor,
    getUserPermissionsInteractor,
    grantUserPermissionInteractor,
    revokeUserPermissionInteractor
  )

  // 1.2 Initialize Users
  const getUserInteractor = new GetUserInteractor(userRepository);
  const listUsersInteractor = new ListUsersInteractor(userRepository);
  const usersController = new UsersController(
    getUserInteractor,
    listUsersInteractor
  );

  // --- Pre-initialize Student Repo for Branch dependency ---
  const studentDataSource = new MockStudentDataSource();
  const studentRepository = new StudentRepository(studentDataSource);

  // 1.3 Initialize Branch
  // TODO: Switch to FirebaseBranchDataSource when ready
  const branchDataSource = new MockBranchDataSource();
  const branchRepository = new BranchRepository(branchDataSource);
  
  const createBranchInteractor = new CreateBranchInteractor(branchRepository);
  const updateBranchInfoInteractor = new UpdateBranchInfoInteractor(branchRepository);
  const getBranchDetailsInteractor = new GetBranchDetailsInteractor(branchRepository);
  const listBranchesInteractor = new ListBranchesInteractor(branchRepository, studentRepository);
  const deleteBranchInteractor = new DeleteBranchInteractor(branchRepository);

  const branchController = new BranchController(
    createBranchInteractor,
    updateBranchInfoInteractor,
    getBranchDetailsInteractor,
    listBranchesInteractor,
    deleteBranchInteractor
  );

  
  // --- Repositories (Initialize all data-related repositories first) ---
  const classDataSource = new MockClassDataSource();
  const classRepository = new ClassRepository(classDataSource);
  const attendanceDataSource = new MockAttendanceDataSource();
  const attendanceRepository = new AttendanceRepository(attendanceDataSource);
  const dashboardDataSource = new MockDashboardDataSource();
  const dashboardRepository = new DashboardRepository(dashboardDataSource);

  // --- Interactors & Controllers (Now can be initialized in any order as repos are ready) ---

  // 1.4 Initialize Classes
  const listClassesByBranchInteractor = new ListClassesByBranchInteractor(classRepository);
  const createClassInteractor = new CreateClassInteractor(classRepository);
 const getClassDetailsInteractor = new GetClassDetailsInteractor(classRepository);
  const listClassesByDateInteractor = new ListClassesByDateInteractor(classRepository);
  const updateClassInfoInteractor = new UpdateClassInfoInteractor(classRepository);
  const deleteClassInteractor = new DeleteClassInteractor(classRepository, attendanceRepository);
  
  const classesController = new ClassesController(
    listClassesByBranchInteractor, 
    createClassInteractor, 
    getClassDetailsInteractor, 
    listClassesByDateInteractor, // Thêm interactor này vào
    updateClassInfoInteractor, 
    deleteClassInteractor
  );


  // 1.5 Initialize Students
  const listStudentsByBranchInteractor = new ListStudentsByBranchInteractor(studentRepository);
  const createStudentInteractor = new CreateStudentInteractor(studentRepository);

  const getStudentDetailsInteractor = new GetStudentDetailsInteractor(studentRepository, branchRepository, attendanceRepository, classRepository);
    const transferStudentInteractor = new TransferStudentInteractor(studentRepository, classRepository);
  const studentsController = new StudentsController(listStudentsByBranchInteractor, createStudentInteractor, getStudentDetailsInteractor, transferStudentInteractor);

  // 1.6 Initialize Dashboard
  const getDashboardStatsInteractor = new GetDashboardStatsInteractor(dashboardRepository);
  const dashboardController = new DashboardController(getDashboardStatsInteractor);

  // 1.7 Initialize Attendance
  const listAttendanceInteractor = new ListAttendanceByClassInteractor(attendanceRepository, studentRepository, classRepository);
  const markAttendanceInteractor = new MarkAttendanceInteractor(attendanceRepository, classRepository);
    const markBatchAttendanceInteractor = new MarkBatchAttendanceInteractor(attendanceRepository, classRepository);
  const attendanceController = new AttendanceController(listAttendanceInteractor, markAttendanceInteractor, markBatchAttendanceInteractor);

  // 2. Create Application Context
  const context: AppContextType = {
    config: {
      isMockMode: useMockAuth,
      apiBaseUrl,
      authDriverType: useMockAuth ? 'mock' : 'firebase'
    },
    

    auth: {
      driver: authDriver,
      repository: authRepository,
      presenter: authPresenter,
      loginInteractor,
      logoutInteractor,
      controller: authController
    },

    authorization: {
      controller: authorizationController
    },

    users: {
      controller: usersController
    },

    branch: {
      controller: branchController
    },

    classes: {
      controller: classesController
    },

    students: {
      controller: studentsController
    },

    dashboard: {
      controller: dashboardController
    },

    attendance: {
      controller: attendanceController
    }
  }

  // 4. Set Global Context
  AppContext.set(context)

  if (enableLogging) {
    const modeInfo = useMockAuth 
      ? { mode: 'Mock Mode', users: (authDriver as any).getMockUsers?.()?.map((u: any) => u.email) || [] }
      : { mode: 'Firebase Mode', firebaseReady: true };
    
    console.log('[bootstrap] Application initialized successfully', {
      ...modeInfo,
      apiBaseUrl,
      hasAuth: !!context.auth,
    })
  }
}

export function bootstrap(): void {
  console.log('[bootstrap] Initializing minimal app (ping only)')


  AppContext.set({
      config: {
      isMockMode: true,
      apiBaseUrl: 'http://localhost:3000/api',
      authDriverType: 'mock'
    }
  })

  console.log('[bootstrap] Minimal app ready')
}

/**
 * Bootstrap với tùy chọn
 */
export function bootstrapWithConfig(config: {
  withAuth?: boolean
  withMock?: boolean
} = {}): void {
  const { withAuth = true, withMock = true } = config

  if (withAuth) {
    bootstrapApp({ useMockAuth: withMock })
  } else {
    bootstrap()
  }
}

// Helper để check nếu app đã được bootstrap
export function isAppBootstrapped(): boolean {
  try {
    AppContext.get()
    return true
  } catch {
    return false
  }
}

/**
 * Toggle auth mode at runtime (for testing)
 */
export function toggleAuthMode(useMock: boolean): void {
  try {
    // Lấy config hiện tại nếu có, hoặc dùng default
    let currentApiUrl = 'http://localhost:3000/api';
    try {
      currentApiUrl = AppContext.getConfig().apiBaseUrl;
    } catch (e) {
      // Ignore if context not initialized
    }
    
    console.log(`[bootstrap] Switching auth mode to: ${useMock ? 'Mock' : 'Firebase'}`);
    AppContext.reset();
    bootstrapApp({
      useMockAuth: useMock,
      apiBaseUrl: currentApiUrl,
      enableLogging: true
    });
  } catch (error) {
    console.error('[bootstrap] Failed to toggle auth mode:', error);
  }
}