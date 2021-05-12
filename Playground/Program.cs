//-----------------------------------------------------------------------
// <copyright file="Program.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace Playground
{
    using System;
    using System.IO;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Colors;
    using OnSubmit.RayTracerChallenge.Numerics;

    /// <summary>
    /// Playground program.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// White color tuple.
        /// </summary>
        private static readonly ColorTuple White = ColorTuple.Create(1, 1, 1);

        /// <summary>
        /// Main entry point.
        /// </summary>
        /// <param name="args">Command line arguments.</param>
        public static void Main(string[] args)
        {
            double velocityMultiplier = 15;

            Projectile projectile = new Projectile(
                Tuple4D.CreatePoint(0, 1, 0),
                velocityMultiplier * Tuple4D.CreateVector(1, 1, 0).Normalize());

            Environment environment = new Environment(
                Tuple4D.CreateVector(0, -0.1, 0),
                Tuple4D.CreateVector(-0.01, 0, 0));

            Canvas canvas = new Canvas(2100, 600);

            int tickCount = 0;
            LogPosition(projectile, canvas, tickCount);

            while (projectile.Position.Y > 0)
            {
                tickCount++;
                projectile = Tick(environment, projectile);
                LogPosition(projectile, canvas, tickCount);
            }

            File.WriteAllText("test.ppm", canvas.ToPlainPortablePixmapString());
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
        /// <param name="canvas">The canvas to write to.</param>
        /// <param name="tickCount">The tick counter.</param>
        private static void LogPosition(Projectile projectile, Canvas canvas, int tickCount)
        {
            Console.WriteLine($"Position after tick {tickCount}: {projectile.Position}");
            canvas.WritePixel(projectile.Position.X, canvas.Height - projectile.Position.Y, White);
        }
    }
}
