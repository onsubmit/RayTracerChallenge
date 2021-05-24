namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Extensions;

    [TestClass]
    public class Tuple4DTests
    {
        [TestMethod]
        public void TupleIsPoint()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 1.0;

            Tuple4D a = Tuple4D.Create(X, Y, Z, W);
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

            Tuple4D a = Tuple4D.Create(X, Y, Z, W);
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

            Tuple4D a = Tuple4D.CreatePoint(X, Y, Z);
            Tuple4D t = Tuple4D.Create(X, Y, Z, W);
            Assert.AreEqual(t, a);
        }

        [TestMethod]
        public void CreateVector()
        {
            const double X = 4.3;
            const double Y = -4.2;
            const double Z = 3.1;
            const double W = 0.0;

            Tuple4D v = Tuple4D.CreateVector(X, Y, Z);
            Tuple4D t = Tuple4D.Create(X, Y, Z, W);
            Assert.AreEqual(t, v);
        }

        [TestMethod]
        public void AddTuples()
        {
            Tuple4D a1 = Tuple4D.Create(3, -2, 5, 1);
            Tuple4D a2 = Tuple4D.Create(-2, 3, 1, w: 0);
            Assert.AreEqual(Tuple4D.Create(1, 1, 6, 1), a1 + a2);
            Assert.AreEqual(a1 + a2, a2 + a1);
        }

        [TestMethod]
        public void SubtractVectorFromPoint()
        {
            Tuple4D p = Tuple4D.CreatePoint(3, 2, 1);
            Tuple4D v = Tuple4D.CreateVector(5, 6, 7);
            Assert.AreEqual(Tuple4D.CreatePoint(-2, -4, -6), p - v);
        }

        [TestMethod]
        public void SubtractVectorFromVector()
        {
            Tuple4D p = Tuple4D.CreateVector(3, 2, 1);
            Tuple4D v = Tuple4D.CreateVector(5, 6, 7);
            Assert.AreEqual(Tuple4D.CreateVector(-2, -4, -6), p - v);
            Assert.AreEqual(Tuple4D.CreateVector(2, 4, 6), v - p);
            Assert.AreEqual(-(p - v), v - p);
        }

        [TestMethod]
        public void SubtractVectorFromZeroVector()
        {
            Tuple4D zero = Tuple4D.ZeroVector;
            Tuple4D v = Tuple4D.CreateVector(1, -2, 3);
            Assert.AreEqual(Tuple4D.CreateVector(-1, 2, -3), zero - v);
        }

        [TestMethod]
        public void NegateTuple()
        {
            Tuple4D a = Tuple4D.Create(1, -2, 3, -4);
            Assert.AreEqual(Tuple4D.Create(-1, 2, -3, 4), -a);
        }

        [TestMethod]
        public void MultiplyTupleByScalar()
        {
            Tuple4D a = Tuple4D.Create(1, -2, 3, -4);
            Assert.AreEqual(Tuple4D.Create(3.5, -7, 10.5, -14), a * 3.5);
            Assert.AreEqual(a * 3.5, 3.5 * a);
        }

        [TestMethod]
        public void MultiplyTupleByFraction()
        {
            Tuple4D a = Tuple4D.Create(1, -2, 3, -4);
            Assert.AreEqual(Tuple4D.Create(0.5, -1, 1.5, -2), a * 0.5);
            Assert.AreEqual(a * 0.5, 0.5 * a);
        }

        [TestMethod]
        public void DivideTupleByScalar()
        {
            Tuple4D a = Tuple4D.Create(1, -2, 3, -4);
            Assert.AreEqual(Tuple4D.Create(0.5, -1, 1.5, -2), a / 2);
        }

        [TestMethod]
        public void VerifyMagnitude()
        {
            double magnitude = Tuple4D.CreateVector(0, 1, 0).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(1),
                $"Expected: 1, Actual: {magnitude}");

            magnitude = Tuple4D.CreateVector(0, 0, 1).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(1),
                $"Expected: 1, Actual: {magnitude}");

            double root14 = Math.Sqrt(14);
            magnitude = Tuple4D.CreateVector(1, 2, 3).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(root14),
                $"Expected: {root14}, Actual: {magnitude}");

            magnitude = Tuple4D.CreateVector(-1, -2, -3).Magnitude;
            Assert.IsTrue(
                magnitude.Compare(root14),
                $"Expected: {root14}, Actual: {magnitude}");
        }

        [TestMethod]
        public void VerifyUnitVectors()
        {
            Tuple4D v = Tuple4D.CreateVector(4, 0, 0);
            Tuple4D unitVector = v.Normalize();
            Assert.AreEqual(Tuple4D.CreateVector(1, 0, 0), unitVector);

            double root14 = Math.Sqrt(14);
            v = Tuple4D.CreateVector(1, 2, 3);
            unitVector = v.Normalize();
            Assert.AreEqual(Tuple4D.CreateVector(1 / root14, 2 / root14, 3 / root14), unitVector);
            Assert.AreEqual(1, unitVector.Magnitude);
        }

        [TestMethod]
        public void VerifyDotProduct()
        {
            Tuple4D a = Tuple4D.CreateVector(1, 2, 3);
            Tuple4D b = Tuple4D.CreateVector(2, 3, 4);
            double dotProduct = a.GetDotProductWith(b);
            Assert.IsTrue(
                dotProduct.Compare(20),
                $"Expected: {20}, Actual: {dotProduct}");

            Assert.AreEqual(a.GetDotProductWith(b), b.GetDotProductWith(a));
        }

        [TestMethod]
        public void VerifyCrossProduct()
        {
            Tuple4D a = Tuple4D.CreateVector(1, 2, 3);
            Tuple4D b = Tuple4D.CreateVector(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreateVector(-1, 2, -1), a.GetCrossProductWith(b));
            Assert.AreEqual(Tuple4D.CreateVector(1, -2, 1), b.GetCrossProductWith(a));
            Assert.AreEqual(-a.GetCrossProductWith(b), b.GetCrossProductWith(a));
            Assert.AreEqual(-b.GetCrossProductWith(a), a.GetCrossProductWith(b));
        }

        [TestMethod]
        public void ReflectVectorAt45Degrees()
        {
            Tuple4D vector = Tuple4D.CreateVector(1, -1, 0);
            Tuple4D normal = Tuple4D.CreateVector(0, 1, 0);
            Tuple4D reflected = vector.ReflectVector(normal);
            Assert.AreEqual(Tuple4D.CreateVector(1, 1, 0), reflected);
        }

        [TestMethod]
        public void ReflectVectorOffSlantedSurface()
        {
            Tuple4D vector = Tuple4D.CreateVector(0, -1, 0);
            Tuple4D normal = Tuple4D.CreateVector(Constants.Sqrt2Over2, Constants.Sqrt2Over2, 0);
            Tuple4D reflected = vector.ReflectVector(normal);
            Assert.AreEqual(Tuple4D.CreateVector(1, 0, 0), reflected);
        }
    }
}
