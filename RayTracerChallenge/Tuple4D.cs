//-----------------------------------------------------------------------
// <copyright file="Tuple4D.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Represents a 4 dimensional tuple of the form (x, y, z, w).
    /// </summary>
    public class Tuple4D : BaseTuple
    {
        /// <summary>
        /// The 'w' value for vectors.
        /// </summary>
        private const double VectorTuple = 0.0;

        /// <summary>
        /// The 'w' value for points.
        /// </summary>
        private const double PointTuple = 1.0;

        /// <summary>
        /// The zero vector.
        /// </summary>
        private static Tuple4D zeroVector;

        /// <summary>
        /// Initializes a new instance of the <see cref="Tuple4D"/> class.
        /// </summary>
        /// <param name="items">The 4 items.</param>
        public Tuple4D(params double[] items)
            : base(items)
        {
            if (items.Length != 4)
            {
                throw new ArgumentException($"4 items are required. Found: {items.Length}");
            }
        }

        /// <summary>
        /// Gets the zero vector.
        /// </summary>
        public static Tuple4D ZeroVector
        {
            get
            {
                return zeroVector ?? (zeroVector = CreateVector(0, 0, 0));
            }
        }

        /// <summary>
        /// Gets the x value.
        /// </summary>
        public double X => this[0];

        /// <summary>
        /// Gets the y value.
        /// </summary>
        public double Y => this[1];

        /// <summary>
        /// Gets the z value.
        /// </summary>
        public double Z => this[2];

        /// <summary>
        /// Gets the w value.
        /// </summary>
        public double W
        {
            get
            {
                return this[3];
            }

            private set
            {
                this[3] = value;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the tuple is a point.
        /// </summary>
        public bool IsPoint => this.W == PointTuple;

        /// <summary>
        /// Gets a value indicating whether the tuple is a vector.
        /// </summary>
        public bool IsVector => this.W == VectorTuple;

        /// <summary>
        /// Gets the magnitude of the tuple.
        /// </summary>
        public double Magnitude
        {
            get
            {
                double sum = 0;
                sum += Math.Pow(this.X, 2);
                sum += Math.Pow(this.Y, 2);
                sum += Math.Pow(this.Z, 2);
                sum += Math.Pow(this.W, 2);

                return Math.Sqrt(sum);
            }
        }

        /// <summary>
        /// Computes the sum of two tuples.
        /// </summary>
        /// <param name="a">First tuple.</param>
        /// <param name="b">Second tuple.</param>
        /// <returns>The sum of the tuples.</returns>
        public static Tuple4D operator +(Tuple4D a, Tuple4D b)
        {
            if (a.IsPoint && b.IsPoint)
            {
                throw new InvalidOperationException("Cannot add two points together.");
            }

            return a.Add(b);
        }

        /// <summary>
        /// Negates the tuple.
        /// </summary>
        /// <param name="t">The tuple to negate.</param>
        /// <returns>The negative of the tuple.</returns>
        public static Tuple4D operator -(Tuple4D t)
        {
            return t.Negate<Tuple4D>();
        }

        /// <summary>
        /// Computes the difference of two tuples.
        /// </summary>
        /// <param name="a">First tuple.</param>
        /// <param name="b">Second tuple.</param>
        /// <returns>The difference of the tuples.</returns>
        public static Tuple4D operator -(Tuple4D a, Tuple4D b)
        {
            if (a.IsVector && b.IsPoint)
            {
                throw new InvalidOperationException("Cannot subtract a point from a vector.");
            }

            return a.Subtract(b);
        }

        /// <summary>
        /// Multiples a tuple by a scalar.
        /// </summary>
        /// <param name="t">The tuple.</param>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The tuple multiplied by the scalar.</returns>
        public static Tuple4D operator *(Tuple4D t, double k)
        {
            return t.MultiplyByScalar<Tuple4D>(k);
        }

        /// <summary>
        /// Multiples a tuple by a scalar.
        /// </summary>
        /// <param name="t">The tuple.</param>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The tuple multiplied by the scalar.</returns>
        public static Tuple4D operator *(double k, Tuple4D t)
        {
            return t.MultiplyByScalar<Tuple4D>(k);
        }

        /// <summary>
        /// Divides a tuple by a scalar.
        /// </summary>
        /// <param name="t">The tuple.</param>
        /// <param name="k">The scalar to divide by.</param>
        /// <returns>The tuple divided by the scalar.</returns>
        public static Tuple4D operator /(Tuple4D t, double k)
        {
            return t.DivideByScalar<Tuple4D>(k);
        }

        /// <summary>
        /// Creates a new tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="w">The w value.</param>
        /// <returns>A new tuple.</returns>
        public static Tuple4D Create(double x, double y, double z, double w)
        {
            return new Tuple4D(x, y, z, w);
        }

        /// <summary>
        /// Creates a new point tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <returns>A new point tuple.</returns>
        public static Tuple4D CreatePoint(double x, double y, double z)
        {
            return new Tuple4D(x, y, z, PointTuple);
        }

        /// <summary>
        /// Creates a new vector tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <returns>A new vector tuple.</returns>
        public static Tuple4D CreateVector(double x, double y, double z)
        {
            return new Tuple4D(x, y, z, VectorTuple);
        }

        /// <summary>
        /// Normalizes the tuple.
        /// </summary>
        /// <returns>The corresponding unit vector.</returns>
        public Tuple4D Normalize()
        {
            if (this == ZeroVector)
            {
                throw new DivideByZeroException("Cannot normalize the zero vector.");
            }

            return this / this.Magnitude;
        }

        /// <summary>
        /// Changes the tuple to a point.
        /// </summary>
        /// <returns>Itself.</returns>
        public Tuple4D ToPoint()
        {
            this.W = PointTuple;
            return this;
        }

        /// <summary>
        /// Changes the tuple to a vector.
        /// </summary>
        /// <returns>Itself.</returns>
        public Tuple4D ToVector()
        {
            this.W = VectorTuple;
            return this;
        }

        /// <summary>
        /// Computes the dot product of the tuple with another.
        /// </summary>
        /// <param name="t">The tuple to use.</param>
        /// <returns>The dot product.</returns>
        public double GetDotProductWith(Tuple4D t)
        {
            double sum = 0;
            sum += this.X * t.X;
            sum += this.Y * t.Y;
            sum += this.Z * t.Z;
            sum += this.W * t.W;

            return sum;
        }

        /// <summary>
        /// Computes the cross product of the tuple with another.
        /// </summary>
        /// <param name="t">The tuple to use.</param>
        /// <returns>The cross product.</returns>
        public Tuple4D GetCrossProductWith(Tuple4D t)
        {
            if (!this.IsVector)
            {
                throw new InvalidOperationException("Only 3D cross product is supported.");
            }

            double x = (this.Y * t.Z) - (this.Z * t.Y);
            double y = (this.Z * t.X) - (this.X * t.Z);
            double z = (this.X * t.Y) - (this.Y * t.X);

            return CreateVector(x, y, z);
        }

        /// <summary>
        /// Reflects the vector around the given normal vector.
        /// </summary>
        /// <param name="normalVector">The normal vector to reflect around.</param>
        /// <returns>The reflected vector</returns>
        public Tuple4D ReflectVector(Tuple4D normalVector)
        {
            if (!this.IsVector)
            {
                throw new InvalidOperationException("Tuple must be a vector.");
            }

            if (!normalVector.IsVector || normalVector.Magnitude != 1)
            {
                throw new ArgumentException(nameof(normalVector), $"{nameof(normalVector)} must be a normal vector.");
            }

            return this - (normalVector * 2 * this.GetDotProductWith(normalVector));
        }

        /// <summary>
        /// Creates a new instance of the <see cref="Tuple4D"/> class.
        /// </summary>
        /// <param name="items">The items in the tuple.</param>
        /// <returns>The new instance of the tuple.</returns>
        protected override BaseTuple Create(IEnumerable<double> items)
        {
            return new Tuple4D(items.ToArray());
        }
    }
}
