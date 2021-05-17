namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class LightingTests
    {
        private Material Material { get; set; }

        private Tuple4D Position { get; set; }

        [TestInitialize]
        public void TestInitialize()
        {
            this.Material = new Material();
            this.Position = Tuple4D.CreatePoint(0, 0, 0);
        }

        [TestMethod]
        public void EyeBetweenLightAndSurface()
        {
            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.White);
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.9, 1.9, 1.9), result);
        }

        [TestMethod]
        public void EyeBetweenLightAndSurfaceEyeOffset45Degrees()
        {
            double root2over2 = Math.Sqrt(2) / 2;
            Tuple4D eyeVector = Tuple4D.CreateVector(0, root2over2, -root2over2);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.White);
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.0, 1.0, 1.0), result);
        }

        [TestMethod]
        public void EyeOppositeSurfaceLightOffset45Degrees()
        {
            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 10, -10), ColorTuple.White);
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(0.7364, 0.7364, 0.7364), result);
        }

        [TestMethod]
        public void EyeInPathOfReflectionVector()
        {
            double root2over2 = Math.Sqrt(2) / 2;
            Tuple4D eyeVector = Tuple4D.CreateVector(0, -root2over2, -root2over2);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 10, -10), ColorTuple.White);
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.6364, 1.6364, 1.6364), result);
        }

        [TestMethod]
        public void LightBehindSurface()
        {
            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, 10), ColorTuple.White);
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(0.1, 0.1, 0.1), result);
        }

        [TestMethod]
        public void NoShadowWhenNothingIsCollinearWithPointAndLight()
        {
            World world = World.CreateDefaultWorld();
            Tuple4D point = Tuple4D.CreatePoint(0, 10, 0);
            Assert.IsFalse(world.IsShadowed(point));
        }

        [TestMethod]
        public void ShadowWhenObjectExistsBetweenPointAndLight()
        {
            World world = World.CreateDefaultWorld();
            Tuple4D point = Tuple4D.CreatePoint(10, -10, 10);
            Assert.IsTrue(world.IsShadowed(point));
        }

        [TestMethod]
        public void NoShadowWhenObjectBehindLight()
        {
            World world = World.CreateDefaultWorld();
            Tuple4D point = Tuple4D.CreatePoint(-20, 20, -20);
            Assert.IsFalse(world.IsShadowed(point));
        }

        [TestMethod]
        public void NoShadowWhenObjectBehindPoint()
        {
            World world = World.CreateDefaultWorld();
            Tuple4D point = Tuple4D.CreatePoint(-2, 2, -2);
            Assert.IsFalse(world.IsShadowed(point));
        }

        [TestMethod]
        public void IntersectionInShadow()
        {
            World world = new World();
            world.LightSource = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.White);

            Sphere s1 = new Sphere();
            world.AddShape(s1);

            Sphere s2 = new Sphere();
            s2.Transformation = Matrix.GetTranslationMatrix(0, 0, 20);
            world.AddShape(s2);

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 5), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = s2.GetIntersectionsWith(ray);
            Computation computation = new Computation(intersections.GetHit(), ray);
            ColorTuple color = world.ShadeHit(computation);
            Assert.AreEqual(ColorTuple.Create(0.1, 0.1, 0.1), color);
        }
    }
}
