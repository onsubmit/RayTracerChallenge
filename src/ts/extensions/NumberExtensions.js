"use strict";
Number.prototype.compare = function (received, epsilon = 0.00001) {
    if (Math.abs(received - this) < epsilon) {
        return true;
    }
    return false;
};
//# sourceMappingURL=NumberExtensions.js.map