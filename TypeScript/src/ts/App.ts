import Chapter01 from "./chapters/Chapter01";
import Chapter02 from "./chapters/Chapter02";

class App {
  run = () => {
    Chapter01.run();
    Chapter02.run();
  };
}

export default new App();
