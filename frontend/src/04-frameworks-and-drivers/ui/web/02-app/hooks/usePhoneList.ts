import { useState, useCallback } from 'react';
import { type PhoneEntry } from '@/shared/utils/phoneUtils';

export interface PhoneEntryWithValidation extends PhoneEntry {
  error?: string;
}

export const usePhoneList = (initialPhones: PhoneEntry[] = [{ number: '', note: 'Di động' }]) => {
  const [phones, setPhones] = useState<PhoneEntryWithValidation[]>(initialPhones);

  const addPhone = useCallback(() => {
    setPhones(prev => [...prev, { number: '', note: '' }]);
  }, []);

  const removePhone = useCallback((index: number) => {
    setPhones(prev => prev.filter((_, i) => i !== index));
  }, []);

  const validatePhone = (number: string): string | undefined => {
    if (!number) return undefined;
    // Regex: Chỉ chứa số, độ dài từ 10-11 ký tự (cơ bản cho VN)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(number)) {
      return 'Số điện thoại không hợp lệ (10-11 số)';
    }
    return undefined;
  };

  const updatePhone = useCallback((index: number, field: keyof PhoneEntry, value: string) => {
    setPhones(prev => prev.map((p, i) => {
      if (i !== index) return p;
      
      const updated = { ...p, [field]: value };
      
      // Validate ngay khi nhập số điện thoại
      if (field === 'number') {
        updated.error = validatePhone(value);
      }
      
      return updated;
    }));
  }, []);

  // Hàm kiểm tra toàn bộ danh sách trước khi submit
  const validateAll = useCallback((): boolean => {
    let isValid = true;
    setPhones(prev => prev.map(p => {
      const error = validatePhone(p.number);
      if (error) isValid = false;
      return { ...p, error };
    }));
    return isValid;
  }, []);

  return {
    phones,
    setPhones,
    addPhone,
    removePhone,
    updatePhone,
    validateAll
  };
};