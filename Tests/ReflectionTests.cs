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
            Assert.AreEqual(0, m.Transparency);
            Assert.AreEqual(1, m.RefractiveIndex);
        }

        [TestMethod]
        public void PrecomputeReflectionVector()
        {
            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 1, -1), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersections intersections = plane.GetIntersectionsWith(ray);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(hit, new Intersection(Constants.Sqrt2, plane));
            Computation computation = new Computation(hit, ray);
            Assert.AreEqual(Tuple4D.CreateVector(0, Constants.Sqrt2Over2, Constants.Sqrt2Over2), computation.ReflectionVector);
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
            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Material = new Material() { Reflective = 0.5 },
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            world.AddShape(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersection intersection = new Intersection(Constants.Sqrt2, plane);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.GetReflectedColorAt(computation);
            Assert.AreEqual(ColorTuple.Create(0.19032, 0.2379, 0.14274), color);
        }

        [TestMethod]
        public void ShadeHitForReflectiveMaterial()
        {
            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Material = new Material() { Reflective = 0.5 },
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            world.AddShape(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersection intersection = new Intersection(Constants.Sqrt2, plane);
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
            World world = World.CreateDefaultWorld();
            Plane plane = new Plane()
            {
                Transformation = Matrix.GetTranslationMatrix(0, -1, 0),
            };

            plane.Material.Reflective = 1;
            world.AddShapes(plane);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersection intersection = new Intersection(Constants.Sqrt2, plane);
            Computation computation = new Computation(intersection, ray);
            ColorTuple color = world.GetReflectedColorAt(computation, remaining: 0);
            Assert.AreEqual(ColorTuple.Black, color);
        }

        [TestMethod]
        public void GlassSphere()
        {
            Sphere sphere = Sphere.CreateGlassSphere();
            Assert.AreEqual(Matrix.GetIdentityMatrix(4), sphere.Transformation);
            Assert.AreEqual(1.0, sphere.Material.Transparency);
            Assert.AreEqual(1.5, sphere.Material.RefractiveIndex);
        }

        [TestMethod]
        public void FindingN1N2AtVariousIntersections()
        {
            Sphere sphere1 = Sphere.CreateGlassSphere();
            sphere1.Transformation = Matrix.GetScalingMatrix(2, 2, 2);
            sphere1.Material.RefractiveIndex = 1.5;

            Sphere sphere2 = Sphere.CreateGlassSphere();
            sphere2.Transformation = Matrix.GetTranslationMatrix(0, 0, -0.25);
            sphere2.Material.RefractiveIndex = 2;

            Sphere sphere3 = Sphere.CreateGlassSphere();
            sphere3.Transformation = Matrix.GetTranslationMatrix(0, 0, 0.25);
            sphere3.Material.RefractiveIndex = 2.5;

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -4), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = new Intersections(
                new Intersection(2, sphere1),
                new Intersection(2.75, sphere2),
                new Intersection(3.25, sphere3),
                new Intersection(4.75, sphere2),
                new Intersection(5.25, sphere3),
                new Intersection(6, sphere1));

            Computation computations = new Computation(intersections[0], ray, intersections);
            Assert.AreEqual(1.0, computations.N1);
            Assert.AreEqual(1.5, computations.N2);

            computations = new Computation(intersections[1], ray, intersections);
            Assert.AreEqual(1.5, computations.N1);
            Assert.AreEqual(2.0, computations.N2);

            computations = new Computation(intersections[2], ray, intersections);
            Assert.AreEqual(2.0, computations.N1);
            Assert.AreEqual(2.5, computations.N2);

            computations = new Computation(intersections[3], ray, intersections);
            Assert.AreEqual(2.5, computations.N1);
            Assert.AreEqual(2.5, computations.N2);

            computations = new Computation(intersections[4], ray, intersections);
            Assert.AreEqual(2.5, computations.N1);
            Assert.AreEqual(1.5, computations.N2);

            computations = new Computation(intersections[5], ray, intersections);
            Assert.AreEqual(1.5, computations.N1);
            Assert.AreEqual(1.0, computations.N2);
        }
    }
}
