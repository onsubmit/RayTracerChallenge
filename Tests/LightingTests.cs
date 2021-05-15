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
            Light light = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.Create(1, 1, 1));
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.9, 1.9, 1.9), result);
        }

        [TestMethod]
        public void EyeBetweenLightAndSurfaceEyeOffset45Degrees()
        {
            double root2over2 = Math.Sqrt(2) / 2;
            Tuple4D eyeVector = Tuple4D.CreateVector(0, root2over2, -root2over2);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.Create(1, 1, 1));
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.0, 1.0, 1.0), result);
        }

        [TestMethod]
        public void EyeOppositeSurfaceLightOffset45Degrees()
        {
            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 10, -10), ColorTuple.Create(1, 1, 1));
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(0.7364, 0.7364, 0.7364), result);
        }

        [TestMethod]
        public void EyeInPathOfReflectionVector()
        {
            double root2over2 = Math.Sqrt(2) / 2;
            Tuple4D eyeVector = Tuple4D.CreateVector(0, -root2over2, -root2over2);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 10, -10), ColorTuple.Create(1, 1, 1));
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(1.6364, 1.6364, 1.6364), result);
        }

        [TestMethod]
        public void LightBehindSurface()
        {
            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, 10), ColorTuple.Create(1, 1, 1));
            ColorTuple result = Lighting.Calculate(this.Material, light, this.Position, eyeVector, normalVector);
            Assert.AreEqual(ColorTuple.Create(0.1, 0.1, 0.1), result);
        }
    }
}
