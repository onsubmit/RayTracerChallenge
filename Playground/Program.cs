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
            DoChapter4();
            DoChapter5();
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
        /// Does the "Putting It Together" section for chapter 4.
        /// </summary>
        private static void DoChapter4()
        {
            const int CanvasSize = 501;
            const int NumSegments = 12;
            double twoPi = Math.PI * 2;

            int scalingFactor = CanvasSize * 3 / 8;

            Canvas c = new Canvas(CanvasSize, CanvasSize);

            // Canvas orientation is in the x-z plane.
            // Start at 12 o'clock.
            Tuple4D point = Tuple4D.CreatePoint(0, 0, 1);
            for (int i = 0; i < NumSegments; i++)
            {
                Matrix transform = Matrix.GetRotationMatrixY(twoPi * i / NumSegments)
                    .Scale(scalingFactor, scalingFactor, scalingFactor);

                Tuple4D p = transform * point;
                WriteToCanvasWithCenteredOrigin(c, p.X, p.Z);
            }

            File.WriteAllText("clock.ppm", c.ToPlainPortablePixmapString());
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 5.
        /// </summary>
        private static void DoChapter5()
        {
            const int CanvasSize = 1001;
            const double WallZ = 10;
            const double WallSize = 8;

            Canvas c = new Canvas(CanvasSize, CanvasSize);

            Tuple4D rayOrigin = Tuple4D.CreatePoint(0, 0, -5);
            double pixelSize = WallSize / CanvasSize;
            double half = WallSize / 2;

            Sphere sphere = new Sphere();
            sphere.Transformation = Matrix.GetScalingMatrix(1, 0.5, 1);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1).RotateZ(Math.PI / 4);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1).Shear(xy: 1);

            for (int y = 0; y < CanvasSize; y++)
            {
                double worldY = half - (pixelSize * y);
                for (int x = 0; x < CanvasSize; x++)
                {
                    double worldX = -half + (pixelSize * x);

                    Tuple4D position = Tuple4D.CreatePoint(worldX, worldY, WallZ);
                    Ray ray = new Ray(rayOrigin, (position - rayOrigin).Normalize());
                    Intersections intersections = ray.GetIntersectionsWith(sphere);

                    if (intersections.HasHit)
                    {
                        c.WritePixel(x, y, White);
                    }
                }
            }

            File.WriteAllText("sphere-shadow.ppm", c.ToPlainPortablePixmapString());
        }

        /// <summary>
        /// Writes a white pixel to the canvas centered at (0, 0).
        /// </summary>
        /// <param name="c">The canvas.</param>
        /// <param name="x">The x coordinate.</param>
        /// <param name="y">The y coordinate.</param>
        private static void WriteToCanvasWithCenteredOrigin(Canvas c, double x, double y)
        {
            int xAdjustment = c.Width / 2;
            int yAdjustment = c.Height / 2;

            c.WritePixel(x + xAdjustment, -y + yAdjustment, White);
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
