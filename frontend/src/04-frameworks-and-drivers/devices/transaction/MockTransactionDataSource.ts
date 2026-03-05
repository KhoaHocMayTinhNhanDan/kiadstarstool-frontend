import type { Transaction } from '@/01-entities/finance/Transaction.entity';
import type { ITransactionDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/finance/ITransactionDataSource';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockTransactionDataSource implements ITransactionDataSource {
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

  async save(transaction: any): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    const index = transactionStore.findIndex(t => t.id === transaction.id.toString());

    const dataToSave = transaction; // It's already a JSON object from the repository

    if (index > -1) {
      transactionStore[index] = dataToSave;
    } else {
      transactionStore.push(dataToSave);
    }
    mockDatabase.persist();
  }

  async getAll(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    return transactionStore
      .sort((a, b) => {
        const tA = new Date(a.transactionDate).getTime();
        const tB = new Date(b.transactionDate).getTime();
        if (isNaN(tA)) return 1; // Đẩy ngày lỗi xuống cuối
        if (isNaN(tB)) return -1;
        return tB - tA;
      });
  }

  async getByBranchId(branchId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transactionStore = mockDatabase.getCollection<any>('transactions');
    return transactionStore
      .filter(t => t.branchId === branchId)
      .sort((a, b) => {
        const tA = new Date(a.transactionDate).getTime();
        const tB = new Date(b.transactionDate).getTime();
        if (isNaN(tA)) return 1;
        if (isNaN(tB)) return -1;
        return tB - tA;
      });
  }
}