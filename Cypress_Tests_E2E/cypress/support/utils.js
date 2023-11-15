class ScreenshotHelper {
    counter;
    folder;
    constructor(folder){
        this.counter = 1;
        this.folder = folder;
    }

    screenshot (nombre){
        cy.takeScreenshot(`${this.folder}/${this.counter++}.${nombre}`);
    }
}

export {ScreenshotHelper}