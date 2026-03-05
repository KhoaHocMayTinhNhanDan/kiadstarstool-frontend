import { ActivityRepository } from "@/03-interface-adapters/gateways/inbound/repositories/ActivityRepository";
import { RecordActivityInteractor } from "@/02-usecases/activity/RecordActivity.interactor";
import { ListActivitiesInteractor } from "@/02-usecases/activity/ListActivities.interactor";
import { ActivityController } from "@/03-interface-adapters/controllers/Activity.controller";

export function bootstrapActivity(activityRepository: ActivityRepository) {
  const recordActivityInteractor = new RecordActivityInteractor(activityRepository);
  const listActivitiesInteractor = new ListActivitiesInteractor(activityRepository);
  const activityController = new ActivityController(listActivitiesInteractor);

  return {
    recordActivityInteractor,
    activityController,
  };
}