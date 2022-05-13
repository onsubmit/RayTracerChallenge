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
        public GradientPattern()
            : this(ColorTuple.White, ColorTuple.Black)
        {
        }

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
        /// Initializes a new instance of the <see cref="GradientPattern" /> class.
        /// </summary>
        /// <param name="pattern1">The first nested pattern in the gradient pattern.</param>
        /// <param name="pattern2">The second nested pattern in the gradient pattern.</param>
        public GradientPattern(Pattern pattern1, Pattern pattern2)
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
            ColorTuple distance = this[1].GetColorAtPoint(point) - this[0].GetColorAtPoint(point);
            double fraction = point.X - Math.Floor(point.X);

            return new SolidPattern(this[0].GetColorAtPoint(point) + (distance * fraction));
        }
    }
}
