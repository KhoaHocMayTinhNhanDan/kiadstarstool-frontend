// src/01-entities/business/Branch.entity.ts
import { BaseEntity, type BaseEntityJSON } from '../shared/base/base.entity';

// ===== Interfaces =====
export interface BranchAddress {
  street: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  hotline: string;
  fax: string;
  website: string;
}

export interface OperatingHours {
  open: string;
  close: string;
}

export interface DailyHours {
  monday: OperatingHours;
  tuesday: OperatingHours;
  wednesday: OperatingHours;
  thursday: OperatingHours;
  friday: OperatingHours;
  saturday: OperatingHours;
  sunday: OperatingHours;
  notes: string;
}

export interface Capacity {
  totalRooms: number;
  availableRooms: number;
  maxStudents: number;
  currentStudents: number;
  maxTeachers: number;
  currentTeachers: number;
  maxStaff: number;
  currentStaff: number;
}

export interface FinancialInfo {
  monthlyRevenue: number;
  monthlyExpenses: number;
  yearlyTarget: number;
  currency: string;
  bankAccount: string;
  taxCode: string;
}

export interface Images {
  logo: string;
  cover: string;
  exterior: string[];
  interior: string[];
  floorPlan: string;
}

export interface Statistics {
  totalCourses: number;
  activeCourses: number;
  completedCourses: number;
  studentSatisfaction: number; // 0-5
  teacherSatisfaction: number; // 0-5
  attendanceRate: number; // %
  graduationRate: number; // %
}

export interface BranchSettings {
  autoAssignStudents: boolean;
  allowOnlineRegistration: boolean;
  requireApproval: boolean;
  maxClassSize: number;
  minClassSize: number;
  paymentDeadline: number; // days
  lateFeePercentage: number; // decimal
}

export interface Metadata {
  foundingStory: string;
  mission: string;
  vision: string;
  values: string[];
  awards: string[];
  partners: string[];
  notes: string;
}

export interface SocialMedia {
  facebook: string;
  youtube: string;
  tiktok: string;
  zalo: string;
}

// ===== Main Entity =====
export interface BranchProps {
  id?: string;
  
  // Basic Information
  name: string;
  code: string;
  shortName: string;
  description: string;
  
  // Contact Information
  address: Partial<BranchAddress>;
  contact: Partial<ContactInfo>;
  
  // Management
  managerId?: string;
  managerName?: string;
  assistantManagerIds?: string[];
  
  // Operations
  operatingHours?: Partial<DailyHours>;
  capacity?: Partial<Capacity>;
  
  // Status
  isActive?: boolean;
  establishmentDate?: string;
  closureDate?: string;
  type?: 'center' | 'satellite' | 'partner' | 'online';
  tier?: 'standard' | 'premium' | 'vip' | 'flagship';
  
  // Financial
  financial?: Partial<FinancialInfo>;
  
  // Facilities
  facilities?: string[];
  amenities?: string[];
  
  // Media
  images?: Partial<Images>;
  
  // Statistics
  stats?: Partial<Statistics>;
  
  // Settings
  settings?: Partial<BranchSettings>;
  
  // Metadata
  metadata?: Partial<Metadata>;
  
  // Classification
  tags?: string[];
  categories?: string[];
  
  // Social Media
  socialMedia?: Partial<SocialMedia>;
}

export interface BranchJSON extends BaseEntityJSON {
  name: string;
  code: string;
  shortName: string;
  description: string;
  address: BranchAddress;
  contact: ContactInfo;
  managerId: string;
  managerName: string;
  assistantManagerIds: string[];
  operatingHours: DailyHours;
  capacity: Capacity;
  isActive: boolean;
  establishmentDate: string;
  closureDate: string;
  type: 'center' | 'satellite' | 'partner' | 'online';
  tier: 'standard' | 'premium' | 'vip' | 'flagship';
  financial: FinancialInfo;
  facilities: string[];
  amenities: string[];
  images: Images;
  stats: Statistics;
  settings: BranchSettings;
  metadata: Metadata;
  tags: string[];
  categories: string[];
  socialMedia: SocialMedia;
}

export class Branch extends BaseEntity<BranchJSON> {
  // Basic Information
  readonly name: string;
  readonly code: string;
  readonly shortName: string;
  readonly description: string;
  
  // Contact Information
  readonly address: BranchAddress;
  readonly contact: ContactInfo;
  
  // Management
  readonly managerId: string;
  readonly managerName: string;
  readonly assistantManagerIds: string[];
  
