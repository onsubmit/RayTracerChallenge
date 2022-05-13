//-----------------------------------------------------------------------
// <copyright file="BaseTuple.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Base class for a tuple.
    /// </summary>
    public abstract class BaseTuple
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BaseTuple"/> class.
        /// </summary>
        /// <param name="items">The items in the tuple.</param>
        protected BaseTuple(params double[] items)
        {
            this.Items = items;
        }

        /// <summary>
        /// Gets the items.
        /// </summary>
        public double[] Items { get; private set; }

        /// <summary>
        /// Gets the length of the tuple.
        /// </summary>
        public int Length => this.Items.Length;

        /// <summary>
        /// The indexer for the tuple.
        /// </summary>
        /// <param name="i">The index.</param>
        public double this[int i]
        {
            get
            {
                return this.Items[i];
            }

            set
            {
                this.Items[i] = value;
            }
        }

        /// <summary>
        /// Generates a string representation of a <see cref="BaseTuple"/>.
        /// </summary>
        /// <returns>The string.</returns>
        public override string ToString()
        {
            return $"<{string.Join(",", this.Items)}>";
        }

        /// <summary>
        /// Compares a <see cref="BaseTuple"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>true</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
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

            if (obj is BaseTuple t)
            {
                if (this.Length != t.Length)
                {
                    return false;
                }

                if (this.GetType() != t.GetType())
                {
                    return false;
                }

                for (int i = 0; i < this.Length; i++)
                {
                    if (!this[i].Compare(t[i]))
                    {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="BaseTuple"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            return -452805401 + EqualityComparer<double[]>.Default.GetHashCode(this.Items);
        }

        /// <summary>
        /// Creates an instance of the tuple.
        /// </summary>
        /// <param name="items">The items in the tuple.</param>
        /// <returns>A new instance of the tuple.</returns>
        protected abstract BaseTuple Create(IEnumerable<double> items);

        /// <summary>
        /// Adds a tuple of the same type to the current tuple.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="t">The tuple to add.</param>
        /// <returns>The sum of the two tuples.</returns>
        protected T Add<T>(T t)
            where T : BaseTuple => this.Map<T>((v, i) => v + t[i]);

        /// <summary>
        /// Subtracts a tuple of the same type from the current tuple.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="t">The tuple to subtract.</param>
        /// <returns>The result of the subtraction.</returns>
        protected T Subtract<T>(T t)
            where T : BaseTuple => this.Map<T>((v, i) => v - t[i]);

        /// <summary>
        /// Negates the current tuple.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <returns>The negated tuple.</returns>
        protected T Negate<T>()
            where T : BaseTuple => this.Map<T>(v => -v);

        /// <summary>
        /// Divides the current tuple by a scalar.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="k">The scalar to divide by.</param>
        /// <returns>The current tuple divided by the scalar.</returns>
        protected T DivideByScalar<T>(double k)
            where T : BaseTuple => this.Map<T>(v => v / k);

        /// <summary>
        /// Multiplies the current tuple by a scalar.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="k">The scalar to multiple by.</param>
        /// <returns>The current tuple multiplied by the scalar.</returns>
        protected T MultiplyByScalar<T>(double k)
            where T : BaseTuple => this.Map<T>(v => v * k);

        /// <summary>
        /// Multiples the current tuple by another element-wise.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="t">The tuple to multiply by element-wise.</param>
        /// <returns>The element-wise product of the two tuples.</returns>
        protected T MultiplyElementwise<T>(T t)
            where T : BaseTuple => this.Map<T>((v, i) => v * t[i]);

        /// <summary>
        /// Creates a new tuple populated with the results of calling a provided function on every element in the calling tuple.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="func">Mapping function that is called for every element of the tuple.</param>
        /// <returns>A new tuple with each element being the result of the mapping function.</returns>
        private T Map<T>(Func<double, double> func)
            where T : BaseTuple => (T)this.Create(this.Items.Select(func));

        /// <summary>
        /// Creates a new tuple populated with the results of calling a provided function on every element in the calling tuple.
        /// </summary>
        /// <typeparam name="T">Type of the current tuple.</typeparam>
        /// <param name="func">Index-aware mapping function that is called for every element of the tuple.</param>
        /// <returns>A new tuple with each element being the result of the mapping function.</returns>
        private T Map<T>(Func<double, int, double> func)
            where T : BaseTuple => (T)this.Create(this.Items.Select(func));
    }
}
