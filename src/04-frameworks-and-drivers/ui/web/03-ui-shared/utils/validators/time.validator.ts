/**
 * Kiểm tra xem giờ kết thúc có lớn hơn giờ bắt đầu hay không.
 * Định dạng đầu vào: HH:mm (24h)
 */
export const isValidTimeRange = (startTime: string, endTime: string): boolean => {
  if (!startTime || !endTime) return false;
  return startTime < endTime;
};