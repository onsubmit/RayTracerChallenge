import Color from "./Color";
import Light from "./Light";
import Material from "./Material";
import Point from "./Point";
import Vector from "./Vector";

class Lighting {
  calculate = (material: Material, light: Light, point: Point, eye: Vector, normal: Vector): Color => {
    // Combine the surface color with the light's color/intensity.
    const effectiveColor = material.color.getHadamardProductWith(light.intensity);

    // Find the direction to the light source.
    const lightVector = light.position.subtractPoint(point).normalize();

    // Compute the ambient contribution.
    const ambient = effectiveColor.multiply(material.ambient);
    let diffuse = Color.black;
    let specular = Color.black;

    // Get the cosine of the angle between the light vector and the normal vector.
    const lightDotNormal = lightVector.dot(normal);

    if (lightDotNormal >= 0) {
      // Compute the diffuse contribution.
      diffuse = effectiveColor.multiply(material.diffuse * lightDotNormal);

      // Get the cosine of the angle between the reflection vector and the eye vector.
      const reflect = lightVector.negate().reflect(normal);
      const reflectDotEye = reflect.dot(eye);

      if (reflectDotEye > 0) {
        // Compute the specular contribution.
        const factor = Math.pow(reflectDotEye, material.shininess);
        specular = light.intensity.multiply(material.specular * factor);
      } else {
        // The light reflects away from the eye.
      }
    } else {
      // The light is on the other side of the surface.
    }

    // Add the three contributions together to get the final shading.
    return ambient.addColor(diffuse).addColor(specular);
  };
}

export default new Lighting();
