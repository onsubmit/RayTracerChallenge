//-----------------------------------------------------------------------
// <copyright file="SolidPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a solid pattern.
    /// </summary>
    public class SolidPattern : Pattern
    {
        /// <summary>
        /// The solid pattern's constant color.
        /// </summary>
        private readonly ColorTuple constantColor;

        /// <summary>
        /// Initializes a new instance of the <see cref="SolidPattern" /> class.
        /// </summary>
        public SolidPattern()
            : this(ColorTuple.White)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SolidPattern" /> class.
        /// </summary>
        /// <param name="color">The only color in the solid pattern.</param>
        public SolidPattern(ColorTuple color)
        {
            this.constantColor = color ?? throw new ArgumentNullException(nameof(color));
        }

        /// <summary>
        /// Gets the pattern's color for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's color.</returns>
        public override ColorTuple GetColorAtPoint(Tuple4D point)
        {
            if (!point.IsPoint)
            {
                throw new ArgumentException(nameof(point), $"{nameof(point)} must be a point.");
            }

            return this.constantColor;
        }

        /// <summary>
        /// Compares a <see cref="SolidPattern"/> with another object.
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

            if (obj is SolidPattern s)
            {
                return this.constantColor.Equals(s.constantColor);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="SolidPattern"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = 1217739054;
            hashCode = (hashCode * -1521134295) + base.GetHashCode();
            hashCode = (hashCode * -1521134295) + EqualityComparer<ColorTuple>.Default.GetHashCode(this.constantColor);
            return hashCode;
        }

        /// <summary>
        /// Gets the pattern's nested pattern for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's nested pattern.</returns>
        protected override Pattern GetPatternAtPoint(Tuple4D point) => throw new NotImplementedException("This method is intentionally not implemented.");
    }
}
