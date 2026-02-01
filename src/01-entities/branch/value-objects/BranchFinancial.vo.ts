// src/01-entities/business/value-objects/BranchFinancial.vo.ts
export interface BranchFinancialProps {
  monthlyRevenue?: number;
  monthlyExpenses?: number;
  yearlyTarget?: number;
  currency?: string;
  bankAccount?: string;
  taxCode?: string;
}

export class BranchFinancial {
  readonly monthlyRevenue: number;
  readonly monthlyExpenses: number;
  readonly yearlyTarget: number;
  readonly currency: string;
  readonly bankAccount: string;
  readonly taxCode: string;

  constructor(props: BranchFinancialProps = {}) {
    this.monthlyRevenue = Math.max(0, props.monthlyRevenue ?? 0);
    this.monthlyExpenses = Math.max(0, props.monthlyExpenses ?? 0);
    this.yearlyTarget = Math.max(0, props.yearlyTarget ?? 0);
    this.currency = props.currency ?? 'VND';
    this.bankAccount = props.bankAccount ?? '';
    this.taxCode = props.taxCode?.trim() ?? '';
  }

  monthlyProfit(): number {
    return this.monthlyRevenue - this.monthlyExpenses;
  }

  yearlyProgress(): number {
    if (this.yearlyTarget <= 0) return 0;
    return Math.min(
      100,
      (this.monthlyRevenue * 12 / this.yearlyTarget) * 100
    );
  }

  update(
    revenue?: number,
    expenses?: number,
    target?: number
  ): BranchFinancial {
    return new BranchFinancial({
      monthlyRevenue: revenue ?? this.monthlyRevenue,
      monthlyExpenses: expenses ?? this.monthlyExpenses,
      yearlyTarget: target ?? this.yearlyTarget,
      currency: this.currency,
      bankAccount: this.bankAccount,
      taxCode: this.taxCode
    });
  }
}
