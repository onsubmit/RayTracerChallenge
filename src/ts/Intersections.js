"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lazy_1 = __importDefault(require("./utils/Lazy"));
class Intersections {
    constructor(...intersections) {
        this.get = (index) => {
            if (index < 0 || index >= this.intersections.length) {
                throw new Error("Invalid index");
            }
            return this.intersections[index];
        };
        this.intersections = intersections;
        this.lazyHit = new Lazy_1.default(() => {
            const hits = this.sortedIntersections.intersections.filter((i) => i.t >= 0);
            return { success: hits.length > 0, value: hits[0] };
        });
        this.lazySortedIntersections = new Lazy_1.default(() => {
            return {
                success: true,
                value: new Intersections(...this.intersections.sort((a, b) => (a.t > b.t ? 1 : -1))),
            };
        });
    }
    get length() {
        return this.intersections.length;
    }
    get sortedIntersections() {
        if (!this.lazySortedIntersections.value) {
            throw new Error("Sorted intersections could not be determined");
        }
        return this.lazySortedIntersections.value;
    }
    get hasHit() {
        return this.lazyHit.hasValue;
    }
    get hit() {
        return this.lazyHit.value;
    }
}
exports.default = Intersections;
//# sourceMappingURL=Intersections.js.map