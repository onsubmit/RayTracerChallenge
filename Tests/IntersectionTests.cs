namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Extensions;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class IntersectionTests
    {
        [TestMethod]
        public void BasicTest()
        {
            Sphere sphere = new Sphere();
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

            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);
        }

        [TestMethod]
        public void SphereIntersectionAtTangent()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 1, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere();
            Intersections intersectionPoints = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(2, intersectionPoints.Count);
            Assert.AreEqual(5, intersectionPoints[0].T);
            Assert.AreEqual(5, intersectionPoints[1].T);
        }

        [TestMethod]
        public void SphereIntersectionNowhere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 2, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);
        }

        [TestMethod]
        public void SphereIntersectionRayOriginWithinSphere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(-1, intersections[0].T);
            Assert.AreEqual(1, intersections[1].T);
        }

        [TestMethod]
        public void SphereIntersectionRayOriginAfterSphere()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, 5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(-6, intersections[0].T);
            Assert.AreEqual(-4, intersections[1].T);
        }

        [TestMethod]
        public void AggregatingIntersections()
        {
            Sphere sphere = new Sphere();
            Intersection i1 = new Intersection(1, sphere);
            Intersection i2 = new Intersection(2, sphere);
            Intersections intersections = new Intersections(i1, i2);

            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(1, intersections[0].T);
            Assert.AreEqual(2, intersections[1].T);
        }

        [TestMethod]
        public void IntersectionSetsObject()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            Sphere sphere = new Sphere();
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Assert.AreEqual(2, intersections.Count);
            Assert.AreEqual(sphere, intersections[0].Object);
            Assert.AreEqual(sphere, intersections[1].Object);
        }

        [TestMethod]
        public void GetHitWithAllPositiveT()
        {
            Sphere sphere = new Sphere();
            Intersection i1 = new Intersection(1, sphere);
            Intersection i2 = new Intersection(2, sphere);
            Intersections intersections = new Intersections(i1, i2);
            Assert.AreEqual(i1, intersections.GetHit());
        }

        [TestMethod]
        public void GetHitSomeWithNegativeT()
        {
            Sphere sphere = new Sphere();
            Intersection i1 = new Intersection(-1, sphere);
            Intersection i2 = new Intersection(1, sphere);
            Intersections intersections = new Intersections(i1, i2);
            Assert.AreEqual(i2, intersections.GetHit());
        }

        [TestMethod]
        public void GetHitWithAllNegativeT()
        {
            Sphere sphere = new Sphere();
            Intersection i1 = new Intersection(-2, sphere);
            Intersection i2 = new Intersection(-1, sphere);
            Intersections intersections = new Intersections(i1, i2);
            Assert.IsNull(intersections.GetHit());
        }

        [TestMethod]
        public void GetHitWithManyIntersections()
        {
            Sphere sphere = new Sphere();
            Intersection i1 = new Intersection(5, sphere);
            Intersection i2 = new Intersection(7, sphere);
            Intersection i3 = new Intersection(-3, sphere);
            Intersection i4 = new Intersection(2, sphere);
            Intersections intersections = new Intersections(i1, i2, i3, i4);
            Assert.AreEqual(i4, intersections.GetHit());
        }

        [TestMethod]
        public void IntersectScaledShapeWithRay()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            TestShape shape = new TestShape()
            {
                Transformation = Matrix.GetScalingMatrix(2, 2, 2)
            };

            _ = shape.GetIntersectionsWith(ray);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 0, -2.5), shape.ObjectSpaceRay.Origin);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, 0.5), shape.ObjectSpaceRay.Direction);
        }

        [TestMethod]
        public void IntersectTranslatedShapeWithRay()
        {
            Tuple4D origin = Tuple4D.CreatePoint(0, 0, -5);
            Tuple4D direction = Tuple4D.CreateVector(0, 0, 1);
            Ray ray = new Ray(origin, direction);

            TestShape shape = new TestShape()
            {
                Transformation = Matrix.GetTranslationMatrix(5, 0, 0)
            };

            _ = shape.GetIntersectionsWith(ray);
            Assert.AreEqual(Tuple4D.CreatePoint(-5, 0, -5), shape.ObjectSpaceRay.Origin);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, 1), shape.ObjectSpaceRay.Direction);
        }

        [TestMethod]
        public void HitShouldOffsetPoint()
        {
            Ray ray = new Ray(Tuple4D.CreatePoint(0, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            Sphere sphere = new Sphere();
            sphere.Transformation = Matrix.GetTranslationMatrix(0, 0, 1);
            Intersections intersections = sphere.GetIntersectionsWith(ray);
            Intersection hit = intersections.GetHit();
            Computation computation = new Computation(hit, ray);
            Assert.IsTrue(computation.OverPoint.Z < -DoubleExtensions.Epsilon / 2);
            Assert.IsTrue(computation.Point.Z > computation.OverPoint.Z);
        }
    }
}
