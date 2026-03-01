import { Result } from '@/01-entities/shared/base/result';
import { type Class } from '@/01-entities/classes/Class.entity';
import { type IClassRepository } from './ports/gateways_interface/IClassRepository';
import { type ListOngoingClassesInput } from './ports/input/ListOngoingClasses.input';
import { type ListOngoingClassesOutput } from './ports/output/ListOngoingClasses.output';

export class ListOngoingClassesInteractor {
  private readonly classRepo: IClassRepository;

  constructor(classRepo: IClassRepository) {
    this.classRepo = classRepo;
  }

  async execute(input: ListOngoingClassesInput): Promise<Result<ListOngoingClassesOutput>> {
    try {
      // 1. Fetch initial classes (filtered by branch if provided)
      let classes: Class[];
      if (input.branchId) {
        classes = await this.classRepo.getByBranchId(input.branchId);
      } else {
        classes = await this.classRepo.getAll();
      }

      // 2. Filter for "Ongoing" classes (Active & Scheduled for Today)
      const today = new Date();
      const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentDay = dayMap[today.getDay()];
      
      // Lấy giờ hiện tại dạng HH:mm (ví dụ: "18:30")
      const currentHour = today.getHours().toString().padStart(2, '0');
      const currentMinute = today.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHour}:${currentMinute}`;

      const ongoingClasses = classes.filter(cls => 
        cls.status === 'active' && 
        // Kiểm tra đúng thứ VÀ thời gian hiện tại nằm trong khung giờ học
        cls.sessions?.some(s => s.day === currentDay && s.startTime <= currentTime && s.endTime >= currentTime)
      );

      // 3. Map to DTO
      const classDTOs = ongoingClasses.map((cls: Class) => ({
        id: cls.id.toString(),
        name: cls.name,
        code: cls.code,
        branchId: cls.branchId.toString(),
        teacherName: cls.teacherName,
        maxStudents: cls.maxStudents,
        currentStudents: cls.currentStudents,
        schedule: cls.schedule,
        status: cls.status,
        sessions: cls.sessions
      }));

      return Result.ok(classDTOs);
    } catch (error: any) {
      console.error('Error in ListOngoingClassesInteractor:', error);
      return Result.fail(`Failed to list ongoing classes: ${error.message}`);
    }
  }
}