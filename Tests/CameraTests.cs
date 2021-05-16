namespace Tests
{
    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;

    [TestClass]
    public class CameraTests
    {
        [TestMethod]
        public void ConstructCamera()
        {
            int canvasWidth = 160;
            int canvasHeight = 120;
            double fieldOfView = Math.PI / 2;

            Camera camera = new Camera(canvasWidth, canvasHeight, fieldOfView);
            Assert.AreEqual(canvasWidth, camera.CanvasWidth);
            Assert.AreEqual(canvasHeight, camera.CanvasHeight);
            Assert.AreEqual(fieldOfView, camera.FieldOfView);
            Assert.AreEqual(Matrix.GetIdentityMatrix(4), camera.Transform);
        }

        [TestMethod]
        public void ConstructRayThroughCenterOfCanvas()
        {
            Camera camera = new Camera(201, 101, Math.PI / 2);
            Ray ray = camera.GetRayForPixel(100, 50);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 0, 0), ray.Origin);
            Assert.AreEqual(Tuple4D.CreateVector(0, 0, -1), ray.Direction);
        }

        [TestMethod]
        public void ConstructRayThroughCornerOfCanvas()
        {
            Camera camera = new Camera(201, 101, Math.PI / 2);
            Ray ray = camera.GetRayForPixel(0, 0);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 0, 0), ray.Origin);
            Assert.AreEqual(Tuple4D.CreateVector(0.66519, 0.33259, -0.66851), ray.Direction);
        }

        [TestMethod]
        public void ConstructRayWithTransformedCamera()
        {
            double root2over2 = Math.Sqrt(2) / 2;
            Matrix transform = Matrix.GetRotationMatrixY(Math.PI / 4) * Matrix.GetTranslationMatrix(0, -2, 5);
            Camera camera = new Camera(201, 101, Math.PI / 2, transform);
            Ray ray = camera.GetRayForPixel(100, 50);
            Assert.AreEqual(Tuple4D.CreatePoint(0, 2, -5), ray.Origin);
            Assert.AreEqual(Tuple4D.CreateVector(root2over2, 0, -root2over2), ray.Direction);
        }

        [TestMethod]
        public void RenderWorld()
        {
            World world = World.CreateDefaultWorld();

            Tuple4D from = Tuple4D.CreatePoint(0, 0, -5);
            Tuple4D to = Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D up = Tuple4D.CreateVector(0, 1, 0);
            Matrix transform = Matrix.GetViewTransformationMatrix(from, to, up);

            Camera camera = new Camera(11, 11, Math.PI / 2, transform);
            Canvas canvas = camera.Render(world);
            Assert.AreEqual(ColorTuple.Create(0.38066, 0.47583, 0.2855), canvas[5, 5]);
        }
    }
}
