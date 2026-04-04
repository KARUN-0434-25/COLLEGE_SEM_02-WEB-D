const subjectInput = document.getElementById('subjectCount');
const setupStep = document.getElementById('setupStep');
const inputStep = document.getElementById('inputStep');
const marksList = document.getElementById('marksList');
const resultDisplay = document.getElementById('resultDisplay');

function getGrade(m) {
    if (m >= 90) return 'A+';
    if (m >= 80) return 'A';
    if (m >= 70) return 'B';
    if (m >= 60) return 'C';
    if (m >= 50) return 'D';
    return 'F';
}

function generateInputs() {
    const count = parseInt(subjectInput.value);
    if (!count || count <= 0) return alert("Please enter a valid number");

    marksList.innerHTML = ''; // Clear previous inputs
    for (let i = 1; i <= count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Subject ${i} Marks`;
        input.className = 'mark-input';
        marksList.appendChild(input);
    }

    setupStep.classList.add('hidden');
    inputStep.classList.remove('hidden');
}

function calculate() {
    const inputs = document.querySelectorAll('.mark-input');
    let total = 0;
    let html = `<h3>Report Card</h3><br>`;
    let isValid = true;

    inputs.forEach((input, index) => {
        const val = parseFloat(input.value) || 0;
        if (val < 0 || val > 100) isValid = false;
        
        total += val;
        html += `
            <div class="result-item">
                <span>Subject ${index + 1}:</span>
                <span class="grade-badge">${getGrade(val)}</span>
            </div>`;
    });

    if (!isValid) return alert("Marks must be between 0 and 100");

    const avg = total / inputs.length;
    html += `<hr style="margin:10px 0; border:1px solid #eee">`;
    html += `<div class="result-item"><strong>Total:</strong> <span>${total}</span></div>`;
    html += `<div class="result-item"><strong>Average:</strong> <span>${avg.toFixed(2)}%</span></div>`;
    html += `<div class="result-item"><strong>Final Grade:</strong> <span class="grade-badge">${getGrade(avg)}</span></div>`;

    resultDisplay.innerHTML = html;
    resultDisplay.classList.remove('hidden');
}

function reset() {
    inputStep.classList.add('hidden');
    resultDisplay.classList.add('hidden');
    setupStep.classList.remove('hidden');
    subjectInput.value = '';
}

document.getElementById('setupBtn').addEventListener('click', generateInputs);
document.getElementById('calcBtn').addEventListener('click', calculate);
document.getElementById('resetBtn').addEventListener('click', reset);
