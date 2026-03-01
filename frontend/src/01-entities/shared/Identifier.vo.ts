// src/01-entities/shared/Identifier.vo.ts
import { v4 as uuidv4 } from 'uuid';
import { ValueObject } from "./base/ValueObject";

interface IdentifierProps {
  value: string;
}

export class Identifier extends ValueObject<IdentifierProps> {
  protected constructor(props: IdentifierProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }

  public static create(id?: string): Identifier {
    return new Identifier({ value: id ?? uuidv4() });
  }
}
