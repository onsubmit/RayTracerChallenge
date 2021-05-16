﻿//-----------------------------------------------------------------------
// <copyright file="Lighting.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System;

    /// <summary>
    /// Represents a material.
    /// </summary>
    public static class Lighting
    {
        /// <summary>
        /// Calculates the lighting.
        /// </summary>
        /// <param name="material">The material.</param>
        /// <param name="light">The light source.</param>
        /// <param name="point">The point being illuminated.</param>
        /// <param name="eyeVector">The eye vector from the Phong reflection model.</param>
        /// <param name="normalVector">The normal vector from the Phong reflection model.</param>
        /// <returns>The lighting.</returns>
        public static ColorTuple Calculate(
            Material material,
            Light light,
            Tuple4D point,
            Tuple4D eyeVector,
            Tuple4D normalVector)
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

            // Combine the surface color with the light's intensity
            ColorTuple effectiveColor = material.Color * light.Intensity;

            // Find the direction to the light source
            Tuple4D lightVector = (light.Position - point).Normalize();

            // Compute the ambient contribution
            ColorTuple ambient = effectiveColor * material.Ambient;

            // Get the cosine of the angle between the light vector and the normal vector.
            // A negative number means then light is on the other side of the surface.
            double lightDotNormal = lightVector.GetDotProductWith(normalVector);

            ColorTuple diffuse = ColorTuple.Create(0, 0, 0);
            ColorTuple specular = ColorTuple.Create(0, 0, 0);
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