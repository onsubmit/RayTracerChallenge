//-----------------------------------------------------------------------
// <copyright file="Cylinder.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Shapes
{
    using System;
    using System.Collections.Generic;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a cylinder.
    /// </summary>
    public class Cylinder : Shape
    {
        /// <summary>
        /// Gets or sets the minumum y-value of a non-translated cylinder.
        /// </summary>
        public double Minimum { get; set; } = double.NegativeInfinity;

        /// <summary>
        /// Gets or sets the maximum y-value of a non-translated cylinder.
        /// </summary>
        public double Maximum { get; set; } = double.PositiveInfinity;

        /// <summary>
        /// Gets or sets a value indicating whether the cylinder is closed.
        /// </summary>
        public bool Closed { get; set; }

        /// <summary>
        /// Gets the intersection distances along the ray with the cylinder.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            Intersections intersections = new Intersections();

            double a = (ray.Direction.X * ray.Direction.X) + (ray.Direction.Z * ray.Direction.Z);

            if (Math.Abs(a) < Constants.Epsilon)
            {
                // Ray is parallel to y-axis.
                this.IntersectCaps(ray, intersections);
                return intersections;
            }

            double b = 2 * ((ray.Origin.X * ray.Direction.X) + (ray.Origin.Z * ray.Direction.Z));
            double c = (ray.Origin.X * ray.Origin.X) + (ray.Origin.Z * ray.Origin.Z) - 1;

            double discriminant = (b * b) - (4 * a * c);
            if (discriminant < 0)
            {
                // Ray does not intersect the cylinder.
                return new Intersections();
            }

            double sqrt = Math.Sqrt(discriminant);
            double twoA = 2 * a;

            double t0 = (-b - sqrt) / twoA;
            double t1 = (-b + sqrt) / twoA;

            if (t0 > t1)
            {
                double temp = t0;
                t0 = t1;
                t1 = temp;
            }

            double y0 = ray.Origin.Y + (t0 * ray.Direction.Y);
            if (this.Minimum < y0 && y0 < this.Maximum)
            {
                intersections.AddIntersection(new Intersection(t0, this));
            }

            double y1 = ray.Origin.Y + (t1 * ray.Direction.Y);
            if (this.Minimum < y1 && y1 < this.Maximum)
            {
                intersections.AddIntersection(new Intersection(t1, this));
            }

            this.IntersectCaps(ray, intersections);

            return intersections;
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public override Tuple4D GetNormalAtPointImpl(Tuple4D point)
        {
            double distance = (point.X * point.X) + (point.Z * point.Z);

            if (distance < 1 && point.Y >= this.Maximum - Constants.Epsilon)
            {
                return Tuple4D.CreateVector(0, 1, 0);
            }

            if (distance < 1 && point.Y <= this.Minimum + Constants.Epsilon)
            {
                return Tuple4D.CreateVector(0, -1, 0);
            }

            return Tuple4D.CreateVector(point.X, 0, point.Z);
        }

        /// <summary>
        /// Checks to see if the given ray intersects the end caps of the cylinder.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <param name="intersections">The current set of intersections.</param>
        private void IntersectCaps(Ray ray, Intersections intersections)
        {
            if (!this.Closed || ray.Direction.Y.Compare(0))
            {
                // Caps only matter if the cylinder is closed, and could be intersected by the ray.
                return;
            }

            double t = (this.Minimum - ray.Origin.Y) / ray.Direction.Y;
            if (this.CheckCap(ray, t))
            {
                intersections.AddIntersection(new Intersection(t, this));
            }

            t = (this.Maximum - ray.Origin.Y) / ray.Direction.Y;
            if (this.CheckCap(ray, t))
            {
                intersections.AddIntersection(new Intersection(t, this));
            }
        }

        /// <summary>
        /// Checks to see if the intersection at <paramref name="t"/> is within a radius of 1 from the y-axis.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <param name="t">The value calculated in <see cref="IntersectCaps"/>.</param>
        /// <returns><c>true</c> if the intersection at <paramref name="t"/> is within a radius of 1 from the y-axis, <c>false</c> otherwise.</returns>
        private bool CheckCap(Ray ray, double t)
        {
            Tuple4D point = ray.GetPointOnRayAtDistance(t);
            double x = point.X;
            double z = point.Z;

            if ((x * x) + (z * z) <= 1)
            {
                return true;
            }

            return false;
        }
    }
}
