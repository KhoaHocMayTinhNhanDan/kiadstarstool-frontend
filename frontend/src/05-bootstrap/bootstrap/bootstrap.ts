import { AppContext, type AppContextType } from '../app-context'

import {
  API_BASE_URL,
  DATA_MODE
} from '@/shared/config/env'

import { getBootstrapModeInfo } from '../utils/bootstrapLogger'

// Drivers
import { createAuthDriver } from '../driver-factories/auth.driver.factory.ts'

// Repositories
import {
  createActivityRepository,
  createAttendanceRepository,
  createBranchRepository,
  createClassRepository,
  createStudentRepository,
  createTransactionRepository,
  createUserRepository
} from './repositories.factory'

// Module Bootstrappers
import { bootstrapActivity } from './activity.bootstrap'
import { bootstrapAuth } from './auth.bootstrap'
import { bootstrapUsers } from './users.bootstrap'
import { bootstrapBranch } from './branch.bootstrap'
import { bootstrapClasses } from './classes.bootstrap'
import { bootstrapAttendance } from './attendance.bootstrap'
import { bootstrapStudents } from './students.bootstrap'
import { bootstrapFinance } from './finance.bootstrap'

let isBootstrapped = false

export function isAppBootstrapped(): boolean {
  return isBootstrapped
}

export async function bootstrapApp(): Promise<void> {

  if (isBootstrapped) {
    console.warn('[bootstrap] Application already initialized. Skipping.')
    return
  }

  console.log('[bootstrap] Initializing application...', {
    dataMode: DATA_MODE
  })

  try {

    /* ------------------------------------------------------------------
     * 1. DRIVERS
     * ------------------------------------------------------------------ */

    const authDriver = createAuthDriver()

    /* ------------------------------------------------------------------
     * 2. REPOSITORIES
     * ------------------------------------------------------------------ */

    const activityRepository = createActivityRepository()
    const userRepository = createUserRepository()
    const studentRepository = createStudentRepository()
    const classRepository = createClassRepository()
    const attendanceRepository = createAttendanceRepository()
    const branchRepository = createBranchRepository()
    const transactionRepository = createTransactionRepository()

    /* ------------------------------------------------------------------
     * 3. CORE MODULES (order matters)
     * ------------------------------------------------------------------ */

    const {
      recordActivityInteractor,
      activityController
    } = bootstrapActivity(activityRepository)

    const {
      usersController
    } = bootstrapUsers(
      userRepository,
      recordActivityInteractor
    )

    const {
      authRepository,
      authPresenter,
      loginInteractor,
      logoutInteractor,
      authController,
      authorizationController
    } = await bootstrapAuth(
      authDriver,
      recordActivityInteractor,
      userRepository
    )

    /* ------------------------------------------------------------------
     * 4. FEATURE MODULES
     * ------------------------------------------------------------------ */

    const {
      branchController
    } = bootstrapBranch(
      branchRepository,
      studentRepository
    )

    const {
      classesController
    } = bootstrapClasses(
      classRepository,
      attendanceRepository
    )

    const {
      attendanceController
    } = bootstrapAttendance(
      attendanceRepository,
      studentRepository,
      classRepository
    )

    const {
      studentsController
    } = bootstrapStudents(
      studentRepository,
      attendanceRepository,
      classRepository,
      branchRepository,
      userRepository
    )

    const {
      financeController
    } = bootstrapFinance(
      transactionRepository,
      studentRepository
    )

    /* ------------------------------------------------------------------
     * 5. BUILD APP CONTEXT
     * ------------------------------------------------------------------ */

    const context: AppContextType = {

      config: {
        dataMode: DATA_MODE,
        apiBaseUrl: API_BASE_URL
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

      attendance: {
        controller: attendanceController
      },

      finance: {
        controller: financeController
      },

      activity: {
        controller: activityController
      }
    }

    AppContext.set(context)

    isBootstrapped = true

    /* ------------------------------------------------------------------
     * 6. FINAL LOG
     * ------------------------------------------------------------------ */

    console.log('[bootstrap] Application initialized successfully', {
      ...getBootstrapModeInfo(authDriver),
      dataMode: DATA_MODE,
      apiBaseUrl: API_BASE_URL,
      hasAuth: !!context.auth
    })

  } catch (error) {

    isBootstrapped = false

    console.error('[bootstrap] Failed to initialize application', error)

    throw error
  }
}