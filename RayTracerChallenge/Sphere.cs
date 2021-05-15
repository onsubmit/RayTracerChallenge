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
        /// The sphere's transformation.
        /// </summary>
        private Matrix transformation;

        /// <summary>
        /// Initializes a new instance of the <see cref="Sphere"/> class.
        /// </summary>
        /// <param name="origin">The sphere's origin point.</param>
        /// <param name="radius">The sphere's radius.</param>
        public Sphere(Tuple4D origin, double radius)
        {
            if (!origin.IsPoint)
            {
                throw new ArgumentException(nameof(origin), $"{nameof(origin)} must be a point.");
            }

            this.Origin = origin;
            this.Radius = radius;
        }

        /// <summary>
        /// Gets the origin point.
        /// </summary>
        public Tuple4D Origin { get; private set; }

        /// <summary>
        /// Gets the sphere radius.
        /// </summary>
        public double Radius { get; private set; }

        /// <summary>
        /// Gets a value indicating whether the sphere has a transformation defined.
        /// </summary>
        public bool HasTransformation => this.transformation != null;

        /// <summary>
        /// Gets or sets the sphere's transformation.
        /// </summary>
        public Matrix Transformation
        {
            get
            {
                if (this.transformation == null)
                {
                    this.transformation = Matrix.GetIdentityMatrix(3);
                }

                return this.transformation;
            }

            set
            {
                this.transformation = value;
            }
        }
    }
}
