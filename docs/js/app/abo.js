import { el } from "redom";

class ABO {
  static none = "None";
  static major = "Major";
  static minor = "Minor";
  static bidirectional = "Bidirectional";
  constructor() {
    this.el = el(".abo", [
      el(
        ".donor",
        "Donor",
        el("span", [
          (this.donor = aboSelector()),
          (this.donorRh = rhCheckbox()),
        ]),
      ),
      el(
        ".recipient",
        "Recipient",
        el("span", [
          (this.recipient = aboSelector()),
          (this.recipientRh = rhCheckbox()),
        ]),
      ),
      el(".result", "Result", (this.result = el("span"))),
    ]);
    this.donor.onchange = () => {
      this.setResult();
    };
    this.recipient.onchange = () => {
      this.setResult();
    };
  }
  setResult() {
    if (this.donor.value == this.recipient.value) {
      this.result.innerel = ABO.none;
      return;
    }
    switch (this.recipient.value) {
      case "o":
        this.result.innerel = ABO.major;
        break;
      case "ab":
        this.result.innerel = ABO.minor;
        break;
      case "a":
      case "b":
        if (this.donor.value == "ab") this.result.innerel = ABO.major;
        else if (this.donor.value == "o") this.result.innerel = ABO.minor;
        else this.result.innerel = ABO.bidirectional;
    }
  }
}
function aboSelector() {
  return el("select", [
    el("option", { value: "a" }, "A"),
    el("option", { value: "b" }, "B"),
    el("option", { value: "ab" }, "AB"),
    el("option", { value: "o" }, "O"),
  ]);
}
function rhCheckbox() {
  return el("label.check_rh", el("input", { type: "checkbox" }));
}

export { ABO };
