
// Modal functionalities
var modal = document.getElementById("myModal");
var notBtn = document.querySelector("#no-btn");
const resElm = document.querySelector("#myModal span");

notBtn.onclick = function() {
  modal.style.display = "none";
  resElm.innerHTML = "";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resElm.innerHTML = "";
  }
}




