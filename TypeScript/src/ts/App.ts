import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";
import Chapter04 from "./chapters/Chapter04";

class App {
  run = () => {
    Chapter01.run();
    Chapter02.run();
    Chapter04.run();
  };
}

export default new App();
