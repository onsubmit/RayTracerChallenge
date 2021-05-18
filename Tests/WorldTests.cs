namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class WorldTests
    {
        [TestMethod]
        public void CreateWorld()
        {
            World world = new World();
            Assert.IsFalse(world.HasLightSource);
            Assert.IsFalse(world.HasLightSource);
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
            Assert.AreEqual(ColorTuple.Create(0.1, 0.1, 0.1), color);
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
    }
}
