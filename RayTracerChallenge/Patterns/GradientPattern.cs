//-----------------------------------------------------------------------
// <copyright file="GradientPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;

    /// <summary>
    /// Represents a gradient pattern.
    /// </summary>
    public class GradientPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GradientPattern" /> class.
        /// </summary>
        /// <param name="color1">The first color in the gradient pattern.</param>
        /// <param name="color2">The second color in the gradient pattern.</param>
        public GradientPattern(ColorTuple color1, ColorTuple color2)
            : base(color1, color2)
        {
            if (color1 == null)
            {
                throw new ArgumentNullException(nameof(color1));
            }

            if (color2 == null)
            {
                throw new ArgumentNullException(nameof(color2));
            }
        }

        /// <summary>
        /// Gets the pattern's color for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's color.</returns>
        protected override ColorTuple GetColorAtPointImpl(Tuple4D point)
        {
            ColorTuple distance = this[1] - this[0];
            double fraction = point.X - Math.Floor(point.X);

            return this[0] + (distance * fraction);
        }
    }
}
