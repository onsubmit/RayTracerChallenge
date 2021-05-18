namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Patterns;
    using OnSubmit.RayTracerChallenge.Shapes;

    [TestClass]
    public class PatternTests
    {
        private readonly ColorTuple white = ColorTuple.White;
        private readonly ColorTuple black = ColorTuple.Black;

        [TestMethod]
        public void CreateStripePattern()
        {
            StripePattern pattern = new StripePattern(white, black);
            Assert.AreEqual(white, pattern[0]);
            Assert.AreEqual(black, pattern[1]);
        }

        [TestMethod]
        public void StripePatternConstantInY()
        {
            StripePattern pattern = new StripePattern(white, black);
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 0, 0)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 1, 0)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 2, 0)));
        }

        [TestMethod]
        public void StripePatternConstantInZ()
        {
            StripePattern pattern = new StripePattern(white, black);
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 0, 0)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 0, 1)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 0, 2)));
        }

        [TestMethod]
        public void StripePatternAlternatesInX()
        {
            StripePattern pattern = new StripePattern(white, black);
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0, 0, 0)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(0.9, 0, 1)));
            Assert.AreEqual(black, pattern.GetColorAtPoint(Tuple4D.CreatePoint(1, 0, 0)));

            Assert.AreEqual(black, pattern.GetColorAtPoint(Tuple4D.CreatePoint(-0.1, 0, 0)));
            Assert.AreEqual(black, pattern.GetColorAtPoint(Tuple4D.CreatePoint(-1, 0, 1)));
            Assert.AreEqual(white, pattern.GetColorAtPoint(Tuple4D.CreatePoint(-1.1, 0, 0)));
        }

        [TestMethod]
        public void LightingWithPatternApplied()
        {
            Material material = new Material(ambient: 1, diffuse: 0, specular: 0)
            {
                Pattern = new StripePattern(ColorTuple.White, ColorTuple.Black),
            };

            Tuple4D eyeVector = Tuple4D.CreateVector(0, 0, -1);
            Tuple4D normalVector = Tuple4D.CreateVector(0, 0, -1);
            Light light = new Light(Tuple4D.CreatePoint(0, 0, -10), ColorTuple.White);

            Sphere sphere = new Sphere();
            ColorTuple color1 = Lighting.Calculate(material, sphere, light, Tuple4D.CreatePoint(0.9, 0, 0), eyeVector, normalVector);
            ColorTuple color2 = Lighting.Calculate(material, sphere, light, Tuple4D.CreatePoint(1.1, 0, 0), eyeVector, normalVector);

            Assert.AreEqual(ColorTuple.White, color1);
            Assert.AreEqual(ColorTuple.Black, color2);
        }

        [TestMethod]
        public void PatternWithObjectTransformation()
        {
            Sphere sphere = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(2, 2, 2),
            };

            TestPattern pattern = new TestPattern();
            ColorTuple color = pattern.GetColorAtShape(sphere, Tuple4D.CreatePoint(2, 3, 4));
            Assert.AreEqual(ColorTuple.Create(1, 1.5, 2), color);
        }

        [TestMethod]
        public void PatternWithTransformation()
        {
            Sphere sphere = new Sphere();
            TestPattern pattern = new TestPattern()
            {
                Transformation = Matrix.GetScalingMatrix(2, 2, 2),
            };

            ColorTuple color = pattern.GetColorAtShape(sphere, Tuple4D.CreatePoint(2, 3, 4));
            Assert.AreEqual(ColorTuple.Create(1, 1.5, 2), color);
        }

        [TestMethod]
        public void PatternWithTransformationAndObjectTransformation()
        {
            Sphere sphere = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(2, 2, 2),
            };

            TestPattern pattern = new TestPattern()
            {
                Transformation = Matrix.GetTranslationMatrix(0.5, 1, 1.5),
            };

            ColorTuple color = pattern.GetColorAtShape(sphere, Tuple4D.CreatePoint(2.5, 3, 3.5));
            Assert.AreEqual(ColorTuple.Create(0.75, 0.5, 0.25), color);
        }

        [TestMethod]
        public void DefaultPatternTransformation()
        {
            TestPattern pattern = new TestPattern();
            Assert.AreEqual(Matrix.GetIdentityMatrix(4), pattern.Transformation);
        }

        [TestMethod]
        public void AssignPatternTransformation()
        {
            Matrix transformation = Matrix.GetTranslationMatrix(1, 2, 3);
            TestPattern pattern = new TestPattern()
            {
                Transformation = transformation,
            };

            Assert.AreEqual(transformation, pattern.Transformation);
        }
    }
}
