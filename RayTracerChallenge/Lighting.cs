//-----------------------------------------------------------------------
// <copyright file="Lighting.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;
    using OnSubmit.RayTracerChallenge.Shapes;

    /// <summary>
    /// Static class used to calculate lighting.
    /// </summary>
    public static class Lighting
    {
        /// <summary>
        /// Calculates the lighting.
        /// </summary>
        /// <param name="computation">The precomputation.</param>
        /// <param name="light">The light source.</param>
        /// <param name="inShadow"><c>true</c> if the point is in the shadow.</param>
        /// <returns>The lighting.</returns>
        public static ColorTuple Calculate(Computation computation, Light light, bool inShadow = false)
        {
            return Calculate(
                computation.Object.Material,
                computation.Object,
                light,
                computation.Point,
                computation.EyeVector,
                computation.NormalVector,
                inShadow);
        }

        /// <summary>
        /// Calculates the lighting.
        /// </summary>
        /// <param name="material">The material.</param>
        /// <param name="shape">The shape.</param>
        /// <param name="light">The light source.</param>
        /// <param name="point">The point being illuminated.</param>
        /// <param name="eyeVector">The eye vector from the Phong reflection model.</param>
        /// <param name="normalVector">The normal vector from the Phong reflection model.</param>
        /// <param name="inShadow"><c>true</c> if the point is in the shadow.</param>
        /// <returns>The lighting.</returns>
        public static ColorTuple Calculate(
            Material material,
            Shape shape,
            Light light,
            Tuple4D point,
            Tuple4D eyeVector,
            Tuple4D normalVector,
            bool inShadow = false)
        {
            if (material == null)
            {
                throw new ArgumentNullException(nameof(material));
            }

            if (light == null)
            {
                throw new ArgumentNullException(nameof(light));
            }

            if (point == null)
            {
                throw new ArgumentNullException(nameof(point));
            }

            if (eyeVector == null)
            {
                throw new ArgumentNullException(nameof(eyeVector));
            }

            if (normalVector == null)
            {
                throw new ArgumentNullException(nameof(normalVector));
            }

            if (!point.IsPoint)
            {
                throw new ArgumentException(nameof(point), $"{nameof(point)} must be a point.");
            }

            if (!eyeVector.IsVector)
            {
                throw new ArgumentException(nameof(eyeVector), $"{nameof(eyeVector)} must be a vector.");
            }

            if (!normalVector.IsVector)
            {
                throw new ArgumentException(nameof(normalVector), $"{nameof(normalVector)} must be a vector.");
            }

            ColorTuple color = material.HasPattern ? material.Pattern.GetColorAtShape(shape, point) : material.Color;

            // Combine the surface color with the light's intensity
            ColorTuple effectiveColor = color * light.Intensity;

            // Find the direction to the light source
            Tuple4D lightVector = (light.Position - point).Normalize();

            // Compute the ambient contribution
            ColorTuple ambient = effectiveColor * material.Ambient;

            if (inShadow)
            {
                return ambient;
            }

            // Get the cosine of the angle between the light vector and the normal vector.
            // A negative number means then light is on the other side of the surface.
            double lightDotNormal = lightVector.GetDotProductWith(normalVector);

            ColorTuple diffuse = ColorTuple.Black;
            ColorTuple specular = ColorTuple.Black;
            if (lightDotNormal >= 0)
            {
                // Compute the diffuse contribution
                diffuse = effectiveColor * material.Diffuse * lightDotNormal;

                // Get the cosine of the angle between the reflection vector and the eye vector.
                // A negative number means the light reflects away from the eye.
                Tuple4D reflectVector = (-lightVector).ReflectVector(normalVector);
                double reflectDotEye = reflectVector.GetDotProductWith(eyeVector);

                if (reflectDotEye > 0)
                {
                    // Compute the specular contribution.
                    double factor = Math.Pow(reflectDotEye, material.Shininess);
                    specular = light.Intensity * material.Specular * factor;
                }
            }

            return ambient + diffuse + specular;
        }
    }
}
