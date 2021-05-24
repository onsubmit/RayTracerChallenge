//-----------------------------------------------------------------------
// <copyright file="Computation.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Represents a computation.
    /// </summary>
    public class Computation
    {
        /// <summary>
        /// The intersection.
        /// </summary>
        private readonly Intersection intersection;

        /// <summary>
        /// Initializes a new instance of the <see cref="Computation"/> class.
        /// </summary>
        /// <param name="intersection">The intersection.</param>
        /// <param name="ray">The ray.</param>
        /// <param name="intersections">The collection of intersections, used to determine where a hit is relative to the other intersections.</param>
        public Computation(Intersection intersection, Ray ray, Intersections intersections = null)
        {
            this.intersection = intersection;
            this.Point = ray.GetPointOnRayAtDistance(intersection.T);
            this.EyeVector = -ray.Direction;
            this.NormalVector = intersection.Object.GetNormalAtPoint(this.Point);
            this.ReflectionVector = ray.Direction.ReflectVector(this.NormalVector);

            if (this.NormalVector.GetDotProductWith(this.EyeVector) < 0)
            {
                this.Inside = true;
                this.NormalVector = -this.NormalVector;
            }

            Tuple4D normalTimesEpsilon = this.NormalVector * Constants.Epsilon;
            this.OverPoint = this.Point + normalTimesEpsilon;
            this.UnderPoint = this.Point - normalTimesEpsilon;

            List<Shape> containers = new List<Shape>();
            for (int j = 0; j < intersections?.Count; j++)
            {
                Intersection i = intersections[j];
                if (i.Equals(intersection))
                {
                    this.N1 = containers.LastOrDefault()?.Material.RefractiveIndex ?? 1.0;
                }

                if (!containers.Remove(i.Object))
                {
                    containers.Add(i.Object);
                }

                if (i.Equals(intersection))
                {
                    this.N2 = containers.LastOrDefault()?.Material.RefractiveIndex ?? 1.0;
                    break;
                }
            }
        }

        /// <summary>
        /// Gets the point.
        /// </summary>
        public Tuple4D Point { get; private set; }

        /// <summary>
        /// Gets a slightly adjusted copy of <see cref="Point"/>.
        /// </summary>
        public Tuple4D OverPoint { get; private set; }

        /// <summary>
        /// Gets a slightly adjusted copy of <see cref="Point"/>. Where a refracted ray typically originates.
        /// </summary>
        public Tuple4D UnderPoint { get; private set; }

        /// <summary>
        /// Gets the eye vector.
        /// </summary>
        public Tuple4D EyeVector { get; private set; }

        /// <summary>
        /// Gets the normal vector.
        /// </summary>
        public Tuple4D NormalVector { get; private set; }

        /// <summary>
        /// Gets the reflection vector.
        /// </summary>
        public Tuple4D ReflectionVector { get; private set; }

        /// <summary>
        /// Gets the refractive index of the material that the ray is passing from.
        /// </summary>
        public double N1 { get; private set; }

        /// <summary>
        /// Gets the refractive index of the material that the ray is passing to.
        /// </summary>
        public double N2 { get; private set; }

        /// <summary>
        /// Gets the 't' value of the intersection.
        /// </summary>
        public double T => this.intersection.T;

        /// <summary>
        /// Gets the object that was intersected.
        /// </summary>
        public Shape Object => this.intersection.Object;

        /// <summary>
        /// Gets a value indicating whether the hit occurs on the inside of the shape.
        /// </summary>
        public bool Inside { get; private set; }

        /// <summary>
        /// Calculate the Schlick approximation to the Fresnel equations.
        /// </summary>
        /// <returns>The Schlick approximation to the Fresnel equations.</returns>
        public double GetSchlickApproximation()
        {
            // Cosine of the angle between eye and normal vectors.
            double cosine = this.EyeVector.GetDotProductWith(this.NormalVector);

            if (this.N1 > this.N2)
            {
                // Total internal reflection.
                double ratio = this.N1 / this.N2;
                double sineSquaredTheta = ratio * ratio * (1.0 - (cosine * cosine));
                if (sineSquaredTheta > 1)
                {
                    return 1.0;
                }

                double cosineTheta = Math.Sqrt(1.0 - sineSquaredTheta);
                cosine = cosineTheta;
            }

            double r0 = Math.Pow((this.N1 - this.N2) / (this.N1 + this.N2), 2.0);
            return r0 + ((1 - r0) * Math.Pow(1 - cosine, 5.0));
        }
    }
}
