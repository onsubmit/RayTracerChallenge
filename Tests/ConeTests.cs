namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Extensions;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class ConeTests
    {
        [TestMethod]
        public void IntersectConeWithRay()
        {
            Cone cone = new Cone();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1).Normalize());
            Intersections intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(5, intersections[0].T);
            Assert.AreEqual(5, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(1, 1, 1).Normalize());
            intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.IsTrue(intersections[0].T.Compare(8.66025));
            Assert.IsTrue(intersections[1].T.Compare(8.66025));

            ray = new Ray(Tuple4D.CreatePoint(1, 1, -5), Tuple4D.CreateVector(-0.5, -1, 1).Normalize());
            intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.IsTrue(intersections[0].T.Compare(4.55006));
            Assert.IsTrue(intersections[1].T.Compare(49.44994));
        }

        [TestMethod]
        public void IntersectingConeEndCaps()
        {
            Cone cone = new Cone();
            cone.Minimum = -0.5;
            cone.Maximum = 0.5;
            cone.Closed = true;

            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 1, 0).Normalize());
            Intersections intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -0.25), Tuple4D.CreateVector(0, 1, 1).Normalize());
            intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -0.25), Tuple4D.CreateVector(0, 1, 0).Normalize());
            intersections = cone.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(4, intersections.Count);
        }

        [TestMethod]
        public void NormalVectorOnCone()
        {
            Cone cone = new Cone();
            Tuple4D normal = cone.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 0, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, 0), normal);

            normal = cone.GetNormalAtPointImpl(Tuple4D.CreatePoint(1, 1, 1));
            Assert.AreEqual(Tuple4D.CreateVector(1, -Constants.Sqrt2, 1), normal);

            normal = cone.GetNormalAtPointImpl(Tuple4D.CreatePoint(-1, -1, 0));
            Assert.AreEqual(Tuple4D.CreateVector(-1, 1, 0), normal);
        }

        [TestMethod]
        public void DefaultMinimumAndMaximum()
        {
            Cylinder cylinder = new Cylinder();
            Assert.AreEqual(double.NegativeInfinity, cylinder.Minimum);
            Assert.AreEqual(double.PositiveInfinity, cylinder.Maximum);
        }

        [TestMethod]
        public void IntersectConstrainedCylinder()
        {
            Cylinder cylinder = new Cylinder();
            cylinder.Minimum = 1;
            cylinder.Maximum = 2;
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 1.5, 0), Tuple4D.CreateVector(0.1, 1, 0).Normalize());
            Intersections intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 3, -5), Tuple4D.CreateVector(0, 0, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 2, -5), Tuple4D.CreateVector(0, 0, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 1, -5), Tuple4D.CreateVector(0, 0, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 1.5, -2), Tuple4D.CreateVector(0, 0, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);
        }

        [TestMethod]
        public void DefaultClosedValueForCylinder()
        {
            Cylinder cylinder = new Cylinder();
            Assert.IsFalse(cylinder.Closed);
        }

        [TestMethod]
        public void IntersectingCapsOfClosedCylinder()
        {
            Cylinder cylinder = new Cylinder();
            cylinder.Minimum = 1;
            cylinder.Maximum = 2;
            cylinder.Closed = true;
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 3, 0), Tuple4D.CreateVector(0, -1, 0).Normalize());
            Intersections intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 3, -2), Tuple4D.CreateVector(0, -1, 2).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 4, -2), Tuple4D.CreateVector(0, -1, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -2), Tuple4D.CreateVector(0, 1, 2).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, -1, -2), Tuple4D.CreateVector(0, 1, 1).Normalize());
            intersections = cylinder.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(2, intersections.Count);
        }

        [TestMethod]
        public void NormalVectorOnEndCaps()
        {
            Cylinder cylinder = new Cylinder();
            cylinder.Minimum = 1;
            cylinder.Maximum = 2;
            cylinder.Closed = true;
            Tuple4D normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 1, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, -1, 0), normal);

            normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0.5, 1, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, -1, 0), normal);

            normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 1, 0.5));
            Assert.AreEqual(Tuple4D.CreateVector(0, -1, 0), normal); ;

            normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 2, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, 1, 0), normal);

            normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0.5, 2, 0));
            Assert.AreEqual(Tuple4D.CreateVector(0, 1, 0), normal);

            normal = cylinder.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 2, 0.5));
            Assert.AreEqual(Tuple4D.CreateVector(0, 1, 0), normal);
        }
    }
}
