//-----------------------------------------------------------------------
// <copyright file="Sphere.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

    /// <summary>
    /// Represents a sphere.
    /// </summary>
    public class Sphere : Shape
    {
        /// <summary>
        /// Gets the intersection distances along the ray with the sphere.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            Tuple4D sphereToRay = ray.Origin - Tuple4D.CreatePoint(0, 0, 0);

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
                    new Intersection((-b - sqrtDiscriminant) / twoA, this),
                    new Intersection((-b + sqrtDiscriminant) / twoA, this),
                });
            }

            return new Intersections();
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public override Tuple4D GetNormalAtPointImpl(Tuple4D point)
        {
            return point - Tuple4D.CreatePoint(0, 0, 0);
        }
    }
}
