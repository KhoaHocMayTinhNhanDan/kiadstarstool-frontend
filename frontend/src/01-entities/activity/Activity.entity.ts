import { AggregateRoot } from '../shared/base/AggregateRoot';
import { Identifier } from '../shared/value-objects/Identifier.vo';

export type ActivityType = 'auth_login' | 'user_update' | 'transaction_created' | 'other';

export interface ActivityProps {
  readonly id: Identifier;
  readonly userId: string; // The user who performed the action
  readonly type: ActivityType;
  readonly description: string;
  readonly details?: Record<string, any>; // For extra context, e.g., { transactionId: 'xyz', amount: 5000 }
  readonly timestamp: Date;
}

export interface ActivityJSON {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  details?: Record<string, any>;
  timestamp: string;
}

export class Activity extends AggregateRoot<Identifier> {
  public readonly userId: string;
  public readonly type: ActivityType;
  public readonly description: string;
  public readonly details?: Record<string, any>;
  public readonly timestamp: Date;

  private constructor(props: ActivityProps) {
    super({ id: props.id });
    this.userId = props.userId;
    this.type = props.type;
    this.description = props.description;
    this.details = props.details;
    this.timestamp = props.timestamp;
  }

  static create(props: {
    id?: Identifier;
    userId: string;
    type: ActivityType;
    description: string;
    details?: Record<string, any>;
    timestamp?: Date;
  }): Activity {
    return new Activity({
      id: props.id ?? Identifier.create(),
      userId: props.userId,
      type: props.type,
      description: props.description,
      details: props.details,
      timestamp: props.timestamp ?? new Date(),
    });
  }

  toJSON(): ActivityJSON {
    return {
      id: this.id.toString(),
      userId: this.userId,
      type: this.type,
      description: this.description,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }
}