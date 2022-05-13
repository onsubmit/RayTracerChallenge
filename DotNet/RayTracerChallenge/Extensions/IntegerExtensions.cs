//-----------------------------------------------------------------------
// <copyright file="IntegerExtensions.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Extensions
{
    /// <summary>
    /// Extension methods for <see cref="int"/>.
    /// </summary>
    public static class IntegerExtensions
    {
        /// <summary>
        /// Determines if the integer is odd.
        /// </summary>
        /// <param name="value">The integer.</param>
        /// <returns><c>true</c> if the integer is odd, <c>false</c> otherwise.</returns>
        public static bool IsOdd(this int value) => value % 2 == 1;
    }
}
