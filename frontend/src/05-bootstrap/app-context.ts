// src/00-core/app-context.ts

import type { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import type { AuthorizationController } from '@/03-interface-adapters/controllers/Authorization.controller'
import type { AuthRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AuthRepository'
import type { UsersController } from '@/03-interface-adapters/controllers/Users.controller';
import type { BranchController } from '@/03-interface-adapters/controllers/Branch.controller';
import type { ClassesController } from '@/03-interface-adapters/controllers/Classes.controller';
import type { StudentsController } from '@/03-interface-adapters/controllers/Students.controller';
import type { AttendanceController } from '@/03-interface-adapters/controllers/Attendance.controller';
import type { FinanceController } from '@/03-interface-adapters/controllers/Finance.controller';
import type { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'
import type { LoginInteractor } from '@/02-usecases/auth/Login.interactor'
import type { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor'
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement'
import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication'
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession'

export type AppContextType = {
  
  
  // Authentication feature
  auth?: {
    driver: IAuthAuthentication & IAuthAccountManagement & IAuthSession
    repository: AuthRepository
    presenter: AuthPresenter
    loginInteractor: LoginInteractor
    logoutInteractor?: LogoutInteractor
    controller: AuthController
  }

  // Authorization feature
  authorization?: {
    controller: AuthorizationController
  }

  // Users feature
  users?: {
    controller: UsersController;
  }

  // Branch feature
  branch?: {
    controller: BranchController;
  }

  // Classes feature
  classes?: {
    controller: ClassesController;
  }

  // Students feature
  students?: {
    controller: StudentsController;
  }

  // Attendance feature
  attendance?: {
    controller: AttendanceController;
  }

  // Finance feature
  finance?: {
    controller: FinanceController;
  }
  
  // Configuration
  config?: {
    isMockMode: boolean
    apiBaseUrl: string
    authDriverType: 'mock' | 'firebase'
  }
}

class AppContextImpl {
  private static instance: AppContextType | null = null

  /* =====================
   *  CORE METHODS
   * ===================== */

  static set(ctx: AppContextType) {
    this.instance = ctx
    console.log('[AppContext] Context initialized', {
      mode: ctx.config?.authDriverType || 'unknown',
      hasAuth: !!ctx.auth,
    })
  }

  static get(): AppContextType {
    if (!this.instance) {
      throw new Error('[AppContext] Not initialized. Call bootstrap() or bootstrapApp() first.')
    }
    return this.instance
  }

  /* =====================
   *  FEATURE GETTERS
   * ===================== */

  static getAuth() {
    const ctx = this.get()
    if (!ctx.auth) {
      throw new Error('[AppContext] Auth feature not configured.')
    }
    return ctx.auth
  }

  static getAuthorization() {
    const ctx = this.get()
    if (!ctx.authorization) {
      throw new Error('[AppContext] Authorization feature not configured.')
    }
    return ctx.authorization
  }

  static getUsers() {
    const ctx = this.get();
    if (!ctx.users) {
      throw new Error('[AppContext] Users feature not configured.');
    }
    return ctx.users;
  }

  static getBranch() {
    const ctx = this.get();
    if (!ctx.branch) {
      throw new Error('[AppContext] Branch feature not configured.');
    }
    return ctx.branch;
  }

  static getClasses() {
    const ctx = this.get();
    if (!ctx.classes) {
      throw new Error('[AppContext] Classes feature not configured.');
    }
    return ctx.classes;
  }

  static getStudents() {
    const ctx = this.get();
    if (!ctx.students) {
      throw new Error('[AppContext] Students feature not configured.');
    }
    return ctx.students;
  }

  static getAttendance() {
    const ctx = this.get();
    if (!ctx.attendance) {
      throw new Error('[AppContext] Attendance feature not configured.');
    }
    return ctx.attendance;
  }

  static getFinance() {
    const ctx = this.get();
    if (!ctx.finance) {
      throw new Error('[AppContext] Finance feature not configured.');
    }
    return ctx.finance;
  }

  static getConfig() {
    const ctx = this.get()
    if (!ctx.config) {
      throw new Error('[AppContext] Config not initialized')
    }
    return ctx.config
  }

  /* =====================
   *  CONVENIENCE GETTERS
   * ===================== */

  static getAuthDriver(): IAuthAuthentication & IAuthAccountManagement & IAuthSession {
    return this.getAuth().driver
  }

  static getAuthController(): AuthController {
    return this.getAuth().controller
  }

  static getAuthorizationController(): AuthorizationController {
    return this.getAuthorization().controller
  }

  static getUsersController(): UsersController {
    return this.getUsers().controller;
  }

  static getBranchController(): BranchController {
    return this.getBranch().controller;
  }

  static getClassesController(): ClassesController {
    return this.getClasses().controller;
  }

  static getStudentsController(): StudentsController {
    return this.getStudents().controller;
  }

  static getAttendanceController(): AttendanceController {
    return this.getAttendance().controller;
  }

  static getFinanceController(): FinanceController {
    return this.getFinance().controller;
  }

  static getLoginInteractor(): LoginInteractor {
    return this.getAuth().loginInteractor
  }

  static getAuthRepository(): AuthRepository {
    return this.getAuth().repository
  }

  static getAuthPresenter(): AuthPresenter {
    return this.getAuth().presenter
  }

  /* =====================
   *  STATE CHECKERS
   * ===================== */

  static isMockMode(): boolean {
    return this.getConfig().isMockMode
  }

  static isUsingMockAuth(): boolean {
    return this.getConfig().authDriverType === 'mock'
  }

  /* =====================
   *  RESET (FOR TESTING)
   * ===================== */

  static reset(): void {
    if (this.instance?.auth?.driver) {
      const driver = this.instance.auth.driver;
      if (typeof (driver as any).reset === 'function') {
        (driver as any).reset();
      }
    }
    
    this.instance = null
    console.log('[AppContext] Context has been reset.')
  }

  /* =====================
   *  DEBUG METHODS
   * ===================== */

  static debug(): {
    mode: string
    features: string[]
    config: Record<string, any>
    auth?: {
      hasDriver: boolean
      driverName?: string
      hasController: boolean
    }
  } {
    const ctx = this.instance
    if (!ctx) {
      return { 
        mode: 'not-initialized', 
        features: [],
        config: {} 
      }
    }

    return {
      mode: ctx.config?.isMockMode ? 'mock' : 'production',
      features: [
        ...(ctx.auth ? ['auth'] : []),
        ...(ctx.authorization ? ['authorization'] : []),
        ...(ctx.users ? ['users'] : []),
        ...(ctx.branch ? ['branch'] : []),
        ...(ctx.classes ? ['classes'] : []),
        ...(ctx.students ? ['students'] : []),
        ...(ctx.attendance ? ['attendance'] : []),
        ...(ctx.finance ? ['finance'] : []),
      ],
      config: ctx.config || {},
      auth: ctx.auth ? {
        hasDriver: !!ctx.auth.driver,
        driverName: ctx.auth.driver.constructor.name,
        hasController: !!ctx.auth.controller
      } : undefined
    }
  }
}

export const AppContext = AppContextImpl