  // Operations
  readonly operatingHours: DailyHours;
  readonly capacity: Capacity;
  
  // Status
  readonly isActive: boolean;
  readonly establishmentDate: string;
  readonly closureDate: string;
  readonly type: 'center' | 'satellite' | 'partner' | 'online';
  readonly tier: 'standard' | 'premium' | 'vip' | 'flagship';
  
  // Financial
  readonly financial: FinancialInfo;
  
  // Facilities
  readonly facilities: string[];
  readonly amenities: string[];
  
  // Media
  readonly images: Images;
  
  // Statistics
  readonly stats: Statistics;
  
  // Settings
  readonly settings: BranchSettings;
  
  // Metadata
  readonly metadata: Metadata;
  
  // Classification
  readonly tags: string[];
  readonly categories: string[];
  
  // Social Media
  readonly socialMedia: SocialMedia;

  constructor(props: BranchProps) {
    super({ id: props.id });

    // Basic Information
    this.name = props.name.trim();
    this.code = props.code.trim();
    this.shortName = props.shortName?.trim() || '';
    this.description = props.description?.trim() || '';

    // Address
    this.address = {
      street: props.address?.street?.trim() || '',
      ward: props.address?.ward?.trim() || '',
      district: props.address?.district?.trim() || '',
      city: props.address?.city?.trim() || '',
      province: props.address?.province?.trim() || '',
      country: props.address?.country?.trim() || 'Việt Nam',
      postalCode: props.address?.postalCode?.trim() || '',
      coordinates: props.address?.coordinates || { lat: 0, lng: 0 }
    };

    // Contact
    this.contact = {
      phone: props.contact?.phone?.trim() || '',
      email: (props.contact?.email || '').toLowerCase().trim(),
      hotline: props.contact?.hotline?.trim() || '',
      fax: props.contact?.fax?.trim() || '',
      website: props.contact?.website?.trim() || ''
    };

    // Management
    this.managerId = props.managerId || '';
    this.managerName = props.managerName?.trim() || '';
    this.assistantManagerIds = props.assistantManagerIds || [];

    // Operating Hours
    this.operatingHours = {
      monday: props.operatingHours?.monday || { open: '08:00', close: '20:00' },
      tuesday: props.operatingHours?.tuesday || { open: '08:00', close: '20:00' },
      wednesday: props.operatingHours?.wednesday || { open: '08:00', close: '20:00' },
      thursday: props.operatingHours?.thursday || { open: '08:00', close: '20:00' },
      friday: props.operatingHours?.friday || { open: '08:00', close: '20:00' },
      saturday: props.operatingHours?.saturday || { open: '08:00', close: '18:00' },
      sunday: props.operatingHours?.sunday || { open: '08:00', close: '12:00' },
      notes: props.operatingHours?.notes || ''
    };

    // Capacity
    this.capacity = {
      totalRooms: props.capacity?.totalRooms || 0,
      availableRooms: props.capacity?.availableRooms || 0,
      maxStudents: props.capacity?.maxStudents || 100,
      currentStudents: props.capacity?.currentStudents || 0,
      maxTeachers: props.capacity?.maxTeachers || 20,
      currentTeachers: props.capacity?.currentTeachers || 0,
      maxStaff: props.capacity?.maxStaff || 10,
      currentStaff: props.capacity?.currentStaff || 0
    };

    // Status
    this.isActive = props.isActive !== undefined ? props.isActive : true;
    this.establishmentDate = props.establishmentDate || new Date().toISOString().split('T')[0];
    this.closureDate = props.closureDate || '';
    this.type = props.type || 'center';
    this.tier = props.tier || 'standard';

    // Financial
    this.financial = {
      monthlyRevenue: props.financial?.monthlyRevenue || 0,
      monthlyExpenses: props.financial?.monthlyExpenses || 0,
      yearlyTarget: props.financial?.yearlyTarget || 0,
      currency: props.financial?.currency || 'VND',
      bankAccount: props.financial?.bankAccount || '',
      taxCode: props.financial?.taxCode?.trim() || ''
    };

    // Facilities
    this.facilities = props.facilities || [];
    this.amenities = props.amenities || [];

    // Images
    this.images = {
      logo: props.images?.logo || '/assets/images/branch-logo-default.png',
      cover: props.images?.cover || '/assets/images/branch-cover-default.jpg',
      exterior: props.images?.exterior || [],
      interior: props.images?.interior || [],
      floorPlan: props.images?.floorPlan || ''
    };

    // Statistics
    this.stats = {
      totalCourses: props.stats?.totalCourses || 0,
      activeCourses: props.stats?.activeCourses || 0,
      completedCourses: props.stats?.completedCourses || 0,
      studentSatisfaction: props.stats?.studentSatisfaction || 0,
      teacherSatisfaction: props.stats?.teacherSatisfaction || 0,
      attendanceRate: props.stats?.attendanceRate || 0,
      graduationRate: props.stats?.graduationRate || 0
    };

    // Settings
    this.settings = {
      autoAssignStudents: props.settings?.autoAssignStudents || false,
      allowOnlineRegistration: props.settings?.allowOnlineRegistration || true,
      requireApproval: props.settings?.requireApproval || false,
      maxClassSize: props.settings?.maxClassSize || 20,
      minClassSize: props.settings?.minClassSize || 5,
      paymentDeadline: props.settings?.paymentDeadline || 10,
      lateFeePercentage: props.settings?.lateFeePercentage || 0.05
    };

    // Metadata
    this.metadata = {
      foundingStory: props.metadata?.foundingStory || '',
      mission: props.metadata?.mission || '',
      vision: props.metadata?.vision || '',
      values: props.metadata?.values || [],
      awards: props.metadata?.awards || [],
      partners: props.metadata?.partners || [],
      notes: props.metadata?.notes || ''
    };

    // Classification
    this.tags = props.tags || [];
    this.categories = props.categories || [];

    // Social Media
    this.socialMedia = {
      facebook: props.socialMedia?.facebook || '',
      youtube: props.socialMedia?.youtube || '',
      tiktok: props.socialMedia?.tiktok || '',
      zalo: props.socialMedia?.zalo || ''
    };
  }

