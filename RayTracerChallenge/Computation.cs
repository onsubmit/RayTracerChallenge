//-----------------------------------------------------------------------
// <copyright file="Computation.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using OnSubmit.RayTracerChallenge.Extensions;
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
        public Computation(Intersection intersection, Ray ray)
        {
            this.intersection = intersection;
            this.Point = ray.GetPointOnRayAtDistance(intersection.T);
            this.EyeVector = -ray.Direction;
            this.NormalVector = intersection.Object.GetNormalAtPoint(this.Point);
            this.OverPoint = this.Point + (this.NormalVector * DoubleExtensions.Epsilon);

            if (this.NormalVector.GetDotProductWith(this.EyeVector) < 0)
            {
                this.Inside = true;
                this.NormalVector = -this.NormalVector;
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
        /// Gets the eye vect4or.
        /// </summary>
        public Tuple4D EyeVector { get; private set; }

        /// <summary>
        /// Gets the normal vector.
        /// </summary>
        public Tuple4D NormalVector { get; private set; }

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
    }
}
