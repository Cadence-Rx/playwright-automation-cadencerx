import { When, Given } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { CucumberWorld } from './world/CucumberWorld';
import { ScreenshotUtils } from '../utils/screenshot-utils';


When('I switch to the new browser tab', async function (this: CucumberWorld) {
    this.basePage.switchToNewTab();
}); 

Given('I pause playwright test for debugging', async () => {
    await pageFixture.page.pause(); // Pause for debugging
}); 

// Step-level screenshot steps that attach properly to the current step
When('I take a screenshot', async function (this: CucumberWorld) {
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'manual-screenshot');
    await this.attach(screenshot, 'image/png');
});

When('I take a screenshot named {string}', async function (this: CucumberWorld, name: string) {
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, name);
    await this.attach(screenshot, 'image/png');
});

When('I take a screenshot of element {string}', async function (this: CucumberWorld, selector: string) {
    const screenshot = await ScreenshotUtils.takeElementScreenshot(pageFixture.page, selector, 'element-screenshot');
    await this.attach(screenshot, 'image/png');
}); 