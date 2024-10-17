const orderNames = document.querySelectorAll(".name-admin");
const iFrame = document.getElementById("iFrame");
const orderModal = document.getElementById("order-modal");
const grayBg = document.getElementById("gray-background");
const srtTitle = document.getElementById("srt-title");
const fileupload = document.getElementById("file");
const fileName = document.getElementById("file-name");
const markAsCompleted = document.getElementById("mark-as-complete");
const form = document.getElementById("send-file-form");

let videoId;
let orderToBeUpdated;

function showMarkAsCompleted() {
  markAsCompleted.style.display = "block";
}

function showOrderModal() {
  orderModal.style.display = "block";
  grayBg.style.display = "block";
}

function hideOrderModal() {
  orderModal.style.display = "none";
  grayBg.style.display = "none";
  iFrame.src = "";
}

function updateSrtTitle() {
  srtTitle.innerText = fileupload.files[0].name;
  showMarkAsCompleted();
}

async function fetchOrderDetails(event) {
  // orderToBeUpdated = event.target;
  videoId = event.target.dataset.videoid;

  iFrame.src = `https://www.youtube.com/embed/${event.target.dataset.videoyoutubeid}`;
  iFrame.title = event.target.dataset.videoname;
  fileName.innerText = event.target.dataset.videoname;
  showOrderModal();
}

async function sendFileToCustomer(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("file", fileupload.files[0]);
  formData.append("orderId", videoId);

  const response = await fetch("/admin/send-files", {
    method: "POST",
    body: formData,
  });

  const responseData = await response.json();
  console.log(responseData)

  if (responseData.message == "success") {
    hideOrderModal();
  }
}

for (const item of orderNames) {
  item.addEventListener("click", fetchOrderDetails);
}
grayBg.addEventListener("click", hideOrderModal);
fileupload.addEventListener("input", updateSrtTitle);
form.addEventListener("submit", sendFileToCustomer);
