//-----------------------------------------------------------------------
// <copyright file="BlendedPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;
    using System.Linq;

    /// <summary>
    /// Represents a checkers pattern.
    /// </summary>
    public class BlendedPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BlendedPattern" /> class.
        /// </summary>
        /// <param name="patterns">The nested patterns in the blended pattern.</param>
        public BlendedPattern(params Pattern[] patterns)
            : base(patterns)
        {
        }

        /// <summary>
        /// Gets the pattern's nested pattern for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's nested pattern.</returns>
        protected override Pattern GetPatternAtPoint(Tuple4D point)
        {
            ColorTuple sum = new ColorTuple(0, 0, 0);
            foreach (Pattern pattern in this.Patterns)
            {
                sum += pattern.GetColorAtPoint(point);
            }

            return new SolidPattern(sum / this.Patterns.Length);
        }
    }
}
