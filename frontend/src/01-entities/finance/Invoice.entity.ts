// src/01-entities/finance/Invoice.entity.ts

import { v4 as uuidv4 } from 'uuid';
import { Identifier } from '../shared/value-objects/Identifier.vo';
import { Result } from '../shared/base/result';
import { AuditedEntity, type AuditedProps } from '../shared/base/audited.entity';

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'partial' | 'overdue' | 'cancelled';
export type InvoiceType = 'tuition' | 'material' | 'other';

export interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
  referenceId?: string; // ID của Class hoặc Material
}

export interface InvoiceProps extends AuditedProps {
  id?: Identifier;
  studentId: string;
  branchId: string;
  code: string; // Mã hóa đơn (INV-2024-001)
  type: InvoiceType;
  items: InvoiceItem[];
  totalAmount: number;
  paidAmount: number;
  status: InvoiceStatus;
  dueDate: Date; // Hạn thanh toán
  issuedDate: Date; // Ngày xuất hóa đơn
  note?: string;
}

export class Invoice extends AuditedEntity<Identifier> {
  get studentId(): string { return this.studentId; }
  get branchId(): string { return this.branchId; }
  get code(): string { return this.code; }
  get type(): InvoiceType { return this.type; }
  get items(): InvoiceItem[] { return this.items; }
  get totalAmount(): number { return this.totalAmount; }
  get paidAmount(): number { return this.paidAmount; }
  get status(): InvoiceStatus { return this.status; }
  get dueDate(): Date { return this.dueDate; }
  get issuedDate(): Date { return this.issuedDate; }
  get note(): string | undefined { return this.note; }

  private constructor(props: InvoiceProps) {
    super(props);
  }

  public static create(props: InvoiceProps): Result<Invoice> {
    if (!props.studentId) return Result.fail('Student ID is required');
    if (!props.branchId) return Result.fail('Branch ID is required');
    if (!props.code) return Result.fail('Invoice code is required');
    if (props.totalAmount < 0) return Result.fail('Total amount cannot be negative');

    return Result.ok(new Invoice({
      ...props,
      id: props.id ?? Identifier.create(uuidv4()),
      paidAmount: props.paidAmount ?? 0,
      status: props.status ?? 'draft',
      items: props.items ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      createdBy: props.createdBy,
      updatedBy: props.updatedBy
    }));
  }
  
  // Domain Method: Thanh toán cho hóa đơn
  addPayment(amount: number): Result<Invoice> {
    if (amount <= 0) return Result.fail('Payment amount must be positive');
    
    const newPaidAmount = this.paidAmount + amount;
    
    if (newPaidAmount > this.totalAmount) {
      return Result.fail<Invoice>('Payment amount exceeds total invoice amount');
    }

    let newStatus = this.status;
    if (newPaidAmount >= this.totalAmount) {
      newStatus = 'paid';
    } else if (newPaidAmount > 0) {
      newStatus = 'partial';
    }

    return Invoice.create({
      ...this,
      paidAmount: newPaidAmount,
      status: newStatus,
      updatedAt: new Date()
    });
  }

  cancel(reason?: string): Result<Invoice> {
    if (this.status === 'paid' || this.status === 'partial') {
      return Result.fail<Invoice>('Cannot cancel an invoice that has payments');
    }
    return Invoice.create({
      ...this,
      status: 'cancelled',
      note: reason ? `${this.note || ''} [Cancelled: ${reason}]` : this.note,
      updatedAt: new Date()
    });
  }
}
