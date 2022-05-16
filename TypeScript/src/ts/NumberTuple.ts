import "./extensions/NumberExtensions";
import Tuple from "./Tuple";

export default class NumberTuple extends Tuple<number> {
  valueComparisonFn = (thisValue: number, valueToCompareAgainst: number): boolean => {
    return thisValue.compare(valueToCompareAgainst);
  };

  protected static add = (tuple1: NumberTuple, tuple2: NumberTuple): NumberTuple => {
    const sums = tuple1.values.map((value, index) => value + tuple2.get(index));
    return new NumberTuple(...sums);
  };

  protected static subtract = (tuple1: NumberTuple, tuple2: NumberTuple): NumberTuple => {
    const differences = tuple1.values.map((value, index) => value - tuple2.get(index));
    return new NumberTuple(...differences);
  };

  protected static multiply = (tuple: NumberTuple, scalar: number): NumberTuple => {
    const products = tuple.values.map((value) => value * scalar);
    return new NumberTuple(...products);
  };

  protected static divide = (tuple: NumberTuple, scalar: number): NumberTuple => {
    const quotients = tuple.values.map((value) => value / scalar);
    return new NumberTuple(...quotients);
  };

  protected static negate = (tuple: NumberTuple): NumberTuple => {
    const negated = tuple.values.map((value) => 0 - value);
    return new NumberTuple(...negated);
  };

  override toString = (): string => `(${this.values.map((v) => v.toFixed(2)).join(", ")})`;
}
