//const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

const { viewportHeight, viewportWidth, options, pages } = config;

const getDirectories = (source) =>
    fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join(source, dirent.name));

function getImageFiles(path) {
    return fs.readdirSync(path).filter(function (file) {
        return file.match(/.*\.(png|jpg|jpeg|gif)$/);
    });
}

//STEP_1: Search for the folders
function searchFiles() {
    const ghostNewVersionFolder = './Ghost_5.x/';
    const ghostOldVersionFolder = './Ghost_3.x/';
    const newVersionSubfolders = getDirectories(ghostNewVersionFolder);
    const oldVersionSubfolders = getDirectories(ghostOldVersionFolder);
    console.log("General folders found: " + newVersionSubfolders.length + " in the new version and " + oldVersionSubfolders.length + " in the old version")
    return {newVersion: newVersionSubfolders, oldVersion: oldVersionSubfolders};
}

//STEP_2: Iterate over the folders
function iterateOverFolders(folders) {
    newGhostVersionFolders = folders['newVersion']
    oldGhostVersionFolders = folders['oldVersion']
    for (let i = 0; i < newGhostVersionFolders.length; i++) {
        let newGhostVersionFolder = newGhostVersionFolders[i];
        let oldGhostVersionFolder = oldGhostVersionFolders[i];
        console.log("New version folder: " + newGhostVersionFolder)
        console.log("Old version folder: " + oldGhostVersionFolder)
        iterateOverFunctionalities(newGhostVersionFolder, oldGhostVersionFolder);
    }
}

//STEP_3: Iterate over the functionalities
function iterateOverFunctionalities(newGhostVersionFolder, oldGhostVersionFolder) {
    let newGhostVersionFunctionalities = getDirectories("./" + newGhostVersionFolder);
    let oldGhostVersionFunctionalities = getDirectories("./" + oldGhostVersionFolder);
    console.log("Functionalities found: " + newGhostVersionFunctionalities.length + " in the new version and " + oldGhostVersionFunctionalities.length + " in the old version")
    console.log(newGhostVersionFunctionalities)
    console.log(oldGhostVersionFunctionalities)

    for (let i = 0; i < newGhostVersionFunctionalities.length; i++) {
        let newGhostVersionFunctionality = newGhostVersionFunctionalities[i];
        let oldGhostVersionFunctionality = oldGhostVersionFunctionalities[i];
        iterateImagesForFunctionality(newGhostVersionFunctionality, oldGhostVersionFunctionality);
    }
}



//STEP_4: Iterate over the images for each functionality
function iterateImagesForFunctionality(newGhostVersionFunctionality, oldGhostVersionFunctionality) {
    let newGhostVersionImages = getImageFiles("./" + newGhostVersionFunctionality).sort();
    let oldGhostVersionImages = getImageFiles("./" + oldGhostVersionFunctionality).sort();

    // path: 'Ghost_5.x/posts/F3.3'
    let functionalityName = newGhostVersionFunctionality.split("/")[1]
    let functionalityEscenary = newGhostVersionFunctionality.split("/")[2]

    console.log("Images found: " + newGhostVersionImages.length + " in the new version and " + oldGhostVersionImages.length + " in the old version")
    console.log(newGhostVersionImages)
    console.log(oldGhostVersionImages)

    if (newGhostVersionImages.length !== oldGhostVersionImages.length) {
        return;
    }

    for (let i = 0; i < newGhostVersionImages.length; i++) {
        let newGhostVersionImage = newGhostVersionImages[i];
        let oldGhostVersionImage = oldGhostVersionImages[i];
        compareImagesForFunctionality("./" + newGhostVersionFunctionality + "/" + newGhostVersionImage,
            "./" + oldGhostVersionFunctionality+ "/" + oldGhostVersionImage, functionalityName, functionalityEscenary);
    }
}


