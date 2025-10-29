import { After, AfterAll, Before, BeforeAll, BeforeStep, Status } from "@cucumber/cucumber";
import {Browser, chromium, BrowserType, firefox, webkit} from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalTimeouts } from "../../utils/playwright-timeouts";
import { PageManager } from "../../page-objects/base/PageManager";

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const env = loadEnv({path: './env/.env'});

//Create a configuration object for easy access to env variables
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080'), 
}

//Create dictionary mapping browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit,
};

let browserInstance: Browser | null = null; //represents the browser instance e.g. Chromium, Firefox, Chrome opend by Playwright

//Created a functional to initialize the browser context based on selected browser
async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if (!launchBrowser) {
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    } 

    return await launchBrowser.launch({ headless: config.headless });
}

//Function to initialize page and context
async function initializePage(): Promise<void> {
    if (!browserInstance) {
        throw new Error('Browser instance is null');
    }
    pageFixture.context = await browserInstance.newContext({ 
        ignoreHTTPSErrors: true
     });
    pageFixture.page = await pageFixture.context.newPage(); 
    setGlobalTimeouts(pageFixture.page);
    await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
}

//BeforeAll hook: Runs once before all scenarios
BeforeAll(async function(){
    console.log("\nExecuting test suite...");
});

//AfterAll hook: Runs once after all scenarios
AfterAll(async function(){
    console.log("\nFinished execution of test suite!");
});

// Before hook: Runs before each scenario
Before(async function() {
    try {
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Browser context initialized for ${config.browser}`);
        await initializePage();

        this.pageManager = new PageManager();
        this.basePage = this.pageManager.createBasePage();
        this.homePage = this.pageManager.createHomePage(); 
        // this.loginPage = this.pageManager.createLoginPage();
        // this.authorizationTabOpusDashboardPage = this.pageManager.createAuthorizationTabOpusDashboardPage();    
    } catch (error) {
        console.error('Browser context initialization failed:', error);
    }
});

// After hook: Runs after each scenario
After(async function({pickle, result}) {
    // Only capture screenshots for FAILED tests in After hook
    // Successful test screenshots should be taken at the step level for proper placement
    const shouldCaptureForFailed = result?.status === Status.FAILED && process.env.CAPTURE_SCREENSHOTS_ON_FAIL !== 'false';
    
    if(shouldCaptureForFailed && pageFixture.page) {
        try {
            // Create screenshots directory if it doesn't exist
            const fs = require('fs');
            const screenshotDir = './reports/screenshots';
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const timestamp = Date.now();
            const scenarioName = pickle.name.replace(/[^a-z0-9]/gi, '_');
            const screenshotPath = `${screenshotDir}/${scenarioName}-FAILED-${timestamp}.png`;
            
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                fullPage: true // Capture full page, not just viewport
            });
            
            // Attach screenshot to cucumber report
            await this.attach(image, 'image/png');
            console.log(`FAILED screenshot saved: ${screenshotPath}`);
        } catch (error) {
            console.error('Failed to capture screenshot:', error);
        }
    }
    
    // Clean up browser resources
    if(browserInstance) {
        try {
            await pageFixture.page?.close();
            await browserInstance.close();
            browserInstance = null;
        } catch (error) {
            console.error('Error closing browser:', error);
        }
    }
});

// Optional: BeforeStep hook to capture screenshots before important steps
// Uncomment and modify as needed for more detailed screenshot capture
/*
BeforeStep(async function({pickleStep}) {
    if(process.env.CAPTURE_STEP_SCREENSHOTS === 'true' && pageFixture.page) {
        try {
            const stepName = pickleStep.text.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
            const timestamp = Date.now();
            const screenshotPath = `./reports/screenshots/step-${stepName}-${timestamp}.png`;
            
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                fullPage: false // Just viewport for step screenshots
            });
            
            await this.attach(image, 'image/png');
            console.log(`Step screenshot saved: ${screenshotPath}`);
        } catch (error) {
            console.error('Failed to capture step screenshot:', error);
        }
    }
});
*/