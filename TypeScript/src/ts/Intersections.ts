import Intersection from "./Intersection";
import Lazy from "./utils/Lazy";

export default class Intersections {
  private lazyHit: Lazy<Intersection>;
  private lazySortedIntersections: Lazy<Intersections>;
  readonly intersections: Intersection[];

  constructor(...intersections: Intersection[]) {
    this.intersections = intersections;

    this.lazyHit = new Lazy<Intersection>(() => {
      const hits = this.sortedIntersections.intersections.filter((i) => i.t >= 0);
      return hits.length ? hits[0] : null;
    });

    this.lazySortedIntersections = new Lazy<Intersections>(
      () => new Intersections(...this.intersections.sort((a, b) => (a.t > b.t ? 1 : -1)))
    );
  }

  get length(): number {
    return this.intersections.length;
  }

  get sortedIntersections(): Intersections {
    return this.lazySortedIntersections.value!;
  }

  get hasHit(): boolean {
    return !!this.hit;
  }

  get hit(): Intersection | null {
    return this.lazyHit.value;
  }

  at = (index: number): Intersection => {
    if (index < 0 || index >= this.intersections.length) {
      throw "Invalid index";
    }

    return this.intersections[index];
  };
}
