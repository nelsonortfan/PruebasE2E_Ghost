const { After, Before, AfterStep } = require("@cucumber/cucumber");
const { WebClient } = require("kraken-node");
const fs = require("fs");
const path = require("path");
Before(async function (scenario) {
  this.deviceClient = new WebClient("chrome", {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.currentStepNumber = 1;
  const featureName = scenario.gherkinDocument.feature.name;
  const featureCode = path
    .basename(scenario.gherkinDocument.uri)
    .split(".feature")[0];
  const pathToset = path.join(
    path.resolve("./"),
    "screenshots",
    featureName,
    featureCode
  );

  this.screenshotPath = pathToset;
  if (!fs.existsSync(pathToset)) {
    fs.mkdirSync(pathToset, { recursive: true });
  } else {
    fs.readdirSync(pathToset).forEach((file) => {
      fs.unlinkSync(path.join(pathToset, file));
    });
  }
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

AfterStep(async function (step) {
  // Needs to be done here to prevent loading screens
  await new Promise((resolve) => setTimeout(resolve, 200));
  await this.driver.takeScreenshot().then(async (data) => {
    const base64Data = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      path.join(
        this.screenshotPath,
        `${this.currentStepNumber}. ${
          step.pickle.steps[this.currentStepNumber - 1].text
        }.png`
      ),
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );
  });
  this.currentStepNumber++;
});
