﻿//-----------------------------------------------------------------------
// <copyright file="Canvas.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using OnSubmit.RayTracerChallenge.Colors;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a canvas.
    /// </summary>
    public class Canvas
    {
        /// <summary>
        /// The maximum color value.
        /// </summary>
        private const int MaxColorValue = 255;

        /// <summary>
        /// The max line length for PPM files.
        /// </summary>
        private const int MaxPortablePixmapLineLength = 70;

        /// <summary>
        /// The pixels.
        /// </summary>
        private ColorTuple[,] pixels;

        /// <summary>
        /// Initializes a new instance of the <see cref="Canvas"/> class.
        /// </summary>
        /// <param name="width">The canvas width.</param>
        /// <param name="height">The canvas height.</param>
        public Canvas(int width, int height)
        {
            this.pixels = new ColorTuple[width, height];
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Canvas"/> class.
        /// </summary>
        /// <param name="width">The canvas width.</param>
        /// <param name="height">The canvas height.</param>
        /// <param name="initialPixelColor">The initial color to write to every pixel.</param>
        public Canvas(int width, int height, ColorTuple initialPixelColor)
            : this(width, height)
        {
            this.WriteAllPixels(initialPixelColor);
        }

        /// <summary>
        /// Gets the canvas width.
        /// </summary>
        public int Width => this.pixels.GetLength(0);

        /// <summary>
        /// Gets the canvas height.
        /// </summary>
        public int Height => this.pixels.GetLength(1);

        /// <summary>
        /// Indexer for the canvas.
        /// </summary>
        /// <param name="x">X coordinate.</param>
        /// <param name="y">Y coordinate.</param>
        /// <returns>The color at the given coordinates.</returns>
        public ColorTuple this[int x, int y]
        {
            get
            {
                return this.pixels[x, y];
            }

            private set
            {
                this.pixels[x, y] = value;
            }
        }

        /// <summary>
        /// Writes the given color at the provided coordinates.
        /// </summary>
        /// <param name="x">X coordinate.</param>
        /// <param name="y">Y coordinate.</param>
        /// <param name="c">Color to set.</param>
        public void WritePixel(int x, int y, ColorTuple c)
        {
            this[x, y] = c;
        }

        /// <summary>
        /// Writes each pixel to the given color.
        /// </summary>
        /// <param name="c">The color to write.</param>
        public void WriteAllPixels(ColorTuple c)
        {
            for (int y = 0, height = this.Height; y < height; y++)
            {
                for (int x = 0, width = this.Width; x < width; x++)
                {
                    this[x, y] = c;
                }
            }
        }

        /// <summary>
        /// Generates the contents of the Plain Portable Pixmap (PPM) file.
        /// </summary>
        /// <returns>The contents of the Plain Portable Pixmap (PPM) file.</returns>
        public string ToPlainPortablePixmapString()
        {
            // Some image programs like ImageMagick won't process PPM files correctly
            // unless the files are terminated by a newline character.
            return string.Join(Environment.NewLine, this.ToPlainPortablePixmapLines()) + Environment.NewLine;
        }

        /// <summary>
        /// Generates the lines from the canvas which will then be to write the Plain Portable Pixmap (PPM) file.
        /// </summary>
        /// <returns>The set of lines used to write the PPM file.</returns>
        public IList<string> ToPlainPortablePixmapLines()
        {
            IList<string> lines = new List<string>
            {
                "P3",
                $"{this.Width} {this.Height}",
                MaxColorValue.ToString(),
            };

            StringBuilder lineBuilder = new StringBuilder();
            for (int y = 0, height = this.Height; y < height; y++)
            {
                for (int x = 0, width = this.Width; x < width; x++)
                {
                    IEnumerable<string> entries = this[x, y]
                        .GetClampedColorArray(MaxColorValue)
                        .Select(v => v.ToString());

                    foreach (string entry in entries)
                    {
                        if (lineBuilder.Length == 0)
                        {
                            lineBuilder.Append(entry);
                            continue;
                        }

                        if (lineBuilder.Length + entry.Length + 1 <= MaxPortablePixmapLineLength)
                        {
                            lineBuilder.Append(" " + entry);
                        }
                        else
                        {
                            lines.Add(lineBuilder.ToString());
                            lineBuilder.Clear();
                            lineBuilder.Append(entry);
                        }
                    }
                }

                lines.Add(lineBuilder.ToString());
                lineBuilder.Clear();
            }

            return lines;
        }
    }
}