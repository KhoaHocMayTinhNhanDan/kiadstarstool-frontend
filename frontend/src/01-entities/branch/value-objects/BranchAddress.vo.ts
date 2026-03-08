import { ValueObject } from '../../shared/value-objects/ValueObject';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BranchAddressProps {
  houseNumber?: string;
  lane?: string; // Ngõ, ngách, hẻm
  street?: string;
  ward?: string;
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
      houseNumber: props.houseNumber?.trim() || '',
      lane: props.lane?.trim() || '',
      street: props.street?.trim() || '',
      ward: props.ward?.trim() || '',
      province: props.province?.trim() || '', // e.g., "Hà Nội", "Tỉnh Đồng Nai"
      country: props.country?.trim() || 'Việt Nam',
      postalCode: props.postalCode?.trim() || '',
      coordinates: props.coordinates ?? { lat: 0, lng: 0 }
    });
  }

  get fullAddress(): string {
    return [
      this.props.houseNumber,
      this.props.lane,
      this.props.street,
      this.props.ward,
      this.props.province,
      this.props.country
    ].filter(Boolean).join(', ');
  }

  get shortAddress(): string {
    return [this.props.ward, this.props.province].filter(Boolean).join(', ');
  }
}