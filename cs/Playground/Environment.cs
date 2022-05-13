//-----------------------------------------------------------------------
// <copyright file="Environment.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Playground
{
    using OnSubmit.RayTracerChallenge;

    /// <summary>
    /// Represents an environment.
    /// </summary>
    public class Environment
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Environment"/> class.
        /// </summary>
        /// <param name="gravity">The gravity vector.</param>
        /// <param name="wind">The wind vector.</param>
        public Environment(Tuple4D gravity, Tuple4D wind)
        {
            this.Gravity = gravity;
            this.Wind = wind;
        }

        /// <summary>
        /// Gets the gravity vector.
        /// </summary>
        public Tuple4D Gravity { get; private set; }

        /// <summary>
        /// Gets the wind vector.
        /// </summary>
        public Tuple4D Wind { get; private set; }
    }
}
