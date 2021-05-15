namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class RayTests
    {
        [TestMethod]
        public void CreateAndQuery()
        {
            Tuple4D origin = Tuple4D.CreatePoint(1, 2, 3);
            Tuple4D direction = Tuple4D.CreateVector(4, 5 ,6);
            Ray ray = new Ray(origin, direction);

            Assert.AreEqual(origin, ray.Origin);
            Assert.AreEqual(direction, ray.Direction);
        }

        [TestMethod]
        public void GetPointFromDistance()
        {
            Tuple4D origin = Tuple4D.CreatePoint(2, 3, 4);
            Tuple4D direction = Tuple4D.CreateVector(1, 0, 0);
            Ray ray = new Ray(origin, direction);

            Assert.AreEqual(Tuple4D.CreatePoint(2, 3, 4), ray.GetPointOnRayAtDistance(0));
            Assert.AreEqual(Tuple4D.CreatePoint(3, 3, 4), ray.GetPointOnRayAtDistance(1));
            Assert.AreEqual(Tuple4D.CreatePoint(1, 3, 4), ray.GetPointOnRayAtDistance(-1));
            Assert.AreEqual(Tuple4D.CreatePoint(4.5, 3, 4), ray.GetPointOnRayAtDistance(2.5));
        }
    }
}
