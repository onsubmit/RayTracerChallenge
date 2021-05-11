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
        /// The type of tuple.
        /// </summary>
        private TupleType tupleType;

        /// <summary>
        /// Initializes a new instance of the <see cref="TupleEx"/> class.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="tupleType">The type of the tuple.</param>
        public TupleEx(double x, double y, double z, TupleType tupleType)
        {
            this.Initialize(x, y, z, tupleType);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TupleEx"/> class.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="w">Represents whether the tuple is a point (1) or vector (0).</param>
        public TupleEx(double x, double y, double z, double w)
        {
            if (!w.Compare(0) && !w.Compare(1))
            {
                throw new ArgumentOutOfRangeException(nameof(w), $"{nameof(w)} must be 0 or 1");
            }

            int tupleType;
            try
            {
                tupleType = Convert.ToInt32(w);
            }
            catch (OverflowException oex)
            {
                throw new ArgumentOutOfRangeException($"{nameof(w)} must be 0 or 1", oex);
            }

            if (!Enum.IsDefined(typeof(TupleType), tupleType))
            {
                throw new ArgumentOutOfRangeException(nameof(w), $"{nameof(w)} must be 0 or 1");
            }

            this.Initialize(x, y, z, (TupleType)tupleType);
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
        public bool IsPoint => this.tupleType == TupleType.Point;

        /// <summary>
        /// Gets a value indicating whether the tuple is a vector.
        /// </summary>
        public bool IsVector => this.tupleType == TupleType.Vector;

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

        /// <summary>
        /// Initializes the properties and fields.
        /// </summary>
        /// <param name="x">The x value.</param>
        /// <param name="y">The y value.</param>
        /// <param name="z">The z value.</param>
        /// <param name="tupleType">The type of the tuple.</param>
        private void Initialize(double x, double y, double z, TupleType tupleType)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
            this.W = (double)tupleType;
            this.tupleType = tupleType;
        }
    }
}