//STEP_5: Compare the images for each functionality
async function compareImagesForFunctionality(newGhostVersionImagePath, oldGhostVersionImagePath, functionalityName, functionalityEscenary) {
    console.log("Functionality: " + functionalityName + " - " + "Escenary:" + functionalityEscenary)
    console.log("New image: " + newGhostVersionImagePath)
    console.log("Old image: " + oldGhostVersionImagePath)

    let newGhost = fs.readFileSync(newGhostVersionImagePath)
    let oldGhost = fs.readFileSync(oldGhostVersionImagePath)
    let stepName = newGhostVersionImagePath.split("/")[4]

    const data = await compareImages(newGhost, oldGhost, options);
    generateReport(data, functionalityName, functionalityEscenary, stepName, newGhost, oldGhost);
}


//STEP_6: Generate the report
function generateReport(data, functionalityName, functionalityEscenary, stepName, newGhost, oldGhost) {
    let resultInfo = {}
    resultInfo = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime,
        functionalityName: functionalityName,
        functionalityEscenary: functionalityEscenary,
        stepName: stepName
    }
    //create dir if not exits and then write the file
    if (!fs.existsSync(`./results/reporte_${resultInfo.functionalityName}/escenario_${resultInfo.functionalityEscenary}`)){
        fs.mkdirSync(`./results/reporte_${resultInfo.functionalityName}/escenario_${resultInfo.functionalityEscenary}`, { recursive: true });
        fs.writeFileSync(`./results/reporte_${resultInfo.functionalityName}/escenario_${resultInfo.functionalityEscenary}/${resultInfo.stepName}`, data.getBuffer());
    }
    else {
        fs.writeFileSync(`./results/reporte_${resultInfo.functionalityName}/escenario_${resultInfo.functionalityEscenary}/${resultInfo.stepName}`, data.getBuffer());
    }
    
    generateHTML(resultInfo, newGhost, oldGhost, data.getBuffer());

}

function generateHTML(resultInfo, newGhost, oldGhost, comparisonImage) {
    let reportPath = `./results/report.html`;

    let htmlContent = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, 'utf8') : `<html>
        <head>
            <title>Comparison Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .comparison {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                .comparison img {
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                }
                .comparison div {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>Comparison Report</h1>
    `;

    htmlContent += `<h2>Functionality: ${resultInfo.functionalityName} - Escenary: ${resultInfo.functionalityEscenary}</h2>
            <h3>Step: ${resultInfo.stepName}</h3>
            <div class="comparison">
                <div>
                    <h3>New Image</h3>
                    <img src="data:image/png;base64,${newGhost.toString('base64')}" alt="New Image">
                </div>
                <div>
                    <h3>Old Image</h3>
                    <img src="data:image/png;base64,${oldGhost.toString('base64')}" alt="Old Image">
                </div>
                <div>
                    <h3>Comparison</h3>
                    <img src="data:image/png;base64,${comparisonImage.toString('base64')}" alt="Comparison">
                </div>
            </div>
            <h2>Comparison Details</h2>
            <p>Is Same Dimensions: ${resultInfo.isSameDimensions}</p>
            <p>Dimension Difference: ${JSON.stringify(resultInfo.dimensionDifference)}</p>
            <p>Raw MisMatch Percentage: ${resultInfo.rawMisMatchPercentage}</p>
            <p>MisMatch Percentage: ${resultInfo.misMatchPercentage}</p>
            <p>Diff Bounds: ${JSON.stringify(resultInfo.diffBounds)}</p>
            <p>Analysis Time: ${resultInfo.analysisTime}</p>`;

    fs.writeFileSync(reportPath, htmlContent);
}

async function executeTest() {
    //delete previous report
    let reportPath = `./results/report.html`;
    if (fs.existsSync(reportPath)) {
        fs.unlinkSync(reportPath);
    }

    filesToScan = searchFiles();
    iterateOverFolders(filesToScan);
}

(async ()=>console.log(await executeTest()))();

