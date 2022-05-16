import "./extensions/NumberExtensions";

export default abstract class Tuple<T> {
  values: T[];

  constructor(...values: T[]) {
    this.values = values;
  }

  get length(): number {
    return this.values.length;
  }

  get = (index: number): T => this.values[index];
  set = (index: number, value: T): void => {
    this.values[index] = value;
  };

  abstract valueComparisonFn: (thisValue: T, valueToCompareAgainst: T) => boolean;

  compare = (tuple: Tuple<T>): boolean => {
    if (this.values.length !== tuple.values.length) {
      throw `Tuples have different lengths. ${this.values.length} !== ${tuple.values.length}`;
    }

    const foundIndex = this.values.findIndex((value, index) => !this.valueComparisonFn(value, tuple.values[index]));

    if (foundIndex < 0) {
      return true;
    }

    return false;
  };

  toString = (): string => `(${this.values.join(", ")})`;
}
