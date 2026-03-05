// src/00-core/app-context.ts

import type { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import type { AuthorizationController } from '@/03-interface-adapters/controllers/Authorization.controller'
import type { AuthRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AuthRepository'

import type { UsersController } from '@/03-interface-adapters/controllers/Users.controller'
import type { BranchController } from '@/03-interface-adapters/controllers/Branch.controller'
import type { ClassesController } from '@/03-interface-adapters/controllers/Classes.controller'
import type { StudentsController } from '@/03-interface-adapters/controllers/Students.controller'
import type { AttendanceController } from '@/03-interface-adapters/controllers/Attendance.controller'
import type { FinanceController } from '@/03-interface-adapters/controllers/Finance.controller'
import type { ActivityController } from '@/03-interface-adapters/controllers/Activity.controller'

import type { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'

import type { LoginInteractor } from '@/02-usecases/auth/Login.interactor'
import type { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor'

import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement'
import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication'
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession'

import type { DataMode, API_BASE_URL } from '@/shared/config/env'

/* =====================
 * CONFIG TYPE
 * ===================== */

export type AppConfig = {
  dataMode: DataMode
  apiBaseUrl: string
}

/* =====================
 * APP CONTEXT TYPE
 * ===================== */

export type AppContextType = Readonly<{

  auth?: {
    driver: IAuthAuthentication & IAuthAccountManagement & IAuthSession
    repository: AuthRepository
    presenter: AuthPresenter
    loginInteractor: LoginInteractor
    logoutInteractor?: LogoutInteractor
    controller: AuthController
  }

  authorization?: {
    controller: AuthorizationController
  }

  users?: {
    controller: UsersController
  }

  branch?: {
    controller: BranchController
  }

  classes?: {
    controller: ClassesController
  }

  students?: {
    controller: StudentsController
  }

  attendance?: {
    controller: AttendanceController
  }

  finance?: {
    controller: FinanceController
  }

  activity?: {
    controller: ActivityController
  }

  config?: AppConfig
}>

/* =====================
 * IMPLEMENTATION
 * ===================== */

class AppContextImpl {

  private static instance: AppContextType | null = null

  /* CORE */

  static set(ctx: AppContextType) {

    this.instance = ctx

    console.log('[AppContext] initialized', {
      dataMode: ctx.config?.dataMode ?? 'unknown',
      hasAuth: !!ctx.auth
    })
  }

  static get(): AppContextType {

    if (!this.instance) {
      throw new Error(
        '[AppContext] Not initialized. Call bootstrap() first.'
      )
    }

    return this.instance
  }

  /* FEATURES */

  static getAuth() {
    const ctx = this.get()
    if (!ctx.auth) throw new Error('[AppContext] Auth not configured')
    return ctx.auth
  }

  static getAuthorization() {
    const ctx = this.get()
    if (!ctx.authorization) throw new Error('[AppContext] Authorization not configured')
    return ctx.authorization
  }

  static getUsers() {
    const ctx = this.get()
    if (!ctx.users) throw new Error('[AppContext] Users not configured')
    return ctx.users
  }

  static getBranch() {
    const ctx = this.get()
    if (!ctx.branch) throw new Error('[AppContext] Branch not configured')
    return ctx.branch
  }

  static getClasses() {
    const ctx = this.get()
    if (!ctx.classes) throw new Error('[AppContext] Classes not configured')
    return ctx.classes
  }

  static getStudents() {
    const ctx = this.get()
    if (!ctx.students) throw new Error('[AppContext] Students not configured')
    return ctx.students
  }

  static getAttendance() {
    const ctx = this.get()
    if (!ctx.attendance) throw new Error('[AppContext] Attendance not configured')
    return ctx.attendance
  }

  static getFinance() {
    const ctx = this.get()
    if (!ctx.finance) throw new Error('[AppContext] Finance not configured')
    return ctx.finance
  }

  static getActivity() {
    const ctx = this.get()
    if (!ctx.activity) throw new Error('[AppContext] Activity not configured')
    return ctx.activity
  }

  static getConfig(): AppConfig {
    const ctx = this.get()
    if (!ctx.config) throw new Error('[AppContext] Config not initialized')
    return ctx.config
  }

  /* CONVENIENCE */

  static getAuthDriver() {
    return this.getAuth().driver
  }

  static getAuthController() {
    return this.getAuth().controller
  }

  static getAuthorizationController() {
    return this.getAuthorization().controller
  }

  static getUsersController() {
    return this.getUsers().controller
  }

  static getBranchController() {
    return this.getBranch().controller
  }

  static getClassesController() {
    return this.getClasses().controller
  }

  static getStudentsController() {
    return this.getStudents().controller
  }

  static getAttendanceController() {
    return this.getAttendance().controller
  }

  static getFinanceController() {
    return this.getFinance().controller
  }

  static getActivityController() {
    return this.getActivity().controller
  }

  static getLoginInteractor() {
    return this.getAuth().loginInteractor
  }

  static getAuthRepository() {
    return this.getAuth().repository
  }

  static getAuthPresenter() {
    return this.getAuth().presenter
  }

  /* STATE */

  static isMockMode(): boolean {
    return this.getConfig().dataMode === 'mock'
  }

  /* RESET */

  static reset(): void {

    if (this.instance?.auth?.driver) {
      const driver = this.instance.auth.driver

      if (typeof (driver as any).reset === 'function') {
        (driver as any).reset()
      }
    }

    this.instance = null

    console.log('[AppContext] reset')
  }

  /* DEBUG */

  static debug() {

    const ctx = this.instance

    if (!ctx) {
      return {
        mode: 'not-initialized',
        features: [],
        config: {}
      }
    }

    return {

      mode: ctx.config?.dataMode ?? 'unknown',

      features: [
        ...(ctx.auth ? ['auth'] : []),
        ...(ctx.authorization ? ['authorization'] : []),
        ...(ctx.users ? ['users'] : []),
        ...(ctx.branch ? ['branch'] : []),
        ...(ctx.classes ? ['classes'] : []),
        ...(ctx.students ? ['students'] : []),
        ...(ctx.attendance ? ['attendance'] : []),
        ...(ctx.finance ? ['finance'] : []),
        ...(ctx.activity ? ['activity'] : [])
      ],

      config: ctx.config ?? {},

      auth: ctx.auth
        ? {
            driver: ctx.auth.driver.constructor.name,
            hasController: !!ctx.auth.controller
          }
        : undefined
    }
  }
}

export const AppContext = AppContextImpl