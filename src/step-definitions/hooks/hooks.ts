import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, chromium, Page} from "@playwright/test";
import { pageFixture } from "./browserContextFigure";

let browser: Browser; //represents the browser instance e.g. Chromium, Firefox, Chrome opend by Playwright

// Before all hook to run once before all scenarios
BeforeAll(async function() {    
    console.log("\nExecuting tests suite...");
});

//After all hook to run once after all scenarios
AfterAll(async function() {
    console.log("\nFinished executing tests suite...");
}); 

// Before hook to run before each scenario
Before(async function() {
    //setup browser instance
    browser = await chromium.launch({ headless: false });
    pageFixture.context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
    pageFixture.page = await pageFixture.context.newPage();
}); 

// After hook to run after each scenario
After(async function({pickle, result}) {
     if(result?.status === Status.FAILED) {
        if(pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path : screenshotPath,
                type : 'png',
                // timeout : 60000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error("pageFixture.page is undefined");
        }
    }   
    await pageFixture.page.close();
    await browser.close();
}); 