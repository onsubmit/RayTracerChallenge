namespace Tests
{
    using System;
    using System.Collections.Generic;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OnSubmit.RayTracerChallenge;
    using OnSubmit.RayTracerChallenge.Colors;

    [TestClass]
    public class CanvasTests
    {
        [TestMethod]
        public void CanvasDimensionsTests()
        {
            const int Width = 10;
            const int Height = 20;

            Canvas c = new Canvas(Width, Height);
            Assert.AreEqual(Width, c.Width);
            Assert.AreEqual(Height, c.Height);
        }

        [TestMethod]
        public void WritePixelTest()
        {
            Canvas c = new Canvas(10, 20);
            ColorTuple red = ColorTuple.Create(1, 0, 0);
            c.WritePixel(2, 3, red);
            Assert.AreEqual(red, c[2, 3]);
        }

        [TestMethod]
        public void GeneratePlainPortablePixmapLines()
        {
            Canvas c = new Canvas(5, 3);
            ColorTuple c1 = ColorTuple.Create(1.5, 0, 0);
            ColorTuple c2 = ColorTuple.Create(0, 0.5, 0);
            ColorTuple c3 = ColorTuple.Create(-0.5, 0, 1);

            c.WritePixel(0, 0, c1);
            c.WritePixel(2, 1, c2);
            c.WritePixel(4, 2, c3);

            IList<string> ppm = c.ToPlainPortablePixmapLines();

            Assert.AreEqual(6, ppm.Count);
            Assert.AreEqual("255 0 0 0 0 0 0 0 0 0 0 0 0 0 0", ppm[3]);
            Assert.AreEqual("0 0 0 0 0 0 0 128 0 0 0 0 0 0 0", ppm[4]);
            Assert.AreEqual("0 0 0 0 0 0 0 0 0 0 0 0 0 0 255", ppm[5]);
        }

        [TestMethod]
        public void GeneratePlainPortablePixmapLinesTruncated()
        {
            Canvas c = new Canvas(10, 2, ColorTuple.Create(1, 0.8, 0.6));

            IList<string> ppm = c.ToPlainPortablePixmapLines();

            Assert.AreEqual(7, ppm.Count);
            Assert.AreEqual("255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204", ppm[3]);
            Assert.AreEqual("153 255 204 153 255 204 153 255 204 153 255 204 153", ppm[4]);
            Assert.AreEqual("255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204", ppm[5]);
            Assert.AreEqual("153 255 204 153 255 204 153 255 204 153 255 204 153", ppm[6]);
        }

        [TestMethod]
        public void GeneratePlainPortablePixmapStringEndsInNewLine()
        {
            Canvas c = new Canvas(5, 3);
            string ppm = c.ToPlainPortablePixmapString();
            Assert.IsTrue(ppm.EndsWith(Environment.NewLine));
        }
    }
}
