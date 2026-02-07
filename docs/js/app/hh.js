import { el } from "redom";

class HH {
  constructor() {
    this.el = el(".hh", [
      el(".age", "Age", (this.age = ageSelector())),
      el(".sex", "Sex", (this.sex = sexSelector())),
      el(".genotype", "Genotype", (this.genotype = genotypeSelector())),
      el(
        ".target_ferritin",
        "Target Ferritin",
        (this.targetFerritin = targetFerritinSelector()),
      ),
      el(
        ".current_interval",
        "Current Interval",
        (this.currentInterval = currentIntervalSelector()),
      ),
      el(
        ".actual_interval",
        "Actual Interval",
        (this.actualInterval = actualIntervalSelector()),
      ),
      el(".ferritin", "Ferritin", (this.ferrtin = ferritinSelector())),
      el(".hgb", "HGB", (this.hgb = hgbSelector())),
      el(".mcv", "MCV", (this.mcv = mcvSelector())),
    ]);
  }
}
function ageSelector() {
  return el("input", { type: "number", min: "0", max: "120" });
}
function sexSelector() {
  return el("select", [
    el("option", { value: "m" }, "Man"),
    el("option", { value: "f" }, "Woman"),
  ]);
}
function genotypeSelector() {
  return el("span.genotype", [
    el("select", [
      el("option", { value: "cc" }, "C282Y/C282Y"),
      el("option", { value: "ch" }, "C282Y/H63D"),
      el("option", { value: "cw" }, "C282Y/WT"),
      el("option", { value: "hh" }, "H63D/H63D"),
      el("option", { value: "cs" }, "C282Y/S65C"),
      el("option", { value: "o" }, "other"),
    ]),
    el("input", { type: "text" }),
  ]);
}
function targetFerritinSelector() {
  return el(
    "label.target_ferritin",
    el("input", { type: "number", min: "20", max: "80" }),
    "ng/ml",
  );
}
function currentIntervalSelector() {
  return el("input", { type: "number" });
}
function actualIntervalSelector() {
  return el("input", { type: "number" });
}
function ferritinSelector() {
  return el(
    "label.ferritin",
    el("input", { type: "number", min: "20", max: "80" }),
    "ng/ml",
  );
}
function hgbSelector() {
  return el("label.hgb", el("input", { type: "number", min: "20", max: "80" }));
}
function mcvSelector() {
  return el("label.mcv", el("input", { type: "number", min: "20", max: "80" }));
}

export { HH };
