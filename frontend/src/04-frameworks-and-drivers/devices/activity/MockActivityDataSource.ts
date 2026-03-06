import { type ActivityJSON } from '@/01-entities/activity/Activity.entity';
import { type IActivityDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/activity/IActivityDataSource';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockActivityDataSource implements IActivityDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const activityStore = mockDatabase.getCollection<ActivityJSON>('activities');
    if (activityStore.length === 0) {
      console.log('[MockActivityDataSource] Seeding initial activity data...');
      this.seed();
    }
  }

  private seed() {
    const seedData: ActivityJSON[] = [
      // Activities for user 'mock-id-hoangdong@gmail.com'
      {
        id: 'activity-1',
        userId: 'mock-id-hoangdong@gmail.com',
        type: 'auth_login',
        description: 'Đăng nhập vào hệ thống',
        details: { ip: '127.0.0.1', agent: 'Chrome' },
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
      },
      {
        id: 'activity-2',
        userId: 'mock-id-hoangdong@gmail.com',
        type: 'user_update',
        description: 'Cập nhật hồ sơ người dùng "Quản Lý Chi Nhánh"',
        details: { targetUserId: 'mock-id-manager@example.com', changedFields: ['displayName'] },
        timestamp: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
      },
      // Activities for user 'mock-id-manager@example.com'
      {
        id: 'activity-3',
        userId: 'mock-id-manager@example.com',
        type: 'transaction_created',
        description: 'Thực hiện giao dịch thu học phí',
        details: { studentId: 'student-01', amount: 5000000 },
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1 day ago
      },
    ];
    mockDatabase.setCollection('activities', seedData);
  }

  async save(activity: ActivityJSON): Promise<void> {
    if (!activity.userId) {
      throw new Error("activity/userId-required");
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    const activities = mockDatabase.getCollection<ActivityJSON>('activities');

    // Bắt chước hành vi của Firebase: không lưu 'id' của entity và thêm timestamp phía "server"
    const { id, ...data } = activity;

    const newActivity: ActivityJSON = {
      ...data,
      id: `mock-activity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Mock cần tự tạo ID duy nhất
      timestamp: new Date().toISOString() // Bắt chước serverTimestamp
    };

    activities.push(newActivity);
    mockDatabase.persist();
  }

  async findByUserId(userId: string): Promise<ActivityJSON[]> {
    if (!userId) {
      throw new Error("activity/userId-required");
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    const activities = mockDatabase.getCollection<ActivityJSON>('activities');
    return activities.filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.timestamp as string).getTime() - new Date(a.timestamp as string).getTime())
      .slice(0, 20);
  }
}