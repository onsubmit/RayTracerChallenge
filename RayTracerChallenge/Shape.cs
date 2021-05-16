//-----------------------------------------------------------------------
// <copyright file="Shape.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
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
        public Material Material { get; protected set; }

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
    }
}
