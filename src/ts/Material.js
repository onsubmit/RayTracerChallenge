"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("./Color"));
class Material {
    constructor(color = Color_1.default.white, ambient = 0.1, diffuse = 0.9, specular = 0.9, shininess = 200) {
        this.compare = (material) => {
            if (!this.color.compare(material.color)) {
                return false;
            }
            if (!this.ambient.compare(material.ambient)) {
                return false;
            }
            if (!this.diffuse.compare(material.diffuse)) {
                return false;
            }
            if (!this.specular.compare(material.specular)) {
                return false;
            }
            if (!this.shininess.compare(material.shininess)) {
                return false;
            }
            return true;
        };
        this.color = color;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;
    }
}
exports.default = Material;
//# sourceMappingURL=Material.js.map