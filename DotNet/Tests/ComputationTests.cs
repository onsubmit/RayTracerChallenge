namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class ComputationTests
    {
        [TestMethod]
        public void PrecomputeIntersection()
        {
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = new Sphere();
            Intersection intersection = new Intersection(4, sphere);
            Computation computation = new Computation(intersection, ray);

            Assert.AreEqual(intersection.T, computation.T);
            Assert.AreEqual(sphere, computation.Object);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 0, -1), computation.Point);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, -1), computation.EyeVector);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, -1), computation.NormalVector);
        }

        [TestMethod]
        public void IntersectionOccursOutside()
        {
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(new Intersection(4, sphere), hit);
            Computation computation = new Computation(hit, ray);
            Assert.IsFalse(computation.Inside);
        }

        [TestMethod]
        public void IntersectionOccursInside()
        {
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, 0), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Intersection hit = intersections.GetHit();
            Assert.AreEqual(new Intersection(1, sphere), hit);
            Computation computation = new Computation(hit, ray);
            Assert.IsTrue(computation.Inside);
        }
    }
}
