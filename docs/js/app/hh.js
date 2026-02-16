import { el } from "redom";

class HH {
  constructor() {
    this.el = el(".hh", [
      this.ageSelector(),
      this.sexSelector(),
      this.genotypeSelector(),
      el(".row", [el("span.col1", " "), el("span")]),
      this.currentPhaseSelector(),
      this.currentTreatmentSelector(),
      el(".row", [
        el("span.col1", "Subjective"),
        (this.subjective = el("span")),
      ]),
      el(".row", [el("span.col1", " "), el("span")]),
      this.currentIntervalSelector(),
      this.ferritinSelector(),
      this.hgbSelector(),
      el(".row", [el("span.col1", "Objective"), (this.objective = el("span"))]),
      el(".row", [el("span.col1", " "), el("span")]),
      this.targetFerritinSelector(),
      this.actualIntervalSelector(),
      this.nextSelector(),
      el(".row", [el("span.col1", "Plan"), (this.plan = el("span.fill"))]),
    ]);
    this.compute();
  }
  compute() {
    let age = this.age.value;
    let sex = this.sex.value;
    let genotype = this.genotype.value;
    if (genotype == "o") {
      genotype = this.genotypeOther;
    }

    let currentPhase = this.currentPhase.value;
    let currentTreatment = this.currentTreatment.value;
    this.subjective.innerText = `${age}-year-old ${sex} with ${genotype} HFE hereditary hemochromatosis currently in ${currentPhase} phase of phlebotomy therapy and undergoing ${currentTreatment}.
Patient denies interval changes: denies arthralgia, skin discoloration, abdominal fullness, changes in alcohol intake or diet, fatigue, or hospitalization since last phlebotomy.`;

    let currentInterval = this.currentInterval.value;
    let targetFerritin = "50-150 ng/ml";
    if (genotype == "C282Y/C282Y" && age < 65) {
      targetFerritin = "50-75 ng/ml";
    }
    this.targetFerritin.innerText = targetFerritin;
    let ferritin = this.ferritin.value;
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
    let hgb = this.hgb.value;
    this.objective.innerText = `${age}-year-old ${sex} with ${genotype} HFE hereditary hemochromatosis, who presents ${currentInterval} weeks since last phlebotomy with a ferritin ${relative} target range at ${ferritin} and hgb at ${hgb} g/dl.`;

    let next = this.next.value;
    let actualInterval = this.actualInterval.value;
    this.plan.innerText = `Target ferritin ${targetFerritin} ng/dl.  ${next} phlebotomy interval of Q ${actualInterval} weeks.`;
  }
  ageSelector() {
    let ret = el(".row", [
      el("span.col1", "Age"),
      (this.age = el("input", {
        type: "number",
        min: "0",
        max: "120",
        value: "50",
      })),
    ]);
    this.age.onchange = () => {
      this.compute();
    };
    return ret;
  }
  sexSelector() {
    let ret = el(".row", [
      el("span.col1", "Sex"),
      (this.sex = el("select", [
        el("option", { value: "Man" }, "Man"),
        el("option", { value: "Woman" }, "Woman"),
      ])),
    ]);
    this.sex.onchange = () => {
      this.compute();
    };
    return ret;
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
  targetFerritinSelector() {
    let ret = el(".row", [
      el("span.col1", "Target Ferritin"),
      (this.targetFerritin = el("span.target_ferritin", "50-150 ng/ml")),
    ]);
    return ret;
  }
  currentPhaseSelector() {
    let ret = el(".row", [
      el("span.col1", "Phase"),
      (this.currentPhase = el("select", [
        el("option", { value: "maintenance" }, "maintenance"),
        el("option", { value: "induction" }, "induction"),
      ])),
    ]);
    this.currentPhase.onchange = () => {
      this.compute();
    };
    return ret;
  }
  currentTreatmentSelector() {
    let ret = el(".row", [
      el("span.col1", "Treatment"),
      (this.currentTreatment = el("select", [
        el(
          "option",
          { value: "whole blood phlebotomy" },
          "whole blood phlebotomy",
        ),
        el(
          "option",
          { value: "double red cell collection apheresis (DRCA)" },
          "double red cell collection apheresis (DRCA)",
        ),
      ])),
    ]);
    this.currentTreatment.onchange = () => {
      this.compute();
    };
    return ret;
  }
  currentIntervalSelector() {
    let ret = el(".row", [
      el("span.col1", "Current Interval"),
      el(
        "label.current_interval",
        (this.currentInterval = el("input", {
          type: "number",
          min: "0",
          max: "20",
          value: "6",
        })),
        "weeks",
      ),
    ]);
    this.currentInterval.onchange = () => {
      this.compute();
    };
    return ret;
  }
  actualIntervalSelector() {
    let ret = el(".row", [
      el("span.col1", "Actual Interval"),
      el(
        "label.actual_interval",
        (this.actualInterval = el("input", {
          type: "number",
          min: "0",
          max: "20",
          value: "6",
        })),
        "weeks",
      ),
    ]);
    this.actualInterval.onchange = () => {
      this.compute();
    };
    return ret;
  }
  ferritinSelector() {
    let ret = el(".row", [
      el("span.col1", "Measured Ferritin"),
      el(
        "label.ferritin",
        (this.ferritin = el("input", {
          type: "number",
          min: "0",
          max: "500",
          value: "100",
        })),
        "ng/ml",
      ),
    ]);
    this.ferritin.onchange = () => {
      this.compute();
    };
    return ret;
  }
  hgbSelector() {
    let ret = el(".row", [
      el("span.col1", "HGB"),
      el(
        "label.hgb",
        (this.hgb = el("input", {
          type: "number",
          min: "0",
          max: "30",
          step: "0.1",
          value: "14",
        })),
        "g/dl",
      ),
    ]);
    this.hgb.onchange = () => {
      this.compute();
    };
    return ret;
  }
  nextSelector() {
    let ret = el(".row", [
      el("span.col1", "Next"),
      (this.next = el("select", [
        el("option", { value: "Continue" }, "Continue"),
        el("option", { value: "Schedule" }, "Schedule"),
      ])),
    ]);
    this.currentTreatment.onchange = () => {
      this.compute();
    };
    return ret;
  }
}

export { HH };
