import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter04 from "./chapters/Chapter04";
import Chapter05 from "./chapters/Chapter05";
import Chapter06 from "./chapters/Chapter06";
import Chapter07 from "./chapters/Chapter07";
import Chapter08 from "./chapters/Chapter08";
import IChapter from "./chapters/IChapter";

class App {
  run = (): void => {
    const chapters: IChapter[] = [Chapter01, Chapter02, Chapter04, Chapter05, Chapter06, Chapter07, Chapter08];
    chapters.forEach((c) => c.run());
  };
}

export default new App();
