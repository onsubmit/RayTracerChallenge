//-----------------------------------------------------------------------
// <copyright file="Intersections.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Represents a set of intersections.
    /// </summary>
    public class Intersections
    {
        /// <summary>
        /// The set of intersections.
        /// </summary>
        private readonly Intersection[] elements;

        /// <summary>
        /// The sorted intersections by 't' value.
        /// </summary>
        private Intersections sortedIntersections;

        /// <summary>
        /// The hit from the intersections.
        /// </summary>
        private Intersection hit;

        /// <summary>
        /// Indicates where the hit has been calculated yet.
        /// </summary>
        private bool hitKnown;

        /// <summary>
        /// Initializes a new instance of the <see cref="Intersections"/> class.
        /// </summary>
        public Intersections()
        {
            this.elements = new Intersection[0];
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Intersections"/> class.
        /// </summary>
        /// <param name="intersections">The intersections.</param>
        public Intersections(params Intersection[] intersections)
        {
            this.elements = intersections;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Intersections"/> class.
        /// </summary>
        /// <param name="intersections">The intersections.</param>
        public Intersections(params Intersections[] intersections)
        {
            this.elements = intersections.SelectMany(i => i.elements).ToArray();
        }

        /// <summary>
        /// Gets the count of intersections.
        /// </summary>
        public int Count => this.elements?.Length ?? 0;

        /// <summary>
        /// Gets a value indicating whether the intersections contain a hit.
        /// </summary>
        public bool HasHit => this.GetHit() != null;

        /// <summary>
        /// Gets the intersections but sorted by their <c>t</c> value.
        /// </summary>
        public Intersections SortedIntersections
        {
            get
            {
                if (this.sortedIntersections == null)
                {
                    this.sortedIntersections = new Intersections(this.elements?.OrderBy(i => i.T).ToArray());
                }

                return this.sortedIntersections;
            }
        }

        /// <summary>
        /// Indexer for the intersections.
        /// </summary>
        /// <param name="i">The index.</param>
        /// <returns>The intersection corresponding to the given index.</returns>
        public Intersection this[int i] => this.elements[i];

        /// <summary>
        /// Get the hit from the intersections.
        /// </summary>
        /// <returns>The hit.</returns>
        public Intersection GetHit()
        {
            if (this.hit == null && !this.hitKnown)
            {
                this.hitKnown = true;
                this.hit = this.SortedIntersections?.elements.Where(i => i.T >= 0).FirstOrDefault();
            }

            return this.hit;
        }

        /// <summary>
        /// Compares a <see cref="Intersections"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>true</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            if (ReferenceEquals(this, obj))
            {
                return true;
            }

            if (obj is Intersections i)
            {
                if (this.Count != i.Count)
                {
                    return false;
                }

                return this.elements.All(e => i.elements.Any(x => x.Equals(e)));
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Intersections"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            return 272633004 + EqualityComparer<Intersection[]>.Default.GetHashCode(this.elements);
        }
    }
}
