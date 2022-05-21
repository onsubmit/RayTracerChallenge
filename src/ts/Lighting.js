"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("./Color"));
class Lighting {
    constructor() {
        this.calculate = (material, light, point, eye, normal, inShadow) => {
            // Combine the surface color with the light's color/intensity.
            const effectiveColor = material.color.getHadamardProductWith(light.intensity);
            // Find the direction to the light source.
            const lightVector = light.position.subtractPoint(point).normalize();
            // Compute the ambient contribution.
            const ambient = effectiveColor.multiply(material.ambient);
            if (inShadow) {
                return ambient;
            }
            let diffuse = Color_1.default.black;
            let specular = Color_1.default.black;
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
                }
                else {
                    // The light reflects away from the eye.
                }
            }
            else {
                // The light is on the other side of the surface.
            }
            // Add the three contributions together to get the final shading.
            return ambient.addColor(diffuse).addColor(specular);
        };
    }
}
exports.default = new Lighting();
//# sourceMappingURL=Lighting.js.map