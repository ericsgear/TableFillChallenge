let arraySize;
let tableData = [];
let simplifiedTableData = [];
let saverData = [];
let normalizedData = [];
let intBytes = 8; // a JavaScript integer uses 8 bytes

let gatheredData = {
    time: { original: 0, simplified: 0, saver: 0 },
    count: { original: 0, simplified: 0, saver: 0 }
};

function FillTable() {
    arraySize = arraySizeText.value * 1;

    OriginalBusinessLogic();
    SimplifiedBusinessLogic();
    MemorySaver();
    FinishedCalculating();
    CleanUp();
    alert("Done.");
}

function CleanUp() {
    tableData = [];
    simplifiedTableData = [];
    saverData = [];
    normalizedData = [];
}

function OriginalBusinessLogic() {
    let count = 0;
    gatheredData.time.original = Date.now();

    for (let i = 1; i <= arraySize; i++) {
        tableData.push([]);

        for (let j = 1; j <= arraySize; j++) {
            tableData[i - 1][j - 1] = i * j;

            count++;
        }
    }

    gatheredData.time.original = Date.now() - gatheredData.time.original;
    gatheredData.count.original = count;

    TableDisplay(tableSpace, GetOriginalData);
}

function SimplifiedBusinessLogic() {
    let count = 0;
    gatheredData.time.simplified = Date.now();

    for (let i = 1; i <= arraySize; i++) {
        simplifiedTableData.push([]);

        for (let j = 1; j <= i; j++) {
            simplifiedTableData[i - 1][j - 1] = i * j;

            count++;
        }
    }

    gatheredData.time.simplified = Date.now() - gatheredData.time.simplified;
    gatheredData.count.simplified = count;

    TableDisplay(tableSpace2, GetSimplifiedData);
}

function MemorySaver() {
    gatheredData.time.saver = Date.now();

    for (let i = 1; i <= arraySize; i++) {
        saverData.push([]);

        for (let j = 1; j <= i; j++) {
            let data = i * j;
            let index = normalizedData.indexOf(data);

            if (index === -1) {
                index = normalizedData.length;
                normalizedData.push(data); // this array actually contains the data, while saverData will just get the index of this array as reference
            }

            saverData[i - 1][j - 1] = index; // this would save memory if the data was a string or a complex object, and if this was a complex object, you may even use a direct memory reference rather than an index
        }
    }

    gatheredData.time.saver = Date.now() - gatheredData.time.saver;
    gatheredData.count.saver = normalizedData.length;

    TableDisplay(tableSpace3, GetSaverData);
}

function GetOriginalData(i, j) {
    return tableData[i - 1][j - 1];
}

function SwapIndicies(i, j) {
    return i < j ? [j, i] : [i, j];
}

function GetSimplifiedData(i, j) {
    [i, j] = SwapIndicies(i, j);

    return simplifiedTableData[i - 1][j - 1];
}

function GetSaverData(i, j) {
    [i, j] = SwapIndicies(i, j);

    return normalizedData[saverData[i - 1][j - 1]];
}

function CreateTh(content) {
    let cell = document.createElement("th");
    cell.textContent = content;
    return cell;
}

function TableDisplay(displayTable, dataMethod) {
    let row = document.createElement("tr");
    let skipRows = false;
    let skipCols = false;

    row.append(document.createElement("th"));
    displayTable.innerHTML = "";
    displayTable.append(row);

    for (let i = 1; i <= arraySize; i++) {
        row.append(CreateTh(i));

        if (arraySize > 20 && i > 9 && !skipRows) {
            i = arraySize - 5;
            skipRows = true;

            row.append(CreateTh("..."));
        }
    }
    skipRows = false;

    for (let i = 1; i <= arraySize; i++) {
        row = document.createElement("tr");
        displayTable.append(row);

        row.append(CreateTh(i));

        for (let j = 1; j <= arraySize; j++) {
            let cell = document.createElement("td");
            cell.textContent = dataMethod(i, j);
            row.append(cell);

            if (arraySize > 20 && j > 9 && !skipCols) {
                j = arraySize - 5;
                skipCols = true;

                row.append(document.createElement("th"));
            }
        }
        skipCols = false;

        if (arraySize > 20 && i > 9 && !skipRows) {
            i = arraySize - 5;
            skipRows = true;

            row = document.createElement("tr");
            displayTable.append(row);
            row.append(CreateTh("..."));

            for (let j = 0; j < 16; j++) {
                row.append(document.createElement("th"));
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
