"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Intersections {
    constructor(...intersections) {
        this.hitKnown = false;
        this.at = (index) => {
            if (index < 0 || index >= this.intersections.length) {
                throw "Invalid index";
            }
            return this.intersections[index];
        };
        this.intersections = intersections;
    }
    get length() {
        return this.intersections.length;
    }
    get sortedIntersections() {
        return (this.cachedSortedIntersections ||
            (this.cachedSortedIntersections = new Intersections(...this.intersections.sort((a, b) => (a.t > b.t ? 1 : -1)))));
    }
    get hasHit() {
        return !!this.hit;
    }
    get hit() {
        if (!this.cachedHit && !this.hitKnown) {
            this.hitKnown = true;
            const hits = this.sortedIntersections.intersections.filter((i) => i.t >= 0);
            if (hits.length) {
                this.cachedHit = hits[0];
            }
        }
        return this.cachedHit;
    }
}
exports.default = Intersections;
//# sourceMappingURL=Intersections.js.map