  // ===== Factory Methods =====

  static create(props: BranchProps): Branch {
    return new Branch(props);
  }

  static createDefault(city: string = 'Hà Nội'): Branch {
    return new Branch({
      name: `Chi nhánh ${city}`,
      code: Branch.generateCode(city.substring(0, 2).toUpperCase(), 'CTR', 1),
      shortName: `CN ${city.substring(0, 3)}`,
      description: `Chi nhánh tại ${city}`,
      address: {
        city,
        country: 'Việt Nam'
      },
      contact: {
        email: `info@${city.toLowerCase().replace(' ', '')}.edu.vn`
      }
    });
  }

  // ===== Computed Properties =====

  get fullAddress(): string {
    const parts = [
      this.address.street,
      this.address.ward,
      this.address.district,
      this.address.city,
      this.address.province,
      this.address.country
    ].filter(part => part && part.trim());
    
    return parts.join(', ');
  }

  get shortAddress(): string {
    const parts = [
      this.address.district,
      this.address.city
    ].filter(part => part && part.trim());
    
    return parts.join(', ');
  }

  get hasStudentCapacity(): boolean {
    return this.capacity.currentStudents < this.capacity.maxStudents;
  }

  get availableStudentSpots(): number {
    return Math.max(0, this.capacity.maxStudents - this.capacity.currentStudents);
  }

  get studentFillRate(): number {
    return this.capacity.maxStudents > 0 
      ? Math.round((this.capacity.currentStudents / this.capacity.maxStudents) * 100) 
      : 0;
  }

  get hasRoomAvailability(): boolean {
    return this.capacity.availableRooms > 0;
  }

  get monthlyProfit(): number {
    return this.financial.monthlyRevenue - this.financial.monthlyExpenses;
  }

  get yearlyRevenueProgress(): number {
    return this.financial.yearlyTarget > 0 
      ? Math.min(100, (this.financial.monthlyRevenue * 12 / this.financial.yearlyTarget) * 100)
      : 0;
  }

  get isOpenNow(): boolean {
    if (!this.isActive) return false;
    
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const dayMap: Record<number, keyof DailyHours> = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday'
    };
    
    const dayKey = dayMap[dayOfWeek];
    const hours = this.operatingHours[dayKey];
    
    if (typeof hours === 'string' || !hours || !hours.open || !hours.close) return false;
    
    const [openHour, openMinute] = hours.open.split(':').map(Number);
    const [closeHour, closeMinute] = hours.close.split(':').map(Number);
    
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;
    
