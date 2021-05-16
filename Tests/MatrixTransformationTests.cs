namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class MatrixTransformationTests
    {
        [TestMethod]
        public void TranslatePoint()
        {
            Matrix transform = Matrix.GetTranslationMatrix(5, -3, 2);
            Matrix expected = new Matrix(
                new double[4, 4]
                {
                    { 1, 0, 0, 5 },
                    { 0, 1, 0, -3 },
                    { 0, 0, 1, 2 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, transform);

            Tuple4D point = Tuple4D.CreatePoint(-3, 4, 5);
            Assert.AreEqual(Tuple4D.CreatePoint(2, 1, 7), transform * point);
        }

        [TestMethod]
        public void TranslatePointInverse()
        {
            Matrix transform = Matrix.GetTranslationMatrix(5, -3, 2);
            Matrix inverse = transform.GetInverse();

            Matrix expected = new Matrix(
                new double[4, 4]
                {
                    { 1, 0, 0, -5 },
                    { 0, 1, 0, 3 },
                    { 0, 0, 1, -2 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, inverse);

            Tuple4D point = Tuple4D.CreatePoint(-3, 4, 5);
            Assert.AreEqual(Tuple4D.CreatePoint(-8, 7, 3), inverse * point);
        }

        [TestMethod]
        public void TranslateVector()
        {
            Matrix transform = Matrix.GetTranslationMatrix(5, -3, 2);
            Tuple4D vector = Tuple4D.CreateVector(-3, 4, 5);
            Assert.AreEqual(vector, transform * vector);
        }

        [TestMethod]
        public void ScalePoint()
        {
            Matrix transform = Matrix.GetScalingMatrix(2, 3, 4);
            Matrix expected = new Matrix(
                new double[4, 4]
                {
                    { 2, 0, 0, 0 },
                    { 0, 3, 0, 0 },
                    { 0, 0, 4, 0 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, transform);

            Tuple4D point = Tuple4D.CreatePoint(-4, 6, 8);
            Assert.AreEqual(Tuple4D.CreatePoint(-8, 18, 32), transform * point);
        }

        [TestMethod]
        public void ScaleVector()
        {
            Matrix transform = Matrix.GetScalingMatrix(2, 3, 4);
            Tuple4D vector = Tuple4D.CreateVector(-4, 6, 8);
            Assert.AreEqual(Tuple4D.CreateVector(-8, 18, 32), transform * vector);
        }

        [TestMethod]
        public void ScaleVectorInverse()
        {
            Matrix transform = Matrix.GetScalingMatrix(2, 3, 4);
            Matrix inverse = transform.GetInverse();

            Matrix expected = new Matrix(
                new double[4, 4]
                {
                    { 0.5, 0, 0, 0 },
                    { 0, 0.33333, 0, 0 },
                    { 0, 0, 0.25, 0 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, inverse);

            Tuple4D vector = Tuple4D.CreateVector(-4, 6, 8);
            Assert.AreEqual(Tuple4D.CreateVector(-2, 2, 2), inverse * vector);
        }

        [TestMethod]
        public void ReflectPoint()
        {
            Matrix transform = Matrix.GetScalingMatrix(-1, 1, 1);
            Matrix expected = new Matrix(
                new double[4, 4]
                {
                    { -1, 0, 0, 0 },
                    { 0, 1, 0, 0 },
                    { 0, 0, 1, 0 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, transform);

            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(-2, 3, 4), transform * point);
        }

        [TestMethod]
        public void RotatePointAroundXAxis()
        {
            double sqrt2Over2 = Math.Sqrt(2) / 2;

            Tuple4D point = Tuple4D.CreatePoint(0, 1, 0);
            Matrix halfQuarter = Matrix.GetRotationMatrixX(Math.PI / 4);
            Matrix fullQuarter = Matrix.GetRotationMatrixX(Math.PI / 2);

            Assert.AreEqual(new Matrix(
                new double[4, 4]
                {
                    { 1, 0, 0, 0 },
                    { 0, sqrt2Over2, -sqrt2Over2, 0 },
                    { 0, sqrt2Over2, sqrt2Over2, 0 },
                    { 0, 0, 0, 1 },
                }),
                halfQuarter);

            Assert.AreEqual(new Matrix(
                new double[4, 4]
                {
                    { 1, 0, 0, 0 },
                    { 0, 0, -1, 0 },
                    { 0, 1, 0, 0 },
                    { 0, 0, 0, 1 },
                }),
                fullQuarter);

            Assert.AreEqual(Tuple4D.CreatePoint(0, sqrt2Over2, sqrt2Over2), halfQuarter * point);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 0, 1), fullQuarter * point);
        }

        [TestMethod]
        public void RotatePointAroundXAxisInverse()
        {
            double sqrt2Over2 = Math.Sqrt(2) / 2;

            Tuple4D point = Tuple4D.CreatePoint(0, 1, 0);
            Matrix halfQuarter = Matrix.GetRotationMatrixX(Math.PI / 4);
            Matrix inverse = halfQuarter.GetInverse();

            Assert.AreEqual(new Matrix(
                new double[4, 4]
                {
                    { 1, 0, 0, 0 },
                    { 0, sqrt2Over2, sqrt2Over2, 0 },
                    { 0, -sqrt2Over2, sqrt2Over2, 0 },
                    { 0, 0, 0, 1 },
                }),
                inverse);

            Assert.AreEqual(Tuple4D.CreatePoint(0, sqrt2Over2, -sqrt2Over2), inverse * point);
        }

        [TestMethod]
        public void RotatePointAroundYAxis()
        {
            double sqrt2Over2 = Math.Sqrt(2) / 2;

            Tuple4D point = Tuple4D.CreatePoint(0, 0, 1);
            Matrix halfQuarter = Matrix.GetRotationMatrixY(Math.PI / 4);
            Matrix fullQuarter = Matrix.GetRotationMatrixY(Math.PI / 2);

            Assert.AreEqual(Tuple4D.CreatePoint(sqrt2Over2, 0, sqrt2Over2), halfQuarter * point);
            Assert.AreEqual(Tuple4D.CreatePoint(1, 0, 0), fullQuarter * point);
        }

        [TestMethod]
        public void RotatePointAroundZAxis()
        {
            double sqrt2Over2 = Math.Sqrt(2) / 2;

            Tuple4D point = Tuple4D.CreatePoint(0, 1, 0);
            Matrix halfQuarter = Matrix.GetRotationMatrixZ(Math.PI / 4);
            Matrix fullQuarter = Matrix.GetRotationMatrixZ(Math.PI / 2);

            Assert.AreEqual(Tuple4D.CreatePoint(-sqrt2Over2, sqrt2Over2, 0), halfQuarter * point);
            Assert.AreEqual(Tuple4D.CreatePoint(-1, 0, 0), fullQuarter * point);
        }

        [TestMethod]
        public void ShearMatrixXY()
        {
            Matrix transform = Matrix.GetShearingMatrix(xy: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(5, 3, 4), transform * point);
        }

        [TestMethod]
        public void ShearMatrixXZ()
        {
            Matrix transform = Matrix.GetShearingMatrix(xz: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(6, 3, 4), transform * point);
        }

        [TestMethod]
        public void ShearMatrixYX()
        {
            Matrix transform = Matrix.GetShearingMatrix(yx: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(2, 5, 4), transform * point);
        }

        [TestMethod]
        public void ShearMatrixYZ()
        {
            Matrix transform = Matrix.GetShearingMatrix(yz: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(2, 7, 4), transform * point);
        }

        [TestMethod]
        public void ShearMatrixZX()
        {
            Matrix transform = Matrix.GetShearingMatrix(zx: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(2, 3, 6), transform * point);
        }

        [TestMethod]
        public void ShearMatrixZY()
        {
            Matrix transform = Matrix.GetShearingMatrix(zy: 1);
            Tuple4D point = Tuple4D.CreatePoint(2, 3, 4);
            Assert.AreEqual(Tuple4D.CreatePoint(2, 3, 7), transform * point);
        }

        [TestMethod]
        public void IndividualTransformationsAppliedSequentially()
        {
            Tuple4D p = Tuple4D.CreatePoint(1, 0, 1);
            Matrix a = Matrix.GetRotationMatrixX(Math.PI / 2);
            Matrix b = Matrix.GetScalingMatrix(5, 5, 5);
            Matrix c = Matrix.GetTranslationMatrix(10, 5, 7);

            // Apply rotation first.
            Tuple4D p2 = a * p;
            Assert.AreEqual(Tuple4D.CreatePoint(1, -1, 0), p2);

            // Then apply scaling.
            Tuple4D p3 = b * p2;
            Assert.AreEqual(Tuple4D.CreatePoint(5, -5, 0), p3);

            // Then apply translation.
            Tuple4D p4 = c * p3;
            Assert.AreEqual(Tuple4D.CreatePoint(15, 0, 7), p4);
        }

        [TestMethod]
        public void ChainedTransformationsAppliedInReverseOrder()
        {
            Tuple4D p = Tuple4D.CreatePoint(1, 0, 1);
            Matrix a = Matrix.GetRotationMatrixX(Math.PI / 2);
            Matrix b = Matrix.GetScalingMatrix(5, 5, 5);
            Matrix c = Matrix.GetTranslationMatrix(10, 5, 7);

            Matrix t = c * b * a;
            Assert.AreEqual(Tuple4D.CreatePoint(15, 0, 7), t * p);
        }

        [TestMethod]
        public void ViewTransformationForDefaultOrientation()
        {
            Tuple4D from = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, -1);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            Matrix transformation = Matrix.GetViewTransformationMatrix(from, to, up);
            Assert.AreEqual(Matrix.GetIdentityMatrix(4), transformation);
        }

        [TestMethod]
        public void ViewTransformationLookingInZDirection()
        {
            Tuple4D from = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, 1);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            Matrix transformation = Matrix.GetViewTransformationMatrix(from, to, up);
            Assert.AreEqual(Matrix.GetScalingMatrix(-1, 1, -1), transformation);
        }

        [TestMethod]
        public void ViewTransformationMovesWorld()
        {
            Tuple4D from = Tuple4D.CreatePoint(0, 0, 8);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            Matrix transformation = Matrix.GetViewTransformationMatrix(from, to, up);
            Assert.AreEqual(Matrix.GetTranslationMatrix(0, 0, -8), transformation);
        }

        [TestMethod]
        public void ViewTransformationArbitrary()
        {
            Tuple4D from = Tuple4D.CreatePoint(1, 3, 2);
            Tuple4D to = Tuple4D.CreatePoint(4, -2, 8);
            Tuple4D up = Tuple4D.CreateVector(1, 1, 0);
            Matrix transformation = Matrix.GetViewTransformationMatrix(from, to, up);

            Matrix expected = new Matrix(
                new double[,]
                {
                    { -0.50709, 0.50709, 0.67612, -2.36643 },
                    { 0.76772, 0.60609, 0.12122, -2.82843 },
                    { -0.35857, 0.59761, -0.71714, 0 },
                    { 0, 0, 0, 1 },
                });

            Assert.AreEqual(expected, transformation);
        }
    }
}
