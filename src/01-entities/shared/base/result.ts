// src/01-entities/shared/base/result.ts
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: T | string | undefined;
  private _value: T | undefined;

  private constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || this._value === undefined) {
      throw new Error("Cannot get the value of an error result.");
    }
    return this._value;
  }

  public getErrorValue(): T | string {
    if (this.isSuccess || this.error === undefined) {
      throw new Error("Cannot get the error of a success result.");
    }
    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: U | string): Result<U> {
    return new Result<U>(false, error);
  }
}
