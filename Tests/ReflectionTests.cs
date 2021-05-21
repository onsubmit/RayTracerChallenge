namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class ReflectionTests
    {
        [TestMethod]
        public void PointLight()
        {
            Tuple4D position = Tuple4D.CreatePoint(0, 0, 0);
            ColorTuple intensity = ColorTuple.White;
            Light light = new Light(position, intensity);
            Assert.AreEqual(position, light.Position);
            Assert.AreEqual(intensity, light.Intensity);
        }

        [TestMethod]
        public void DefaultMaterial()
        {
            Material m = new Material();
            Assert.AreEqual(ColorTuple.White, m.Color);
            Assert.AreEqual(0.1, m.Ambient);
            Assert.AreEqual(0.9, m.Diffuse);
            Assert.AreEqual(0.9, m.Specular);
            Assert.AreEqual(200.0, m.Shininess);
            Assert.AreEqual(0, m.Reflective);
        }

        [TestMethod]
        public void PrecomputeReflectionVector()
        {
            double root2 = Math.Sqrt(2);
            double root2over2 = root2 / 2;

            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 1, -1), Tuple4D.CreateVector(0, -root2over2, root2over2));
            Intersections intersections = plane.GetIntersectionsWith(ray);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(hit, new Intersection(root2, plane));
            Computation computation = new Computation(hit, ray);
            Assert.AreEqual(Tuple4D.CreateVector(0, root2over2, root2over2), computation.ReflectionVector);
        }

        [TestMethod]
        public void ReflectedColorForNonReflectiveMaterial()
        {
            World world = World.CreateDefaultWorld();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0), Tuple4D.CreateVector(0, 0, 1));
            Shape shape = world.Shapes[1];
            shape.Material.Ambient = 1;

            Intersection intersection = new Intersection(1, shape);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.GetReflectedColorAt(computation);
            Assert.AreEqual(ColorTuple.Black, color);
        }

        [TestMethod]
        public void ReflectedColorForReflectiveMaterial()
        {
            double root2 = Math.Sqrt(2);
            double root2over2 = root2 / 2;

            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Material = new Material() { Reflective = 0.5 },
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            world.AddShape(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -root2over2, root2over2));
            Intersection intersection = new Intersection(root2, plane);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.GetReflectedColorAt(computation);
            Assert.AreEqual(ColorTuple.Create(0.19032, 0.2379, 0.14274), color);
        }

        [TestMethod]
        public void ShadeHitForReflectiveMaterial()
        {
            double root2 = Math.Sqrt(2);
            double root2over2 = root2 / 2;

            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Material = new Material() { Reflective = 0.5 },
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            world.AddShape(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -root2over2, root2over2));
            Intersection intersection = new Intersection(root2, plane);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.87677, 0.92436, 0.82918), color);
        }

        [TestMethod]
        public void ColorAtWithMutuallyReflectedSurfaces()
        {
            World world = new World()
            {
                LightSource = new Light(Tuple4D.CreatePoint(0, 0, 0), ColorTuple.White)
            };

            Plane lower = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            lower.Material.Reflective = 1;

            Plane upper = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, 1, 0),
            };

            upper.Material.Reflective = 1;

            world.AddShapes(lower, upper);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0), Tuple4D.CreateVector(0, 1, 0));
            ColorTuple color = world.GetColorAt(ray);

            // TODO, investigate why the stack doesn't blow up here.
            // Did I do something wrong?
         }

        [TestMethod]
        public void ReflectedColorAtMaxRecusiveDepth()
        {
            double root2 = Math.Sqrt(2);
            double root2over2 = root2 / 2;

            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            plane.Material.Reflective = 1;
            world.AddShapes(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -root2over2, root2over2));
            Intersection intersection = new Intersection(root2, plane);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.GetReflectedColorAt(computation, remaining: 0);
            Assert.AreEqual(ColorTuple.Black, color);
        }
    }
}
