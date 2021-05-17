namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class ShapeTests
    {
        [TestMethod]
        public void DefaultTransformation()
        {
            TestShape shape = new TestShape();
            Assert.AreEqual(Matrix.GetIdentityMatrix(4), shape.Transformation);
        }

        [TestMethod]
        public void CustomTransformation()
        {
            Matrix transformation = Matrix.GetTranslationMatrix(2, 3, 4);
            TestShape shape = new TestShape
            {
                Transformation = transformation
            };

            Assert.AreEqual(transformation, shape.Transformation);
        }

        [TestMethod]
        public void DefaultMaterial()
        {
            Sphere sphere = new Sphere();
            Assert.AreEqual(new Material(), sphere.Material);
        }

        [TestMethod]
        public void CustomMaterial()
        {
            Material material = new Material(ambient: 1);
            Shape shape = new TestShape()
            {
                Material = material,
            };

            Assert.AreEqual(material, shape.Material);
        }

        [TestMethod]
        public void ComputeNormalOnTranslatedShape()
        {
            TestShape shape = new TestShape()
            {
                Transformation = Matrix.GetTranslationMatrix(0, 1, 0)
            };

            Tuple4D normal = shape.GetNormalAtPoint(Tuple4D.CreatePoint(0, 1.70711, -0.70711));
            Assert.AreEqual(Tuple4D.CreateVector(0, 0.70711, -0.70711), normal);
        }

        [TestMethod]
        public void ComputeNormalOnTransformedShape()
        {
            double root2over2 = Math.Sqrt(2) / 2;

            TestShape shape = new TestShape()
            {
                Transformation = Matrix.GetRotationMatrixZ(Math.PI / 5).Scale(1, 0.5, 1),
            };

            Tuple4D normal = shape.GetNormalAtPoint(Tuple4D.CreatePoint(0, root2over2, -root2over2));
            Assert.AreEqual(Tuple4D.CreateVector(0, 0.97014, -0.24254), normal);
        }
    }
}
