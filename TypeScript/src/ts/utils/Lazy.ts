export type LazyFactoryOutcome<T> = {
  success: boolean;
  value?: T;
};

export default class Lazy<T> {
  private _factory: () => LazyFactoryOutcome<T>;
  private _outcome?: LazyFactoryOutcome<T>;
  private _value?: T;

  constructor(valueFactory: () => LazyFactoryOutcome<T>) {
    this._factory = valueFactory;
  }

  get value(): T {
    if (this._value !== undefined) {
      return this._value;
    }

    if (this._outcome === undefined) {
      this._outcome = this._factory();
    }

    if (this._outcome.success && this._outcome.value !== undefined) {
      this._value = this._outcome.value;
      return this._value;
    }

    throw new Error("Could not determine value");
  }

  set value(t: T) {
    this._value = t;
  }

  get hasValue(): boolean {
    if (this._value !== undefined) {
      return true;
    }

    if (this._outcome === undefined) {
      this._outcome = this._factory();
    }

    if (this._outcome.success) {
      return true;
    }

    return false;
  }
}
