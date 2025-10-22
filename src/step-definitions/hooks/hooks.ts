import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, chromium, BrowserType, firefox, webkit} from "@playwright/test";
import { pageFixture } from "./browserContextFigure";

//Load env variables from .env file
import { config as loadEnv} from "dotenv";
const env = loadEnv({path: './.env/.env'});

//Create a configuration object for easy access to env variables
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.BROWSER || 'chromium',
    width: parseInt(env.parsed?.WIDTH || '1920'),
    height: parseInt(env.parsed?.HEIGHT || '1080'), 
};

//Create dictionary mapping browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit,
};

let browserInstance: Browser | null = null; //represents the browser instance e.g. Chromium, Firefox, Chrome opend by Playwright

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if (!launchBrowser) {
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch({ headless: config.headless });
};

async function initializedPage(): Promise<void> {
    if (!browserInstance) {
        throw new Error("Browser instance is null!");
    }
    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true,
     });
    pageFixture.page = await pageFixture.context.newPage();
    await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
    
}

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
    try {
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Browser context initialized for ${config.browser}`);
        await initializedPage();
    } catch (error) {
        console.error('Browser context initialization failed:', error);
    }
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
    if(browserInstance)  {
        await pageFixture.page?.close();
        await browserInstance.close();
    }
}); 