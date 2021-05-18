//-----------------------------------------------------------------------
// <copyright file="RadialGradientPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;

    /// <summary>
    /// Represents a radial gradient pattern.
    /// </summary>
    public class RadialGradientPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RadialGradientPattern" /> class.
        /// </summary>
        public RadialGradientPattern()
            : this(ColorTuple.White, ColorTuple.Black)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RadialGradientPattern" /> class.
        /// </summary>
        /// <param name="color1">The first color in the radial gradient pattern.</param>
        /// <param name="color2">The second color in the radial gradient pattern.</param>
        public RadialGradientPattern(ColorTuple color1, ColorTuple color2)
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
        /// Initializes a new instance of the <see cref="RadialGradientPattern" /> class.
        /// </summary>
        /// <param name="pattern1">The first nested pattern in the radial gradient pattern.</param>
        /// <param name="pattern2">The second nested pattern in the radial gradient pattern.</param>
        public RadialGradientPattern(Pattern pattern1, Pattern pattern2)
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
            double sqrt = Math.Sqrt((point.X * point.X) + (point.Z * point.Z));
            double floor = Math.Floor(sqrt);
            Pattern pattern;
            if (floor % 2 == 0)
            {
                pattern = this[0];
            }
            else
            {
                pattern = this[1];
            }

            ColorTuple distance = this[1].GetColorAtPoint(point) - this[0].GetColorAtPoint(point);
            double fraction = sqrt - floor;

            return new SolidPattern(pattern.GetColorAtPoint(point) + (distance * fraction));
        }
    }
}
