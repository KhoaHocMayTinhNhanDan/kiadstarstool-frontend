export interface PhoneEntry {
  number: string;
  note: string;
}

export const parsePhoneString = (phoneString?: string): PhoneEntry[] => {
  if (!phoneString) return [];
  
  return phoneString.split(' - ').map(p => {
    // Regex: Lấy phần số (group 1) và phần ghi chú trong ngoặc (group 2)
    const match = p.match(/^(.+?)\s*(?:\((.+)\))?$/);
    if (match) {
      return { 
        number: match[1].trim(), 
        note: match[2] ? match[2].trim() : '' 
      };
    }
    return { number: p.trim(), note: '' };
  }).filter(p => p.number !== '');
};

export const formatPhoneString = (phones: PhoneEntry[]): string => {
  return phones
    .filter(p => p.number.trim() !== '')
    .map(p => p.note.trim() ? `${p.number.trim()} (${p.note.trim()})` : p.number.trim())
    .join(' - ');
};