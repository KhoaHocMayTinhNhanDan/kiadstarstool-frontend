import { ValueObject } from '../../shared/value-objects/ValueObject';

export interface OperatingHours {
  open: string;   // HH:mm
  close: string;  // HH:mm
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type WeeklyOperatingHours = Record<DayOfWeek, OperatingHours>;

const DEFAULT_HOURS: WeeklyOperatingHours = {
  monday: { open: '08:00', close: '20:00' },
  tuesday: { open: '08:00', close: '20:00' },
  wednesday: { open: '08:00', close: '20:00' },
  thursday: { open: '08:00', close: '20:00' },
  friday: { open: '08:00', close: '20:00' },
  saturday: { open: '08:00', close: '18:00' },
  sunday: { open: '08:00', close: '12:00' }
};

export class BranchOperatingHours extends ValueObject<WeeklyOperatingHours> {
  private constructor(props: WeeklyOperatingHours) {
    super(props);
  }

  static create(hours?: Partial<WeeklyOperatingHours>): BranchOperatingHours {
    return new BranchOperatingHours({
      monday: hours?.monday ?? DEFAULT_HOURS.monday,
      tuesday: hours?.tuesday ?? DEFAULT_HOURS.tuesday,
      wednesday: hours?.wednesday ?? DEFAULT_HOURS.wednesday,
      thursday: hours?.thursday ?? DEFAULT_HOURS.thursday,
      friday: hours?.friday ?? DEFAULT_HOURS.friday,
      saturday: hours?.saturday ?? DEFAULT_HOURS.saturday,
      sunday: hours?.sunday ?? DEFAULT_HOURS.sunday
    });
  }

  isOpenAt(date: Date = new Date()): boolean {
    const dayMap: Record<number, DayOfWeek> = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday'
    };
    const day = dayMap[date.getDay()];
    const { open, close } = this.props[day];

    const nowMinutes = date.getHours() * 60 + date.getMinutes();
    const [openH, openM] = open.split(':').map(Number);
    const [closeH, closeM] = close.split(':').map(Number);

    return nowMinutes >= (openH * 60 + openM) && nowMinutes <= (closeH * 60 + closeM);
  }

  minutesUntilClose(date: Date = new Date()): number {
    if (!this.isOpenAt(date)) return 0;
    
    const dayMap: Record<number, DayOfWeek> = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday'
    };
    const day = dayMap[date.getDay()];
    const { close } = this.props[day];
    
    const nowMinutes = date.getHours() * 60 + date.getMinutes();
    const [closeH, closeM] = close.split(':').map(Number);
    
    return Math.max(0, (closeH * 60 + closeM) - nowMinutes);
  }
}