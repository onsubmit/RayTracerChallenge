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
    using OnSubmit.RayTracerChallenge.Patterns;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Playground program.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// White color tuple.
        /// </summary>
        private static readonly ColorTuple White = ColorTuple.White;

        /// <summary>
        /// Main entry point.
        /// </summary>
        /// <param name="args">Command line arguments.</param>
        public static void Main(string[] args)
        {
            /*
            DoChapters1And2();
            DoChapter3();
            DoChapter4();
            DoChapter5();
            DoChapter6();
            DoChapter7();
            DoChapter8();
            DoChapter9();
            DoChapter10();
            DoChapter11();
            DoChapter11Take2();
            DoChapter12();
            */

            DoChapter13();
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

            canvas.WritePortablePixmapFile("test.ppm");
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

            Canvas canvas = new Canvas(CanvasSize, CanvasSize);

            // Canvas orientation is in the x-z plane.
            // Start at 12 o'clock.
            Tuple4D point = Tuple4D.CreatePoint(0, 0, 1);
            for (int i = 0; i < NumSegments; i++)
            {
                Matrix transform = Matrix.GetRotationMatrixY(twoPi * i / NumSegments)
                    .Scale(scalingFactor, scalingFactor, scalingFactor);

                Tuple4D p = transform * point;
                WriteToCanvasWithCenteredOrigin(canvas, p.X, p.Z);
            }

            canvas.WritePortablePixmapFile("clock.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 5.
        /// </summary>
        private static void DoChapter5()
        {
            const int CanvasSize = 1001;
            const double WallZ = 10;
            const double WallSize = 8;

            Canvas canvas = new Canvas(CanvasSize, CanvasSize);

            Tuple4D rayOrigin = Tuple4D.CreatePoint(0, 0, -5);
            double pixelSize = WallSize / CanvasSize;
            double half = WallSize / 2;

            Sphere sphere = new Sphere();
            sphere.Transformation = Matrix.GetScalingMatrix(1, 0.5, 1);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1).RotateZ(Constants.PiOver4);
            sphere.Transformation = Matrix.GetScalingMatrix(0.5, 1, 1).Shear(xy: 1);

            for (int y = 0; y < CanvasSize; y++)
            {
                double worldY = half - (pixelSize * y);
                for (int x = 0; x < CanvasSize; x++)
                {
                    double worldX = -half + (pixelSize * x);

                    Tuple4D position = Tuple4D.CreatePoint(worldX, worldY, WallZ);
                    Ray ray = new Ray(rayOrigin, (position - rayOrigin).Normalize());
                    Intersections intersections = sphere.GetIntersectionsWith(ray);

                    if (intersections.HasHit)
                    {
                        canvas.WritePixel(x, y, White);
                    }
                }
            }

            canvas.WritePortablePixmapFile("sphere-shadow.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 6.
        /// </summary>
        private static void DoChapter6()
        {
            const int CanvasSize = 201;
            const double WallZ = 10;
            const double WallSize = 8;

            Canvas canvas = new Canvas(CanvasSize, CanvasSize);

            Tuple4D rayOrigin = Tuple4D.CreatePoint(0, 0, -5);
            double pixelSize = WallSize / CanvasSize;
            double half = WallSize / 2;

            Material material = new Material(
                ColorTuple.Create(0, 0.5, 1),
                ambient: 0.05,
                diffuse: 0.9,
                specular: 0.9,
                shininess: 50);

            Sphere sphere = new Sphere()
            {
                Material = material,
            };

            Tuple4D lightPosition = Tuple4D.CreatePoint(-10, 10, -10);
            ColorTuple lightColor = ColorTuple.White;
            Light light = new Light(lightPosition, lightColor);

            int count = 0;
            int totalPixels = CanvasSize * CanvasSize;
            int reportEach = totalPixels / 100;

            for (int y = 0; y < CanvasSize; y++)
            {
                double worldY = half - (pixelSize * y);
                for (int x = 0; x < CanvasSize; x++)
                {
                    if (count++ % reportEach == 0)
                    {
                        Console.WriteLine($"{count / reportEach}%");
                    }

                    double worldX = -half + (pixelSize * x);

                    Tuple4D position = Tuple4D.CreatePoint(worldX, worldY, WallZ);
                    Ray ray = new Ray(rayOrigin, (position - rayOrigin).Normalize());
                    Intersections intersections = sphere.GetIntersectionsWith(ray);

                    if (intersections.HasHit)
                    {
                        Intersection hit = intersections.GetHit();
                        Tuple4D point = ray.GetPointOnRayAtDistance(hit.T);
                        Tuple4D normal = hit.Object.GetNormalAtPoint(point);
                        Tuple4D eye = -ray.Direction;
                        ColorTuple color = Lighting.Calculate(hit.Object.Material, sphere, light, point, eye, normal);

                        canvas.WritePixel(x, y, color);
                    }
                }
            }

            canvas.WritePortablePixmapFile("sphere-with-lighting.ppm");
            System.Diagnostics.Process.Start("sphere-with-lighting.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 7.
        /// </summary>
        private static void DoChapter7()
        {
            Light light = new Light(Tuple4D.CreatePoint(-10, 10, -10), ColorTuple.White);
            World world = new World(light);

            Sphere floor = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(10, 0.1, 10).Translate(0, -1, 0),
                Material = new Material(ColorTuple.Create(1, 0.9, 0.9), specular: 0),
            };

            world.AddShape(floor);

            Sphere leftWall = new Sphere()
            {
                Material = floor.Material,
            };

            leftWall.Transformation = Matrix.GetScalingMatrix(10, 0.01, 10)
                .RotateX(Constants.PiOver2)
                .RotateY(-Constants.PiOver4)
                .Translate(0, 0, 5);

            world.AddShape(leftWall);

            Sphere rightWall = new Sphere()
            {
                Material = floor.Material,
            };

            rightWall.Transformation = Matrix.GetScalingMatrix(10, 0.01, 10)
                .RotateX(Constants.PiOver2)
                .RotateY(Constants.PiOver4)
                .Translate(0, 0, 5);

            world.AddShape(rightWall);

            Sphere middle = new Sphere
            {
                Transformation = Matrix.GetTranslationMatrix(-0.5, 1, 0.5),
                Material = new Material(ColorTuple.Create(0, 0.4, 1), diffuse: 0.9, specular: 1, shininess: 10),
            };

            world.AddShape(middle);

            Sphere right = new Sphere
            {
                Transformation = Matrix.GetScalingMatrix(0.5, 0.5, 0.5).Translate(1.5, 0.5, -0.5),
                Material = new Material(ColorTuple.Create(0, 1, 0.4), diffuse: 0.9, specular: 0, shininess: 200),
            };

            world.AddShape(right);

            Sphere left = new Sphere
            {
                Transformation = Matrix.GetScalingMatrix(0.33, 0.33, 0.33).Translate(-1.5, 0.33, -0.75),
                Material = new Material(ColorTuple.Create(1, 0, 0.4), diffuse: 0.9, specular: 0.5, shininess: 500),
            };

            world.AddShape(left);

            Camera camera = new Camera(2000, 2000, Constants.PiOver3);
            Tuple4D from = Tuple4D.CreatePoint(0, 1.5, -5);
            Tuple4D to = Tuple4D.CreatePoint(0, 1, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("spheres.ppm");
            System.Diagnostics.Process.Start("spheres.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 8.
        /// </summary>
        private static void DoChapter8()
        {
            Light light = new Light(Tuple4D.CreatePoint(-10, 10, -10), ColorTuple.White);
            World world = new World(light);

            Sphere floor = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(10, 0.1, 10).Translate(0, -0.1, 0),
                Material = new Material(ColorTuple.Create(1, 0.8, 0.8), specular: 50),
            };

            world.AddShape(floor);

            Sphere leftWall = new Sphere()
            {
                Material = new Material(ColorTuple.Create(0.8, 1, 0.8), specular: 50),
                Transformation = Matrix.GetScalingMatrix(10, 0.01, 10)
                    .RotateX(Constants.PiOver2)
                    .RotateY(-Constants.PiOver4)
                    .Translate(0, 0, 5),
            };

            world.AddShape(leftWall);

            Sphere rightWall = new Sphere
            {
                Material = new Material(ColorTuple.Create(0.8, 0.8, 1), specular: 50),
                Transformation = Matrix.GetScalingMatrix(10, 0.01, 10)
                    .RotateX(Constants.PiOver2)
                    .RotateY(Constants.PiOver4)
                    .Translate(0, 0, 5),
            };

            world.AddShape(rightWall);

            Sphere s1 = new Sphere
            {
                Transformation = Matrix.GetTranslationMatrix(-0.5, 1, 0.5),
                Material = new Material(ColorTuple.Create(0, 0.4, 1), diffuse: 0.9, specular: 1, shininess: 10),
            };

            world.AddShape(s1);

            Sphere s2 = new Sphere
            {
                Transformation = Matrix.GetScalingMatrix(0.5, 0.5, 0.5).Translate(-1, 1, -1),
                Material = new Material(ColorTuple.Create(0, 1, 0.4), diffuse: 0.9, specular: 0, shininess: 200),
            };

            world.AddShape(s2);

            Sphere s3 = new Sphere
            {
                Transformation = Matrix.GetScalingMatrix(0.33, 0.33, 0.33).Translate(-1.5, 1.33, -1.5),
                Material = new Material(ColorTuple.Create(1, 0, 0.4), diffuse: 0.9, specular: 0.5, shininess: 500),
            };

            world.AddShape(s3);

            Camera camera = new Camera(1000, 1000, Constants.PiOver3);
            Tuple4D from = Tuple4D.CreatePoint(0, 1.5, -5);
            Tuple4D to = s1.Transformation * Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("spheres-with-shadows.ppm");
            System.Diagnostics.Process.Start("spheres-with-shadows.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 9.
        /// </summary>
        private static void DoChapter9()
        {
            Light light = new Light(Tuple4D.CreatePoint(-10, 10, -10), ColorTuple.White);
            World world = new World(light);

            Plane plane = new Plane();
            world.AddShape(plane);

            const int NumSpheres = 20;
            for (int i = 0; i < NumSpheres; i++)
            {
                Sphere sphere = new Sphere()
                {
                    Material = new Material(ColorTuple.Create(0, (double)(NumSpheres - i) / NumSpheres, (double)i / NumSpheres), diffuse: 0.9, specular: 1, shininess: 10),
                    Transformation = Matrix.GetScalingMatrix(2.5 / NumSpheres, 2.5 / NumSpheres, 2.5 / NumSpheres)
                    .Translate(
                        Math.Cos(Constants.TwoPi * i / NumSpheres),
                        0.25,
                        Math.Sin(Constants.TwoPi * i / NumSpheres)),
                };

                world.AddShape(sphere);
            }

            Camera camera = new Camera(1000, 1000, Constants.PiOver4);
            Tuple4D from = Tuple4D.CreatePoint(-3, 2, -2);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("plane.ppm");
            System.Diagnostics.Process.Start("plane.ppm");
        }

        /// <summary>
        /// Does the "Putting It Together" section for chapter 10.
        /// </summary>
        private static void DoChapter10()
        {
            Light light = new Light(Tuple4D.CreatePoint(-5, 3, -5), ColorTuple.White);
            World world = new World(light);

            Pattern floorPattern1 = new BlendedPattern(
                new StripePattern(ColorTuple.Red, ColorTuple.Black),
                new StripePattern(ColorTuple.Red, ColorTuple.Black) { Transformation = Matrix.GetRotationMatrixY(Constants.PiOver2) });

            Pattern floorPattern2 = new RingPattern(ColorTuple.Red, ColorTuple.Black);

            Pattern floorPattern3 = new SpottedPattern(ColorTuple.Red, ColorTuple.Black);

            Pattern floorPattern = new BlendedPattern(floorPattern1, floorPattern2, floorPattern3);

            Plane floor = new Plane()
            {
                Material = new Material() { Pattern = floorPattern },
            };

            world.AddShape(floor);

            const int NumSpheres = 20;
            for (int i = 0; i < NumSpheres; i++)
            {
                Sphere sphere = new Sphere()
                {
                    Material = new Material(ColorTuple.Create(0, (double)(NumSpheres - i) / NumSpheres, (double)i / NumSpheres), diffuse: 0.9, specular: 1, shininess: 10),
                    Transformation = Matrix.GetScalingMatrix(2.5 / NumSpheres, 2.5 / NumSpheres, 2.5 / NumSpheres)
                    .Translate(
                        Math.Cos(Constants.TwoPi * i / NumSpheres),
                        0.25,
                        Math.Sin(Constants.TwoPi * i / NumSpheres)),
                };

                world.AddShape(sphere);
            }

            Camera camera = new Camera(1000, 1000, Constants.PiOver4);
            Tuple4D from = Tuple4D.CreatePoint(-3, 2, -2);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("patterns.ppm");
            System.Diagnostics.Process.Start("patterns.ppm");
        }

        private static void DoChapter11()
        {
            Light light = new Light(Tuple4D.CreatePoint(0, 3, -3), ColorTuple.White);
            World world = new World(light);

            Plane floor = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -3, 0),
            };

            floor.Material.Pattern = new CheckersPattern(ColorTuple.Red, ColorTuple.Black);
            floor.Material.Reflective = 0.25;

            Plane ceiling = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, 10, 0),
            };

            ceiling.Material.Pattern = new CheckersPattern(ColorTuple.Blue, ColorTuple.Black);
            ceiling.Material.Reflective = 0.25;

            Shape sphere = new Sphere();
            sphere.Material.Color = ColorTuple.Black;
            sphere.Material.Reflective = 0.75;

            Sphere s1 = Sphere.CreateGlassSphere();
            //Sphere s2 = Sphere.CreateGlassSphere();
            //s2.Transformation = Matrix.GetScalingMatrix(0.5, 0.5, 0.5);

            Sphere s2 = new Sphere
            {
                Transformation = Matrix.GetTranslationMatrix(2, 0, 3),
                Material = new Material(ColorTuple.Blue, diffuse: 0.9, specular: 1, shininess: 200, reflective: 0, transparency: 1, refractiveIndex: 0.5),
            };

            world.AddShapes(floor, Sphere.CreateGlassSphere(), s2);

            Camera camera = new Camera(500, 500, Constants.PiOver4);
            Tuple4D from = Tuple4D.CreatePoint(-3, 2, -2);
            Tuple4D to = Tuple4D.CreatePoint(-0.3, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("reflection.ppm");
            System.Diagnostics.Process.Start("reflection.ppm");
        }

        private static void DoChapter11Take2()
        {
            Light light = new Light(Tuple4D.CreatePoint(-10, 2, 5), ColorTuple.White);
            World world = new World(light);

            Plane floor = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -3, 0),
            };

            floor.Material.Pattern = new CheckersPattern(ColorTuple.White, ColorTuple.Create(0, 0, 0.2));
            floor.Material.Transparency = 0;
            floor.Material.Reflective = 0.55;
            floor.Material.Ambient = 0.1;
            floor.Material.Diffuse = 0.4;
            world.AddShape(floor);

            Shape s1 = Sphere.CreateGlassSphere();
            s1.Material.Color = ColorTuple.Create(0, 0, 0);
            s1.Material.Transparency = 1;
            s1.Material.Reflective = 1;
            s1.Material.Ambient = 0;
            s1.Material.Diffuse = 0.05;
            s1.Material.Specular = 1;
            s1.Material.Shininess = 400;
            s1.Transformation = Matrix.GetScalingMatrix(3, 3, 3);
            world.AddShape(s1);

            const int NumSpheres = 40;
            for (int i = 0; i < NumSpheres; i++)
            {
                double ratio = (double)i / NumSpheres;
                double scale = 0.35;
                Shape sphere = Sphere.CreateGlassSphere();
                sphere.Material.Color = ColorTuple.Create(ratio, 1 - ratio, 1);
                sphere.Material.Transparency = 0.8;
                sphere.Material.Reflective = 1;
                sphere.Material.Ambient = 0.1;
                sphere.Material.Diffuse = 0.2;
                sphere.Material.Specular = 1;
                sphere.Material.Shininess = 400;
                sphere.Transformation = Matrix
                    .GetScalingMatrix(scale, scale, scale)
                    .Translate(
                        4 * Math.Cos(Constants.TwoPi * ratio),
                        (1 - ratio) * Math.Sin(4 * Constants.TwoPi * ratio),
                        4 * Math.Sin(Constants.TwoPi * ratio));
                world.AddShape(sphere);
            }

            Camera camera = new Camera(1920, 1080, Constants.PiOver4);
            Tuple4D from = Tuple4D.CreatePoint(-10, 4, -10);
            Tuple4D to = Tuple4D.CreatePoint(0, -2, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("refraction.ppm");
            System.Diagnostics.Process.Start("refraction.ppm");
        }

        private static void DoChapter12()
        {
            Light light = new Light(Tuple4D.CreatePoint(60, -10, 0), ColorTuple.Create(0.8, 0.85, 1));
            World world = new World(light);

            Cube rightWall = new Cube();
            rightWall.Transformation = Matrix.GetScalingMatrix(100, 100, 100).Translate(-200, 0, 0);
            rightWall.Material.Specular = 1;
            rightWall.Material.Ambient = 0.1;
            rightWall.Material.Shininess = 400;
            rightWall.Material.Pattern = new StripePattern(ColorTuple.Create(0.1, 0.1, 0.1), ColorTuple.Create(0.2, 0.2, 0.2))
            {
                Transformation = Matrix.GetScalingMatrix(0.1, 0.1, 0.1).RotateY(Constants.PiOver2),
            };

            Cube leftWall = new Cube();
            leftWall.Transformation = Matrix.GetScalingMatrix(100, 100, 100).Translate(0, 0, -200);
            leftWall.Material.Specular = 1;
            leftWall.Material.Ambient = 0.1;
            leftWall.Material.Shininess = 400;
            leftWall.Material.Pattern = new StripePattern(ColorTuple.Create(0.1, 0.1, 0.1), ColorTuple.Create(0.2, 0.2, 0.2))
            {
                Transformation = Matrix.GetScalingMatrix(0.1, 0.1, 0.1),
            };

            Cube floor = new Cube();
            floor.Transformation = Matrix.GetScalingMatrix(100, 100, 100).Translate(0, -200, 0);
            floor.Material.Transparency = 0;
            floor.Material.Reflective = 0.25;
            floor.Material.Ambient = 0.25;
            floor.Material.Diffuse = 1;
            floor.Material.Specular = 0.1;
            floor.Material.Shininess = 200;
            floor.Material.Pattern = new CheckersPattern(ColorTuple.Create(0.1, 0.1, 0.1), ColorTuple.Black)
            {
                Transformation = Matrix.GetScalingMatrix(0.2, 0.2, 0.2),
            };

            world.AddShapes(rightWall, leftWall, floor);

            Cube table = new Cube();
            table.Transformation = Matrix.GetScalingMatrix(40, 2, 60).Translate(0, -40, 0);
            table.Material.Transparency = 0;
            table.Material.Reflective = .25;
            table.Material.Ambient = 0.25;
            table.Material.Diffuse = 1;
            table.Material.Specular = 0.1;
            table.Material.Shininess = 200;
            table.Material.Pattern = new StripePattern(ColorTuple.Create(0.3, 0.3, 0.3), ColorTuple.Create(0.4, 0.4, 0.4))
            {
                Transformation = Matrix.GetScalingMatrix(0.05, 0.05, 0.05).RotateY(Constants.PiOver2),
            };

            Cube tableLeg1 = new Cube();
            tableLeg1.Transformation = Matrix.GetScalingMatrix(2, 40, 2).Translate(35, -81, 55);
            tableLeg1.Material.Color = ColorTuple.Create(0.2, 0.2, 0.2);
            tableLeg1.Material.Transparency = 0;
            tableLeg1.Material.Reflective = .25;
            tableLeg1.Material.Ambient = 0.25;
            tableLeg1.Material.Diffuse = 1;
            tableLeg1.Material.Specular = 0.1;
            tableLeg1.Material.Shininess = 200;

            Cube tableLeg2 = new Cube();
            tableLeg2.Transformation = Matrix.GetScalingMatrix(2, 40, 2).Translate(35, -81, -55);
            tableLeg2.Material = tableLeg1.Material;
            tableLeg2.Material.Transparency = 0;
            tableLeg2.Material.Reflective = .25;
            tableLeg2.Material.Ambient = 0.25;
            tableLeg2.Material.Diffuse = 1;
            tableLeg2.Material.Specular = 0.1;
            tableLeg2.Material.Shininess = 200;

            Cube tableLeg3 = new Cube();
            tableLeg3.Transformation = Matrix.GetScalingMatrix(2, 40, 2).Translate(-35, -81, 55);
            tableLeg3.Material = tableLeg1.Material;
            tableLeg3.Material.Transparency = 0;
            tableLeg3.Material.Reflective = .25;
            tableLeg3.Material.Ambient = 0.25;
            tableLeg3.Material.Diffuse = 1;
            tableLeg3.Material.Specular = 0.1;
            tableLeg3.Material.Shininess = 200;

            Cube tableLeg4 = new Cube();
            tableLeg4.Transformation = Matrix.GetScalingMatrix(2, 40, 2).Translate(-35, -81, -55);
            tableLeg4.Material = tableLeg1.Material;
            tableLeg4.Material.Transparency = 0;
            tableLeg4.Material.Reflective = .25;
            tableLeg4.Material.Ambient = 0.25;
            tableLeg4.Material.Diffuse = 1;
            tableLeg4.Material.Specular = 0.1;
            tableLeg4.Material.Shininess = 200;

            world.AddShapes(table, tableLeg1, tableLeg2, tableLeg3, tableLeg4);

            Cube mirror = new Cube();
            mirror.Transformation = Matrix.GetScalingMatrix(1, 70, 50).Translate(-92, 50, 0).Shear(xy: 0.2);
            mirror.Material.Color = ColorTuple.Black;
            mirror.Material.Transparency = 0.0001;
            mirror.Material.Reflective = 0.99;
            mirror.Material.RefractiveIndex = 0;
            mirror.Material.Ambient = 0.1;
            mirror.Material.Diffuse = 0;
            mirror.Material.Specular = 0;
            mirror.Material.Shininess = 400;
            world.AddShape(mirror);

            Cube mirrorFrame = new Cube();
            mirrorFrame.Transformation = Matrix.GetScalingMatrix(0.5, 75, 55).Translate(-99.5, 47.5, 0);
            mirrorFrame.Material.Color = ColorTuple.Black;
            mirrorFrame.Material.Transparency = 0;
            mirrorFrame.Material.Reflective = 0;
            mirrorFrame.Material.Ambient = 0.5;
            mirrorFrame.Material.Diffuse = 1;
            mirrorFrame.Material.Specular = 0.1;
            mirrorFrame.Material.Shininess = 200;
            world.AddShape(mirrorFrame);

            Cube painting1 = new Cube();
            painting1.Transformation = Matrix.GetScalingMatrix(20, 20, 0.5).Translate(0, 10, -99.5);
            painting1.Material.Color = ColorTuple.Red;
            painting1.Material.Transparency = 0.5;
            painting1.Material.Reflective = 0;
            painting1.Material.RefractiveIndex = 1.1;
            painting1.Material.Ambient = 0.2;
            painting1.Material.Diffuse = 0;
            painting1.Material.Specular = 1;
            painting1.Material.Shininess = 200;
            world.AddShape(painting1);

            Cube painting2 = new Cube();
            painting2.Transformation = Matrix.GetScalingMatrix(7.5, 7.5, 0.5).Translate(-32.5, 22.5, -99.5);
            painting2.Material.Color = ColorTuple.Green;
            painting2.Material.Transparency = 0.5;
            painting2.Material.Reflective = 0;
            painting2.Material.RefractiveIndex = 1.1;
            painting2.Material.Ambient = 0.2;
            painting2.Material.Diffuse = 0;
            painting2.Material.Specular = 1;
            painting2.Material.Shininess = 200;
            world.AddShape(painting2);

            Cube painting3 = new Cube();
            painting3.Transformation = Matrix.GetScalingMatrix(7.5, 7.5, 0.5).Translate(-32.5, 0, -99.5);
            painting3.Material.Color = ColorTuple.Blue;
            painting3.Material.Transparency = 0.5;
            painting3.Material.Reflective = 0;
            painting3.Material.RefractiveIndex = 1.1;
            painting3.Material.Ambient = 0.2;
            painting3.Material.Diffuse = 0;
            painting3.Material.Specular = 0;
            painting3.Material.Shininess = 200;
            world.AddShape(painting3);

            Cube trinket1 = new Cube();
            trinket1.Transformation = Matrix.GetScalingMatrix(8, 8, 8).Translate(0, -30, 0);
            trinket1.Material.Color = ColorTuple.Red;
            trinket1.Material.Transparency = 0.1;
            trinket1.Material.Reflective = 0.5;
            trinket1.Material.RefractiveIndex = 1.6;
            trinket1.Material.Ambient = 0.2;
            trinket1.Material.Diffuse = 0.05;
            trinket1.Material.Specular = 1;
            trinket1.Material.Shininess = 400;
            world.AddShape(trinket1);

            Cube trinket2 = new Cube();
            trinket2.Transformation = Matrix.GetScalingMatrix(1, 8, 1).RotateY(Constants.PiOver4).Translate(-30, -30, 50);
            trinket2.Material.Color = ColorTuple.Green;
            trinket2.Material.Transparency = 0.1;
            trinket2.Material.Reflective = 0.5;
            trinket2.Material.RefractiveIndex = 1.6;
            trinket2.Material.Ambient = 0.2;
            trinket2.Material.Diffuse = 0.05;
            trinket2.Material.Specular = 1;
            trinket2.Material.Shininess = 400;
            world.AddShape(trinket2);

            Cube trinket3 = new Cube();
            trinket3.Transformation = Matrix.GetScalingMatrix(4, 1, 4).RotateY(Constants.PiOver3).Translate(30, -37, 40);
            trinket3.Material.Color = ColorTuple.Blue;
            trinket3.Material.Transparency = 0.1;
            trinket3.Material.Reflective = 0.5;
            trinket3.Material.RefractiveIndex = 1.6;
            trinket3.Material.Ambient = 0.2;
            trinket3.Material.Diffuse = 0.05;
            trinket3.Material.Specular = 1;
            trinket3.Material.Shininess = 400;
            world.AddShape(trinket3);

            Cube trinket4 = new Cube();
            trinket4.Transformation = Matrix.GetScalingMatrix(3, 2, 12).RotateY(Math.PI / 7).Translate(-10, -36, 30);
            trinket4.Material.Color = ColorTuple.Create(0, 1, 1);
            trinket4.Material.Transparency = 0.1;
            trinket4.Material.Reflective = 0.5;
            trinket4.Material.RefractiveIndex = 1.6;
            trinket4.Material.Ambient = 0.2;
            trinket4.Material.Diffuse = 0.05;
            trinket4.Material.Specular = 1;
            trinket4.Material.Shininess = 400;
            world.AddShape(trinket4);

            Cube trinket5 = new Cube();
            trinket5.Transformation = Matrix.GetScalingMatrix(8, 2, 10).RotateY(Constants.PiOver4).Translate(20, -36, -10);
            trinket5.Material.Color = ColorTuple.Create(1, 0, 1);
            trinket5.Material.Transparency = 0.1;
            trinket5.Material.Reflective = 0.5;
            trinket5.Material.RefractiveIndex = 1.6;
            trinket5.Material.Ambient = 0.2;
            trinket5.Material.Diffuse = 0.05;
            trinket5.Material.Specular = 1;
            trinket5.Material.Shininess = 400;
            world.AddShape(trinket5);

            Camera camera = new Camera(6000, 6000, Constants.PiOver3);
            Tuple4D from = Tuple4D.CreatePoint(99, 10, 99);
            Tuple4D to = Tuple4D.CreatePoint(0, -40, 10);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("cubes.ppm");
            System.Diagnostics.Process.Start("cubes.ppm");
        }

        private static void DoChapter13()
        {
            Light light = new Light(Tuple4D.CreatePoint(-8, 3, -5), ColorTuple.White);
            World world = new World(light);

            Plane floor = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -3, 0),
            };

            floor.Material.Pattern = new CheckersPattern(ColorTuple.Red, ColorTuple.Black);
            floor.Material.Reflective = 0.25;
            world.AddShapes(floor);

            Cone cone = new Cone();
            cone.Minimum = -1;
            cone.Maximum = 0;
            cone.Closed = true;
            cone.Material.Pattern = new StripePattern(ColorTuple.Create(0.98, 0.96, 0.89), ColorTuple.Create(0.9, 0.88, 0.81))
            {
                Transformation = Matrix.GetScalingMatrix(0.1, 0.1, 0.1).RotateZ(Constants.PiOver2),
            };
            cone.Transformation = Matrix.GetScalingMatrix(0.4, 1, 0.4).RotateX(Math.PI);
            world.AddShapes(cone);

            Sphere sphere = new Sphere();
            sphere.Material.Color = ColorTuple.Create(1, 0.8, 0.8);
            sphere.Transformation = Matrix.GetScalingMatrix(0.35, 0.35, 0.35).Translate(0, 1.1, 0);
            world.AddShapes(sphere);

            Camera camera = new Camera(400, 400, Constants.PiOver4);
            Tuple4D from = Tuple4D.CreatePoint(-2.5, 2, -1);
            Tuple4D to = Tuple4D.CreatePoint(0, 1, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            camera.Transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Canvas canvas = camera.Render(world);
            canvas.WritePortablePixmapFile("cylinder.ppm");
            System.Diagnostics.Process.Start("cylinder.ppm");
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
