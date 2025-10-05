var rows, button_add_row;
window.onload = function () {
  rows = document.getElementById("rows");
  button_add_row = document.getElementById("add_row");
  button_add_row.onclick = addRow;
};
function newElement(type) {
  return document.createElement(type);
}
function newInput(type) {
  let i = newElement("input");
  i.type = type;
  return i;
}
function newSelect(options) {
  let s = newElement("select");
  for (i in options) {
    let o = newElement("option");
    o.value = i;
    o.innerHTML = options[i];
    s.appendChild(o);
  }
  return s;
}
function newABOObject() {
  let ret = {};
  let span = newElement("span");
  span.className = "span_abo";
  let select = newSelect({ a: "A", b: "B", ab: "AB", o: "O" });
  select.onchange = function () {
    ret.onchange();
  };
  span.appendChild(select);
  let label = newElement("label");
  label.className = "check_rh";
  let checkbox = newInput("checkbox");
  checkbox.onchange = function () {
    ret.onchange();
  };
  label.appendChild(checkbox);
  span.appendChild(label);
  ret.span = span;
  ret.abo = select;
  ret.rh = checkbox;
  return ret;
}
function addRow() {
  let row = {};
  let form = newElement("form");
  form.className = "table_row";

  let span = newElement("span");
  let input = newInput("text");
  input.name = "input_label";
  span.appendChild(input);
  form.appendChild(span);

  row.donor = newABOObject();
  row.donor.onchange = function () {
    typeChange(row);
  };
  form.appendChild(row.donor.span);

  row.recipient = newABOObject();
  row.recipient.onchange = function () {
    typeChange(row);
  };
  form.appendChild(row.recipient.span);

  row.result = newElement("span");
  form.appendChild(row.result);

  typeChange(row);
  rows.appendChild(form);
}

function typeChange(row) {
  switch (row.recipient.abo.value) {
    case "o":
      if (row.donor.abo.value == "o") row.result.innerHTML = "None";
      else row.result.innerHTML = "Major";
      break;
    case "ab":
      if (row.donor.abo.value == "ab") row.result.innerHTML = "None";
      else row.result.innerHTML = "Minor";
      break;
    case "a":
    case "b":
      if (row.donor.abo.value == row.recipient.abo.value)
        row.result.innerHTML = "None";
      else if (row.donor.abo.value == "ab") row.result.innerHTML = "Major";
      else if (row.donor.abo.value == "o") row.result.innerHTML = "Minor";
      else row.result.innerHTML = "Major and minor";
  }
}
