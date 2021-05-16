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
        /// Gets the intersection distances along the ray with the sphere.
        /// </summary>
        /// <param name="sphere">The sphere.</param>
        /// <returns>The intersections along the ray.</returns>
        public Intersections GetIntersectionsWith(Sphere sphere)
        {
            Ray ray = sphere.HasTransformation ? this.TransformWith(sphere.Transformation.GetInverse()) : this;
            Tuple4D sphereToRay = ray.Origin - sphere.Origin;

            double a = ray.Direction.GetDotProductWith(ray.Direction);
            double b = 2 * ray.Direction.GetDotProductWith(sphereToRay);
            double c = sphereToRay.GetDotProductWith(sphereToRay) - 1;
            double discriminant = (b * b) - (4 * a * c);

            if (discriminant >= 0)
            {
                double sqrtDiscriminant = Math.Sqrt(discriminant);
                double twoA = 2 * a;

                return new Intersections(new Intersection[2]
                {
                    new Intersection((-b - sqrtDiscriminant) / twoA, sphere),
                    new Intersection((-b + sqrtDiscriminant) / twoA, sphere),
                });
            }

            return new Intersections();
        }

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

            Intersections[] allIntersections = world.GetShapes<Sphere>().Select(s => this.GetIntersectionsWith(s)).ToArray();
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
