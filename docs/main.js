var select_type_donor;
var select_type_recipient;
var result;
window.onload = function () {
  select_type_donor = document.getElementById("select_type_donor");
  select_type_donor.onchange = typeChange;
  select_type_recipient = document.getElementById("select_type_recipient");
  select_type_recipient.onchange = typeChange;
  result = document.getElementById("result");
};
function typeChange(e) {
  switch (select_type_recipient.value) {
    case "o":
      if (select_type_donor.value == "o") result.innerHTML = "None";
      else result.innerHTML = "Major";
      break;
    case "ab":
      if (select_type_donor.value == "ab") result.innerHTML = "None";
      else result.innerHTML = "Minor";
      break;
    case "a":
    case "b":
      if (select_type_donor.value == select_type_recipient.value)
        result.innerHTML = "None";
      else if (select_type_donor.value == "ab") result.innerHTML = "Major";
      else if (select_type_donor.value == "o") result.innerHTML = "Minor";
      else result.innerHTML = "Major and minor";
  }
}
