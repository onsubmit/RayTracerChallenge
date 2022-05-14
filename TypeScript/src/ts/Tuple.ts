import "./extensions/NumberExtensions";

export default abstract class Tuple<T> {
  protected values: T[];

  constructor(...values: T[]) {
    this.values = values;
  }

  protected at = (index: number): T => this.values[index];

  abstract valueComparisonFn: (thisValue: T, valueToCompareAgainst: T) => boolean;

  compare = (tuple: Tuple<T>): boolean => {
    const foundIndex = this.values.findIndex((value, index) => !this.valueComparisonFn(value, tuple.values[index]));

    if (foundIndex < 0) {
      return true;
    }

    return false;
  };

  toString = (): string => `(${this.values.join(", ")})`;
}
