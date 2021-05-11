namespace Tests
{
    using System;
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

            TupleEx a = TupleEx.Create(X, Y, Z, W);
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

            TupleEx a = TupleEx.Create(X, Y, Z, W);
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

            TupleEx a = TupleEx.CreatePoint(X, Y, Z);
            TupleEx t = TupleEx.Create(X, Y, Z, W);
            Assert.AreEqual(t, a);
        }

        [TestMethod]
        public void CreateVector()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 0.0;

            TupleEx v = TupleEx.CreateVector(X, Y, Z);
            TupleEx t = TupleEx.Create(X, Y, Z, W);
            Assert.AreEqual(t, v);
        }

        [TestMethod]
        public void AddTuples()
        {
            TupleEx a1 = TupleEx.Create(3, -2, 5, 1);
            TupleEx a2 = TupleEx.Create(-2, 3, 1, w: 0);
            Assert.AreEqual(TupleEx.Create(1, 1, 6, 1), a1 + a2);
        }

        [TestMethod]
        public void SubtractVectorFromPoint()
        {
            TupleEx p = TupleEx.CreatePoint(3, 2, 1);
            TupleEx v = TupleEx.CreateVector(5, 6, 7);
            Assert.AreEqual(TupleEx.CreatePoint(-2, -4, -6), p - v);
        }

        [TestMethod]
        public void SubtractVectorFromVector()
        {
            TupleEx p = TupleEx.CreateVector(3, 2, 1);
            TupleEx v = TupleEx.CreateVector(5, 6, 7);
            Assert.AreEqual(TupleEx.CreateVector(-2, -4, -6), p - v);
        }

        [TestMethod]
        public void SubtractVectorFromZeroVector()
        {
            TupleEx zero = TupleEx.ZeroVector;
            TupleEx v = TupleEx.CreateVector(1, -2, 3);
            Assert.AreEqual(TupleEx.CreateVector(-1, 2, -3), zero - v);
        }

        [TestMethod]
        public void NegateTuple()
        {
            TupleEx a = TupleEx.Create(1, -2, 3, -4);
            Assert.AreEqual(TupleEx.Create(-1, 2, -3, 4), -a);
        }

        [TestMethod]
        public void MultiplyTupleByScalar()
        {
            TupleEx a = TupleEx.Create(1, -2, 3, -4);
            Assert.AreEqual(TupleEx.Create(3.5, -7, 10.5, -14), a * 3.5);
        }

        [TestMethod]
        public void MultiplyTupleByFraction()
        {
            TupleEx a = TupleEx.Create(1, -2, 3, -4);
            Assert.AreEqual(TupleEx.Create(0.5, -1, 1.5, -2), a * 0.5);
        }

        [TestMethod]
        public void DivideTupleByScalar()
        {
            TupleEx a = TupleEx.Create(1, -2, 3, -4);
            Assert.AreEqual(TupleEx.Create(0.5, -1, 1.5, -2), a / 2);
        }

        [TestMethod]
        public void VerifyMagnitude()
        {
            double magnitude = TupleEx.CreateVector(0, 1, 0).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(1),
                $"Expected: 1, Actual: {magnitude}");

            magnitude = TupleEx.CreateVector(0, 0, 1).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(1),
                $"Expected: 1, Actual: {magnitude}");

            double root14 = Math.Sqrt(14);
            magnitude = TupleEx.CreateVector(1, 2, 3).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(root14),
                $"Expected: {root14}, Actual: {magnitude}");

            magnitude = TupleEx.CreateVector(-1, -2, -3).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(root14),
                $"Expected: {root14}, Actual: {magnitude}");
        }

        [TestMethod]
        public void VerifyUnitVectors()
        {
            TupleEx v = TupleEx.CreateVector(4, 0, 0);
            TupleEx unitVector = v.Normalize();
            Assert.AreEqual(TupleEx.CreateVector(1, 0, 0), unitVector);

            double root14 = Math.Sqrt(14);
            v = TupleEx.CreateVector(1, 2, 3);
            unitVector = v.Normalize();
            Assert.AreEqual(TupleEx.CreateVector(1 / root14, 2 / root14, 3 / root14), unitVector);
            Assert.AreEqual(1, unitVector.Magnitude);
        }

        [TestMethod]
        public void VerifyDotProduct()
        {
            TupleEx a = TupleEx.CreateVector(1, 2, 3);
            TupleEx b = TupleEx.CreateVector(2, 3, 4);
            double dotProduct = a.GetDotProductWith(b);
            Assert.IsTrue(
                dotProduct.Compare(20),
                $"Expected: {20}, Actual: {dotProduct}");
        }

        [TestMethod]
        public void VerifyCrossProduct()
        {
            TupleEx a = TupleEx.CreateVector(1, 2, 3);
            TupleEx b = TupleEx.CreateVector(2, 3, 4);
            Assert.AreEqual(TupleEx.CreateVector(-1, 2, -1), a.GetCrossProductWith(b));
        }
    }
}
