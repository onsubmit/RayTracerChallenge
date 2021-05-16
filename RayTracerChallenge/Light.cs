//-----------------------------------------------------------------------
// <copyright file="Light.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a light.
    /// </summary>
    public class Light
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Light"/> class.
        /// </summary>
        /// <param name="position">The position of the light.</param>
        /// <param name="intensity">The intensity of the light.</param>
        public Light(Tuple4D position, ColorTuple intensity)
        {
            if (!position.IsPoint)
            {
                throw new ArgumentException(nameof(position), $"{nameof(position)} must be a point.");
            }

            this.Position = position;
            this.Intensity = intensity;
        }

        /// <summary>
        /// Gets the position of the light.
        /// </summary>
        public Tuple4D Position { get; private set; }

        /// <summary>
        /// Gets the intensity of the light.
        /// </summary>
        public ColorTuple Intensity { get; private set; }

        /// <summary>
        /// Compares a <see cref="Light"/> with another object.
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

            if (obj is Light l)
            {
                return this.Position.Equals(l.Position)
                    && this.Intensity.Equals(l.Intensity);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Light"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = 978863716;
            hashCode = (hashCode * -1521134295) + EqualityComparer<Tuple4D>.Default.GetHashCode(this.Position);
            hashCode = (hashCode * -1521134295) + EqualityComparer<ColorTuple>.Default.GetHashCode(this.Intensity);
            return hashCode;
        }
    }
}
