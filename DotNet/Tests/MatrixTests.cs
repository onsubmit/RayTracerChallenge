namespace Tests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class MatrixTests
    {
        [TestMethod]
        public void BasicConstruction4x4()
        {
            Matrix m = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 5.5, 6.5, 7.5, 8.5 },
                    { 9, 10, 11, 12 },
                    { 13.5, 14.5, 15.5, 16.5 },
                });

            Assert.AreEqual(1, m[0, 0]);
            Assert.AreEqual(4, m[0, 3]);
            Assert.AreEqual(5.5, m[1, 0]);
            Assert.AreEqual(7.5, m[1, 2]);
            Assert.AreEqual(11, m[2, 2]);
            Assert.AreEqual(13.5, m[3, 0]);
            Assert.AreEqual(15.5, m[3, 2]);
        }

        [TestMethod]
        public void BasicConstruction2x2()
        {
            Matrix m = new Matrix(
                new double[2, 2]
                {
                    { -3, 5 },
                    { 1, -2 },
                });

            Assert.AreEqual(-3, m[0, 0]);
            Assert.AreEqual(5, m[0, 1]);
            Assert.AreEqual(1, m[1, 0]);
            Assert.AreEqual(-2, m[1, 1]);
        }

        [TestMethod]
        public void BasicConstruction3x3()
        {
            Matrix m = new Matrix(
                new double[3, 3]
                {
                    { -3, 5, 0 },
                    { 1, -2, -7 },
                    { 0, 1, 1 },
                });

            Assert.AreEqual(-3, m[0, 0]);
            Assert.AreEqual(-2, m[1, 1]);
            Assert.AreEqual(1, m[2, 2]);
        }

        [TestMethod]
        public void MatrixEquality()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 5, 6, 7, 8 },
                    { 9, 8, 7, 6 },
                    { 5, 4, 3, 2 },
                });

            Matrix b = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 5, 6, 7, 8 },
                    { 9, 8, 7, 6 },
                    { 5, 4, 3, 2 },
                });

            Assert.AreEqual(a, b);
            Assert.AreEqual(b, a);
        }

        [TestMethod]
        public void MatrixInequality()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 5, 6, 7, 8 },
                    { 9, 8, 7, 6 },
                    { 5, 4, 3, 2 },
                });

            Matrix b = new Matrix(
                new double[4, 4]
                {
                    { 2, 3, 4, 5 },
                    { 6, 7, 8, 9 },
                    { 8, 7, 6, 5 },
                    { 4, 3, 2, 1 },
                });

            Assert.AreNotEqual(a, b);
            Assert.AreNotEqual(b, a);
        }

        [TestMethod]
        public void MatrixMultiplication()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 5, 6, 7, 8 },
                    { 9, 8, 7, 6 },
                    { 5, 4, 3, 2 },
                });

            Matrix b = new Matrix(
                new double[4, 4]
                {
                    { -2, 1, 2, 3 },
                    { 3, 2, 1, -1 },
                    { 4, 3, 6, 5 },
                    { 1, 2, 7, 8 },
                });

            Matrix c = new Matrix(
                new double[4, 4]
                {
                    { 20, 22, 50, 48 },
                    { 44, 54, 114, 108 },
                    { 40, 58, 110, 102 },
                    { 16, 26, 46, 42 },
                });

            Assert.AreEqual(c, a * b);
        }

        [TestMethod]
        public void MultiplyMatrixByTuple()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 1, 2, 3, 4 },
                    { 2, 4, 4, 2 },
                    { 8, 6, 4, 1 },
                    { 0, 0, 0, 1 },
                });

            Tuple4D b = new Tuple4D(1, 2, 3, 1);
            Tuple4D c = new Tuple4D(18, 24, 33, 1);
            Assert.AreEqual(c, a * b);
        }

        [TestMethod]
        public void MultiplyByIdentityMatrix()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 0, 1, 2, 4 },
                    { 1, 2, 4, 8 },
                    { 2, 4, 8, 16 },
                    { 4, 8, 16, 32 },
                });

            Matrix i = Matrix.GetIdentityMatrix(4);

            Assert.AreEqual(a, a * i);
            Assert.AreEqual(a * i, i * a);
        }

        [TestMethod]
        public void MultiplyIdentityMatrixByTuple()
        {
            Tuple4D a = Tuple4D.Create(1, 2, 3, 4);
            Matrix i = Matrix.GetIdentityMatrix(4);

            Assert.AreEqual(a, i * a);
        }

        [TestMethod]
        public void MatrixTranspose()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 0, 9, 3, 0 },
                    { 9, 8, 8, 0 },
                    { 1, 8, 5, 3 },
                    { 0, 0, 5, 8 },
                });

            Matrix b = new Matrix(
                new double[4, 4]
                {
                    { 0, 9, 1, 0 },
                    { 9, 8, 8, 0 },
                    { 3, 8, 5, 5 },
                    { 0, 0, 3, 8 },
                });

            Assert.AreEqual(b, a.Transpose());
            Assert.AreEqual(a, b.Transpose());
            Assert.AreEqual(a, a.Transpose().Transpose());
            Assert.AreEqual(b, b.Transpose().Transpose());
        }

        [TestMethod]
        public void MatrixTransposeIdentityMatrix()
        {
            Matrix i = Matrix.GetIdentityMatrix(4);
            Assert.AreEqual(i, i.Transpose());
        }

        [TestMethod]
        public void GetDeterminant2x2()
        {
            Matrix a = new Matrix(
                new double[2, 2]
                {
                    { 1, 5 },
                    { -3, 2 },
                });

            Assert.AreEqual(17, a.GetDeterminant());
        }

        [TestMethod]
        public void GetDeterminant3x3()
        {
            Matrix a = new Matrix(
                new double[3, 3]
                {
                    { 1, 2, 6 },
                    { -5, 8, -4 },
                    { 2, 6, 4 },
                });

            Assert.AreEqual(56, a.GetCofactor(0, 0));
            Assert.AreEqual(12, a.GetCofactor(0, 1));
            Assert.AreEqual(-46, a.GetCofactor(0, 2));
            Assert.AreEqual(-196, a.GetDeterminant());
        }

        [TestMethod]
        public void GetDeterminant4x4()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { -2, -8, 3, 5 },
                    { -3, 1, 7, 3 },
                    { 1, 2, -9, 6 },
                    { -6, 7, 7, -9 },
                });

            Assert.AreEqual(690, a.GetCofactor(0, 0));
            Assert.AreEqual(447, a.GetCofactor(0, 1));
            Assert.AreEqual(210, a.GetCofactor(0, 2));
            Assert.AreEqual(51, a.GetCofactor(0, 3));
            Assert.AreEqual(-4071, a.GetDeterminant());
        }

        [TestMethod]
        public void GetSubMatrix3x3()
        {
            Matrix a = new Matrix(
                new double[3, 3]
                {
                    { 1, 5, 0 },
                    { -3, 2, 7 },
                    { 0, 6, -3 },
                });

            Matrix b = new Matrix(
                new double[2, 2]
                {
                    { -3, 2 },
                    { 0, 6 },
                });

            Assert.AreEqual(b, a.GetSubMatrix(0, 2));
        }

        [TestMethod]
        public void GetSubMatrix4x4()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { -6, 1, 1, 6 },
                    { -8, 5, 8, 6 },
                    { -1, 0, 8, 2 },
                    { -7, 1, -1, 1 },
                });

            Matrix b = new Matrix(
                new double[3, 3]
                {
                    { -6, 1, 6 },
                    { -8, 8, 6 },
                    { -7, -1, 1 },
                });

            Assert.AreEqual(b, a.GetSubMatrix(2, 1));
        }

        [TestMethod]
        public void GetMinor3x3()
        {
            Matrix a = new Matrix(
                new double[3, 3]
                {
                    { 3, 5, 0 },
                    { 2, -1, -7 },
                    { 6, -1, 5 },
                });

            Matrix b = a.GetSubMatrix(1, 0);
            Assert.AreEqual(25, b.GetDeterminant());
            Assert.AreEqual(25, a.GetMinor(1, 0));
        }

        [TestMethod]
        public void GetCofactor3x3()
        {
            Matrix a = new Matrix(
                new double[3, 3]
                {
                    { 3, 5, 0 },
                    { 2, -1, -7 },
                    { 6, -1, 5 },
                });

            Assert.AreEqual(-12, a.GetMinor(0, 0));
            Assert.AreEqual(-12, a.GetCofactor(0, 0));
            Assert.AreEqual(25, a.GetMinor(1, 0));
            Assert.AreEqual(-25, a.GetCofactor(1, 0));
        }

        [TestMethod]
        public void MatrixIsInvertible()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 6, 4, 4, 4 },
                    { 5, 5, 7, 6 },
                    { 4, -9, 3, -7 },
                    { 9, 1, 7, -6 },
                });

            Assert.AreEqual(-2120, a.GetDeterminant());
            Assert.IsTrue(a.IsInvertible);
        }

        [TestMethod]
        public void MatrixIsNotInvertible()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { -4, 2, -2, -3 },
                    { 9, 6, 2, 6 },
                    { 0, -5, 1, -5 },
                    { 0, 0, 0, 0 },
                });

            Assert.AreEqual(0, a.GetDeterminant());
            Assert.IsFalse(a.IsInvertible);
        }

        [TestMethod]
        public void MatrixInverse()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { -5, 2, 6, -8 },
                    { 1, -5, 1, 8 },
                    { 7, 7, -6, -7 },
                    { 1, -3, 7, 4 },
                });

            Matrix b = a.GetInverse();

            double d = a.GetDeterminant();
            Assert.AreEqual(532, d);
            Assert.AreEqual(-160, a.GetCofactor(2, 3));
            Assert.AreEqual(-160 / d, b[3, 2]);
            Assert.AreEqual(105, a.GetCofactor(3, 2));
            Assert.AreEqual(105 / d, b[2, 3]);

            Matrix c = new Matrix(
                new double[4, 4]
                {
                    { 0.21805, 0.45113, 0.24060, -0.04511 },
                    { -0.80827, -1.45677, -0.44361, 0.52068 },
                    { -0.07895, -0.22368, -0.05263, 0.19737 },
                    { -0.52256, -0.81391, -0.30075, 0.30639 },
                });

            Assert.AreEqual(c, b);
        }

        [TestMethod]
        public void MatrixInverse2()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 8, -5, 9, 2 },
                    { 7, 5, 6, 1 },
                    { -6, 0, 9, 6 },
                    { -3, 0, -9, -4 },
                });

            Matrix b = a.GetInverse();

            Matrix c = new Matrix(
                new double[4, 4]
                {
                    { -0.15385, -0.15385, -0.28205, -0.53846 },
                    { -0.07692, 0.12308, 0.02564, 0.03077 },
                    { 0.35897, 0.35897, 0.4359, 0.92308 },
                    { -0.69231, -0.69231, -0.76923, -1.92308 },

                });

            Assert.AreEqual(c, b);
        }

        [TestMethod]
        public void MatrixInverse3()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 9, 3, 0, 9 },
                    { -5, -2, -6, -3 },
                    { -4, 9, 6, 4 },
                    { -7, 6, 6, 2 },
                });

            Matrix b = a.GetInverse();

            Matrix c = new Matrix(
                new double[4, 4]
                {
                    { -0.04074, -0.07778, 0.14444, -0.22222 },
                    { -0.07778, 0.03333, 0.36667, -0.33333 },
                    { -0.02901, -0.14630, -0.10926, 0.12963 },
                    { 0.17778, 0.06667, -0.26667, 0.33333 },
                });

            Assert.AreEqual(c, b);
        }

        [TestMethod]
        public void MultiplyMatrixByInverse()
        {
            Matrix a = new Matrix(
                new double[4, 4]
                {
                    { 3, -9, 7, 3 },
                    { 3, -8, 2, -9 },
                    { -4, 4, 4, 1 },
                    { -6, 5, -1, 1 },
                });

            Matrix b = new Matrix(
                new double[4, 4]
                {
                    { 8, 2, 2, 2 },
                    { 3, -1, 7, 0 },
                    { 7, 0, 5, 4 },
                    { 6, -2, 0, 5 },
                });

            Matrix c = a * b;

            Assert.AreEqual(a, c * b.GetInverse());
        }
    }
}
