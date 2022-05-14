import "./extensions/NumberExtensions";
import Tuple from "./Tuple";

export default class NumberTuple extends Tuple<number> {
  valueComparisonFn = (thisValue: number, valueToCompareAgainst: number): boolean => {
    return thisValue.compare(valueToCompareAgainst);
  };

  override toString = (): string => `(${this.values.map((v) => v.toFixed(2)).join(", ")})`;
}
