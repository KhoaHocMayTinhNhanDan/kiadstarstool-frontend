import { ValueObject } from '../../shared/base/ValueObject';
import { Result } from '../../shared/base/result';

export interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  get amount(): number { return this.props.amount; }
  get currency(): string { return this.props.currency; }

  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(amount: number, currency: string = 'VND'): Result<Money> {
    if (amount < 0) {
      return Result.fail('Amount cannot be negative');
    }
    // Đảm bảo làm tròn để tránh lỗi floating point cơ bản (nếu có)
    // Với VND thì thường là số nguyên, nhưng an toàn vẫn hơn.
    return Result.ok(new Money({ amount: Math.round(amount), currency }));
  }

  public add(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return Result.fail('Cannot add money with different currencies');
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  public subtract(other: Money): Result<Money> {
    if (this.currency !== other.currency) {
      return Result.fail('Cannot subtract money with different currencies');
    }
    const newAmount = this.amount - other.amount;
    if (newAmount < 0) {
      return Result.fail('Resulting amount cannot be negative');
    }
    return Money.create(newAmount, this.currency);
  }

  public multiply(factor: number): Result<Money> {
    if (factor < 0) {
      return Result.fail('Factor cannot be negative');
    }
    return Money.create(Math.round(this.amount * factor), this.currency);
  }

  public greaterThan(other: Money): boolean {
    return this.currency === other.currency && this.amount > other.amount;
  }

  public lessThan(other: Money): boolean {
    return this.currency === other.currency && this.amount < other.amount;
  }

  public equals(other?: Money): boolean {
    return other ? this.currency === other.currency && this.amount === other.amount : false;
  }

  public format(): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: this.currency }).format(this.amount);
  }
}