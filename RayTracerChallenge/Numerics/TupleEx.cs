//-----------------------------------------------------------------------
// <copyright file="TupleEx.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Numerics
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a tuple of the form (x, y, z, w).
    /// </summary>
    public class TupleEx
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
        private static TupleEx zeroVector;

        /// <summary>
        /// Initializes a new instance of the <see cref="TupleEx"/> class.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="w">Represents whether the tuple is a point (1) or vector (0).</param>
        public TupleEx(double x, double y, double z, double w)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
            this.W = w;
        }

        /// <summary>
        /// Gets the zero vector.
        /// </summary>
        public static TupleEx ZeroVector
        {
            get
            {
                return zeroVector ?? (zeroVector = CreateVector(0, 0, 0));
            }
        }

        /// <summary>
        /// Gets or sets the x value.
        /// </summary>
        public double X { get; set; }

        /// <summary>
        /// Gets or sets the y value.
        /// </summary>
        public double Y { get; set; }

        /// <summary>
        /// Gets or sets the z value.
        /// </summary>
        public double Z { get; set; }

        /// <summary>
        /// Gets the w value.
        /// </summary>
        public double W { get; private set; }

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
        public static TupleEx operator +(TupleEx a, TupleEx b)
        {
            if (a.IsPoint && b.IsPoint)
            {
                throw new InvalidOperationException("Cannot add two points together.");
            }

            // Adding 2 vectors gives a vector
            return new TupleEx(a.X + b.X, a.Y + b.Y, a.Z + b.Z, a.W + b.W);
        }

        /// <summary>
        /// Negates the tuple.
        /// </summary>
        /// <param name="t">The tuple to negate.</param>
        /// <returns>The negative of the tuple.</returns>
        public static TupleEx operator -(TupleEx t)
        {
            return new TupleEx(-t.X, -t.Y, -t.Z, -t.W);
        }

        /// <summary>
        /// Computes the difference of two tuples.
        /// </summary>
        /// <param name="a">First tuple.</param>
        /// <param name="b">Second tuple.</param>
        /// <returns>The difference of the tuples.</returns>
        public static TupleEx operator -(TupleEx a, TupleEx b)
        {
            if (a.IsVector && b.IsPoint)
            {
                throw new InvalidOperationException("Cannot subtract a point from a vector.");
            }

            return new TupleEx(a.X - b.X, a.Y - b.Y, a.Z - b.Z, a.W - b.W);
        }

        /// <summary>
        /// Multiples a tuple by a scalar.
        /// </summary>
        /// <param name="t">The tuple.</param>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The tuple multiplied by the scalar.</returns>
        public static TupleEx operator *(TupleEx t, double k)
        {
            return new TupleEx(t.X * k, t.Y * k, t.Z * k, t.W * k);
        }

        /// <summary>
        /// Divides a tuple by a scalar.
        /// </summary>
        /// <param name="t">The tuple.</param>
        /// <param name="k">The scalar to divide by.</param>
        /// <returns>The tuple divided by the scalar.</returns>
        public static TupleEx operator /(TupleEx t, double k)
        {
            return new TupleEx(t.X / k, t.Y / k, t.Z / k, t.W / k);
        }

        /// <summary>
        /// Creates a new tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="w">The w value.</param>
        /// <returns>A new tuple.</returns>
        public static TupleEx Create(double x, double y, double z, double w)
        {
            return new TupleEx(x, y, z, w);
        }

        /// <summary>
        /// Creates a new point tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <returns>A new point tuple.</returns>
        public static TupleEx CreatePoint(double x, double y, double z)
        {
            return new TupleEx(x, y, z, PointTuple);
        }

        /// <summary>
        /// Creates a new vector tuple.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <returns>A new vector tuple.</returns>
        public static TupleEx CreateVector(double x, double y, double z)
        {
            return new TupleEx(x, y, z, VectorTuple);
        }

        /// <summary>
        /// Normalizes the tuple.
        /// </summary>
        /// <returns>The corresponding unit vector.</returns>
        public TupleEx Normalize()
        {
            if (this == ZeroVector)
            {
                throw new DivideByZeroException("Cannot normalize the zero vector.");
            }

            return this / this.Magnitude;
        }

        /// <summary>
        /// Computes the dot product of the tuple with another.
        /// </summary>
        /// <param name="t">The tuple to use.</param>
        /// <returns>The dot product.</returns>
        public double GetDotProductWith(TupleEx t)
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
        public TupleEx GetCrossProductWith(TupleEx t)
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
        /// Compares a <see cref="TupleEx"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>crue</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            if (ReferenceEquals(this, obj))
            {
                return true;
            }

            if (obj is TupleEx t)
            {
                return this.W.Compare(t.W)
                    && this.X.Compare(t.X)
                    && this.Y.Compare(t.Y)
                    && this.Z.Compare(t.Z);
            }

            return false;
        }

        /// <summary>
        /// Generates a string representation of a <see cref="TupleEx"/>.
        /// </summary>
        /// <returns>The string.</returns>
        public override string ToString()
        {
            return $"({this.X}, {this.Y}, {this.Z}, {this.W})";
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="TupleEx"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = 707706286;
            hashCode = (hashCode * -1521134295) + EqualityComparer<double>.Default.GetHashCode(this.X);
            hashCode = (hashCode * -1521134295) + EqualityComparer<double>.Default.GetHashCode(this.Y);
            hashCode = (hashCode * -1521134295) + EqualityComparer<double>.Default.GetHashCode(this.Z);
            hashCode = (hashCode * -1521134295) + EqualityComparer<double>.Default.GetHashCode(this.W);
            return hashCode;
        }
    }
}
