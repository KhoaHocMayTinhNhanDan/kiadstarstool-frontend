// src/01-entities/shared/Identifier.vo.ts
import { ValueObject } from "./base/ValueObject";

interface IdentifierProps {
  value: string;
}

export abstract class Identifier extends ValueObject<IdentifierProps> {
  protected constructor(props: IdentifierProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public toString(): string {
    return this.value;
  }
}
