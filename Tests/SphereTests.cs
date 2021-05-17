namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

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
            double root3over3 = Math.Sqrt(3) / 3;
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(root3over3, root3over3, root3over3));
            Assert.AreEqual(Tuple4D.CreateVector(root3over3, root3over3, root3over3), normal);
        }

        [TestMethod]
        public void NormalVectorIsNormal()
        {
            double root3over3 = Math.Sqrt(3) / 3;
            Sphere sphere = new Sphere();
            Tuple4D normal = sphere.GetNormalAtPoint(Tuple4D.CreatePoint(root3over3, root3over3, root3over3));
            Assert.AreEqual(normal, normal.Normalize());
        }
    }
}
