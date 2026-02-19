import { el } from "redom";
import { SelectRow, NumberInputRow, NumberIncrementInputRow, TextRow, FillRow } from "./library.js";

class HH {
  constructor() {
    let onchange = () => {
      this.compute();
    };
    this.el = el(".hh", [
      (this.age = new NumberInputRow("Age", 0, 120, 50, "", onchange)),
      (this.sex = new SelectRow("Sex", ["man", "woman"], "", onchange)),
      this.genotypeSelector(),
      new TextRow("", ""),
      (this.oldInterval = new NumberInputRow("Old Interval", "0", "20", "6", "weeks", onchange)),
      (this.currentTreatment = new SelectRow(
        "Current Treatment",
        [
          "whole blood allogeneic phlebotomy",
          "whole blood therapeutic phlebotomy",
          "whole blood research phlebotomy",
          "double red cell apheresis (DRCA)",
        ],
        "",
        onchange,
      )),
      (this.subjective = new TextRow("Subjective", "")),
      new TextRow("", ""),
      (this.currentInterval = new NumberInputRow("Current Interval", "0", "20", "6", "weeks", onchange)),
      (this.ferritin = new NumberInputRow("Measured Ferritin", "0", "500", "100", "ng/ml", onchange)),
      (this.hgb = new NumberIncrementInputRow("HGB", "0", "30", "0.1", "14", "g/dl", onchange)),
      (this.objective = new TextRow("Objective", "")),
      (this.assessment = new TextRow("Assessment", "")),
      new TextRow("", ""),
      (this.targetFerritin = new TextRow("Target Ferritin")),
      (this.newInterval = new NumberInputRow("New Interval", "0", "20", "6", "weeks", onchange)),
      (this.next = new SelectRow("Next", ["Continue", "Schedule"], "", onchange)),
      (this.plan = new TextRow("Plan", "")),
      new FillRow(),
    ]);
    this.compute();
  }
  compute() {
    let age = this.age.getValue();
    let sex = this.sex.getValue();
    let genotype = this.genotype.value;
    if (genotype == "o") {
      genotype = this.genotypeOther;
    }

    let oldInterval = this.oldInterval.getValue();
    let currentTreatment = this.currentTreatment.getValue();
    this.subjective.setValue(
      `${age}-year-old ${sex} with ${genotype} hereditary hemochromatosis undergoing ${currentTreatment} Q ${oldInterval} weeks.  ` +
        `Patient denies interval changes including arthralgia, skin discoloration, abdominal fullness, changes in alcohol intake or diet, fatigue, or hospitalization since last visit.`,
    );

    let currentInterval = this.currentInterval.getValue();
    let targetFerritin = "50-150 ng/ml";
    if (genotype == "C282Y/C282Y" && age < 65) {
      targetFerritin = "50-75 ng/ml";
    }
    this.targetFerritin.setValue(targetFerritin);
    let ferritin = this.ferritin.getValue();
    let relative = "within";
    if (ferritin < 50) {
      relative = "below";
    } else if (genotype == "C282Y/C282Y" && age < 65) {
      if (ferritin > 75) {
        relative = "above";
      }
    } else if (ferritin > 150) {
      relative = "above";
    }
    let hgb = this.hgb.getValue();
    this.assessment.setValue(
      `${age}-year-old ${sex} with ${genotype} HFE hereditary hemochromatosis, who presents ${currentInterval} weeks since last phlebotomy with a ferritin ${relative} target range at ${ferritin} ng/ml and hgb at ${hgb} g/dl.`,
    );

    let next = this.next.getValue();
    let newInterval = this.newInterval.getValue();
    this.plan.setValue(
      `Target ferritin ${targetFerritin} ng/dl.  ${next} phlebotomy interval of Q ${newInterval} weeks.`,
    );
  }
  genotypeSelector() {
    let ret = el(".row", [
      el("span.col1", "Genotype"),
      (this.genotype = el("select", [
        el("option", { value: "C282Y/C282Y" }, "C282Y/C282Y"),
        el("option", { value: "C282Y/H63D" }, "C282Y/H63D"),
        el("option", { value: "C282Y/WT" }, "C282Y/WT"),
        el("option", { value: "H63D/H63D" }, "H63D/H63D"),
        el("option", { value: "C282Y/S65C" }, "C282Y/S65C"),
        el("option", { value: "o" }, "other"),
      ])),
      (this.genotypeOther = el("input.hidden", { type: "text" })),
    ]);
    this.genotypeOther.onchange = this.genotype.onchange = () => {
      if (this.genotype.value == "o") {
        this.genotypeOther.className = "";
      } else {
        this.genotypeOther.className = "hidden";
      }
      this.compute();
    };
    return ret;
  }
}

export { HH };
