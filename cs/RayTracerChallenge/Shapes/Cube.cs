//-----------------------------------------------------------------------
// <copyright file="Cube.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Shapes
{
    using System;
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a cube.
    /// </summary>
    public class Cube : Shape
    {
        /// <summary>
        /// Gets the intersection distances along the ray with the cube.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            (double xtmin, double xtmax) = this.CheckAxis(ray.Origin.X, ray.Direction.X);
            (double ytmin, double ytmax) = this.CheckAxis(ray.Origin.Y, ray.Direction.Y);
            (double ztmin, double ztmax) = this.CheckAxis(ray.Origin.Z, ray.Direction.Z);

            double tmin = new[] { xtmin, ytmin, ztmin }.Max();
            double tmax = new[] { xtmax, ytmax, ztmax }.Min();

            if (tmin > tmax)
            {
                return new Intersections();
            }

            return new Intersections(
                new Intersection(tmin, this),
                new Intersection(tmax, this));
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public override Tuple4D GetNormalAtPointImpl(Tuple4D point)
        {
            double absX = Math.Abs(point.X);
            double absY = Math.Abs(point.Y);
            double absZ = Math.Abs(point.Z);
            double maxc = new[] { absX, absY, absZ }.Max();

            if (maxc.Compare(absX))
            {
                return Tuple4D.CreateVector(point.X, 0, 0);
            }

            if (maxc.Compare(absY))
            {
                return Tuple4D.CreateVector(0, point.Y, 0);
            }

            return Tuple4D.CreateVector(0, 0, point.Z);
        }

        /// <summary>
        /// Checks to see where the ray intersects the plane and returns the min and max t-values for each.
        /// </summary>
        /// <param name="origin">The coordinate for each axis.</param>
        /// <param name="direction">The direction.</param>
        /// <returns>The min and max t-values for each plane.</returns>
        private (double, double) CheckAxis(double origin, double direction)
        {
            double tminNumerator = -1 - origin;
            double tmaxNumerator = 1 - origin;

            double tmin, tmax;
            if (Math.Abs(direction) >= Constants.Epsilon)
            {
                tmin = tminNumerator / direction;
                tmax = tmaxNumerator / direction;
            }
            else
            {
                tmin = tminNumerator * double.PositiveInfinity;
                tmax = tmaxNumerator * double.PositiveInfinity;
            }

            if (tmin > tmax)
            {
                double temp = tmin;
                tmin = tmax;
                tmax = temp;
            }

            return (tmin, tmax);
        }
    }
}
