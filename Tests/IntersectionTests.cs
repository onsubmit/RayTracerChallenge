namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class IntersectionTests
    {
        [TestMethod]
        public void BasicTest()
        {
            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection intersection = new Intersection(3.5, sphere);
            Assert.AreEqual(3.5, intersection.T);
            Assert.AreEqual(sphere, intersection.Object);

        }

        [TestMethod]
        public void SphereIntersection()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection[] intersectionPoints = ray.GetIntersectionsWith(sphere);
            Assert.AreEqual(2, intersectionPoints.Length);
            Assert.AreEqual(4, intersectionPoints[0].T);
            Assert.AreEqual(6, intersectionPoints[1].T);
        }

        [TestMethod]
        public void SphereIntersectionAtTangent()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 1, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection[] intersectionPoints = ray.GetIntersectionsWith(sphere);
            Assert.AreEqual(2, intersectionPoints.Length);
            Assert.AreEqual(5, intersectionPoints[0].T);
            Assert.AreEqual(5, intersectionPoints[1].T);
        }

        [TestMethod]
        public void SphereIntersectionNowhere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 2, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection[] intersectionPoints = ray.GetIntersectionsWith(sphere);
            Assert.AreEqual(0, intersectionPoints.Length);
        }

        [TestMethod]
        public void SphereIntersectionRayOriginWithinSphere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection[] intersectionPoints = ray.GetIntersectionsWith(sphere);
            Assert.AreEqual(2, intersectionPoints.Length);
            Assert.AreEqual(-1, intersectionPoints[0].T);
            Assert.AreEqual(1, intersectionPoints[1].T);
        }

        [TestMethod]
        public void SphereIntersectionRayOriginAfterSphere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, 5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere(Tuple4D.CreatePoint(0, 0, 0), 1);
            Intersection[] intersectionPoints = ray.GetIntersectionsWith(sphere);
            Assert.AreEqual(2, intersectionPoints.Length);
            Assert.AreEqual(-6, intersectionPoints[0].T);
            Assert.AreEqual(-4, intersectionPoints[1].T);
        }
    }
}
