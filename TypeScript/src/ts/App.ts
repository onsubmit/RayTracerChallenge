import ChapterWorker from "worker-loader!../ts/ChapterWorker";
import CanvasPainter from "./CanvasPainter";
import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter04 from "./chapters/Chapter04";
import Chapter05 from "./chapters/Chapter05";
import Chapter06 from "./chapters/Chapter06";
import IChapter from "./chapters/IChapter";
import Color from "./Color";
import { Pixel } from "./Pixel";

class App {
  run = (): void => {
    const chaptersNoWorld: IChapter[] = [Chapter01, Chapter02, Chapter04, Chapter05, Chapter06];
    chaptersNoWorld.forEach((c) => c.run());

    const size = 500;
    [7, 8, 9, 10, 11].forEach((chapter) => {
      const painter = new CanvasPainter(`canvas${chapter}`, size, size);
      const worker = new ChapterWorker();
      worker.onmessage = (event: MessageEvent): void => {
        const row: Pixel[] = event.data;
        for (const pixel of row) {
          const { x, y, r, g, b } = pixel;
          painter.paintPixel(x, y, new Color(r, g, b));
        }
      };

      worker.postMessage({ chapter, width: size, height: size });
    });
  };
}

export default new App();
