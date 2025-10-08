const fs = require('fs');
const path = require('path');

function readCsvColumn(filePath, columnName) {
  const csvContent = fs.readFileSync(filePath, 'utf8');
  const lines = csvContent.split('\n').filter(Boolean); // remove empty lines

  const headers = lines[0].split(','); // header row
  const columnIndex = headers.indexOf(columnName);
  if (columnIndex === -1) throw new Error(`Column "${columnName}" not found`);

  const firstRow = lines[1].split(','); // only first data row
  return firstRow[columnIndex];
}
module.exports = { readCsvColumn };

// Example usage
// const filePath = 'C:/Users/Blubirch.DESKTOP-EN2LGLN/PLAYWRIGHT AUTOMATION/testdata/prd_file.csv';
//const inwardDate = readCsvColumn(filePath, 'INWARD_REFERENCE_DOCUMENT_DATE');

//console.log('Date from CSV:', inwardDate);
