//-----------------------------------------------------------------------
// <copyright file="Camera.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

    /// <summary>
    /// Represents a camera.
    /// </summary>
    public class Camera
    {
        private double halfView;
        private double halfWidth;
        private double halfHeight;
        private double aspectRatio;

        /// <summary>
        /// Initializes a new instance of the <see cref="Camera"/> class.
        /// </summary>
        /// <param name="canvasWidth">The canvas width.</param>
        /// <param name="canvasHeight">The canvas height.</param>
        /// <param name="fieldOfView">The field of view.</param>
        /// <param name="transform">The view transformation matrix.</param>
        public Camera(int canvasWidth, int canvasHeight, double fieldOfView, Matrix transform = null)
        {
            this.CanvasWidth = canvasWidth;
            this.CanvasHeight = canvasHeight;
            this.FieldOfView = fieldOfView;
            this.Transform = transform ?? Matrix.GetIdentityMatrix(4);

            this.halfView = Math.Tan(this.FieldOfView / 2);
            this.aspectRatio = (double)this.CanvasWidth / this.CanvasHeight;

            if (this.aspectRatio >= 1)
            {
                this.halfWidth = this.halfView;
                this.halfHeight = this.halfView / this.aspectRatio;
            }
            else
            {
                this.halfWidth = this.halfView / this.aspectRatio;
                this.halfHeight = this.halfView;
            }

            this.PixelSize = (this.halfWidth * 2) / this.CanvasWidth;
        }

        /// <summary>
        /// Gets the canvas width.
        /// </summary>
        public int CanvasWidth { get; private set; }

        /// <summary>
        /// Gets the canvas height.
        /// </summary>
        public int CanvasHeight { get; private set; }

        /// <summary>
        /// Gets the camera's field of view.
        /// </summary>
        public double FieldOfView { get; private set; }

        /// <summary>
        /// Gets or sets the view transformation matrix describing how the world should be oriented relative to the camera.
        /// </summary>
        public Matrix Transform { get; set; }

        /// <summary>
        /// Gets the pixel size.
        /// </summary>
        public double PixelSize { get; private set; }

        /// <summary>
        /// Creates a new ray that starts at the camera and passes through the (x, y) pixel on the canvas.
        /// </summary>
        /// <param name="x">The x coordinate.</param>
        /// <param name="y">The y coordinate.</param>
        /// <returns>The new ray.</returns>
        public Ray GetRayForPixel(int x, int y)
        {
            // Calculate the offset from the edge of the canvas to the pixel's center.
            double offsetX = (x + 0.5) * this.PixelSize;
            double offsetY = (y + 0.5) * this.PixelSize;

            // Calculate the untransformed coordinates of the pixel in world space.
            // The camera looks toward -z, so +x is to the left.
            double worldX = this.halfWidth - offsetX;
            double worldY = this.halfHeight - offsetY;

            Tuple4D pixel = this.Transform.GetInverse() * Tuple4D.CreatePoint(worldX, worldY, -1);
            Tuple4D origin = this.Transform.GetInverse() * Tuple4D.CreatePoint(0, 0, 0);
            Tuple4D direction = (pixel - origin).Normalize();

            return new Ray(origin, direction);
        }

        /// <summary>
        /// Uses the camera to render an image of the given world.
        /// </summary>
        /// <param name="world">The world to render.</param>
        /// <returns>The canvas image.</returns>
        public Canvas Render(World world)
        {
            Canvas canvas = new Canvas(this.CanvasWidth, this.CanvasHeight);

            int count = 0;
            int totalPixels = this.CanvasWidth * this.CanvasHeight;
            int reportEach = totalPixels / 100;

            DateTime start = DateTime.Now;
            for (int y = 0; y < this.CanvasHeight; y++)
            {
                for (int x = 0; x < this.CanvasWidth; x++)
                {
                    if (++count % reportEach == 0)
                    {
                        TimeSpan elapsed = DateTime.Now - start;
                        int percent = count / reportEach;

                        TimeSpan remaining = TimeSpan.FromTicks((long)(elapsed.Ticks * ((100.0 / percent) - 1)));
                        Console.WriteLine($"{percent}%\tElapsed: {this.GetTimeString(elapsed)}\tRemaining: {this.GetTimeString(remaining)}\tTotal: {this.GetTimeString(elapsed + remaining)}");
                    }

                    Ray ray = this.GetRayForPixel(x, y);
                    ColorTuple color = world.GetColorAt(ray);
                    canvas.WritePixel(x, y, color);
                }
            }

            Console.WriteLine($"{DateTime.Now - start}");
            return canvas;
        }

        /// <summary>
        /// Returns the timespan in a nice format.
        /// </summary>
        /// <param name="timespan">The timspan.</param>
        /// <returns>The timespan in a nice format.</returns>
        private string GetTimeString(TimeSpan timespan) => timespan.ToString(@"hh\:mm\:ss");
    }
}
