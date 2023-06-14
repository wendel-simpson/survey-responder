const fs = require("fs");
const csv = require("csv-parser");

const dataConverter = () => {
  // Store the csv data in an array
  const csvFile = "./data/data2.csv";
  const jsonFile = "./data/data.json";

  const data = [];
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      const jsonData = JSON.stringify(data, null, 4);
      fs.writeFileSync(jsonFile, jsonData);
      console.log("CSV to JSON conversion completed!");
    });
};

dataConverter();
