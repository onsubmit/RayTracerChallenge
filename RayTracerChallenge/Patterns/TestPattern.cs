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
        /// Gets the pattern's nested pattern for the provided point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The pattern's nested pattern.</returns>
        protected override Pattern GetPatternAtPoint(Tuple4D point)
        {
            return new SolidPattern(ColorTuple.Create(point.X, point.Y, point.Z));
        }
    }
}
