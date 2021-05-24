namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Patterns;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class WorldTests
    {
        [TestMethod]
        public void CreateWorld()
        {
            World world = new World();
            Assert.IsFalse(world.HasLightSource);
            Assert.IsFalse(world.HasShapes);
        }

        [TestMethod]
        public void CreateDefaultWorld()
        {
            World world = World.CreateDefaultWorld();

            Light light = new Light(Tuple4D.CreatePoint(-10, 10, -10), ColorTuple.White);
            Sphere s1 = new Sphere()
            {
                Material = new Material(ColorTuple.Create(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2),
            };

            Sphere s2 = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(0.5, 0.5, 0.5),
            };

            Assert.AreEqual(light, world.LightSource);
            Assert.IsTrue(world.ContainsShape(s1));
            Assert.IsTrue(world.ContainsShape(s2));
        }

        [TestMethod]
        public void IntersectDefaultWorldWithRay()
        {
            World world = World.CreateDefaultWorld();

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = ray.GetIntersectionsWith(world);
            Assert.AreEqual(4, intersections.Count);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(4.5, intersections[1].T);
            Assert.AreEqual(5.5, intersections[2].T);
            Assert.AreEqual(6, intersections[3].T);
        }

        [TestMethod]
        public void ShadeIntersection()
        {
            World world = World.CreateDefaultWorld();

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = world.Shapes[0].As<Sphere>();
            Intersections intersections = ray.GetIntersectionsWith(world);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(new Intersection(4, sphere), hit);

            Computation computation = new Computation(hit, ray);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.38066, 0.47583, 0.2855), color);
        }

        [TestMethod]
        public void ShadeIntersectionFromInside()
        {
            World world = World.CreateDefaultWorld();
            world.LightSource = new Light(Tuple4D.CreatePoint(0, 0.25, 0), ColorTuple.White);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = world.Shapes[1].As<Sphere>();
            Intersections intersections = ray.GetIntersectionsWith(world);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(new Intersection(0.5, sphere), hit);

            Computation computation = new Computation(hit, ray);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.90498, 0.90498, 0.90498), color);
        }

        [TestMethod]
        public void ColorWhenRayMisses()
        {
            World world = World.CreateDefaultWorld();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 1, 0));
            ColorTuple color = world.GetColorAt(ray);
            Assert.AreEqual(ColorTuple.Black, color);
        }

        [TestMethod]
        public void ColorWhenRayHits()
        {
            World world = World.CreateDefaultWorld();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            ColorTuple color = world.GetColorAt(ray);
            Assert.AreEqual(ColorTuple.Create(0.38066, 0.47583, 0.2855), color);
        }

        [TestMethod]
        public void ColorWhenIntersectionBehindRay()
        {
            World world = World.CreateDefaultWorld();

            Sphere outer = world.Shapes[0].As<Sphere>();
            outer.Material.Ambient = 1;

            Sphere inner = world.Shapes[1].As<Sphere>();
            inner.Material.Ambient = 1;

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0.75), Tuple4D.CreateVector(0, 0, -1));
            ColorTuple color = world.GetColorAt(ray);
            Assert.AreEqual(inner.Material.Color, color);
        }

        [TestMethod]
        public void RefractedColorWithOpaqueSurface()
        {
            World world = World.CreateDefaultWorld();
            Sphere sphere = world.Shapes[0].As<Sphere>();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -0.5), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = new Intersections(
                new Intersection(4, sphere),
                new Intersection(6, sphere));

            Computation computation = new Computation(intersections[0], ray, intersections);
            ColorTuple refactedColor = world.GetRefractedColorAt(computation);
            Assert.AreEqual(ColorTuple.Black, refactedColor);
        }

        [TestMethod]
        public void RefractedColorUnderTotalInternalReflection()
        {
            World world = World.CreateDefaultWorld();
            Sphere sphere = world.Shapes[0].As<Sphere>();
            sphere.Material.Transparency = 1;
            sphere.Material.RefractiveIndex = 1.5;

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, Constants.Sqrt2Over2), Tuple4D.CreateVector(0, 1, 0));
            Intersections intersections = new Intersections(
                new Intersection(-Constants.Sqrt2Over2, sphere),
                new Intersection(Constants.Sqrt2Over2, sphere));

            Computation computation = new Computation(intersections[1], ray, intersections);
            ColorTuple refactedColor = world.GetRefractedColorAt(computation);
            Assert.AreEqual(ColorTuple.Black, refactedColor);
        }

        [TestMethod]
        public void RefractedColorWithRefractedRay()
        {
            World world = World.CreateDefaultWorld();
            Sphere sphere1 = world.Shapes[0].As<Sphere>();
            sphere1.Material.Ambient = 1;
            sphere1.Material.Pattern = new TestPattern();

            Sphere sphere2 = world.Shapes[1].As<Sphere>();
            sphere2.Material.Transparency = 1;
            sphere2.Material.RefractiveIndex = 1.5;

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0.1), Tuple4D.CreateVector(0, 1, 0));
            Intersections intersections = new Intersections(
                new Intersection(-0.9899, sphere1),
                new Intersection(-0.4899, sphere2),
                new Intersection(0.4899, sphere2),
                new Intersection(0.9899, sphere1));

            Computation computation = new Computation(intersections[2], ray, intersections);
            ColorTuple refactedColor = world.GetRefractedColorAt(computation);
            Assert.AreEqual(ColorTuple.Create(0, 0.99787, 0.04747), refactedColor);
        }

        [TestMethod]
        public void ShadeHitWithTransparentWorld()
        {
            World world = World.CreateDefaultWorld();
            Plane floor = new Plane();
            floor.Transformation = Matrix.GetTranslationMatrix(0, -1, 0);
            floor.Material.Transparency = 0.5;
            floor.Material.RefractiveIndex = 1.5;
            world.AddShape(floor);

            Sphere ball = new Sphere();
            ball.Material.Color = ColorTuple.Red;
            ball.Material.Ambient = 0.5;
            ball.Transformation = Matrix.GetTranslationMatrix(0, -3.5, -0.5);
            world.AddShape(ball);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersections intersections = new Intersections(new Intersection(Constants.Sqrt2, floor));
            Computation computation = new Computation(intersections[0], ray, intersections);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.93642, 0.68642, 0.68642), color);
        }

        [TestMethod]
        public void ShadeHitWithReflectiveTransparentMaterial()
        {
            World world = World.CreateDefaultWorld();
            Plane floor = new Plane();
            floor.Transformation = Matrix.GetTranslationMatrix(0, -1, 0);
            floor.Material.Reflective = 0.5;
            floor.Material.Transparency = 0.5;
            floor.Material.RefractiveIndex = 1.5;
            world.AddShape(floor);

            Sphere ball = new Sphere();
            ball.Material.Color = ColorTuple.Red;
            ball.Material.Ambient = 0.5;
            ball.Transformation = Matrix.GetTranslationMatrix(0, -3.5, -0.5);
            world.AddShape(ball);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -3), Tuple4D.CreateVector(0, -Constants.Sqrt2Over2, Constants.Sqrt2Over2));
            Intersections intersections = new Intersections(new Intersection(Constants.Sqrt2, floor));
            Computation computation = new Computation(intersections[0], ray, intersections);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.93391, 0.69643, 0.69243), color);
        }
    }
}
