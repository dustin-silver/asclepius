import { mount } from "redom";
import { App } from "app";
window.onload = function () {
  let app = new App();
  mount(document.body, app);
};
