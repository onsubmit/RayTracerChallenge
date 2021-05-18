﻿//-----------------------------------------------------------------------
// <copyright file="StripePattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;

    /// <summary>
    /// Represents a stripe pattern.
    /// </summary>
    public class StripePattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StripePattern" /> class.
        /// </summary>
        public StripePattern()
            : this(ColorTuple.White, ColorTuple.Black)
        {
        }

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
        /// Initializes a new instance of the <see cref="StripePattern" /> class.
        /// </summary>
        /// <param name="pattern1">The first nested pattern in the stripe pattern.</param>
        /// <param name="pattern2">The second nested pattern in the stripe pattern.</param>
        public StripePattern(Pattern pattern1, Pattern pattern2)
            : base(pattern1, pattern2)
        {
            if (pattern1 == null)
            {
                throw new ArgumentNullException(nameof(pattern1));
            }

            if (pattern2 == null)
            {
                throw new ArgumentNullException(nameof(pattern2));
            }
        }

        /// <summary>
        /// Gets the pattern's nested pattern for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's nested pattern.</returns>
        protected override Pattern GetPatternAtPoint(Tuple4D point)
        {
            if (Math.Floor(point.X) % 2 == 0)
            {
                return this.Patterns[0];
            }

            return this.Patterns[1];
        }
    }
}
