//-----------------------------------------------------------------------
// <copyright file="Constants.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

    /// <summary>
    /// Class to hold some constants.
    /// </summary>
    public static class Constants
    {
        /// <summary>
        /// Maximum amount the two doubles can vary by to still be equivalent.
        /// </summary>
        public const double Epsilon = 10e-4;

        /// <summary>
        /// Square root of 2.
        /// </summary>
        public static readonly double Sqrt2 = Math.Sqrt(2.0);

        /// <summary>
        /// Square root of 2 divided by 2.
        /// </summary>
        public static readonly double Sqrt2Over2 = Sqrt2 / 2.0;

        /// <summary>
        /// Square root of 3.
        /// </summary>
        public static readonly double Sqrt3 = Math.Sqrt(3.0);

        /// <summary>
        /// Square root of 3 over 3.
        /// </summary>
        public static readonly double Sqrt3Over3 = Sqrt3 / 3.0;

        /// <summary>
        /// Pi times 2.
        /// </summary>
        public static readonly double TwoPi = Math.PI * 2.0;

        /// <summary>
        /// Pi divided by 2.
        /// </summary>
        public static readonly double PiOver2 = Math.PI / 2.0;

        /// <summary>
        /// Pi divided by 3.
        /// </summary>
        public static readonly double PiOver3 = Math.PI / 3.0;

        /// <summary>
        /// Pi divided by 4.
        /// </summary>
        public static readonly double PiOver4 = Math.PI / 4.0;
    }
}
