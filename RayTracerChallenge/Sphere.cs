//-----------------------------------------------------------------------
// <copyright file="Sphere.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using OnSubmit.RayTracerChallenge.Extensions;

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
        /// <param name="transformation">The sphere's transformation matrix.</param>
        public Sphere(Matrix transformation)
            : this(Tuple4D.CreatePoint(0, 0, 0), 1, transformation, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Sphere"/> class.
        /// </summary>
        /// <param name="material">The sphere's material.</param>
        public Sphere(Material material)
            : this(Tuple4D.CreatePoint(0, 0, 0), 1, null, material)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Sphere"/> class.
        /// Creates the unit sphere.
        /// </summary>
        /// <param name="transformation">The sphere's transformation matrix.</param>
        /// <param name="material">The sphere's material.</param>
        public Sphere(Matrix transformation = null, Material material = null)
            : this(Tuple4D.CreatePoint(0, 0, 0), 1, transformation, material)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Sphere"/> class.
        /// </summary>
        /// <param name="origin">The sphere's origin point.</param>
        /// <param name="radius">The sphere's radius.</param>
        /// <param name="transformation">The sphere's transformation matrix.</param>
        /// <param name="material">The sphere's material.</param>
        public Sphere(Tuple4D origin, double radius, Matrix transformation = null, Material material = null)
            : base(material)
        {
            if (!origin.IsPoint)
            {
                throw new ArgumentException(nameof(origin), $"{nameof(origin)} must be a point.");
            }

            this.Origin = origin;
            this.Radius = radius;
            this.Transformation = transformation;
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
                    this.transformation = Matrix.GetIdentityMatrix(4);
                }

                return this.transformation;
            }

            set
            {
                this.transformation = value;
            }
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public Tuple4D GetNormalAtPoint(Tuple4D point)
        {
            if (!point.IsPoint)
            {
                throw new ArgumentException(nameof(point), $"{nameof(point)} must be a point.");
            }

            Tuple4D objectPoint = this.Transformation.GetInverse() * point;
            Tuple4D objectNormal = objectPoint - this.Origin;
            Tuple4D worldNormal = this.Transformation.GetInverse().Transpose() * objectNormal;
            worldNormal.ToVector();

            return worldNormal.Normalize();
        }

        /// <summary>
        /// Compares a <see cref="Sphere"/> with another object.
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

            if (obj is Sphere s)
            {
                return base.Equals(s)
                    && this.Origin.Equals(s.Origin)
                    && this.Radius.Compare(s.Radius)
                    && this.Transformation.Equals(s.Transformation);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Sphere"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = -715739984;
            hashCode = (hashCode * -1521134295) + base.GetHashCode();
            hashCode = (hashCode * -1521134295) + EqualityComparer<Material>.Default.GetHashCode(this.Material);
            hashCode = (hashCode * -1521134295) + EqualityComparer<Matrix>.Default.GetHashCode(this.transformation);
            hashCode = (hashCode * -1521134295) + EqualityComparer<Tuple4D>.Default.GetHashCode(this.Origin);
            hashCode = (hashCode * -1521134295) + this.Radius.GetHashCode();
            return hashCode;
        }
    }
}
