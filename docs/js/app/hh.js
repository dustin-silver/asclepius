import { el } from "redom";
import {
  SelectRow,
  SelectOtherRow,
  NumberInputRow,
  NumberDivisionInputRow,
  NumberIncrementInputRow,
  TextInputRow,
  TextRow,
  CopyRow,
  FillRow,
} from "./library.js";

class HH {
  constructor() {
    let onchange = () => {
      this.compute();
    };
    this.el = el(".hh", [
      (this.age = new NumberInputRow("Age", 0, 120, 50, "", onchange)),
      (this.sex = new SelectRow("Sex", ["man", "woman"], "", onchange)),
      (this.genotype = new SelectOtherRow(
        "Genotype",
        ["C282Y/C282Y", "C282Y/H63D", "C282Y/WT", "H63D/H63D", "C282Y/S65C"],
        onchange,
      )),
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
      (this.objective = new TextRow("Objective", "")),
      new TextRow("", ""),
      (this.actualInterval = new NumberDivisionInputRow("Actual Interval", "0", "20", 7, "6", "weeks", onchange)),
      (this.ferritin = new NumberInputRow("Measured Ferritin", "0", "500", "100", "ng/ml", onchange)),
      (this.hgb = new NumberIncrementInputRow("HGB", "0", "30", "0.1", "14", "g/dl", onchange)),
      (this.assessment = new TextRow("Assessment", "")),
      new TextRow("", ""),
      (this.targetFerritin = new TextRow("Target Ferritin")),
      (this.newInterval = new NumberInputRow("New Interval", "0", "20", "6", "weeks", onchange)),
      (this.next = new SelectRow("Next", ["Continue", "Schedule"], "", onchange)),
      (this.plan = new TextRow("Plan", "")),
      new TextRow("", ""),
      (this.reviewer = new TextInputRow("Reviewer", onchange)),
      (this.reviewed = new TextRow("Reviewed", "")),
      new TextRow("", ""),
      (this.copy = new CopyRow("")),
      new FillRow(),
    ]);
    this.loadFromStorage();
    this.compute();
  }
  compute() {
    let age = this.age.getValue();
    let sex = this.sex.getValue();
    let genotype = this.genotype.getValue();

    let oldInterval = this.oldInterval.getValue();
    let currentTreatment = this.currentTreatment.getValue();
    let subjectiveText =
      `${age}-year-old ${sex} with ${genotype} hereditary hemochromatosis undergoing ${currentTreatment} Q ${oldInterval} weeks.  ` +
      `Patient denies interval changes such as arthralgia, skin discoloration, abdominal fullness, changes in alcohol intake or diet, fatigue, or hospitalization since last visit.`;
    this.subjective.setValue(subjectiveText);

    let actualInterval = this.actualInterval.getValue();
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
    let assessmentText = `${age}-year-old ${sex} with ${genotype} HFE hereditary hemochromatosis, who presents ${actualInterval} weeks since last phlebotomy with a ferritin ${relative} target range at ${ferritin} ng/ml and hgb at ${hgb} g/dl.`;
    this.assessment.setValue(assessmentText);

    let next = this.next.getValue();
    let newInterval = this.newInterval.getValue();
    let planText = `Target ferritin ${targetFerritin} ng/dl.  ${next} phlebotomy interval of Q ${newInterval} weeks.`;
    this.plan.setValue(planText);

    let reviewer = this.reviewer.getValue();
    let reviewedText = `This case was discussed with ${reviewer}, Chief of Blood Services Section, Department of Transfusion Medicine.`;
    this.reviewed.setValue(reviewedText);

    this.copy.setValue(
      `Subjective
${subjectiveText}
Objective
Assessment
${assessmentText}
Plan
${planText}

${reviewedText}`,
    );
    this.saveToStorage();
  }
  loadFromStorage() {
    let json = JSON.parse(window.localStorage.getItem("asclepius.hh"));
    if (json) {
      this.age.setValue(json["age"] || "50");
      this.sex.setValue(json["sex"] || "Male");
      this.genotype.setValue(json["genotype"] || "C282Y/C282Y");
      this.oldInterval.setValue(json["oldInterval"] || "6");
      this.currentTreatment.setValue(json["currentTreatment"] || "whole blood allogeneic phlebotomy");
      this.actualInterval.setValue(json["actualInterval"] || "6");
      this.ferritin.setValue(json["ferritin"] || "100");
      this.hgb.setValue(json["hgb"] || "14");
      this.newInterval.setValue(json["newInterval"] || "6");
      this.next.setValue(json["next"] || "Continue");
      this.reviewer.setValue(json["reviewer"] || "");
    }
  }
  saveToStorage() {
    let json = {
      age: this.age.getValue(),
      sex: this.sex.getValue(),
      genotype: this.genotype.getValue(),
      oldInterval: this.oldInterval.getValue(),
      currentTreatment: this.currentTreatment.getValue(),
      actualInterval: this.actualInterval.getValue(),
      ferritin: this.ferritin.getValue(),
      hgb: this.hgb.getValue(),
      newInterval: this.newInterval.getValue(),
      next: this.next.getValue(),
      reviewer: this.reviewer.getValue(),
    };
    window.localStorage.setItem("asclepius.hh", JSON.stringify(json));
  }
}

export { HH };
