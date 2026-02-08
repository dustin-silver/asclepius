import { el } from "redom";

class Menu {
  constructor(menus) {
    this.defaultMenu = menus[0][0].toLowerCase();
    this.menus = [];
    this.callbacks = [];

    let menuObjs = [el("span")];
    for (let m in menus) {
      let title = menus[m][0];
      let index = title.toLowerCase();
      let element = el(`span#menu_${index}`, title);
      menuObjs.push(element);
      this.menus[index] = element;
      this.callbacks[index] = menus[m][1];
      element.onclick = () => {
        this.selectMenu(index);
      };
    }
    menuObjs.push(el("span"));

    this.el = el("#menu", menuObjs);
  }
  selectMenu(menu) {
    menu = menu.toLowerCase();
    if (this.menus[menu] == undefined) {
      menu = this.defaultMenu;
    }
    for (let m in this.menus) {
      if (m == menu) {
        this.menus[m].className = "active";
      } else {
        this.menus[m].className = "";
      }
    }
    if (this.callbacks[menu]) {
      this.callbacks[menu]();
    }
    window.location.hash = `#${menu}`;
  }
}

export { Menu };
