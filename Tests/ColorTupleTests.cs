namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge.Colors;
    using OnSubmit.RayTracerChallenge.Numerics;

    [TestClass]
    public class ColorTupleTests
    {
        [TestMethod]
        public void BasicColorTest()
        {
            const double Red = -0.5;
            const double Green = 0.4;
            const double Blue = 1.7;

            ColorTuple c = ColorTuple.Create(Red, Green, Blue);
            Assert.AreEqual(Red, c.Red);
            Assert.AreEqual(Green, c.Green);
            Assert.AreEqual(Blue, c.Blue);
        }

        [TestMethod]
        public void AddColors()
        {
            ColorTuple c1 = ColorTuple.Create(0.9, 0.6, 0.75);
            ColorTuple c2 = ColorTuple.Create(0.7, 0.1, 0.25);
            Assert.AreEqual(ColorTuple.Create(1.6, 0.7, 1.0), c1 + c2);
            Assert.AreEqual(c1 + c2, c2 + c1);
        }

        [TestMethod]
        public void SubtractColors()
        {
            ColorTuple c1 = ColorTuple.Create(0.9, 0.6, 0.75);
            ColorTuple c2 = ColorTuple.Create(0.7, 0.1, 0.25);
            Assert.AreEqual(ColorTuple.Create(0.2, 0.5, 0.5), c1 - c2);
        }

        [TestMethod]
        public void MultiplyColorByScalar()
        {
            ColorTuple c = ColorTuple.Create(0.2, 0.3, 0.4);
            Assert.AreEqual(ColorTuple.Create(0.4, 0.6, 0.8), c * 2);
            Assert.AreEqual(c * 2, 2 * c);
        }

        [TestMethod]
        public void HadamardProductTest()
        {
            ColorTuple c1 = ColorTuple.Create(1, 0.2, 0.4);
            ColorTuple c2 = ColorTuple.Create(0.9, 1, 0.1);
            Assert.AreEqual(ColorTuple.Create(0.9, 0.2, 0.04), c1 * c2);
            Assert.AreEqual(c1 * c2, c2 * c1);
        }
    }
}
