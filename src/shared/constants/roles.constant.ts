/**
 * @deprecated
 * File này đã được refactor thành 3 phần riêng biệt trong thư mục `src/shared/constants/authorization/`.
 * Vui lòng import trực tiếp từ các file mới để đảm bảo Clean Architecture.
 *
 * - Domain: ./authorization/auth.domain
 * - Policy: ./authorization/auth.policy
 * - UI:     ./authorization/auth.ui
 */

export * from './authorization/auth.domain';
export * from './authorization/auth.policy';
export * from './authorization/auth.ui';
