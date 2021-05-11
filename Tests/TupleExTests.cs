namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge.Numerics;

    [TestClass]
    public class TupleExTests
    {
        [TestMethod]
        public void TupleIsPoint()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 1.0;

            TupleEx a = new TupleEx(X, Y, Z, W);
            Assert.AreEqual(X, a.X);
            Assert.AreEqual(Y, a.Y);
            Assert.AreEqual(Z, a.Z);
            Assert.AreEqual(W, a.W);
            Assert.IsTrue(a.IsPoint);
            Assert.IsFalse(a.IsVector);
        }

        [TestMethod]
        public void TupleIsVector()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 0.0;

            TupleEx a = new TupleEx(X, Y, Z, W);
            Assert.AreEqual(X, a.X);
            Assert.AreEqual(Y, a.Y);
            Assert.AreEqual(Z, a.Z);
            Assert.AreEqual(W, a.W);
            Assert.IsFalse(a.IsPoint);
            Assert.IsTrue(a.IsVector);
        }

        [TestMethod]
        public void CreateTuple()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 1.0;

            PointEx a = new PointEx(X, Y, Z);
            TupleEx t = new TupleEx(X, Y, Z, W);
            Assert.AreEqual(t, a);
        }

        [TestMethod]
        public void CreateVector()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 0.0;

            VectorEx v = new VectorEx(X, Y, Z);
            TupleEx t = new TupleEx(X, Y, Z, W);
            bool equal = t == v;
            Assert.AreEqual(t, v);
        }
    }
}
