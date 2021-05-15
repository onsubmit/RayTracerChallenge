namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class SphereTests
    {
        [TestMethod]
        public void DefaultTransformation()
        {
            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Assert.AreEqual(Matrix.GetIdentityMatrix(3), sphere.Transformation);
        }

        [TestMethod]
        public void CustomTransformation()
        {
            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Matrix transformation = Matrix.GetTranslationMatrix(2, 3, 4);
            sphere.Transformation = transformation;
            Assert.AreEqual(transformation, sphere.Transformation);
        }
    }
}
