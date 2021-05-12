//-----------------------------------------------------------------------
// <copyright file="ColorTupleExtensions.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Extensions
{
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Colors;

    /// <summary>
    /// Extension methods for <see cref="ColorTuple"/>.
    /// </summary>
    public static class ColorTupleExtensions
    {
        /// <summary>
        /// Gets an array of the clamped color values.
        /// </summary>
        /// <param name="c">The color tuple.</param>
        /// <param name="maxColorValue">The max allowed color value.</param>
        /// <returns>The array of clamped color values.</returns>
        public static int[] GetClampedColorArray(this ColorTuple c, int maxColorValue)
        {
            if (c == null)
            {
                return new[] { 0, 0, 0 };
            }

            return c.GetColorArray().Select(v => v.Clamp(maxColorValue)).ToArray();
        }

        /// <summary>
        /// Gets an array of the color values.
        /// </summary>
        /// <param name="c">The color tuple.</param>
        /// <returns>The array of the color values.</returns>
        public static double[] GetColorArray(this ColorTuple c)
        {
            if (c == null)
            {
                return new[] { 0.0, 0.0, 0.0 };
            }

            return new[] { c.Red, c.Green, c.Blue };
        }
    }
}
