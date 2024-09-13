// Array zum Speichern der Zeilen-Daten
let rowsData = JSON.parse(localStorage.getItem("rowsData")) || [];

// Funktion zum Speichern der Daten in localStorage
function saveToLocalStorage() {
  localStorage.setItem("rowsData", JSON.stringify(rowsData));
}

// Funktion zum Hinzufügen einer neuen Zeile
function addRow() {
  let tableBody = document.querySelector("#myTable tbody"); // Hinzufügen von 'tbody'
  let row = tableBody.insertRow();

  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  let cell5 = row.insertCell(5);

  let input3 = document.createElement("input");
  input3.type = "number";
  cell3.appendChild(input3);

  let input4 = document.createElement("input");
  input4.type = "number";
  cell4.appendChild(input4);

  let länge = document.getElementById("länge").value.trim();
  let dekor = document.getElementById("dekor").value.trim();
  let menge = document.getElementById("menge").value.trim();

  cell0.textContent = länge;
  cell1.textContent = dekor;
  cell2.textContent = menge;

  // Speichern der Zeile in rowsData inkl. input3 und input4
  rowsData.push({
    länge,
    dekor,
    menge,
    input3: input3.value,
    input4: input4.value,
  });

  saveToLocalStorage(); // Speichert das Array in localStorage

  // Synchronisiere Änderungen in den input-Feldern mit rowsData
  input3.addEventListener("input", function () {
    let rowIndex = row.rowIndex - 1;
    rowsData[rowIndex].input3 = input3.value;
    saveToLocalStorage();
  });

  input4.addEventListener("input", function () {
    let rowIndex = row.rowIndex - 1;
    rowsData[rowIndex].input4 = input4.value;
    saveToLocalStorage();
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-button";
  deleteButton.onclick = function () {
    let rowIndex = row.rowIndex - 1;
    tableBody.deleteRow(row.rowIndex);
    rowsData.splice(rowIndex, 1);
    saveToLocalStorage(); // Aktualisiere localStorage nach dem Löschen
  };

  cell5.appendChild(deleteButton);

  // Leere die Eingabefelder
  document.getElementById("länge").value = "";
  document.getElementById("dekor").value = "";
  document.getElementById("menge").value = "";
}

// Funktion zum Laden der Daten beim Start
function loadRows() {
  let tableBody = document.querySelector("#myTable tbody");
  rowsData.forEach((data) => {
    let row = tableBody.insertRow();

    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);

    cell0.textContent = data.länge;
    cell1.textContent = data.dekor;
    cell2.textContent = data.menge;

    let input3 = document.createElement("input");
    input3.type = "number";
    input3.value = data.input3;
    cell3.appendChild(input3);

    let input4 = document.createElement("input");
    input4.type = "number";
    input4.value = data.input4;
    cell4.appendChild(input4);

    // Synchronisiere Änderungen in den input-Feldern mit rowsData
    input3.addEventListener("input", function () {
      let rowIndex = row.rowIndex - 1;
      rowsData[rowIndex].input3 = input3.value;
      saveToLocalStorage();
    });

    input4.addEventListener("input", function () {
      let rowIndex = row.rowIndex - 1;
      rowsData[rowIndex].input4 = input4.value;
      saveToLocalStorage();
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function () {
      let rowIndex = row.rowIndex - 1;
      tableBody.deleteRow(row.rowIndex);
      rowsData.splice(rowIndex, 1);
      saveToLocalStorage();
    };

    cell5.appendChild(deleteButton);
  });
}

// Funktion, um die Enter-Taste zu überwachen und addRow auszulösen
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addRow();
  }
});

// Lade die gespeicherten Daten, wenn die Seite geladen wird
window.onload = loadRows;
