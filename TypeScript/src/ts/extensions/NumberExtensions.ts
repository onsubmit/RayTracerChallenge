Number.prototype.compare =
  Number.prototype.compare ||
  function (this: number, received: number, epsilon = 0.00001): boolean {
    if (Math.abs(received - this) < epsilon) {
      return true;
    }

    return false;
  };
