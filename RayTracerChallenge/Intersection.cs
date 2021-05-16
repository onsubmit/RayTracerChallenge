//-----------------------------------------------------------------------
// <copyright file="Intersection.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System.Collections.Generic;
    using OnSubmit.RayTracerChallenge.Extensions;

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

        /// <summary>
        /// Compares a <see cref="Intersection"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>true</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            if (ReferenceEquals(this, obj))
            {
                return true;
            }

            if (obj is Intersection i)
            {
                return this.T.Compare(i.T)
                    && this.Object.Equals(i.Object);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Intersection"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = 1282961813;
            hashCode = (hashCode * -1521134295) + this.T.GetHashCode();
            hashCode = (hashCode * -1521134295) + EqualityComparer<Shape>.Default.GetHashCode(this.Object);
            return hashCode;
        }
    }
}
