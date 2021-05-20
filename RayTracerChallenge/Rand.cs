//-----------------------------------------------------------------------
// <copyright file="Rand.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

    /// <summary>
    /// Holds a randomly seeded, singleton instance of <see cref="Random"/>.
    /// </summary>
    public static class Rand
    {
        /// <summary>
        /// The randomly seeded, single instance of <see cref="Random"/>.
        /// </summary>
        public static readonly Random Instance = new Random(Guid.NewGuid().GetHashCode());
    }
}
