import Camera from "./Camera";
import Chapter07 from "./chapters/Chapter07";
import Chapter08 from "./chapters/Chapter08";
import Chapter09 from "./chapters/Chapter09";
import World from "./World";

type ChapterConfig = {
  camera: Camera;
  world: World;
};

let chapters: Map<number, ChapterConfig> = new Map();

self.addEventListener("message", (event: any) => {
  const width = event.data.width;
  const height = event.data.height;

  chapters = new Map([
    [7, { camera: Chapter07.getCamera(width, height), world: Chapter07.getWorld() }],
    [8, { camera: Chapter08.getCamera(width, height), world: Chapter08.getWorld() }],
    [9, { camera: Chapter09.getCamera(width, height), world: Chapter09.getWorld() }],
  ]);

  const chapter: number = event.data.chapter;
  const resolution: number = event.data.resolution || 1;

  const chapterConfig = chapters.get(chapter);
  if (!chapterConfig) {
    throw new Error(`Chapter config not found for chapter ${chapter}`);
  }

  const camera = chapterConfig.camera;
  const world = chapterConfig.world;

  for (let y = 0; y < camera.verticalSize; y += resolution) {
    for (let x = 0; x < camera.horizontalSize; x += resolution) {
      const color = camera.getColorAt(world, x, y);
      const r = color.red;
      const g = color.green;
      const b = color.blue;
      self.postMessage({ x, y, r, g, b });
    }
  }
});
