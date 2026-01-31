// src/01-entities/shared/DateRange.vo.ts
import { ValueObject } from "./base/ValueObject";
import { Result } from "./base/result";

interface DateRangeProps {
  start: Date;
  end: Date;
}

export class DateRange extends ValueObject<DateRangeProps> {
  private constructor(props: DateRangeProps) {
    super(props);
  }

  public static create(start: Date, end: Date): Result<DateRange> {
    if (start > end) {
      return Result.fail<DateRange>("Start date cannot be after end date.");
    }
    return Result.ok(new DateRange({ start, end }));
  }

  public get start(): Date {
    return this.props.start;
  }

  public get end(): Date {
    return this.props.end;
  }

  public overlaps(other: DateRange): boolean {
    return this.start < other.end && this.end > other.start;
  }
}
