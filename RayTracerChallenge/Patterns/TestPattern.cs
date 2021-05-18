//-----------------------------------------------------------------------
// <copyright file="TestPattern.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Patterns
{
    /// <summary>
    /// Represents a test pattern.
    /// </summary>
    public class TestPattern : Pattern
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TestPattern" /> class.
        /// </summary>
        public TestPattern()
            : base()
        {
        }

        /// <summary>
        /// Gets the pattern's color for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's color.</returns>
        protected override ColorTuple GetColorAtPointImpl(Tuple4D point)
        {
            return ColorTuple.Create(point.X, point.Y, point.Z);
        }
    }
}
