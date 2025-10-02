var select_type_donor;
var select_type_recipient;
window.onload = function(){
  select_type_donor = document.getElementById("select_type_donor");
  select_type_donor.onchange = donorChange;
  select_type_recipient = document.getElementById("select_type_recipient");
  select_type_recipient.onchange = recipientChange;
};
function donorChange(e){
}
function recipientChange(e){
}
