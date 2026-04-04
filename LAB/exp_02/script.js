const empId = document.getElementById("empId");
const empName = document.getElementById("empName");
const empDept = document.getElementById("empDept");
const empSalary = document.getElementById("empSalary");
const tableBody = document.getElementById("tableBody");
const tableHeader = document.getElementById("tableHeader");
const infoText = document.getElementById("info-text");

let empData = JSON.parse(localStorage.getItem("empData")) || [];

function updateTable(headers, data, isSummary = false) {
    infoText.style.display = "none";
    
    tableHeader.innerHTML = headers.map(h => `<th>${h}</th>`).join("");
    
    tableBody.innerHTML = data.map(item => {
        if (isSummary) {
            return `<tr><td>${item.key}</td><td>${item.val}</td></tr>`;
        }
        return `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.dept}</td>
            <td>$${item.salary}</td>
        </tr>`;
    }).join("");
}

function addEmployee() {
    const name = empName.value;
    const id = empId.value;
    const dept = empDept.value;
    const salary = empSalary.value;

    if (name && id && dept && salary) {
        empData.push({ id, name, dept, salary: parseFloat(salary) });
        localStorage.setItem("empData", JSON.stringify(empData));
        
        [empId, empName, empDept, empSalary].forEach(i => i.value = "");
        displayAll();
    } else {
        alert("Please fill all fields");
    }
}

function displayAll() {
    updateTable(["ID", "Name", "Department", "Salary"], empData);
}

document.getElementById("addBtn").addEventListener("click", addEmployee);
document.getElementById("displayBtn").addEventListener("click", displayAll);

document.getElementById("deptCountBtn").addEventListener("click", () => {
    let counts = {};
    empData.forEach(e => counts[e.dept] = (counts[e.dept] || 0) + 1);
    
    const summaryData = Object.keys(counts).map(k => ({ key: k, val: counts[k] }));
    updateTable(["Department", "Count"], summaryData, true);
});

document.getElementById("avgSalaryBtn").addEventListener("click", () => {
    if (empData.length === 0) return;
    
    let totals = {};
    let counts = {};
    let grandTotal = 0;

    empData.forEach(e => {
        totals[e.dept] = (totals[e.dept] || 0) + e.salary;
        counts[e.dept] = (counts[e.dept] || 0) + 1;
        grandTotal += e.salary;
    });

    const summaryData = Object.keys(totals).map(k => ({ 
        key: k, 
        val: `$${(totals[k] / counts[k]).toFixed(2)}` 
    }));

    updateTable(["Department", "Average Salary"], summaryData, true);
    
    infoText.style.display = "block";
    infoText.innerHTML = `Company-wide Average: <strong>$${(grandTotal / empData.length).toFixed(2)}</strong>`;
});

document.getElementById("salaryFilter").addEventListener("click", () => {
    const filtered = empData.filter(e => e.salary > 5000);
    updateTable(["ID", "Name", "Department", "Salary"], filtered);
});


displayAll();