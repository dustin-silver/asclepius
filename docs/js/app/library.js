import { el } from "redom";
class SelectRow {
  constructor(label, options, units, onchange) {
    this.options = options;
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
  setValue(value) {
    if (this.options.includes(value)) {
      this.selector.value = value;
    }
  }
}

class SelectOtherRow {
  constructor(label, options, onchange) {
    this.options = options;
    let ops = [];
    for (let i in options) {
      ops.push(el("option", { value: options[i] }, options[i]));
    }
    ops.push(el("option", { value: "other" }, "other"));
    this.el = el(".row", [
      el("span.row_label", label),
      el("span", [(this.selector = el("select", ops)), (this.other = el("input.hidden", { type: "text" }))]),
    ]);
    this.other.onchange = onchange;
    this.selector.onchange = () => {
      this.setVisible();
      onchange();
    };
  }
  setVisible() {
    if (this.selector.value == "other") {
      this.other.className = "";
    } else {
      this.other.className = "hidden";
    }
  }
  getValue() {
    if (this.selector.value == "other") {
      return this.other.value;
    }
    return this.selector.value;
  }
  setValue(value) {
    if (this.options.includes(value)) {
      this.selector.value = value;
    } else {
      this.selector.value = "other";
      this.other.value = value;
    }
    this.setVisible();
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
  setValue(value) {
    this.input.value = value;
  }
}

class NumberDivisionInputRow {
  static regex = /(\d+)( (\d+)\/\d+)?/;
  constructor(label, min, max, division, value, units, onchange) {
    this.division = division;
    this.el = el(".row", [
      el("span.row_label", label),
      el(
        "label.units",
        [
          (this.input = el("input", { type: "number", min: min, max: max, value: value })),
          (this.divInput = el("input", { type: "number", min: 0, max: division - 1, value: 0 })),
        ],
        `/${division} ${units}`,
      ),
    ]);
    this.input.onchange = onchange;
    this.divInput.onchange = onchange;
  }
  getValue() {
    if (this.divInput.value == 0) {
      return this.input.value;
    }
    return `${this.input.value} ${this.divInput.value}/${this.division}`;
  }
  setValue(value) {
    let match = value.match(NumberDivisionInputRow.regex);
    this.input.value = match[1];
    if (match[3]) {
      this.divInput.value = match[3];
    }
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
  setValue(value) {
    this.input.value = value;
  }
}

class TextInputRow {
  constructor(label, onchange) {
    this.el = el(".row", [el("span.row_label", label), (this.input = el("input"))]);
    this.input.onchange = onchange;
  }
  getValue() {
    return this.input.value;
  }
  setValue(value) {
    this.input.value = value;
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

async function copyToClipboard(text) {
  const ci = new ClipboardItem({ ["text/plain"]: text });
  await navigator.clipboard.write([ci]);
}

class CopyRow {
  constructor(text) {
    this.el = el(".row", [el("span.row_label", "Copy"), (this.text = el("span.copy", text))]);
    this.text.onclick = () => copyToClipboard(this.text.innerText);
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

export {
  SelectRow,
  SelectOtherRow,
  NumberInputRow,
  NumberDivisionInputRow,
  NumberIncrementInputRow,
  TextInputRow,
  TextRow,
  CopyRow,
  FillRow,
};
