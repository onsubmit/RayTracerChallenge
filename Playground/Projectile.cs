//-----------------------------------------------------------------------
// <copyright file="Projectile.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Playground
{
    using OnSubmit.RayTracerChallenge.Numerics;

    /// <summary>
    /// Represents a projectile.
    /// </summary>
    public class Projectile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Projectile"/> class.
        /// </summary>
        /// <param name="position">The position point.</param>
        /// <param name="velocity">The velocity vector.</param>
        public Projectile(Tuple4D position, Tuple4D velocity)
        {
            this.Position = position;
            this.Velocity = velocity;
        }

        /// <summary>
        /// Gets the position point.
        /// </summary>
        public Tuple4D Position { get; private set; }

        /// <summary>
        /// Gets the velocity vector.
        /// </summary>
        public Tuple4D Velocity { get; private set; }
    }
}
