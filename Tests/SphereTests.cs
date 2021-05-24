namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class SphereTests
    {
        [TestMethod]
        public void NormalVectorOnXAxis()
        {
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(1, 0, 0));
            Assert.AreEqual(Tuple4D.CreateVector(1, 0, 0), normal);
        }

        [TestMethod]
        public void NormalVectorOnYAxis()
        {
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(0, 1, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, 1, 0), normal);
        }

        [TestMethod]
        public void NormalVectorOnZAxis()
        {
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(0, 0, 1));
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, 1), normal);
        }

        [TestMethod]
        public void NormalVectorOnNonAxialPoint()
        {
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(Constants.Sqrt3Over3, Constants.Sqrt3Over3, Constants.Sqrt3Over3));
            Assert.AreEqual(Tuple4D.CreateVector(Constants.Sqrt3Over3, Constants.Sqrt3Over3, Constants.Sqrt3Over3), normal);
        }

        [TestMethod]
        public void NormalVectorIsNormal()
        {
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(Constants.Sqrt3Over3, Constants.Sqrt3Over3, Constants.Sqrt3Over3));
            Assert.AreEqual(normal, normal.Normalize());
        }
    }
}
