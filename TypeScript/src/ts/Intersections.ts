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
      return { success: hits.length > 0, value: hits[0] };
    });

    this.lazySortedIntersections = new Lazy<Intersections>(() => {
      return {
        success: true,
        value: new Intersections(...this.intersections.sort((a, b) => (a.t > b.t ? 1 : -1))),
      };
    });
  }

  get length(): number {
    return this.intersections.length;
  }

  get sortedIntersections(): Intersections {
    if (!this.lazySortedIntersections.value) {
      throw "Sorted intersections could not be determined";
    }

    return this.lazySortedIntersections.value;
  }

  get hasHit(): boolean {
    return this.lazyHit.hasValue;
  }

  get hit(): Intersection {
    return this.lazyHit.value;
  }

  get = (index: number): Intersection => {
    if (index < 0 || index >= this.intersections.length) {
      throw "Invalid index";
    }

    return this.intersections[index];
  };
}
