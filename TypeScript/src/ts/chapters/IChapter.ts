import Camera from "ts/Camera";
import World from "ts/World";

export default interface IChapter {
  getCamera: (width: number, height: number) => Camera;
  getWorld: () => World;
  run: () => void;
}
