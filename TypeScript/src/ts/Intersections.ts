import Intersection from "./Intersection";

export default class Intersections {
  private cachedHit?: Intersection;
  private cachedSortedIntersections?: Intersections;
  private hitKnown: boolean = false;
  readonly intersections: Intersection[];

  constructor(...intersections: Intersection[]) {
    this.intersections = intersections;
  }

  get length(): number {
    return this.intersections.length;
  }

  get sortedIntersections(): Intersections {
    return (
      this.cachedSortedIntersections ||
      (this.cachedSortedIntersections = new Intersections(...this.intersections.sort((a, b) => (a.t > b.t ? 1 : -1))))
    );
  }

  get hasHit(): boolean {
    return !!this.hit;
  }

  get hit(): Intersection | undefined {
    if (!this.cachedHit && !this.hitKnown) {
      this.hitKnown = true;

      const hits = this.sortedIntersections.intersections.filter((i) => i.t >= 0);
      if (hits.length) {
        this.cachedHit = hits[0];
      }
    }

    return this.cachedHit;
  }

  at = (index: number): Intersection => {
    if (index < 0 || index >= this.intersections.length) {
      throw "Invalid index";
    }

    return this.intersections[index];
  };
}
