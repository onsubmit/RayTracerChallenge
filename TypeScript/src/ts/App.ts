import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter04 from "./chapters/Chapter04";
import Chapter05 from "./chapters/Chapter05";
import Chapter06 from "./chapters/Chapter06";

class App {
  run = (): void => {
    Chapter01.run();
    Chapter02.run();
    Chapter04.run();
    Chapter05.run();
    Chapter06.run();
  };
}

export default new App();
