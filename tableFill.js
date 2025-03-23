let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let tableData = [];

function FillTable() {
    BusinessLogic();
    TableDisplay();
}

function BusinessLogic() {
    let count = 0;

    for (let i = 0; i < a.length; i++) {
        tableData.push([]);

        for (let j = 0; j <= i; j++) {
            tableData[i][j] = a[i] * a[j];

            count++;
        }
    }

    console.log("count: " + count);
}

function GetData(i, j) {
    if (i < j) {
        let temp = i;
        i = j;
        j = temp;
    }

    return tableData[i][j];
}

function TableDisplay() {
    let tableSpace = document.getElementById("tableSpace");
    let row = document.createElement("tr");
    let cell = row.append(document.createElement("th"));
    tableSpace.append(row);

    for (let i = 0; i < a.length; i++) {
        cell = document.createElement("th");
        cell.textContent = a[i];
        row.append(cell);
    }

    for (let i = 0; i < a.length; i++) {
        row = document.createElement("tr");
        tableSpace.append(row);

        cell = document.createElement("th");
        cell.textContent = a[i];
        row.append(cell);

        for (let j = 0; j < a.length; j++) {
            cell = document.createElement("td");
            cell.textContent = GetData(i, j);
            row.append(cell);
        }
    }
}
