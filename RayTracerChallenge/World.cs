//-----------------------------------------------------------------------
// <copyright file="World.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using OnSubmit.RayTracerChallenge.Extensions;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Represents the world.
    /// </summary>
    public class World
    {
        /// <summary>
        /// The maximum recursion depth for relfection calculation.
        /// </summary>
        private const int MaxRecursionDepth = 5;

        /// <summary>
        /// Initializes a new instance of the <see cref="World"/> class.
        /// </summary>
        public World()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="World"/> class.
        /// </summary>
        /// <param name="lightSource">The world's light source.</param>
        /// <param name="shapes">The world's shapes.</param>
        public World(Light lightSource, params Shape[] shapes)
        {
            this.LightSource = lightSource;

            if (shapes?.Any() == true)
            {
                this.Shapes.AddRange(shapes);
            }
        }

        /// <summary>
        /// Gets a value indicating whether the world has any shapes in it.
        /// </summary>
        public bool HasShapes => this.Shapes.Count != 0;

        /// <summary>
        /// Gets a value indicating whether the world has any light source.
        /// </summary>
        public bool HasLightSource => this.LightSource != null;

        /// <summary>
        /// Gets the world's shapes.
        /// </summary>
        public List<Shape> Shapes { get; private set; } = new List<Shape>();

        /// <summary>
        /// Gets or sets the world's light source.
        /// </summary>
        public Light LightSource { get; set; }

        /// <summary>
        /// Creates a default world with a few spheres and a light source.
        /// </summary>
        /// <returns>The default world.</returns>
        public static World CreateDefaultWorld()
        {
            Light light = new Light(Tuple4D.CreatePoint(-10, 10, -10), ColorTuple.White);
            Sphere s1 = new Sphere()
            {
                Material = new Material(ColorTuple.Create(0.8, 1.0, 0.6), diffuse: 0.7, specular: 0.2),
            };

            Sphere s2 = new Sphere()
            {
                Transformation = Matrix.GetScalingMatrix(0.5, 0.5, 0.5),
            };

            return new World(light, s1, s2);
        }

        /// <summary>
        /// Adds a shape to the world.
        /// </summary>
        /// <param name="shape">The shape to add.</param>
        public void AddShape(Shape shape)
        {
            this.Shapes.Add(shape);
        }

        /// <summary>
        /// Adds the shapes to the world.
        /// </summary>
        /// <param name="shapes">The shapes to add.</param>
        public void AddShapes(params Shape[] shapes)
        {
            foreach (Shape shape in shapes)
            {
                this.AddShape(shape);
            }
        }

        /// <summary>
        /// Determines if the world contains the given shape.
        /// </summary>
        /// <param name="shape">The shape.</param>
        /// <returns><c>true</c> if the world contains the shape, <c>false</c> otherwise.</returns>
        public bool ContainsShape(Shape shape) => this.Shapes?.Any(s => s.Equals(shape)) ?? false;

        /// <summary>
        /// Computes the color at the intersection encapsulated by the precomputation.
        /// </summary>
        /// <param name="computation">The precomputation.</param>
        /// <param name="remaining">The number of allowed calculations remaining.</param>
        /// <returns>The color at the intersection encapsulated by the precomputation.</returns>
        public ColorTuple ShadeHit(Computation computation, int remaining = MaxRecursionDepth)
        {
            bool isShadowed = this.IsShadowed(computation.OverPoint);
            ColorTuple surfaceColor = Lighting.Calculate(computation, this.LightSource, isShadowed);
            ColorTuple reflectedColor = this.GetReflectedColorAt(computation, remaining);
            ColorTuple refractedColor = this.GetRefractedColorAt(computation, remaining);

            Material material = computation.Object.Material;
            if (material.Reflective > 0 && material.Transparency > 0)
            {
                double reflectance = computation.GetSchlickApproximation();
                return surfaceColor + (reflectedColor * reflectance) + (refractedColor * (1 - reflectance));
            }

            return surfaceColor + reflectedColor + refractedColor;
        }

        /// <summary>
        /// Intersects the world with the given ray and returns the color at the resulting intersection.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <param name="remaining">The number of allowed calculations remaining.</param>
        /// <returns>The color at the ray's intersection.</returns>
        public ColorTuple GetColorAt(Ray ray, int remaining = MaxRecursionDepth)
        {
            Intersections intersections = ray.GetIntersectionsWith(this);

            if (!intersections.HasHit)
            {
                return ColorTuple.Black;
            }

            Intersection hit = intersections.GetHit();
            Computation computation = new Computation(hit, ray, intersections);
            return this.ShadeHit(computation, remaining);
        }

        /// <summary>
        /// Gets the reflected color for the given pre computation.
        /// </summary>
        /// <param name="computation">The computation.</param>
        /// <param name="remaining">The number of allowed calculations remaining.</param>
        /// <returns>The reflected color.</returns>
        public ColorTuple GetReflectedColorAt(Computation computation, int remaining = MaxRecursionDepth)
        {
            if (remaining <= 0 || computation.Object.Material.Reflective.Compare(0))
            {
                return ColorTuple.Black;
            }

            Ray reflectionRay = new Ray(computation.OverPoint, computation.ReflectionVector);
            ColorTuple color = this.GetColorAt(reflectionRay, remaining - 1);
            return color * computation.Object.Material.Reflective;
        }

        /// <summary>
        /// Gets the refracted color for the given pre computation.
        /// </summary>
        /// <param name="computation">The computation.</param>
        /// <param name="remaining">The number of allowed calculations remaining.</param>
        /// <returns>The refracted color.</returns>
        public ColorTuple GetRefractedColorAt(Computation computation, int remaining = MaxRecursionDepth)
        {
            if (remaining <= 0 || computation.Object.Material.Transparency.Compare(0))
            {
                return ColorTuple.Black;
            }

            double ratio = computation.N1 / computation.N2;
            double cosineThetaI = computation.EyeVector.GetDotProductWith(computation.NormalVector);
            double sineSquaredThetaT = ratio * ratio * (1.0 - (cosineThetaI * cosineThetaI));

            if (sineSquaredThetaT > 1)
            {
                // Total internal reflection.
                return ColorTuple.Black;
            }

            double cosineThetaT = Math.Sqrt(1.0 - sineSquaredThetaT);

            // Direction of refracted ray.
            Tuple4D direction = (computation.NormalVector * ((ratio * cosineThetaI) - cosineThetaT)) - (computation.EyeVector * ratio);
            Ray refractedRay = new Ray(computation.UnderPoint, direction);

            // Find the color of the refracted ray, accounting for opacity.
            ColorTuple color = this.GetColorAt(refractedRay, remaining - 1);
            return color * computation.Object.Material.Transparency;
        }

        /// <summary>
        /// Determines if the point is inside a shadow.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns><c>true</c> if the point is inside a shadow, <c>false</c> otherwise.</returns>
        public bool IsShadowed(Tuple4D point)
        {
            if (point == null)
            {
                throw new ArgumentNullException(nameof(point));
            }

            if (!point.IsPoint)
            {
                throw new ArgumentException(nameof(point), $"{nameof(point)} must be a point.");
            }

            Tuple4D pointToLight = this.LightSource.Position - point;
            double distanceFromLight = pointToLight.Magnitude;
            Ray ray = new Ray(point, pointToLight.Normalize());
            Intersections intersections = ray.GetIntersectionsWith(this);

            if (intersections.HasHit)
            {
                Intersection hit = intersections.GetHit();
                if (hit.T < distanceFromLight)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
