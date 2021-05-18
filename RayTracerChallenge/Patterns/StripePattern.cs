//-----------------------------------------------------------------------
// <copyright file="StripePattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Represents a stripe pattern.
    /// </summary>
    public class StripePattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StripePattern" /> class.
        /// </summary>
        /// <param name="color1">The first color in the stripe pattern.</param>
        /// <param name="color2">The second color in the stripe pattern.</param>
        public StripePattern(ColorTuple color1, ColorTuple color2)
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
            if (Math.Floor(point.X) % 2 == 0)
            {
                return this.Colors[0];
            }

            return this.Colors[1];
        }
    }
}
