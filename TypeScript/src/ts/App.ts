import ChapterWorker from "worker-loader!../ts/ChapterWorker";
import CanvasPainter from "./CanvasPainter";
import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter04 from "./chapters/Chapter04";
import Chapter05 from "./chapters/Chapter05";
import Chapter06 from "./chapters/Chapter06";
import IChapter from "./chapters/IChapter";
import Color from "./Color";

type WorldConfig = {
  painter: CanvasPainter;
  worker: ChapterWorker;
};

class App {
  run = (): void => {
    const chaptersNoWorld: IChapter[] = [Chapter01, Chapter02, Chapter04, Chapter05, Chapter06];
    chaptersNoWorld.forEach((c) => c.run());

    const size = 250;
    const chaptersWithWorld: Map<number, WorldConfig> = new Map([
      [7, { painter: new CanvasPainter("canvas7", size, size), worker: new ChapterWorker() }],
      [8, { painter: new CanvasPainter("canvas8", size, size), worker: new ChapterWorker() }],
      [9, { painter: new CanvasPainter("canvas9", size, size), worker: new ChapterWorker() }],
    ]);

    chaptersWithWorld.forEach((config, chapter) => {
      config.worker.onmessage = (event: MessageEvent): void => {
        const { x, y, r, g, b } = event.data;
        config.painter.paintPixel(x, y, new Color(r, g, b));
      };

      config.worker.postMessage({ chapter, width: size, height: size });
    });
  };
}

export default new App();
