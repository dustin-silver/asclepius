const { html, mount } = redom;
window.onload = function () {
  mount(document.body, new ABO());
};
class ABO {
  static none = "None";
  static major = "Major";
  static minor = "Minor";
  static bidirectional = "Bidirectional";
  constructor() {
    this.el = html(".abo", [
      html(
        ".donor",
        "Donor",
        html("span", [
          (this.donor = aboSelector()),
          (this.donorRh = rhCheckbox()),
        ]),
      ),
      html(
        ".recipient",
        "Recipient",
        html("span", [
          (this.recipient = aboSelector()),
          (this.recipientRh = rhCheckbox()),
        ]),
      ),
      html(".result", "Result", (this.result = html("span"))),
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
      this.result.innerHTML = ABO.none;
      return;
    }
    switch (this.recipient.value) {
      case "o":
        this.result.innerHTML = ABO.major;
        break;
      case "ab":
        this.result.innerHTML = ABO.minor;
        break;
      case "a":
      case "b":
        if (this.donor.value == "ab") this.result.innerHTML = ABO.major;
        else if (this.donor.value == "o") this.result.innerHTML = ABO.minor;
        else this.result.innerHTML = ABO.bidirectional;
    }
  }
}
function aboSelector() {
  return html("select", [
    html("option", { value: "a" }, "A"),
    html("option", { value: "b" }, "B"),
    html("option", { value: "ab" }, "AB"),
    html("option", { value: "o" }, "O"),
  ]);
}
function rhCheckbox() {
  return html("label.check_rh", html("input", { type: "checkbox" }));
}
