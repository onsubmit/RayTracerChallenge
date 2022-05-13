namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class CubeTests
    {
        [TestMethod]
        public void RayIntersectsCube()
        {
            Cube cube = new Cube();
            Ray ray = new Ray(Tuple4D.CreatePoint(5, 0.5, 0), Tuple4D.CreateVector(-1, 0, 0));
            Intersections intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(-5, 0.5, 0), Tuple4D.CreateVector(1, 0, 0));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0.5, 5, 0), Tuple4D.CreateVector(0, -1, 0));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0.5, -5, 0), Tuple4D.CreateVector(0, 1, 0));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0.5, 0, 5), Tuple4D.CreateVector(0, 0, -1));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0.5, 0, -5), Tuple4D.CreateVector(0, 0, 1));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(4, intersections[0].T);
            Assert.AreEqual(6, intersections[1].T);

            ray = new Ray(Tuple4D.CreatePoint(0, 0.5, 0), Tuple4D.CreateVector(0, 0, 1));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(-1, intersections[0].T);
            Assert.AreEqual(1, intersections[1].T);
        }

        [TestMethod]
        public void RayMissesCube()
        {
            Cube cube = new Cube();
            Ray ray = new Ray(Tuple4D.CreatePoint(-2, 0, 0), Tuple4D.CreateVector(0.2673, 0.5345, 0.8018));
            Intersections intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, -2, 0), Tuple4D.CreateVector(0.8018, 0.2673, 0.5345));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 0, -2), Tuple4D.CreateVector(0.5345, 0.8018, 0.2673));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(2, 0, 2), Tuple4D.CreateVector(0, 0, -1));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(0, 2, 2), Tuple4D.CreateVector(0, -1, 0));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);

            ray = new Ray(Tuple4D.CreatePoint(2, 2, 0), Tuple4D.CreateVector(-1, 0, 0));
            intersections = cube.GetIntersectionsWith(ray);
            Assert.AreEqual(0, intersections.Count);
        }

        [TestMethod]
        public void NormalOnSurfaceOfCube()
        {
            Cube cube = new Cube();
            Tuple4D point = Tuple4D.CreatePoint(1, 0.5, -0.8);
            Assert.AreEqual(Tuple4D.CreateVector(1, 0, 0), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(-1, -0.2, 0.9);
            Assert.AreEqual(Tuple4D.CreateVector(-1, 0, 0), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(-0.4, 1, -0.1);
            Assert.AreEqual(Tuple4D.CreateVector(0, 1, 0), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(0.3, -1, -0.7);
            Assert.AreEqual(Tuple4D.CreateVector(0, -1, 0), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(-0.6, 0.3, 1);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, 1), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(0.4, 0.4, -1);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, -1), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(1, 1, 1);
            Assert.AreEqual(Tuple4D.CreateVector(1, 0, 0), cube.GetNormalAtPointImpl(point));

            point = Tuple4D.CreatePoint(-1, -1, -1);
            Assert.AreEqual(Tuple4D.CreateVector(-1, 0, 0), cube.GetNormalAtPointImpl(point));
        }
    }
}
