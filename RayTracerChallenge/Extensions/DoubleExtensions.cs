//-----------------------------------------------------------------------
// <copyright file="DoubleExtensions.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Extensions
{
    using System;

    /// <summary>
    /// Extension methods for <see cref="double"/>.
    /// </summary>
    public static class DoubleExtensions
    {
        /// <summary>
        /// Maximum amount the two doubles can vary by to still be equivalent.
        /// </summary>
        private const double Epsilon = 10e-4;

        /// <summary>
        /// Compares two doubles within a margin of error to account for floating point arithmetic.
        /// </summary>
        /// <param name="d1">First double.</param>
        /// <param name="d2">Second double.</param>
        /// <returns><c>True</c> if the two doubles are equivalent with a small margin of error, <c>false</c> otherwise.</returns>
        public static bool Compare(this double d1, double d2)
        {
            if (Math.Abs(d1 - d2) < Epsilon)
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Normalizes and clamps the double between 0 and <paramref name="max"/>.
        /// </summary>
        /// <param name="d">The double.</param>
        /// <param name="max">The max allowed value.</param>
        /// <returns>The clamped value.</returns>
        public static int Clamp(this double d, int max)
        {
            return d < 0 ? 0 : (d > 1 ? max : (int)Math.Round(d * max));
        }
    }
}
