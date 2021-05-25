//-----------------------------------------------------------------------
// <copyright file="Cone.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Shapes
{
    using System;
    using System.Collections.Generic;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a cone.
    /// </summary>
    public class Cone : Shape
    {
        /// <summary>
        /// Gets or sets the minumum y-value of a non-translated cone.
        /// </summary>
        public double Minimum { get; set; } = double.NegativeInfinity;

        /// <summary>
        /// Gets or sets the maximum y-value of a non-translated cone.
        /// </summary>
        public double Maximum { get; set; } = double.PositiveInfinity;

        /// <summary>
        /// Gets or sets a value indicating whether the cone is closed.
        /// </summary>
        public bool Closed { get; set; }

        /// <summary>
        /// Gets the intersection distances along the ray with the cone.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            Intersections intersections = new Intersections();

            double a = (ray.Direction.X * ray.Direction.X) - (ray.Direction.Y * ray.Direction.Y) + (ray.Direction.Z * ray.Direction.Z);
            double b = 2 * ((ray.Origin.X * ray.Direction.X) - (ray.Origin.Y * ray.Direction.Y) + (ray.Origin.Z * ray.Direction.Z));
            Lazy<double> c = new Lazy<double>(() => (ray.Origin.X * ray.Origin.X) - (ray.Origin.Y * ray.Origin.Y) + (ray.Origin.Z * ray.Origin.Z));

            if (Math.Abs(a) < Constants.Epsilon)
            {
                this.IntersectCaps(ray, intersections);

                if (b.Compare(0.0))
                {
                    return intersections;
                }

                double t = -c.Value / (2.0 * b);
                intersections.AddIntersection(new Intersection(t, this));
                return intersections;
            }

            double discriminant = (b * b) - (4 * a * c.Value);
            if (discriminant < 0)
            {
                // Ray does not intersect the cone.
                this.IntersectCaps(ray, intersections);
                return intersections;
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

            double y = Math.Sqrt((point.X * point.X) + (point.Z * point.Z));
            if (point.Y > 0)
            {
                y = -y;
            }

            return Tuple4D.CreateVector(point.X, y, point.Z);
        }

        /// <summary>
        /// Checks to see if the given ray intersects the end caps of the cone.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <param name="intersections">The current set of intersections.</param>
        private void IntersectCaps(Ray ray, Intersections intersections)
        {
            if (!this.Closed || ray.Direction.Y.Compare(0))
            {
                // Caps only matter if the cone is closed, and could be intersected by the ray.
                return;
            }

            double t = (this.Minimum - ray.Origin.Y) / ray.Direction.Y;
            if (this.CheckCap(ray, t, this.Minimum))
            {
                intersections.AddIntersection(new Intersection(t, this));
            }

            t = (this.Maximum - ray.Origin.Y) / ray.Direction.Y;
            if (this.CheckCap(ray, t, this.Maximum))
            {
                intersections.AddIntersection(new Intersection(t, this));
            }
        }

        /// <summary>
        /// Checks to see if the intersection at <paramref name="t"/> is within a radius of 1 from the y-axis.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <param name="t">The value calculated in <see cref="IntersectCaps"/>.</param>
        /// <param name="y">The y coordinate of the plane being tested.</param>
        /// <returns><c>true</c> if the intersection at <paramref name="t"/> is within a radius of 1 from the y-axis, <c>false</c> otherwise.</returns>
        private bool CheckCap(Ray ray, double t, double y)
        {
            Tuple4D point = ray.GetPointOnRayAtDistance(t);
            double x = point.X;
            double z = point.Z;

            if ((x * x) + (z * z) <= y * y)
            {
                return true;
            }

            return false;
        }
    }
}
