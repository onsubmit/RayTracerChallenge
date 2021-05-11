//-----------------------------------------------------------------------
// <copyright file="PointEx.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Numerics
{
    /// <summary>
    /// Represents a point.
    /// </summary>
    public class PointEx : TupleEx
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PointEx"/> class.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        public PointEx(double x, double y, double z)
            : base(x, y, z, TupleType.Point)
        {
        }
    }
}
