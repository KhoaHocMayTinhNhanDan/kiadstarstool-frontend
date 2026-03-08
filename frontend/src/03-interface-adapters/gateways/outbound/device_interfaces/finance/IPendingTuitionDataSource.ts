import { type PendingTuitionDTO } from "@/02-usecases/finance/ports/output/ListPendingTuitions.output";

export interface IPendingTuitionDataSource {
  getPendingTuitions(branchId?: string): Promise<any[]>;
}