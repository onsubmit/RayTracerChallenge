//-----------------------------------------------------------------------
// <copyright file="ColorTuple.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Represents a color tuple.
    /// </summary>
    public class ColorTuple : BaseTuple
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ColorTuple"/> class.
        /// </summary>
        /// <param name="items">The 4 items.</param>
        public ColorTuple(params double[] items)
            : base(items)
        {
            if (items.Length != 3)
            {
                throw new ArgumentException($"3 items are required. Found: {items.Length}");
            }
        }

        /// <summary>
        /// Gets a new black color.
        /// </summary>
        public static ColorTuple Black => Create(0, 0, 0);

        /// <summary>
        /// Gets a new white color.
        /// </summary>
        public static ColorTuple White => Create(1, 1, 1);

        /// <summary>
        /// Gets a new red color.
        /// </summary>
        public static ColorTuple Red => Create(1, 0, 0);

        /// <summary>
        /// Gets a new green color.
        /// </summary>
        public static ColorTuple Green => Create(0, 1, 0);

        /// <summary>
        /// Gets a new blue color.
        /// </summary>
        public static ColorTuple Blue => Create(0, 0, 1);

        /// <summary>
        /// Gets the red value.
        /// </summary>
        public double RedValue => this[0];

        /// <summary>
        /// Gets the green value.
        /// </summary>
        public double GreenValue => this[1];

        /// <summary>
        /// Gets the blue value.
        /// </summary>
        public double BlueValue => this[2];

        /// <summary>
        /// Computes the sum of two color tuples.
        /// </summary>
        /// <param name="a">First color tuple.</param>
        /// <param name="b">Second color tuple.</param>
        /// <returns>The sum of the color tuples.</returns>
        public static ColorTuple operator +(ColorTuple a, ColorTuple b)
        {
            return a.Add(b);
        }

        /// <summary>
        /// Computes the difference of two color tuples.
        /// </summary>
        /// <param name="a">First color tuple.</param>
        /// <param name="b">Second color tuple.</param>
        /// <returns>The difference of the color tuples.</returns>
        public static ColorTuple operator -(ColorTuple a, ColorTuple b)
        {
            return a.Subtract(b);
        }

        /// <summary>
        /// Multiples a color tuple by a scalar.
        /// </summary>
        /// <param name="c">The color tuple.</param>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The color tuple multiplied by the scalar.</returns>
        public static ColorTuple operator *(ColorTuple c, double k)
        {
            return c.MultiplyByScalar<ColorTuple>(k);
        }

        /// <summary>
        /// Multiples a color tuple by a scalar.
        /// </summary>
        /// <param name="c">The color tuple.</param>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The color tuple multiplied by the scalar.</returns>
        public static ColorTuple operator *(double k, ColorTuple c)
        {
            return c.MultiplyByScalar<ColorTuple>(k);
        }

        /// <summary>
        /// Computes the product of two color tuples.
        /// </summary>
        /// <param name="a">First color tuple.</param>
        /// <param name="b">Second color tuple.</param>
        /// <returns>The product of the color tuples.</returns>
        public static ColorTuple operator *(ColorTuple a, ColorTuple b)
        {
            return a.MultiplyElementwise(b);
        }

        /// <summary>
        /// Creates a new color tuple.
        /// </summary>
        /// <param name="red">The red value.</param>
        /// <param name="green">The green value.</param>
        /// <param name="blue">The blue value.</param>
        /// <returns>A new color tuple.</returns>
        public static ColorTuple Create(double red, double green, double blue)
        {
            return new ColorTuple(red, green, blue);
        }

        /// <summary>
        /// Creates a new instance of the <see cref="ColorTuple"/> class.
        /// </summary>
        /// <param name="items">The items in the tuple.</param>
        /// <returns>The new instance of the tuple.</returns>
        protected override BaseTuple Create(IEnumerable<double> items)
        {
            return new ColorTuple(items.ToArray());
        }
    }
}
