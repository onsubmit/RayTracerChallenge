export default class Lazy<T> {
  private _factory: () => T | null;
  private _value?: T | null;

  constructor(valueFactory: () => T | null) {
    this._factory = valueFactory;
  }

  get value(): T | null {
    if (this._value === undefined) {
      this._value = this._factory();
    }

    return this._value;
  }

  set value(t: T | null) {
    this._value = t;
  }

  get hasValue(): boolean {
    return this._value !== undefined;
  }
}
