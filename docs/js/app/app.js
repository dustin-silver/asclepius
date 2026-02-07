import { el, setChildren } from "redom";
import { Menu } from "./menu.js";
import { ABO } from "./abo.js";
import { HH } from "./hh.js";

class App {
  constructor() {
    this.el = el("#app", [
      (this.menu = new Menu([
        [
          "ABO",
          () => {
            if (!this.abo) {
              this.abo = new ABO();
            }
            setChildren(this.body, this.abo);
          },
        ],
        [
          "HH",
          () => {
            if (!this.hh) {
              this.hh = new HH();
            }
            setChildren(this.body, this.hh);
          },
        ],
      ])),
      (this.body = el("#body")),
    ]);
    this.menu.selectMenu("abo");
  }
}

export { App };
