// src/01-entities/business/value-objects/BranchAddress.vo.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BranchAddressProps {
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
  coordinates?: Coordinates;
}

export class BranchAddress {
  readonly street: string;
  readonly ward: string;
  readonly district: string;
  readonly city: string;
  readonly province: string;
  readonly country: string;
  readonly postalCode: string;
  readonly coordinates: Coordinates;

  constructor(props: BranchAddressProps = {}) {
    this.street = props.street?.trim() || '';
    this.ward = props.ward?.trim() || '';
    this.district = props.district?.trim() || '';
    this.city = props.city?.trim() || '';
    this.province = props.province?.trim() || '';
    this.country = props.country?.trim() || 'Việt Nam';
    this.postalCode = props.postalCode?.trim() || '';
    this.coordinates = props.coordinates ?? { lat: 0, lng: 0 };
  }

  fullAddress(): string {
    return [
      this.street,
      this.ward,
      this.district,
      this.city,
      this.province,
      this.country
    ].filter(Boolean).join(', ');
  }

  shortAddress(): string {
    return [this.district, this.city].filter(Boolean).join(', ');
  }

  isInCity(city: string): boolean {
    return this.city.toLowerCase() === city.toLowerCase();
  }
}
