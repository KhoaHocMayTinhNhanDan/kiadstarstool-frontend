// Mock đơn giản cho uuid v4
export const v4 = () => 'mock-uuid-' + Math.random().toString(36).substring(7);
// Export default để tương thích với một số cách import
export default { v4 };
