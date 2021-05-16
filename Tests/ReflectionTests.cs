namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

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
        }
    }
}
