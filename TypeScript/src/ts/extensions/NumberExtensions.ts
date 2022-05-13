Number.prototype.compare = function (received: number, epsilon = 0.00001): boolean {
  if (Math.abs(received - <number>this) < epsilon) {
    return true;
  }

  return false;
};
