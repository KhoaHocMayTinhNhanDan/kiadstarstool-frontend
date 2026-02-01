import { ValueObject } from '../../shared/base/ValueObject';

export interface BranchFinancialProps {
  monthlyRevenue: number;
  monthlyExpenses: number;
  yearlyTarget: number;
  currency: string;
  bankAccount: string;
  taxCode: string;
}

export class BranchFinancial extends ValueObject<BranchFinancialProps> {
  private constructor(props: BranchFinancialProps) {
    super(props);
  }

  static create(props: Partial<BranchFinancialProps> = {}): BranchFinancial {
    return new BranchFinancial({
      monthlyRevenue: Math.max(0, props.monthlyRevenue ?? 0),
      monthlyExpenses: Math.max(0, props.monthlyExpenses ?? 0),
      yearlyTarget: Math.max(0, props.yearlyTarget ?? 0),
      currency: props.currency ?? 'VND',
      bankAccount: props.bankAccount ?? '',
      taxCode: props.taxCode?.trim() ?? ''
    });
  }

  monthlyProfit(): number {
    return this.props.monthlyRevenue - this.props.monthlyExpenses;
  }
}