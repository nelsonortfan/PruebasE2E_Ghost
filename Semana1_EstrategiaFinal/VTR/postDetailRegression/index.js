const playwright = require("playwright");
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require("fs");

// Adapted from  https://misovirtual.virtual.uniandes.edu.co/codelabs/visual-regression-testing-resemble/index.html#3
function browser(result) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        Diff of ${result.misMatchPercentage}%
        <p>Data: ${JSON.stringify(result)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="./${result.viewport}/${
    result.source
  }.png" id="refImage" label="${result.source}">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="./${result.viewport}/${
    result.target
  }.png" id="testImage" label="${result.target}">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./${result.viewport}/${
    result.diff
  }.png" id="diffImage" label="Diff">
      
      </div>
    </div>
  </div>`;
}

function viewportDetail(viewportWithComparissons) {
  return `
        <div class="viewport">
            <h3>Viewport: ${viewportWithComparissons.viewport.name} ${
    viewportWithComparissons.viewport.width
  }X${viewportWithComparissons.viewport.height}</h3>
            <div class="visualizer">
                ${viewportWithComparissons.comparissons.map(browser)}
            </div>
        </div>
        `;
}

function createReport(datetime, viewportConfig) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
        <h1>Resemeble report for  <a href="${viewportConfig.url}"> ${
    viewportConfig.url
  } </a>  </h1>
        <p>Executed: ${datetime}</p>
        <div id="viewPortSection">
        ${viewportConfig.viewPorts.map(viewportDetail)}
    </div>
        </body>
    </html>`;
}

async function takeScreenshot(b, viewport, url, path) {
  const browser = await playwright[b].launch({
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path, fullPage: true });
  await browser.close();
}

async function executeTest() {
  const browsers = config.browsers;
  if (browsers.length === 0) {
    return;
  }
  let resultInfo = [];
  let datetime = new Date().toISOString().replace(/:/g, ".");
  for (let i = 0; i < config.urls.length; i++) {
    const resultObject = {};
    const url = config.urls[i];
    resultObject.url = url;
    resultObject.viewPorts = [];
    for (viewport in config.viewPorts) {
      viewport = config.viewPorts[viewport];
      const viewPortResult = {
        viewport: viewport,
        comparissons: [],
      };
      resultObject.viewPorts.push(viewPortResult);
      const reportPath = `./results/${datetime}/${i}/${viewport.name}/`;
      if (!fs.existsSync(reportPath)) {
        fs.mkdirSync(reportPath, { recursive: true });
      }
      //  Use first browsert as reference
      const referenceBrowser = browsers[0];
      const referencePath = `${reportPath}/${referenceBrowser}.png`;
      await takeScreenshot(referenceBrowser, viewport, url, referencePath);
      for (b of browsers.slice(1)) {
        // Take screenshot and compare to reference
        const pathAfter = `${reportPath}/${b}.png`;
        const pathCompare = `${reportPath}/${b}vs${referenceBrowser}.png`;
        await takeScreenshot(b, viewport, url, pathAfter);
        const data = await compareImages(
          fs.readFileSync(referencePath),
          fs.readFileSync(pathAfter),
          config.options
        );

        viewPortResult.comparissons.push({
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
          source: referenceBrowser,
          target: b,
          diff: `${b}vs${referenceBrowser}`,
          viewport: viewport.name,
        });
        fs.writeFileSync(pathCompare, data.getBuffer());
      }
    }
    fs.writeFileSync(
      `./results/${datetime}/${i}/report.html`,
      createReport(datetime, resultObject)
    );
    fs.copyFileSync("./index.css", `./results/${datetime}/${i}/index.css`);
    resultInfo.push(resultObject);
  }

  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("Execution finished. Check the report under the results folder");
  return resultInfo;
}
(async () => console.log(await executeTest()))();
