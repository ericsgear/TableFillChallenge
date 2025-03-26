let a = [];
let arraySize;
let tableData = [];
let simplifiedTableData = [];
let saverData = [];
let normalizedData = [];
let intBytes = 8; // a JavaScript integer uses 8 bytes

let gatheredData = {
    time: { original: 0, simplified: 0, saver: 0 },
    count: { original: 0, simplified: 0, saver: 0 },
    saved: { time: 0, memory: "" }
};

function FillTable() {
    arraySize = arraySizeText.value * 1;

    SetupArrays();
    OriginalBusinessLogic();
    SimplifiedBusinessLogic();
    MemorySaver();
    CleanUp();
}

function CleanUp() {
    a = [];

    tableData = [];
    simplifiedTableData = [];
    saverData = [];
    normalizedData = [];
}

function SetupArrays() {
    for (let i = 1; i <= arraySize; i++) {
        a.push(i);
    }
}

function OriginalBusinessLogic() {
    let count = 0;
    let start = Date.now();

    for (let i = 0; i < a.length; i++) {
        tableData.push([]);

        for (let j = 0; j < a.length; j++) {
            tableData[i][j] = a[i] * a[j];

            count++;
        }
    }

    let end = Date.now();
    gatheredData.time.original = end - start;
    gatheredData.count.original = count;

    FinishedCalculating();
    TableDisplay(tableSpace, GetOriginalData);
}

function SimplifiedBusinessLogic() {
    let count = 0;
    gatheredData.time.simplified = Date.now();

    for (let i = 0; i < a.length; i++) {
        simplifiedTableData.push([]);

        for (let j = 0; j <= i; j++) {
            simplifiedTableData[i][j] = a[i] * a[j];

            count++;
        }
    }

    gatheredData.time.simplified = Date.now() - gatheredData.time.simplified;
    gatheredData.count.simplified = count;

    FinishedCalculating();
    TableDisplay(tableSpace2, GetSimplifiedData);
}

function MemorySaver() {
    gatheredData.time.saver = Date.now();

    for (let i = 0; i < a.length; i++) {
        saverData.push([]);

        for (let j = 0; j <= i; j++) {
            let data = a[i] * a[j];
            let index = normalizedData.indexOf(data);

            if (index == -1) {
                index = normalizedData.length;
                normalizedData.push(data);
            }

            saverData[i][j] = index; // this would save memory if the data was a string or a complex object
        }
    }

    gatheredData.time.saver = Date.now() - gatheredData.time.saver;
    gatheredData.count.saver = normalizedData.length;

    FinishedCalculating();
    TableDisplay(tableSpace3, GetSaverData);
}

function GetOriginalData(i, j) {
    return tableData[i][j];
}

function GetSimplifiedData(i, j) {
    if (i < j) {
        let temp = i;
        i = j;
        j = temp;
    }

    return simplifiedTableData[i][j];
}

function GetSaverData(i, j) {
    if (i < j) {
        let temp = i;
        i = j;
        j = temp;
    }

    return normalizedData[saverData[i][j]];
}

function TableDisplay(displayTable, dataMethod) {
    let row = document.createElement("tr");
    let cell = row.append(document.createElement("th"));
    let skipRows = [false, false];

    displayTable.innerHTML = "";
    displayTable.append(row);

    for (let i = 0; i < a.length; i++) {
        cell = document.createElement("th");
        cell.textContent = a[i];
        row.append(cell);

        if (arraySize > 20 && i > 8 && !skipRows[0]) {
            i = a.length - 6;
            skipRows[0] = true;

            cell = document.createElement("th");
            cell.textContent = "...";
            row.append(cell);
        }
    }
    skipRows[0] = false;

    for (let i = 0; i < a.length; i++) {
        row = document.createElement("tr");
        displayTable.append(row);

        cell = document.createElement("th");
        cell.textContent = a[i];
        row.append(cell);

        for (let j = 0; j < a.length; j++) {
            cell = document.createElement("td");
            cell.textContent = dataMethod(i, j);
            row.append(cell);

            if (arraySize > 20 && j > 8 && !skipRows[1]) {
                j = a.length - 6;
                skipRows[1] = true;

                cell = document.createElement("th");
                row.append(cell);
            }
        }
        skipRows[1] = false;

        if (arraySize > 20 && i > 8 && !skipRows[0]) {
            i = a.length - 6;
            skipRows[0] = true;

            row = document.createElement("tr");
            displayTable.append(row);
            cell = document.createElement("th");
            cell.textContent = "...";
            row.append(cell);

            for (let j = 0; j < 16; j++) {
                cell = document.createElement("th");
                row.append(cell);
            }
        }
    }
}

function FinishedCalculating() {
    originalTime.innerText = gatheredData.time.original;
    originalCount.innerText = gatheredData.count.original;

    simplifiedTime.innerText = gatheredData.time.simplified;
    simplifiedCount.innerText = gatheredData.count.simplified;

    saverTime.innerText = gatheredData.time.saver;
    saverCount.innerText = gatheredData.count.saver;

    timeSaved.innerText = CalculateTime(gatheredData.time.simplified);
    timeSaved2.innerText = CalculateTime(gatheredData.time.saver);

    memorySavedPercent1.innerText =
        CalculateSavingsPercentage(gatheredData.count.simplified) + "%";
    memorySavedPercent2.innerText =
        CalculateSavingsPercentage(gatheredData.count.saver) + "%";

    memoryUsed0.innerText = CalculateMemory(gatheredData.count.original, 0);
    memoryUsed1.innerText = CalculateMemory(gatheredData.count.simplified, 0);
    memoryUsed2.innerText = CalculateMemory(gatheredData.count.saver, 0);

    memorySaved1.innerText = CalculateMemory(
        gatheredData.count.original,
        gatheredData.count.simplified
    );
    memorySaved2.innerText = CalculateMemory(
        gatheredData.count.original,
        gatheredData.count.saver
    );
}

function CalculateSavingsPercentage(comparison) {
    return 100 - (comparison / gatheredData.count.original) * 100;
}

function CalculateTime(comparison) {
    let timeDifference = gatheredData.time.original - comparison;
    let timeLabel = " milliseconds";

    if (timeDifference > 1000) {
        timeDifference /= 1000;
        timeLabel = " seconds";

        if (timeDifference > 60) {
            timeDifference /= 60;
            timeLabel = " minutes";

            if (timeDifference > 60) {
                timeDifference /= 60;
                timeLabel = " hours";

                if (timeDifference > 24) {
                    timeDifference /= 24;
                    timeLabel = " days";
                }
            }
        }
    }

    return timeDifference.toFixed(2) + timeLabel;
}

function CalculateMemory(baseline, comparison) {
    let memoryDifference = intBytes * (baseline - comparison);
    let count = 0;

    while (memoryDifference > 1024) {
        memoryDifference /= 1024;
        count++;
    }

    let memoryLabel = " ";

    switch (count) {
        case 1:
            memoryLabel = " kilo";
            break;
        case 2:
            memoryLabel = " mega";
            break;
        case 3:
            memoryLabel = " giga";
            break;
        case 4:
            memoryLabel = " tera";
            break;
        case 5:
            memoryLabel = " peta";
            break;
    }

    return memoryDifference.toFixed(2) + memoryLabel + "bytes";
}
