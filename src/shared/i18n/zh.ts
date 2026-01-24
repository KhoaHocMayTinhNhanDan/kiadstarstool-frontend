// src/shared/i18n/zh.ts
import { en } from './en'

export const zh: Record<keyof typeof en, string> = {
  'app.title': '学生管理',
  'auth.login': '登录',
  'auth.logout': '退出登录',
  'user.name': '用户名',
  'error.UNKNOWN': '发生错误',
  'loadingSpinner.defaultLabel': '加载中...',
  'loadingSpinner.loading': '加载中...',
  'switch.on': '开',
  'switch.off': '关',
  'switch.required': '必填',
  'switch.test.themes.purple': '紫色',
  'switch.test.themes.emerald': '翡翠绿',
  'switch.test.themes.rose': '玫瑰红',
  'switch.test.description': '这是一个用于切换设置开关的开关组件。',
  'switch.test.darkMode': 'test_darkMode_zh'
}
