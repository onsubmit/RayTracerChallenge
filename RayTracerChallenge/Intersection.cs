//-----------------------------------------------------------------------
// <copyright file="Intersection.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    /// <summary>
    /// Represents a ray.
    /// </summary>
    public class Intersection
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Intersection"/> class.
        /// </summary>
        /// <param name="t">The 't' value of the intersection.</param>
        /// <param name="shape">The object that was intersected.</param>
        public Intersection(double t, Shape shape)
        {
            this.T = t;
            this.Object = shape;
        }

        /// <summary>
        /// Gets the 't' value of the intersection.
        /// </summary>
        public double T { get; private set; }

        /// <summary>
        /// Gets the object that was intersected.
        /// </summary>
        public Shape Object { get; private set; }
    }
}
