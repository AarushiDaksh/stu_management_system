// Data store for students
let students = [];

// Coefficients for prediction (from the trained model in Python)
const coefficients = { intercept: 5, math: 0.4, english: 0.3, science: 0.5 };

// Function to add a student
function addStudent() {
  const name = document.getElementById('name').value.trim();
  const rollNumber = document.getElementById('rollNumber').value.trim();
  const course = document.getElementById('course').value.trim();
  const marks = document.getElementById('marks').value.trim();

  if (!name || !rollNumber || !course || !marks) {
    alert('All fields are required!');
    return;
  }

  const student = {
    name,
    rollNumber,
    course,
    marks: parseFloat(marks),
  };

  students.push(student);

  document.getElementById('name').value = '';
  document.getElementById('rollNumber').value = '';
  document.getElementById('course').value = '';
  document.getElementById('marks').value = '';

  renderStudentTable();
}

// Function to delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  renderStudentTable();
}

// Function to render the student table
function renderStudentTable() {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.rollNumber}</td>
      <td>${student.course}</td>
      <td>${student.marks}</td>
      <td><button onclick="deleteStudent(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Function to predict grade using the model
function predictGrade() {
  const mathMarks = parseFloat(document.getElementById('math').value.trim());
  const englishMarks = parseFloat(document.getElementById('english').value.trim());
  const scienceMarks = parseFloat(document.getElementById('science').value.trim());

  if (isNaN(mathMarks) || isNaN(englishMarks) || isNaN(scienceMarks)) {
    alert('All fields must be valid numbers!');
    return;
  }

  // Prediction using linear regression formula
  const predictedGrade = coefficients.intercept +
                         (coefficients.math * mathMarks) +
                         (coefficients.english * englishMarks) +
                         (coefficients.science * scienceMarks);

  document.getElementById('predictedGrade').innerText = `Predicted Grade: ${predictedGrade.toFixed(2)}`;
}
