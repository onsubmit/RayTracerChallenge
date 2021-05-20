//-----------------------------------------------------------------------
// <copyright file="Pattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Represents a generic pattern.
    /// </summary>
    public abstract class Pattern
    {
        /// <summary>
        /// The shape's transformation.
        /// </summary>
        private Matrix transformation;

        /// <summary>
        /// Initializes a new instance of the <see cref="Pattern" /> class.
        /// </summary>
        public Pattern()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Pattern" /> class.
        /// </summary>
        /// <param name="colors">The colors used in the pattern.</param>
        public Pattern(params ColorTuple[] colors)
        {
            this.Patterns = colors.Select(c => new SolidPattern(c)).ToArray();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Pattern" /> class.
        /// </summary>
        /// <param name="patterns">The nested patterns.</param>
        public Pattern(params Pattern[] patterns)
        {
            this.Patterns = patterns;
        }

        /// <summary>
        /// Gets or sets the shape's material.
        /// </summary>
        public Material Material { get; set; } = new Material();

        /// <summary>
        /// Gets or sets the pattern's transformation.
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
        /// Gets a value indicating whether the pattern has a transformation defined.
        /// </summary>
        public bool HasTransformation => this.transformation != null;

        /// <summary>
        /// Gets a value indicating whether the pattern has any nested patterns.
        /// </summary>
        public bool HasNestedPattern => this.Patterns?.Any() ?? false;

        /// <summary>
        /// Gets the colors used in the pattern.
        /// </summary>
        protected Pattern[] Patterns { get; private set; }

        /// <summary>
        /// Indexer for the pattern.
        /// </summary>
        /// <param name="i">The index.</param>
        /// <returns>The pattern at the provided index.</returns>
        public Pattern this[int i] => this.Patterns?[i];

        /// <summary>
        /// Gets the pattern's color for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's color.</returns>
        public virtual ColorTuple GetColorAtPoint(Tuple4D point)
        {
            if (!point.IsPoint)
            {
                throw new ArgumentException(nameof(point), $"{nameof(point)} must be a point.");
            }

            point = this.GetTransformedPoint(point);
            return this.GetPatternAtPoint(point).GetColorAtPoint(point);
        }

        /// <summary>
        /// Gets the point transformed by the pattern's transformation matrix.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The transformed point.</returns>
        public Tuple4D GetTransformedPoint(Tuple4D point)
        {
            return this.HasTransformation ? this.Transformation.GetInverse() * point : point;
        }

        /// <summary>
        /// Gets the pattern's color for the provided shape.
        /// </summary>
        /// <param name="shape">The shape.</param>
        /// <param name="worldPoint">The world-space point.</param>
        /// <returns>The pattern's color.</returns>
        public ColorTuple GetColorAtShape(Shape shape, Tuple4D worldPoint)
        {
            if (shape == null)
            {
                throw new ArgumentNullException(nameof(shape));
            }

            Tuple4D objectPoint = shape.HasTransformation ? shape.Transformation.GetInverse() * worldPoint : worldPoint;

            if (this.HasNestedPattern)
            {
                return this.GetPatternAtPoint(objectPoint).GetColorAtShape(shape, objectPoint);
            }

            return this.GetColorAtPoint(objectPoint);
        }

        /// <summary>
        /// Compares a <see cref="Pattern"/> with another object.
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

            if (obj is Pattern p)
            {
                if (this.GetType() != p.GetType())
                {
                    return false;
                }

                if (this.HasTransformation && p.HasTransformation)
                {
                    if (!this.Transformation.Equals(p.Transformation))
                    {
                        return false;
                    }
                }
                else if (this.HasTransformation || p.HasTransformation)
                {
                    return false;
                }

                if (!this.HasNestedPattern && p is SolidPattern s)
                {
                    return s.Equals(this);
                }

                return this.Patterns.All(c => p.Patterns.Any(x => x.Equals(c)));
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Pattern"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            return 479200377 + EqualityComparer<Pattern[]>.Default.GetHashCode(this.Patterns);
        }

        /// <summary>
        /// Gets the pattern's nested pattern for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's nested pattern.</returns>
        protected abstract Pattern GetPatternAtPoint(Tuple4D point);
    }
}
