//-----------------------------------------------------------------------
// <copyright file="Shape.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Shapes
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a generic shape.
    /// </summary>
    public abstract class Shape
    {
        /// <summary>
        /// The shape's transformation.
        /// </summary>
        private Matrix transformation;

        /// <summary>
        /// Initializes a new instance of the <see cref="Shape" /> class.
        /// </summary>
        public Shape()
        {
        }

        /// <summary>
        /// Gets or sets the shape's material.
        /// </summary>
        public Material Material { get; set; } = new Material();

        /// <summary>
        /// Gets or sets the shaoe's transformation.
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
        /// Gets a value indicating whether the shape has a transformation defined.
        /// </summary>
        public bool HasTransformation => this.transformation != null;

        /// <summary>
        /// Gets the intersection distances along the ray with the shape.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public abstract Intersections GetIntersectionsWithImpl(Ray ray);

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public abstract Tuple4D GetNormalAtPointImpl(Tuple4D point);

        /// <summary>
        /// Gets the intersection distances along the ray with the shape.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>The intersections along the ray.</returns>
        public Intersections GetIntersectionsWith(Ray ray)
        {
            if (this.HasTransformation)
            {
                ray = ray.TransformWith(this.Transformation.GetInverse());
            }

            return this.GetIntersectionsWithImpl(ray);
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
            Tuple4D objectNormal = this.GetNormalAtPointImpl(objectPoint);
            Tuple4D worldNormal = this.Transformation.GetInverse().Transpose() * objectNormal;
            worldNormal.ToVector();

            return worldNormal.Normalize();
        }

        /// <summary>
        /// Casts the shape to a derived type.
        /// </summary>
        /// <typeparam name="T">Type of derived shape to cast to.</typeparam>
        /// <returns>The derived shape.</returns>
        public T As<T>()
            where T : Shape
        {
            return (T)this;
        }

        /// <summary>
        /// Compares a <see cref="Shape"/> with another object.
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

            if (obj is Shape s)
            {
                if (this.GetType() != s.GetType())
                {
                    return false;
                }

                return this.Material.Equals(s.Material)
                    && this.Transformation.Equals(s.Transformation);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Shape"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = -715739984;
            hashCode = (hashCode * -1521134295) + base.GetHashCode();
            hashCode = (hashCode * -1521134295) + EqualityComparer<Material>.Default.GetHashCode(this.Material);
            hashCode = (hashCode * -1521134295) + EqualityComparer<Matrix>.Default.GetHashCode(this.Transformation);
            return hashCode;
        }
    }
}
