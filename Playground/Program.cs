//-----------------------------------------------------------------------
// <copyright file="Program.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Playground
{
    using System;
    using OnSubmit.RayTracerChallenge.Numerics;

    /// <summary>
    /// Playground program.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Main entry point.
        /// </summary>
        /// <param name="args">Command line arguments.</param>
        public static void Main(string[] args)
        {
            double velocityMultiplier = 30;

            Projectile projectile = new Projectile(
                Tuple4D.CreatePoint(0, 1, 0),
                velocityMultiplier * Tuple4D.CreateVector(1, 1, 0).Normalize());

            Environment environment = new Environment(
                Tuple4D.CreateVector(0, -0.1, 0),
                Tuple4D.CreateVector(-0.01, 0, 0));

            int tickCount = 0;
            LogPosition(projectile, tickCount);

            while (projectile.Position.Y > 0)
            {
                tickCount++;
                projectile = Tick(environment, projectile);
                LogPosition(projectile, tickCount);
            }
        }

        /// <summary>
        /// Advance one tick.
        /// </summary>
        /// <param name="environment">The environment.</param>
        /// <param name="projectile">The projectile.</param>
        /// <returns>The new projectile after the tick.</returns>
        private static Projectile Tick(Environment environment, Projectile projectile)
        {
            Tuple4D position = projectile.Position + projectile.Velocity;
            Tuple4D velocity = projectile.Velocity + environment.Gravity + environment.Wind;
            return new Projectile(position, velocity);
        }

        /// <summary>
        /// Writes the position of the projectile to the console.
        /// </summary>
        /// <param name="projectile">The projectile.</param>
        /// <param name="tickCount">The tick counter.</param>
        private static void LogPosition(Projectile projectile, int tickCount)
        {
            Console.WriteLine($"Position after tick {tickCount}: {projectile.Position}");
        }
    }
}
