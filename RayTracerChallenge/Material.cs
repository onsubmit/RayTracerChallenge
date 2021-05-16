﻿//-----------------------------------------------------------------------
// <copyright file="Material.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge
{
    using System.Collections.Generic;
    using OnSubmit.RayTracerChallenge.Extensions;

    /// <summary>
    /// Represents a material.
    /// </summary>
    public class Material
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Material"/> class.
        /// </summary>
        /// <param name="color">The color.</param>
        /// <param name="ambient">The ambient value.</param>
        /// <param name="diffuse">The diffuse value.</param>
        /// <param name="specular">The specular value.</param>
        /// <param name="shininess">The shininess value.</param>
        public Material(
            ColorTuple color = null,
            double ambient = 0.1,
            double diffuse = 0.9,
            double specular = 0.9,
            double shininess = 200.0)
        {
            this.Color = color ?? ColorTuple.Create(1, 1, 1);
            this.Ambient = ambient;
            this.Diffuse = diffuse;
            this.Specular = specular;
            this.Shininess = shininess;
        }

        /// <summary>
        /// Gets the color of the material.
        /// </summary>
        public ColorTuple Color { get; private set; }

        /// <summary>
        /// Gets the ambient value.
        /// </summary>
        public double Ambient { get; private set; }

        /// <summary>
        /// Gets the diffuse value.
        /// </summary>
        public double Diffuse { get; private set; }

        /// <summary>
        /// Gets the specular value.
        /// </summary>
        public double Specular { get; private set; }

        /// <summary>
        /// Gets the shininess value.
        /// </summary>
        public double Shininess { get; private set; }

        /// <summary>
        /// Compares a <see cref="Material"/> with another object.
        /// </summary>
        /// <param name="obj">The object to compare against.</param>
        /// <returns><c>crue</c> if the objects are piecewise equivalent, <c>false</c> otherwise.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            if (ReferenceEquals(this, obj))
            {
                return true;
            }

            if (obj is Material m)
            {
                return this.Color.Equals(m.Color)
                    && this.Ambient.Compare(m.Ambient)
                    && this.Diffuse.Compare(m.Diffuse)
                    && this.Specular.Compare(m.Specular)
                    && this.Shininess.Compare(m.Shininess);
            }

            return false;
        }

        /// <summary>
        /// Generates a hash code for the current <see cref="Material"/>.
        /// </summary>
        /// <returns>The hash code.</returns>
        public override int GetHashCode()
        {
            int hashCode = -1214519685;
            hashCode = (hashCode * -1521134295) + EqualityComparer<ColorTuple>.Default.GetHashCode(this.Color);
            hashCode = (hashCode * -1521134295) + this.Ambient.GetHashCode();
            hashCode = (hashCode * -1521134295) + this.Diffuse.GetHashCode();
            hashCode = (hashCode * -1521134295) + this.Specular.GetHashCode();
            hashCode = (hashCode * -1521134295) + this.Shininess.GetHashCode();
            return hashCode;
        }
    }
}