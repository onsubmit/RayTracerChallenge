//-----------------------------------------------------------------------
// <copyright file="Intersections.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
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
        /// <param name="intersections">The intersections.</param>
        public Intersections(params Intersection[] intersections)
        {
            this.elements = intersections;
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
    }
}
