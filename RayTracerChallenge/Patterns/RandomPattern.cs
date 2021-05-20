//-----------------------------------------------------------------------
// <copyright file="RandomPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    using System;

    /// <summary>
    /// Represents a random pattern.
    /// </summary>
    public class RandomPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RandomPattern" /> class.
        /// </summary>
        public RandomPattern()
            : this(ColorTuple.White, ColorTuple.Black)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RandomPattern" /> class.
        /// </summary>
        /// <param name="colors">The colors in the random pattern.</param>
        public RandomPattern(params ColorTuple[] colors)
            : base(colors)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RandomPattern" /> class.
        /// </summary>
        /// <param name="patterns">The nested patterns in the random pattern.</param>
        public RandomPattern(params Pattern[] patterns)
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
            int randomIndex = Rand.Instance.Next(this.Patterns.Length);
            return this[randomIndex];
        }
    }
}
