//-----------------------------------------------------------------------
// <copyright file="Light.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

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
    }
}
