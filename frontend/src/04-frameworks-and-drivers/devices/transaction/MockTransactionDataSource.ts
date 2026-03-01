import { Transaction, type TransactionProps } from '@/01-entities/finance/Transaction.entity';
import { type ITransactionRepository } from '@/02-usecases/finance/ports/gateways_interface/ITransactionRepository';
import { Identifier } from '@/01-entities/shared/Identifier.vo';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockTransactionDataSource implements ITransactionRepository {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    if (transactionStore.length === 0) {
      this.seed();
    }
  }

  private seed() {
    const seedData = [
      {
        id: 'trx-01',
        branchId: 'branch-01',
        code: 'TRX-2024-001',
        type: 'income',
        amount: 5000000,
        method: 'bank_transfer',
        status: 'completed',
        transactionDate: new Date().toISOString(),
        description: 'Thu học phí Nguyễn Văn An - Lớp Tiếng Anh Giao Tiếp',
        performedBy: 'admin',
        studentId: 'student-01',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'trx-02',
        branchId: 'branch-01',
        code: 'TRX-2024-002',
        type: 'expense',
        amount: 1500000,
        method: 'cash',
        status: 'completed',
        transactionDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        description: 'Mua văn phòng phẩm tháng 2',
        performedBy: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'trx-03',
        branchId: 'branch-02',
        code: 'TRX-HCM-001',
        type: 'income',
        amount: 4500000,
        method: 'qr_code',
        status: 'completed',
        transactionDate: new Date().toISOString(),
        description: 'Thu học phí Hoàng Văn Em',
        performedBy: 'staff_hcm',
        studentId: 'student-05',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'trx-04',
        branchId: 'branch-01',
        code: 'TRX-2024-003',
        type: 'income',
        amount: 3000000,
        method: 'bank_transfer',
        status: 'completed',
        transactionDate: new Date(Date.now() - 172800000).toISOString(), // 2 ngày trước
        description: 'Thu học phí Phạm Thị Dung - Lớp Tiếng Anh Thiếu Nhi',
        performedBy: 'admin',
        studentId: 'student-04',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    mockDatabase.setCollection('transactions', seedData);
  }

  private hydrate(data: any): Transaction | null {
    // Reconstruct entity from JSON data
    const props: TransactionProps = {
      id: Identifier.create(data.id),
      branchId: data.branchId,
      code: data.code,
      type: data.type,
      amount: data.amount,
      method: data.method,
      status: data.status,
      transactionDate: new Date(data.transactionDate),
      description: data.description,
      performedBy: data.performedBy,
      invoiceId: data.invoiceId,
      studentId: data.studentId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy ? Identifier.create(data.createdBy) : undefined,
      updatedBy: data.updatedBy ? Identifier.create(data.updatedBy) : undefined,
    };

    const result = Transaction.create(props);
    return result.isSuccess ? result.getValue() : null;
  }

  async save(transaction: Transaction): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    const index = transactionStore.findIndex(t => t.id === transaction.id.toString());

    const dataToSave = {
      id: transaction.id.toString(),
      branchId: transaction.branchId,
      code: transaction.code,
      type: transaction.type,
      amount: transaction.amount,
      method: transaction.method,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      description: transaction.description,
      performedBy: transaction.performedBy,
      invoiceId: transaction.invoiceId,
      studentId: transaction.studentId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    };

    if (index > -1) {
      transactionStore[index] = dataToSave;
    } else {
      transactionStore.push(dataToSave);
    }
    mockDatabase.persist();
  }

  async getAll(): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    return transactionStore
      .map(data => this.hydrate(data)!)
      .filter(Boolean)
      .sort((a, b) => {
        const tA = a.transactionDate.getTime();
        const tB = b.transactionDate.getTime();
        if (isNaN(tA)) return 1; // Đẩy ngày lỗi xuống cuối
        if (isNaN(tB)) return -1;
        return tB - tA;
      });
  }

  async getByBranchId(branchId: string): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    return transactionStore
      .filter(t => t.branchId === branchId)
      .map(data => this.hydrate(data)!)
      .filter(Boolean)
      .sort((a, b) => {
        const tA = a.transactionDate.getTime();
        const tB = b.transactionDate.getTime();
        if (isNaN(tA)) return 1;
        if (isNaN(tB)) return -1;
        return tB - tA;
      });
  }
}