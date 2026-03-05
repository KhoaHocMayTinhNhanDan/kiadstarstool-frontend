// src/01-entities/finance/Transaction.entity.ts

import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../shared/base/base.entity';
import { Identifier } from '../shared/value-objects/Identifier.vo';
import { Result } from '../shared/base/result';
import { AuditedEntity, type AuditedProps } from '../shared/base/audited.entity';

export type TransactionType = 'income' | 'expense';
export type PaymentMethod = 'cash' | 'bank_transfer' | 'credit_card' | 'qr_code';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface TransactionProps extends AuditedProps {
  id?: Identifier;
  branchId: string;
  invoiceId?: string; // Link tới Invoice nếu là thu học phí
  studentId?: string; // Người nộp (nếu có)
  
  code: string; // Mã giao dịch (TRX-2024-001)
  type: TransactionType;
  amount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  transactionDate: Date; // Ngày thực hiện giao dịch (quan trọng cho báo cáo)
  
  description?: string;
  performedBy: string; // User ID của nhân viên thu tiền
}

export class Transaction extends AuditedEntity<Identifier> {
  protected readonly props: TransactionProps;

  get branchId(): string { return this.props.branchId; }
  get invoiceId(): string | undefined { return this.props.invoiceId; }
  get studentId(): string | undefined { return this.props.studentId; }
  get code(): string { return this.props.code; }
  get type(): TransactionType { return this.props.type; }
  get amount(): number { return this.props.amount; }
  get method(): PaymentMethod { return this.props.method; }
  get status(): TransactionStatus { return this.props.status; }
  get transactionDate(): Date { return this.props.transactionDate; }
  get description(): string | undefined { return this.props.description; }
  get performedBy(): string { return this.props.performedBy; }

  private constructor(props: TransactionProps) {
    super(props);
    this.props = props;
  }

  public static create(props: TransactionProps): Result<Transaction> {
    if (!props.branchId) return Result.fail('Branch ID is required');
    if (!props.code) return Result.fail('Transaction code is required');
    if (props.amount <= 0) return Result.fail('Amount must be positive');
    if (!props.transactionDate) return Result.fail('Transaction date is required');

    return Result.ok(new Transaction({
      ...props,
      id: props.id ?? Identifier.create(uuidv4()),
      status: props.status ?? 'completed',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }));
  }

  markAsRefunded(): Result<Transaction> {
    return Result.ok(new Transaction({
      ...this.props,
      status: 'refunded',
      updatedAt: new Date()
    }));
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      branchId: this.branchId,
      invoiceId: this.invoiceId,
      studentId: this.studentId,
      code: this.code,
      type: this.type,
      amount: this.amount,
      method: this.method,
      status: this.status,
      transactionDate: this.transactionDate.toISOString(),
      description: this.description,
      performedBy: this.performedBy,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      createdBy: this.createdBy?.toString(),
      updatedBy: this.updatedBy?.toString()
    };
  }
}
