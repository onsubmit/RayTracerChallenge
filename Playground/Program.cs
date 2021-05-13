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
            DoChapters1And2();
            DoChapter3();
        }

        /// <summary>
        /// Does the "Putting It Together" sections for chapters 1 and 2.
        /// </summary>
        private static void DoChapters1And2()
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
        /// Does the "Putting It Together" section for chapter 3.
        /// </summary>
        private static void DoChapter3()
        {
            Matrix identity = Matrix.GetIdentityMatrix(4);
            Matrix inverse = identity.GetInverse();
            if (!inverse.Equals(identity))
            {
                throw new Exception("Inversing the identity matrix should not modify it.");
            }

            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 3, -9, 7, 3 },
                    { 3, -8, 2, -9 },
                    { -4, 4, 4, 1 },
                    { -6, 5, -1, 1 },
                });

            Matrix b = a.GetInverse();
            Matrix product = a * b;
            if (!product.Equals(identity))
            {
                throw new Exception("Multiplying a matrix by its inverse should result in the identity matrix.");
            }

            Matrix inverseOfTranspose = a.Transpose().GetInverse();
            Matrix transposeOfInverse = a.GetInverse().Transpose();
            if (!transposeOfInverse.Equals(inverseOfTranspose))
            {
                throw new Exception("The inverse of the transpose of a matrix should be the same as the transpose of the inverse.");
            }

            Tuple4D tuple = Tuple4D.Create(1, 4, 9, 16);
            Tuple4D identityTimesTuple = identity * tuple;
            if (!identityTimesTuple.Equals(tuple))
            {
                throw new Exception("Multiplying the identity matrix by a tuple should not change the tuple.");
            }

            const int Scale = 5;
            Matrix modifiedIdentity = Matrix.GetIdentityMatrix(4);
            modifiedIdentity[2, 2] = Scale;
            Tuple4D modifiedIdentityTimesTuple = modifiedIdentity * tuple;
            if (!modifiedIdentityTimesTuple.Equals(Tuple4D.Create(tuple.X, tuple.Y, tuple.Z * Scale, tuple.W)))
            {
                throw new Exception("Only the tuple's z element should have scaled.");
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
        /// <param name="canvas">The canvas to write to.</param>
        /// <param name="tickCount">The tick counter.</param>
        private static void LogPosition(Projectile projectile, Canvas canvas, int tickCount)
        {
            Console.WriteLine($"Position after tick {tickCount}: {projectile.Position}");
            canvas.WritePixel(projectile.Position.X, canvas.Height - projectile.Position.Y, White);
        }
    }
}
