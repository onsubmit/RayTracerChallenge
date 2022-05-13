//-----------------------------------------------------------------------
// <copyright file="SpottedPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a spotted pattern.
    /// </summary>
    public class SpottedPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SpottedPattern" /> class.
        /// </summary>
        public SpottedPattern()
            : this(ColorTuple.White, ColorTuple.Black)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SpottedPattern" /> class.
        /// </summary>
        /// <param name="color1">The first color in the spotted pattern.</param>
        /// <param name="color2">The second color in the spotted pattern.</param>
        public SpottedPattern(ColorTuple color1, ColorTuple color2)
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
        /// Initializes a new instance of the <see cref="SpottedPattern" /> class.
        /// </summary>
        /// <param name="pattern1">The first nested pattern in the spotted pattern.</param>
        /// <param name="pattern2">The second nested pattern in the spotted pattern.</param>
        public SpottedPattern(Pattern pattern1, Pattern pattern2)
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
            double x = Math.Ceiling(point.X);
            double y = Math.Ceiling(point.Y);
            double z = Math.Ceiling(point.Z);

            x = x.Compare(point.X) ? x - 1 : x;
            y = y.Compare(point.X) ? y - 1 : y;
            z = z.Compare(point.X) ? z - 1 : z;
            Tuple4D midPoint = Tuple4D.CreatePoint(x - 0.5, y - 0.5, z - 0.5);

            if ((point - midPoint).Magnitude < 0.6)
            {
                return this[0];
            }

            return this[1];
        }
    }
}
