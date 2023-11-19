const { After, Before, AfterStep } = require("@cucumber/cucumber");
const { WebClient } = require("kraken-node");
const fs = require("fs");
Before(async function (scenario) {
  this.deviceClient = new WebClient("chrome", {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.currentStepNumber = 1;
  const featureName = scenario.gherkinDocument.feature.name;
  const featureCode = scenario.gherkinDocument.uri
    .split("/")
    .pop()
    .split(".feature")[0];
  const path = `./screenshots/${featureName}/${featureCode}`;
  this.screenshotPath = path;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  } else {
    fs.readdirSync(path).forEach((file) => {
      fs.unlinkSync(`${path}/${file}`);
    });
  }
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

AfterStep(async function () {
  // Needs to be done here to prevent loading screens
  await new Promise((resolve) => setTimeout(resolve, 200));
  await this.driver.takeScreenshot().then(async (data) => {
    const base64Data = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      `${this.screenshotPath}/${this.currentStepNumber}.png`,
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );
  });
  this.currentStepNumber++;
});
