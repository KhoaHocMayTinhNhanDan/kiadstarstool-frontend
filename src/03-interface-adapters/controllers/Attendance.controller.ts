import { Result } from '@/01-entities/shared/base/result';
import { ListAttendanceByClassInteractor } from '@/02-usecases/attendance/ListAttendanceByClass.interactor';
import { MarkAttendanceInteractor } from '@/02-usecases/attendance/MarkAttendance.interactor';
import { MarkBatchAttendanceInteractor } from '@/02-usecases/attendance/MarkBatchAttendance.interactor';
import { type ListAttendanceByClassInput } from '@/02-usecases/attendance/ports/input/ListAttendanceByClass.input';
import { type ListAttendanceByClassOutput } from '@/02-usecases/attendance/ports/output/ListAttendanceByClass.output';
import { type MarkAttendanceInput } from '@/02-usecases/attendance/ports/input/MarkAttendance.input';
import { type MarkAttendanceOutput } from '@/02-usecases/attendance/ports/output/MarkAttendance.output';

export class AttendanceController {
  private readonly listAttendanceInteractor: ListAttendanceByClassInteractor;
  private readonly markAttendanceInteractor: MarkAttendanceInteractor;
  private readonly markBatchAttendanceInteractor: MarkBatchAttendanceInteractor;

  constructor(
    listAttendanceInteractor: ListAttendanceByClassInteractor,
    markAttendanceInteractor: MarkAttendanceInteractor,
    markBatchAttendanceInteractor: MarkBatchAttendanceInteractor
  ) {
    this.listAttendanceInteractor = listAttendanceInteractor;
    this.markAttendanceInteractor = markAttendanceInteractor;
    this.markBatchAttendanceInteractor = markBatchAttendanceInteractor;
  }

  async listAttendanceByClass(input: ListAttendanceByClassInput): Promise<Result<ListAttendanceByClassOutput>> {
    return this.listAttendanceInteractor.execute(input);
  }

  async markAttendance(input: MarkAttendanceInput): Promise<Result<MarkAttendanceOutput>> {
    return this.markAttendanceInteractor.execute(input);
  }
}