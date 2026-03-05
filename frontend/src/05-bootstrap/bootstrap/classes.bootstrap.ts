import { ClassRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ClassRepository';
import { AttendanceRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AttendanceRepository';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { GetClassDetailsInteractor } from '@/02-usecases/class/GetClassDetails.interactor';
import { ListOngoingClassesInteractor } from '@/02-usecases/class/ListOngoingClasses.interactor';
import { ListClassesByDateInteractor } from '@/02-usecases/class/ListClassesByDate.interactor';
import { UpdateClassInfoInteractor } from '@/02-usecases/class/UpdateClassInfo.interactor';
import { DeleteClassInteractor } from '@/02-usecases/class/DeleteClass.interactor';
import { ClassesController } from '@/03-interface-adapters/controllers/Classes.controller';

export function bootstrapClasses(
  classRepository: ClassRepository,
  attendanceRepository: AttendanceRepository
) {
  const listClassesByBranchInteractor = new ListClassesByBranchInteractor(classRepository);
  const createClassInteractor = new CreateClassInteractor(classRepository);
  const getClassDetailsInteractor = new GetClassDetailsInteractor(classRepository);
  const listOngoingClassesInteractor = new ListOngoingClassesInteractor(classRepository);
  const listClassesByDateInteractor = new ListClassesByDateInteractor(classRepository);
  const updateClassInfoInteractor = new UpdateClassInfoInteractor(classRepository);
  const deleteClassInteractor = new DeleteClassInteractor(classRepository, attendanceRepository);

  const classesController = new ClassesController(
    listClassesByBranchInteractor,
    createClassInteractor,
    getClassDetailsInteractor,
    listOngoingClassesInteractor,
    listClassesByDateInteractor,
    updateClassInfoInteractor,
    deleteClassInteractor
  );

  return {
    classesController,
  };
}