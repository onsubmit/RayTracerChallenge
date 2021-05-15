//-----------------------------------------------------------------------
// <copyright file="Intersections.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    /// <summary>
    /// Represents a set of intersections.
    /// </summary>
    public class Intersections
    {
        /// <summary>
        /// The set of intersections.
        /// </summary>
        private readonly Intersection[] intersections;

        /// <summary>
        /// Initializes a new instance of the <see cref="Intersections"/> class.
        /// </summary>
        /// <param name="intersections">The intersections.</param>
        public Intersections(params Intersection[] intersections)
        {
            this.intersections = intersections;
        }

        /// <summary>
        /// Indexer for the intersections.
        /// </summary>
        /// <param name="i">The index.</param>
        /// <returns>The intersection corresponding to the given index.</returns>
        public Intersection this[int i] => this.intersections[i];
    }
}
