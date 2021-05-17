//-----------------------------------------------------------------------
// <copyright file="Plane.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a test shape.
    /// </summary>
    public class Plane : Shape
    {
        /// <summary>
        /// Gets the intersection distances along the ray with the plane.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            if (Math.Abs(ray.Direction.Y) < DoubleExtensions.Epsilon)
            {
                return new Intersections();
            }

            double t = -ray.Origin.Y / ray.Direction.Y;
            return new Intersections(new Intersection(t, this));
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public override Tuple4D GetNormalAtPointImpl(Tuple4D point)
        {
            return Tuple4D.CreateVector(0, 1, 0);
        }
    }
}
