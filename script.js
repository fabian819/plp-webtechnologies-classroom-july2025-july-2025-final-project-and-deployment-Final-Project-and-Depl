// Select elements
const form = document.querySelector("form");
const recordsGrid = document.querySelector(".records-grid");
const photoInput = document.getElementById("photo");
const notesInput = document.getElementById("notes");
const dateInput = document.getElementById("date");

// Load saved records from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
  savedRecords.forEach(record => addRecordCard(record));
});

// Preview image before upload
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      photoInput.setAttribute("data-preview", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission
form.addEventListener("submit", e => {
  e.preventDefault();

  const date = dateInput.value;
  const notes = notesInput.value.trim();
  const photo = photoInput.getAttribute("data-preview") || "images/default.jpg";

  // Validation
  if (!date || !notes) {
    alert("Please fill in both the date and notes!");
    return;
  }

  // Create record object
  const record = { date, notes, photo };

  // Save to localStorage
  const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
  savedRecords.push(record);
  localStorage.setItem("records", JSON.stringify(savedRecords));

  // Add record to page
  addRecordCard(record);

  // Reset form
  form.reset();
  photoInput.removeAttribute("data-preview");
});

// Function to add a record card
function addRecordCard(record) {
  const card = document.createElement("div");
  card.classList.add("record-card");

  card.innerHTML = `
    <h3>${record.date}</h3>
    <img src="${record.photo}" alt="Crop photo">
    <p>${record.notes}</p>
    <button class="delete-btn">Delete</button>
  `;

  // Add delete functionality
  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
    deleteRecord(record);
  });

  recordsGrid.prepend(card); // Newest on top
}

// Delete record from localStorage
function deleteRecord(recordToDelete) {
  const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
  const updatedRecords = savedRecords.filter(
    r => !(r.date === recordToDelete.date && r.notes === recordToDelete.notes && r.photo === recordToDelete.photo)
  );
  localStorage.setItem("records", JSON.stringify(updatedRecords));
}
