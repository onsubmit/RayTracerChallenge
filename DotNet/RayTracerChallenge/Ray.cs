//-----------------------------------------------------------------------
// <copyright file="Ray.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Linq;

    /// <summary>
    /// Represents a ray.
    /// </summary>
    public class Ray
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Ray"/> class.
        /// </summary>
        /// <param name="origin">The ray's origin point.</param>
        /// <param name="direction">The ray's direction vector.</param>
        public Ray(Tuple4D origin, Tuple4D direction)
        {
            if (!origin.IsPoint)
            {
                throw new ArgumentException(nameof(origin), $"{nameof(origin)} must be a point.");
            }

            if (!direction.IsVector)
            {
                throw new ArgumentException(nameof(direction), $"{nameof(direction)} must be a vector.");
            }

            this.Origin = origin;
            this.Direction = direction;
        }

        /// <summary>
        /// Gets the origin point.
        /// </summary>
        public Tuple4D Origin { get; private set; }

        /// <summary>
        /// Gets the direction vector.
        /// </summary>
        public Tuple4D Direction { get; private set; }

        /// <summary>
        /// Computes the point at the given distance <paramref name="t"/> along the ray.
        /// </summary>
        /// <param name="t">The distance.</param>
        /// <returns>The point.</returns>
        public Tuple4D GetPointOnRayAtDistance(double t) => this.Origin + (this.Direction * t);

        /// <summary>
        /// Gets the intersection distances along the ray with the world's objects.
        /// </summary>
        /// <param name="world">The world.</param>
        /// <returns>The intersections along the ray.</returns>
        public Intersections GetIntersectionsWith(World world)
        {
            if (world == null || !world.HasShapes)
            {
                return new Intersections();
            }

            Intersections[] allIntersections = world.Shapes.Select(s => s.GetIntersectionsWith(this)).ToArray();
            return new Intersections(allIntersections).SortedIntersections;
        }

        /// <summary>
        /// Transforms the ray by the given transformation matrix.
        /// </summary>
        /// <param name="matrix">The transformation matrix.</param>
        /// <returns>The transformed ray.</returns>
        public Ray TransformWith(Matrix matrix) => new Ray(matrix * this.Origin, matrix * this.Direction);
    }
}
