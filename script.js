let rowsData = JSON.parse(localStorage.getItem("rowsData")) || [];

function saveToLocalStorage() {
  localStorage.setItem("rowsData", JSON.stringify(rowsData));
}

function addRow() {
  let tableBody = document.querySelector("#myTable tbody");
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

  rowsData.push({
    länge,
    dekor,
    menge,
    input3: input3.value,
    input4: input4.value,
  });

  saveToLocalStorage();

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

  document.getElementById("länge").value = "";
  document.getElementById("dekor").value = "";
  document.getElementById("menge").value = "";
}

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

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addRow();
  }
});

async function fetchTime() {
  try {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/Europe/Berlin"
    );
    if (!response.ok) throw new Error("Keine gültige Antwort von der API");

    const data = await response.json();
    const dateTime = new Date(data.datetime);
    const offset = data.utc_offset;

    let hours = dateTime.getUTCHours();
    let minutes = dateTime.getUTCMinutes();
    let seconds = dateTime.getUTCSeconds();

    const offsetSign = offset[0] === "+" ? 1 : -1;
    const offsetHours = parseInt(offset.slice(1, 3), 10);
    const offsetMinutes = parseInt(offset.slice(4, 6), 10);

    hours = (hours + offsetSign * offsetHours) % 24;
    minutes = (minutes + offsetSign * offsetMinutes) % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.getElementById("clock").textContent = formattedTime;
  } catch (error) {
    console.warn(
      "Fehler beim Abrufen der Zeit von der API. Fallback auf lokale Zeit:",
      error
    );
    updateLocalTime();
  }
}

function updateLocalTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(fetchTime, 10000);

fetchTime();

setInterval(updateLocalTime, 1000);

window.onload = loadRows;
