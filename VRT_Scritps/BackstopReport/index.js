const fs = require("fs");
const path = require("path");
const backstop = require("backstopjs");
const args = process.argv.slice(2);
const folderOne = args[0];
const folterTwo = args[1];

const defaultBackstopConfig = require("./backstop.json");
const filePrepend = `file:${path.sep}${path.sep}`;
const checkIfFolerExistsq = (folder) => {
  if (!fs.existsSync(folder)) {
    console.log(`Folder ${folder} does not exist`);
    process.exit(1);
  }
};

function getFiles(dirPath) {
  let results = [];
  const files = fs.readdirSync(dirPath);

  for (let file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      results.push(filePath);
    }
  }

  return results;
}
const treshold = 0.1;

// Verify that the folder exists
checkIfFolerExistsq(folderOne);
checkIfFolerExistsq(folterTwo);

const referenceFiles = getFiles(folderOne);
const testFiles = getFiles(folterTwo);

// Create steps
const scenarios = [];

// Match the file names using the parent folder

referenceFiles.forEach((referenceFile) => {
  const referenceFileName = path.basename(referenceFile);
  const referenceFolder = path.basename(path.dirname(referenceFile));
  const testFile = testFiles.find((file) => {
    const testFileName = path.basename(file);
    const testFolderName = path.basename(path.dirname(file));
    return (
      testFileName === referenceFileName && testFolderName === referenceFolder
    );
  });

  if (!testFile) {
    console.log(`File ${referenceFileName} does not exist`);
  } else {
    scenarios.push({
      referenceUrl: filePrepend + referenceFile,
      url: filePrepend + testFile,
      misMatchThreshold: treshold,
      label: referenceFolder + ": " + referenceFileName,
    });
  }
});

const config = JSON.parse(JSON.stringify(defaultBackstopConfig));
config.scenarios = scenarios;
backstop("reference", {
  config,
}).then(() => {
  backstop("test", {
    config,
  }).catch(() => {});
});
