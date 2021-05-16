//-----------------------------------------------------------------------
// <copyright file="Shape.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents a generic shape.
    /// </summary>
    public abstract class Shape
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Shape" /> class.
        /// </summary>
        /// <param name="material">The material.</param>
        public Shape(Material material)
        {
            this.Material = material ?? new Material();
        }

        /// <summary>
        /// Gets or sets the shape's material.
        /// </summary>
        public Material Material { get;  set; }

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
                return this.Material.Equals(s.Material);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Shape"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            return 1578056576 + EqualityComparer<Material>.Default.GetHashCode(this.Material);
        }
    }
}
