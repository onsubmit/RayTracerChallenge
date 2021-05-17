namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class PlaneTests
    {
        [TestMethod]
        public void NormalIsConstant()
        {
            Plane plane = new Plane();
            Tuple4D n1 = plane.GetNormalAtPointImpl(Tuple4D.CreatePoint(0, 0, 0));
            Tuple4D n2 = plane.GetNormalAtPointImpl(Tuple4D.CreatePoint(10, 0, -10));
            Tuple4D n3 = plane.GetNormalAtPointImpl(Tuple4D.CreatePoint(-5, 0, 150));

            Tuple4D expected = Tuple4D.CreateVector(0, 1, 0);
            Assert.AreEqual(expected, n1);
            Assert.AreEqual(expected, n2);
            Assert.AreEqual(expected, n3);
        }

        [TestMethod]
        public void IntersectWithRayParallelToPlane()
        {
            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 10, 0), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = plane.GetIntersectionsWithImpl(ray);
            Assert.IsFalse(intersections.HasHit);
        }

        [TestMethod]
        public void IntersectWithCoplanarRay()
        {
            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0), Tuple4D.CreateVector(0, 0, 1));
            Intersections intersections = plane.GetIntersectionsWithImpl(ray);
            Assert.IsFalse(intersections.HasHit);
        }

        [TestMethod]
        public void IntersectWithRayFromAbove()
        {
            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 1, 0), Tuple4D.CreateVector(0, -1, 0));
            Intersections intersections = plane.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(1, intersections.Count);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(1, hit.T);
            Assert.AreEqual(plane, hit.Object);
        }

        [TestMethod]
        public void IntersectWithRayFromBelow()
        {
            Plane plane = new Plane();
            Ray ray = new Ray(Tuple4D.CreatePoint(0, -1, 0), Tuple4D.CreateVector(0, 1, 0));
            Intersections intersections = plane.GetIntersectionsWithImpl(ray);
            Assert.AreEqual(1, intersections.Count);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(1, hit.T);
            Assert.AreEqual(plane, hit.Object);
        }
    }
}
