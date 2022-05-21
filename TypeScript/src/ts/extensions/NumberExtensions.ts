import Constants from "ts/Constants";

Number.prototype.compare =
  Number.prototype.compare ||
  function (this: number, received: number, epsilon = Constants.epsilon): boolean {
    if (Math.abs(received - this) < epsilon) {
      return true;
    }

    return false;
  };
