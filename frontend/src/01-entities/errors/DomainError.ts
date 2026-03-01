/**
 * Represents errors that occur within the domain layer.
 * Domain errors are used to enforce business rules and invariants.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}