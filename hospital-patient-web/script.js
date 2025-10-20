let patients = [];

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'display') displayPatients();
}

function addPatient() {
  const patient = {
    name: document.getElementById('name').value.trim(),
    age: document.getElementById('age').value,
    illness: document.getElementById('illness').value.trim(),
    doctor: document.getElementById('doctor').value.trim(),
    dateVisited: document.getElementById('date').value
  };

  if (!patient.name || !patient.age || !patient.illness || !patient.doctor || !patient.dateVisited) {
    alert("Please fill in all fields!");
    return;
  }

  patients.push(patient);
  alert(" Patient added successfully!");
  document.querySelectorAll('#add input').forEach(input => input.value = "");
}

function displayPatients() {
  const list = document.getElementById('patientList');
  if (patients.length === 0) {
    list.innerHTML = "<p>No patient records available.</p>";
    return;
  }

  list.innerHTML = patients.map(p => `
    <div class="patient">
      <strong>${p.name}</strong> (${p.age} yrs)<br>
      Illness: ${p.illness}<br>
      Doctor: ${p.doctor}<br>
      Date: ${p.dateVisited}<br>
      <hr>
    </div>
  `).join("");
}

function searchPatient() {
  const name = document.getElementById('searchName').value.trim();
  const result = document.getElementById('searchResult');
  const found = patients.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (found) {
    result.innerHTML = `
      <div>
        <h3>Patient Found!</h3>
        Name: ${found.name}<br>
        Age: ${found.age}<br>
        Illness: ${found.illness}<br>
        Doctor: ${found.doctor}<br>
        Date Visited: ${found.dateVisited}
      </div>`;
  } else {
    result.innerHTML = "<p>Patient not found.</p>";
  }
}

document.querySelector("button[onclick=\"showSection('display')\"]").addEventListener("click", displayPatients);

const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');
const memberImage = document.getElementById('memberImage');

function showImageFromFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert("Please select an image file.");
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    memberImage.src = e.target.result;
    memberImage.style.display = 'block';
  };
  reader.readAsDataURL(file);
}


fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  showImageFromFile(file);
});


dropArea.addEventListener('click', () => fileInput.click());
dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});
dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  showImageFromFile(file);
});


document.addEventListener('paste', e => {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      showImageFromFile(item.getAsFile());
      break;
    }
  }
});

showSection('add');
