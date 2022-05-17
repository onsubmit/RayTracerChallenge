"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Light {
    constructor(position, intensity) {
        this.compare = (light) => {
            if (!this.position.compare(light.position)) {
                return false;
            }
            if (!this.intensity.compare(light.intensity)) {
                return false;
            }
            return true;
        };
        this.position = position;
        this.intensity = intensity;
    }
}
exports.default = Light;
//# sourceMappingURL=Light.js.map