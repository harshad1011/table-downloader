// Filename: tableParser.js
// Author: Harshad Shirsat
// Description: This file is to parse current HTML document
//              for tables & download those into excel format

// Retrieve all the tables in a page
function getTables() {
    var tables = document.getElementsByTagName("table");
    var printTables = "";

    for (var tableIdx = 0; tableIdx < tables.length; tableIdx++) {
        printTables += printTable(tables[tableIdx]);
    }

    downloadExcel(printTables);
}

// Function to format html tables into excel table
// Input: Takes table HTML element & formats it for excel
// Output: Formatted table string with page's table's data
function printTable(table) {
    var data = "<table>";

    for (var rowIdx = 0; rowIdx < table.rows.length; rowIdx++) {
        data += "<tr>";
        data += table.rows[rowIdx].innerHTML + "</tr >";
    }

    // Append new line before next table
    data += "</table><table><tr></tr></table>";

    return data;
}

// Creates a custom event to download excel file with formatted data
// Input: Formatted string of tables contained in HTML page.
// Output: Excel file with name as page's title
function downloadExcel(data) {
    // custom element
    var linkElement = document.createElement('a');

    // Specifies data format to be downloaded
    var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    try {
        // Create blob with excel type for download
        var blob = new Blob([data], {
            type: uri
        });
        var url = window.URL.createObjectURL(blob);
        var filename = document.title ? document.title : "download";
        filename += ".xlsx";

        linkElement.setAttribute('href', url);
        linkElement.setAttribute("download", filename);

        // Create custom click event for download
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        linkElement.dispatchEvent(clickEvent);
    } catch (ex) {
        console.log(ex);
    }
}

getTables();