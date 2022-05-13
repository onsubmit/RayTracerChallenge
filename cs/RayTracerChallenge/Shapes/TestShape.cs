//-----------------------------------------------------------------------
// <copyright file="TestShape.cs" company="Andy Young">
//     Copyright (c) Andy Young. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OnSubmit.RayTracerChallenge.Shapes
{
    /// <summary>
    /// Represents a test shape.
    /// </summary>
    public class TestShape : Shape
    {
        /// <summary>
        /// Gets the ray transformed to object space.
        /// </summary>
        public Ray ObjectSpaceRay { get; private set; }

        /// <summary>
        /// Only keeps track of the ray that has been convereted to object space.
        /// </summary>
        /// <param name="ray">The ray.</param>
        /// <returns>Nothing of value.</returns>
        public override Intersections GetIntersectionsWithImpl(Ray ray)
        {
            this.ObjectSpaceRay = ray;
            return new Intersections();
        }

        /// <summary>
        /// Gets the surface normal vector at the given point.
        /// </summary>
        /// <param name="point">The point.</param>
        /// <returns>The surface normal vector.</returns>
        public override Tuple4D GetNormalAtPointImpl(Tuple4D point)
        {
            return point;
        }
    }
}
