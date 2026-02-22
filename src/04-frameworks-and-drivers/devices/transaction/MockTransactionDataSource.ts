import { Transaction, type TransactionProps } from '@/01-entities/finance/Transaction.entity';
import { type ITransactionRepository } from '@/02-usecases/finance/ports/gateways_interface/ITransactionRepository';
import { Identifier } from '@/01-entities/shared/Identifier.vo';

// Mock in-memory storage
let transactionStore = new Map<string, Transaction>();
const STORAGE_KEY = 'mock_transactions_db_v1';

export class MockTransactionDataSource implements ITransactionRepository {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Re-hydrate entities
        parsedData.forEach((item: any) => {
          const transaction = this.hydrate(item);
          if (transaction) {
            transactionStore.set(transaction.id.toString(), transaction);
          }
        });
      } catch (e) {
        console.error('[MockTransactionDataSource] Failed to parse localStorage data', e);
      }
    }

    if (transactionStore.size === 0) {
      this.seed();
    }
  }

  private seed() {
    const dummyData = [
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
      }
    ];

    dummyData.forEach(data => {
      const t = this.hydrate(data);
      if (t) transactionStore.set(t.id.toString(), t);
    });
    this.persist();
  }

  private hydrate(data: any): Transaction | null {
    // Reconstruct entity from JSON data
    const props: TransactionProps = {
      id: new Identifier(data.id),
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
      createdBy: data.createdBy ? new Identifier(data.createdBy) : undefined,
      updatedBy: data.updatedBy ? new Identifier(data.updatedBy) : undefined,
    };

    const result = Transaction.create(props);
    return result.isSuccess ? result.getValue() : null;
  }

  private persist() {
    try {
      // Save as array of objects (DTOs)
      const dataToSave = Array.from(transactionStore.values()).map(t => ({
        id: t.id.toString(),
        branchId: t.branchId,
        code: t.code,
        type: t.type,
        amount: t.amount,
        method: t.method,
        status: t.status,
        transactionDate: t.transactionDate,
        description: t.description,
        performedBy: t.performedBy,
        invoiceId: t.invoiceId,
        studentId: t.studentId,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('[MockTransactionDataSource] Failed to save to localStorage', e);
    }
  }

  async save(transaction: Transaction): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    transactionStore.set(transaction.id.toString(), transaction);
    this.persist();
  }

  async getAll(): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Array.from(transactionStore.values()).sort((a, b) => 
      b.transactionDate.getTime() - a.transactionDate.getTime()
    );
  }

  async getByBranchId(branchId: string): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Array.from(transactionStore.values())
      .filter(t => t.branchId === branchId)
      .sort((a, b) => b.transactionDate.getTime() - a.transactionDate.getTime());
  }
}