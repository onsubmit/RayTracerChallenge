import Chapter07 from "./chapters/Chapter07";
import Chapter08 from "./chapters/Chapter08";
import Chapter09 from "./chapters/Chapter09";
import Chapter10 from "./chapters/Chapter10";
import IChapter from "./chapters/IChapter";
import { Pixel } from "./Pixel";

const chapters: Map<number, IChapter> = new Map([
  [7, Chapter07],
  [8, Chapter08],
  [9, Chapter09],
  [10, Chapter10],
]);

self.addEventListener("message", (event: MessageEvent) => {
  const width = event.data.width;
  const height = event.data.height;
  const resolution: number = event.data.resolution || 1;

  const chapter = chapters.get(event.data.chapter);
  if (!chapter) {
    throw new Error(`Chapter config not found for chapter ${chapter}`);
  }

  const camera = chapter.getCamera(width, height);
  const world = chapter.getWorld();

  for (let y = 0; y < camera.verticalSize; y += resolution) {
    const row: Pixel[] = [];
    for (let x = 0; x < camera.horizontalSize; x += resolution) {
      const color = camera.getColorAt(world, x, y);
      const r = color.red;
      const g = color.green;
      const b = color.blue;
      row.push({ x, y, r, g, b });
    }

    self.postMessage(row);
  }
});
