
// Modal functionalities
var modal = document.getElementById("myModal");
var notBtn = document.querySelector("#no-btn");
const resElm = document.querySelector("#myModal span");
const scoreElm = document.querySelector("#score");
const reviewElm = document.querySelector("#review");


notBtn.onclick = function () {
  modal.style.display = "none";
  resElm.innerHTML = "";
  scoreElm.value = "";
  reviewElm.value = "";
}

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resElm.innerHTML = "";
    scoreElm.value = "";
    reviewElm.value = "";
  }
});

const editModal = document.querySelector("#editModal");
const noteditBtn = document.querySelector("#no-edit-btn");
const resEditElm = document.querySelector("#editModal span");
const editScoreElm = document.querySelector("#edit-score");
const editReviewElm = document.querySelector("#edit-review");

noteditBtn.onclick = function () {
  editModal.style.display = "none";
  resEditElm.innerHTML = "";
  editScoreElm.value = "";
  editReviewElm.value = "";
}

window.addEventListener("click",  function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
    resEditElm.innerHTML = "";
    editScoreElm.value = "";
    editReviewElm.value = "";
  }
});


