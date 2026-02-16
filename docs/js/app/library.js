import { el } from "redom";
class SelectRow {
  constructor(label, options, units, onchange) {
    let ops = [];
    for (let i in options) {
      ops.push(el("option", { value: options[i] }, options[i]));
    }
    this.el = el(".row", [el("span.row_label", label), el("label.units", (this.selector = el("select", ops)), units)]);
    this.selector.onchange = onchange;
  }
  getValue() {
    return this.selector.value;
  }
}

class NumberInputRow {
  constructor(label, min, max, value, units, onchange) {
    this.el = el(".row", [
      el("span.row_label", label),
      el("label.units", (this.input = el("input", { type: "number", min: min, max: max, value: value })), units),
    ]);
    this.input.onchange = onchange;
  }
  getValue() {
    return this.input.value;
  }
}

class NumberIncrementInputRow {
  constructor(label, min, max, increment, value, units, onchange) {
    this.el = el(".row", [
      el("span.row_label", label),
      el(
        "label.units",
        (this.input = el("input", { type: "number", min: min, max: max, step: increment, value: value })),
        units,
      ),
    ]);
    this.input.onchange = onchange;
  }
  getValue() {
    return this.input.value;
  }
}

class TextRow {
  constructor(label, text) {
    this.el = el(".row", [el("span.row_label", label), (this.text = el("span", text))]);
  }
  setValue(text) {
    this.text.innerText = text;
  }
}

class FillRow {
  constructor() {
    this.el = el(".row", [el("span.row_label", ""), el("span.fill", "")]);
  }
}

export { SelectRow, NumberInputRow, NumberIncrementInputRow, TextRow, FillRow };
