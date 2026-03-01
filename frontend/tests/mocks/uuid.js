// Mock đơn giản cho uuid v4 (sử dụng CommonJS để tương thích với Jest)
// Trả về một giá trị cố định để test có thể dự đoán được.
const v4 = () => 'mock-uuid-12345';

module.exports = { v4 };