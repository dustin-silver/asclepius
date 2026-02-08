import { el } from "redom";

class HH {
  constructor() {
    this.el = el(".hh", [
      el(".age", "Age", (this.age = this.ageSelector())),
      el(".sex", "Sex", (this.sex = this.sexSelector())),
      el(".genotype", "Genotype", this.genotypeSelector()),
      el(".target_ferritin", "Target Ferritin", this.targetFerritinSelector()),
      el(
        ".current_interval",
        "Current Interval",
        this.currentIntervalSelector(),
      ),
      el(".actual_interval", "Actual Interval", this.actualIntervalSelector()),
      el(".ferritin", "Ferritin", this.ferritinSelector()),
      el(".hgb", "HGB", this.hgbSelector()),
    ]);
  }
  compute() {}
  ageSelector() {
    let ret = (this.age = el("input", {
      type: "number",
      min: "0",
      max: "120",
    }));
    this.age.onchange = () => {
      this.compute();
    };
    return ret;
  }
  sexSelector() {
    let ret = (this.sex = el("select", [
      el("option", { value: "m" }, "Man"),
      el("option", { value: "f" }, "Woman"),
    ]));
    this.sex.onchange = () => {
      this.compute();
    };
    return ret;
  }
  genotypeSelector() {
    let ret = el("span.genotype", [
      (this.genotype = el("select", [
        el("option", { value: "cc" }, "C282Y/C282Y"),
        el("option", { value: "ch" }, "C282Y/H63D"),
        el("option", { value: "cw" }, "C282Y/WT"),
        el("option", { value: "hh" }, "H63D/H63D"),
        el("option", { value: "cs" }, "C282Y/S65C"),
        el("option", { value: "o" }, "other"),
      ])),
      (this.genotypeOther = el("input", { type: "text" })),
    ]);
    this.genotypeOther.onchange = this.genotype.onchange = () => {
      this.compute();
    };
    return ret;
  }
  targetFerritinSelector() {
    let ret = (this.targetFerritin = el(
      "span.target_ferritin",
      "50-150 ng/ml",
    ));
    return ret;
  }
  currentIntervalSelector() {
    let ret = el(
      "label.current_interval",
      (this.currentInterval = el("input", {
        type: "number",
        min: "0",
        max: "20",
      })),
      "weeks",
    );
    this.currentInterval.onchange = () => {
      this.compute();
    };
    return ret;
  }
  actualIntervalSelector() {
    let ret = el(
      "label.actual_interval",
      (this.actualInterval = el("input", {
        type: "number",
        min: "0",
        max: "20",
      })),
      "weeks",
    );
    this.actualInterval.onchange = () => {
      this.compute();
    };
    return ret;
  }
  ferritinSelector() {
    let ret = el(
      "label.ferritin",
      (this.ferritin = el("input", { type: "number", min: "20", max: "80" })),
      "ng/ml",
    );
    this.ferritin.onchange = () => {
      this.compute();
    };
    return ret;
  }
  hgbSelector() {
    let ret = el(
      "label.hgb",
      (this.hgb = el("input", { type: "number", min: "20", max: "80" })),
      "g/dl",
    );
    this.hgb.onchange = () => {
      this.compute();
    };
    return ret;
  }
}

export { HH };
