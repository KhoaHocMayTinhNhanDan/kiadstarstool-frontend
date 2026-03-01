import { ValueObject } from '../../shared/base/ValueObject';

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

export class BranchAddress extends ValueObject<BranchAddressProps> {
  private constructor(props: BranchAddressProps) {
    super(props);
  }

  static create(props: BranchAddressProps = {}): BranchAddress {
    return new BranchAddress({
      street: props.street?.trim() || '',
      ward: props.ward?.trim() || '',
      district: props.district?.trim() || '',
      city: props.city?.trim() || '',
      province: props.province?.trim() || '',
      country: props.country?.trim() || 'Việt Nam',
      postalCode: props.postalCode?.trim() || '',
      coordinates: props.coordinates ?? { lat: 0, lng: 0 }
    });
  }

  get fullAddress(): string {
    return [
      this.props.street,
      this.props.ward,
      this.props.district,
      this.props.city,
      this.props.province,
      this.props.country
    ].filter(Boolean).join(', ');
  }

  get shortAddress(): string {
    return [this.props.district, this.props.city].filter(Boolean).join(', ');
  }

  isInCity(city: string): boolean {
    return this.props.city?.toLowerCase() === city.toLowerCase();
  }
}