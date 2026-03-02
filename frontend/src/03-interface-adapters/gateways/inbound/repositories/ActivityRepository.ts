import { Activity, type ActivityJSON } from '@/01-entities/activity/Activity.entity';
import { Identifier } from '@/01-entities/shared/value-objects/Identifier.vo';
import { type IActivityRepository } from '@/02-usecases/activity/ports/gateways_interface/IActivityRepository';
import { type IActivityDataSource } from '../../outbound/device_interfaces/activity/IActivityDataSource';

export class ActivityRepository implements IActivityRepository {
  private readonly dataSource: IActivityDataSource;

  constructor(dataSource: IActivityDataSource) {
    this.dataSource = dataSource;
  }

  private hydrate(json: ActivityJSON): Activity {
    return Activity.create({
      id: Identifier.create(json.id),
      userId: json.userId,
      type: json.type,
      description: json.description,
      details: json.details,
      timestamp: new Date(json.timestamp),
    });
  }

  async save(activity: Activity): Promise<void> {
    const json = activity.toJSON();
    await this.dataSource.save(json);
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    const jsons = await this.dataSource.findByUserId(userId);
    return jsons.map(this.hydrate);
  }
}