    return currentTime >= openTime && currentTime <= closeTime;
  }

  get yearsInOperation(): number {
    if (!this.establishmentDate) return 0;
    
    const establishment = new Date(this.establishmentDate);
    const today = new Date();
    let years = today.getFullYear() - establishment.getFullYear();
    
    const monthDiff = today.getMonth() - establishment.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < establishment.getDate())) {
      years--;
    }
    
    return Math.max(0, years);
  }

  get tierColor(): string {
    const colors: Record<string, string> = {
      'standard': '#3b82f6', // blue
      'premium': '#8b5cf6', // purple
      'vip': '#f59e0b', // amber
      'flagship': '#ef4444' // red
    };
    return colors[this.tier] || '#6b7280';
  }

  get typeIcon(): string {
    const icons: Record<string, string> = {
      'center': '🏢',
      'satellite': '📍',
      'partner': '🤝',
      'online': '🌐'
    };
    return icons[this.type] || '🏢';
  }

  // ===== Domain Methods =====

  updateStudentCount(change: number): this {
    const newCount = this.capacity.currentStudents + change;
    if (newCount >= 0 && newCount <= this.capacity.maxStudents) {
      (this.capacity as any).currentStudents = newCount;
    }
    return this;
  }

  addStudent(): this {
    if (this.hasStudentCapacity) {
      this.updateStudentCount(1);
    }
    return this;
  }

  removeStudent(): this {
    this.updateStudentCount(-1);
    return this;
  }

  updateTeacherCount(change: number): this {
    const newCount = this.capacity.currentTeachers + change;
    if (newCount >= 0 && newCount <= this.capacity.maxTeachers) {
      (this.capacity as any).currentTeachers = newCount;
    }
    return this;
  }

  updateRoomCount(totalRooms: number, availableRooms: number): this {
    (this.capacity as any).totalRooms = Math.max(0, totalRooms);
    (this.capacity as any).availableRooms = Math.max(0, Math.min(availableRooms, totalRooms));
    return this;
  }

  setManager(managerId: string, managerName: string = ''): this {
    (this as any).managerId = managerId;
    if (managerName) {
      (this as any).managerName = managerName;
    }
    return this;
  }

  addAssistantManager(managerId: string): this {
    if (!this.assistantManagerIds.includes(managerId)) {
      (this.assistantManagerIds as string[]).push(managerId);
    }
    return this;
  }

  removeAssistantManager(managerId: string): this {
    (this.assistantManagerIds as string[]) = this.assistantManagerIds.filter(id => id !== managerId);
    return this;
  }

  updateCourseStats(total: number = 0, active: number = 0, completed: number = 0): this {
    (this.stats as any).totalCourses = total;
    (this.stats as any).activeCourses = active;
    (this.stats as any).completedCourses = completed;
    return this;
  }

  updateSatisfaction(studentRating: number | null = null, teacherRating: number | null = null): this {
    if (studentRating !== null) {
      (this.stats as any).studentSatisfaction = Math.max(0, Math.min(5, studentRating));
    }
    if (teacherRating !== null) {
      (this.stats as any).teacherSatisfaction = Math.max(0, Math.min(5, teacherRating));
    }
    return this;
  }

  updateFinancial(revenue: number | null = null, expenses: number | null = null, target: number | null = null): this {
    if (revenue !== null) {
      (this.financial as any).monthlyRevenue = Math.max(0, revenue);
    }
    if (expenses !== null) {
      (this.financial as any).monthlyExpenses = Math.max(0, expenses);
    }
    if (target !== null) {
      (this.financial as any).yearlyTarget = Math.max(0, target);
    }
    return this;
  }

  addFacility(facility: string): this {
    if (!this.facilities.includes(facility)) {
      (this.facilities as string[]).push(facility);
    }
    return this;
  }

  addAmenity(amenity: string): this {
    if (!this.amenities.includes(amenity)) {
      (this.amenities as string[]).push(amenity);
    }
    return this;
  }

  addImage(type: 'exterior' | 'interior' | keyof Images, url: string): this {
    if (type === 'exterior' || type === 'interior') {
      if (!Array.isArray(this.images[type])) {
        (this.images as any)[type] = [];
      }
      (this.images[type] as string[]).push(url);
    } else {
      (this.images as any)[type] = url;
    }
    return this;
  }

  addTag(tag: string): this {
    if (!this.tags.includes(tag)) {
      (this.tags as string[]).push(tag);
    }
    return this;
  }

  removeTag(tag: string): this {
    (this.tags as string[]) = this.tags.filter(t => t !== tag);
    return this;
  }

  updateSocialMedia(platform: keyof SocialMedia, url: string): this {
    if (platform in this.socialMedia) {
      (this.socialMedia as any)[platform] = url;
    }
    return this;
  }

  // ===== Queries =====

  isInCity(cityName: string): boolean {
    return this.address.city.toLowerCase() === cityName.toLowerCase();
  }

  getMinutesUntilClose(): number {
    if (!this.isOpenNow) return 0;
    
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const dayMap: Record<number, keyof DailyHours> = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday'
    };
    
    const dayKey = dayMap[dayOfWeek];
    const hours = this.operatingHours[dayKey];
    
    if (typeof hours === 'string' || !hours || !hours.close) return 0;
    
    const [closeHour, closeMinute] = hours.close.split(':').map(Number);
    const closeTime = closeHour * 60 + closeMinute;
    
    return Math.max(0, closeTime - currentTime);
  }

  // ===== Validation =====

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic Information
    if (!this.name.trim()) {
      errors.push('Tên chi nhánh không được để trống');
    }
    
    if (!this.code.trim()) {
      errors.push('Mã chi nhánh không được để trống');
    }
    
    // Address
    if (!this.address.street.trim()) {
      errors.push('Địa chỉ đường không được để trống');
    }
    
    if (!this.address.city.trim()) {
      errors.push('Thành phố không được để trống');
    }
    
    // Contact
    if (!this.contact.phone.trim() && !this.contact.email.trim()) {
      errors.push('Phải có ít nhất một thông tin liên hệ (số điện thoại hoặc email)');
    }
    
    if (this.contact.email && !this.contact.email.includes('@')) {
      errors.push('Email không hợp lệ');
    }
    
    if (this.contact.phone && !/^[0-9\-\+\s\(\)]{10,15}$/.test(this.contact.phone)) {
      errors.push('Số điện thoại không hợp lệ');
    }
    
    // Capacity
    if (this.capacity.maxStudents <= 0) {
      errors.push('Số học sinh tối đa phải lớn hơn 0');
    }
    
    if (this.capacity.currentStudents < 0) {
      errors.push('Số học sinh hiện tại không thể âm');
    }
    
    if (this.capacity.currentStudents > this.capacity.maxStudents) {
      errors.push('Số học sinh hiện tại vượt quá giới hạn');
    }
    
    // Financial
    if (this.financial.monthlyRevenue < 0) {
      errors.push('Doanh thu hàng tháng không thể âm');
    }
    
    if (this.financial.monthlyExpenses < 0) {
      errors.push('Chi phí hàng tháng không thể âm');
    }
    
    if (this.financial.yearlyTarget < 0) {
      errors.push('Mục tiêu năm không thể âm');
    }
    
    // Statistics
    if (this.stats.studentSatisfaction < 0 || this.stats.studentSatisfaction > 5) {
      errors.push('Độ hài lòng học sinh phải từ 0-5');
    }
    
    if (this.stats.teacherSatisfaction < 0 || this.stats.teacherSatisfaction > 5) {
      errors.push('Độ hài lòng giáo viên phải từ 0-5');
    }
    
    if (this.stats.attendanceRate < 0 || this.stats.attendanceRate > 100) {
      errors.push('Tỷ lệ điểm danh phải từ 0-100%');
    }
    
    if (this.stats.graduationRate < 0 || this.stats.graduationRate > 100) {
      errors.push('Tỷ lệ tốt nghiệp phải từ 0-100%');
    }
    
    // Establishment Date
    if (this.establishmentDate) {
      const establishment = new Date(this.establishmentDate);
      if (isNaN(establishment.getTime())) {
        errors.push('Ngày thành lập không hợp lệ');
      } else if (establishment > new Date()) {
        errors.push('Ngày thành lập không thể ở tương lai');
      }
    }
    
    // Closure Date
    if (this.closureDate && this.establishmentDate) {
      const closure = new Date(this.closureDate);
      const establishment = new Date(this.establishmentDate);
      if (closure < establishment) {
        errors.push('Ngày đóng cửa phải sau ngày thành lập');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // ===== Persistence =====

  toJSON(): BranchJSON {
    return {
      ...this.baseToJSON(),
      name: this.name,
      code: this.code,
      shortName: this.shortName,
      description: this.description,
      address: this.address,
      contact: this.contact,
      managerId: this.managerId,
      managerName: this.managerName,
      assistantManagerIds: this.assistantManagerIds,
      operatingHours: this.operatingHours,
      capacity: this.capacity,
      isActive: this.isActive,
      establishmentDate: this.establishmentDate,
      closureDate: this.closureDate,
      type: this.type,
      tier: this.tier,
      financial: this.financial,
      facilities: this.facilities,
      amenities: this.amenities,
      images: this.images,
      stats: this.stats,
      settings: this.settings,
      metadata: this.metadata,
      tags: this.tags,
      categories: this.categories,
      socialMedia: this.socialMedia
    };
  }

  static fromJSON(data: BranchJSON): Branch {
    return new Branch({
      id: data.id,
      name: data.name,
      code: data.code,
      shortName: data.shortName,
      description: data.description,
      address: data.address,
      contact: data.contact,
      managerId: data.managerId,
      managerName: data.managerName,
      assistantManagerIds: data.assistantManagerIds,
      operatingHours: data.operatingHours,
      capacity: data.capacity,
      isActive: data.isActive,
      establishmentDate: data.establishmentDate,
      closureDate: data.closureDate,
      type: data.type,
      tier: data.tier,
      financial: data.financial,
      facilities: data.facilities,
      amenities: data.amenities,
      images: data.images,
      stats: data.stats,
      settings: data.settings,
      metadata: data.metadata,
      tags: data.tags,
      categories: data.categories,
      socialMedia: data.socialMedia
    });
  }

  clone(): this {
    const clone = new (this.constructor as any)({
      id: this.id,
      name: this.name,
      code: this.code,
      shortName: this.shortName,
      description: this.description,
      address: { ...this.address },
      contact: { ...this.contact },
      managerId: this.managerId,
      managerName: this.managerName,
      assistantManagerIds: [...this.assistantManagerIds],
      operatingHours: { ...this.operatingHours },
      capacity: { ...this.capacity },
      isActive: this.isActive,
      establishmentDate: this.establishmentDate,
      closureDate: this.closureDate,
      type: this.type,
      tier: this.tier,
      financial: { ...this.financial },
      facilities: [...this.facilities],
      amenities: [...this.amenities],
      images: { ...this.images },
      stats: { ...this.stats },
      settings: { ...this.settings },
      metadata: { ...this.metadata },
      tags: [...this.tags],
      categories: [...this.categories],
      socialMedia: { ...this.socialMedia }
    });

    // Copy BaseEntity properties
    (clone as any).createdAt = this.createdAt;
    (clone as any).updatedAt = this.updatedAt;
    (clone as any).createdBy = this.createdBy;
    (clone as any).updatedBy = this.updatedBy;

    return clone;
  }

  // ===== Static Helpers =====

  static generateCode(city: string = 'HN', type: string = 'CTR', sequence: number = 1): string {
    const cityCode = city.toUpperCase().substring(0, 3);
    const typeCode = type.toUpperCase().substring(0, 3);
    const seq = String(sequence).padStart(3, '0');
    
    return `${cityCode}-${typeCode}-${seq}`;
  }

  static getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'center': 'Trung tâm chính',
      'satellite': 'Chi nhánh vệ tinh',
      'partner': 'Đối tác',
      'online': 'Trực tuyến'
    };
    return labels[type] || type;
  }

  static getTierLabel(tier: string): string {
    const labels: Record<string, string> = {
      'standard': 'Tiêu chuẩn',
      'premium': 'Cao cấp',
      'vip': 'VIP',
      'flagship': 'Hàng đầu'
    };
    return labels[tier] || tier;
  }

  static filterByCity(branches: Branch[], city: string): Branch[] {
    return branches.filter(branch => 
      branch.address.city.toLowerCase() === city.toLowerCase()
    );
  }

  static sortByStudentCount(branches: Branch[]): Branch[] {
    return [...branches].sort((a, b) => 
      b.capacity.currentStudents - a.capacity.currentStudents
    );
  }

  static getTotalStudents(branches: Branch[]): number {
    return branches.reduce((total, branch) => 
      total + branch.capacity.currentStudents, 0
    );
  }

  static getTotalRevenue(branches: Branch[]): number {
    return branches.reduce((total, branch) => 
      total + branch.financial.monthlyRevenue, 0
    );
  }

  // ===== Utilities =====

  toString(): string {
    return `Branch(${this.code}) - ${this.name}`;
  }

  toSummary(): Record<string, any> {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      city: this.address.city,
      type: this.type,
      tier: this.tier,
      isActive: this.isActive,
      studentCount: this.capacity.currentStudents,
      availableSpots: this.availableStudentSpots,
      monthlyRevenue: this.financial.monthlyRevenue,
      studentSatisfaction: this.stats.studentSatisfaction,
      isOpenNow: this.isOpenNow
    };
  }
}