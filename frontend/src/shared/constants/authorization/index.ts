// Cải tiến: Export trực tiếp các hằng số thay vì namespace để dễ sử dụng hơn.
// Ví dụ: `import { PERMISSIONS } from '...'` thay vì `import { AuthDomain } from '...'; AuthDomain.PERMISSIONS`
export * from './auth.domain';
export * from './auth.policy';
export * from './auth.ui';
