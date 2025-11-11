import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const env = loadEnv({path: './env/.env'});

//Create a configuration object for easy access to env variables
const config = {
    width: parseInt(env.parsed?.WIDTH || '1920'),
    height: parseInt(env.parsed?.HEIGHT || '1080'), 
};

export class BasePage {
    // Default timeout for wait operations
    private readonly visibleTimeout = parseInt(env.parsed?.DEFAULT_TIMEOUT || '30000');  

    get page() {
        return pageFixture.page;
    }

    // Helper method for waiting with default timeout
    protected async waitForVisible(locator: Locator, timeout: number = this.visibleTimeout): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    // Helper method for waiting and getting text with default timeout
    protected async waitAndGetText(locator: Locator, timeout: number = this.visibleTimeout): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout });
        return await locator.innerText();
    }

    // Helper method to ensure element is clickable before clicking
    protected async waitForClickable(locator: Locator, timeout: number = this.visibleTimeout): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.waitFor({ state: 'attached', timeout });
    }

    // Safe click method that waits for element to be clickable
    protected async safeClick(locator: Locator, timeout: number = this.visibleTimeout): Promise<void> {
        await this.waitForClickable(locator, timeout);
        await locator.click();
    }

    // Force click method for stubborn elements
    protected async forceClick(locator: Locator, timeout: number = this.visibleTimeout): Promise<void> {
        await this.waitForClickable(locator, timeout);
        await locator.click({ force: true });
    }

    // Check if element is clickable (returns boolean)
    protected async isClickable(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            const isEnabled = await locator.isEnabled();
            const isVisible = await locator.isVisible();
            return isEnabled && isVisible;
        } catch {
            return false;
        }
    }

    //Promise<void> in TypeScript indicates that the function is asynchronous and does not return any value upon completion.
    public async navigateToURL(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async waitAndClickByRole(role: string, name: string): Promise<void> {
        const element = this.page.getByRole(role as any, { name: name });
        await element.click();
    }

    public async waitAndClick(locator: Locator): Promise<void> {
        await locator.isVisible();
        await locator.click();
    }

      public async waitAndClickByLocator(locator: string): Promise<void> {
        const element = this.page.locator(locator);
        await element.waitFor({ state: 'visible', timeout: 30000 });
        await element.click();
    }
    
    public async waitAndClickSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    public async switchToNewTab(): Promise<void> {
        await this.page.context().waitForEvent('page'); //reinitialize page to the new tab

        //retrieve all open pages (tabs) in the browser context
        const allPage = await this.page.context().pages();

        //assign the most recent tab to pageFixture.page
        pageFixture.page = allPage[allPage.length - 1];

        //Bring the newly assigned tab to the front and make it active
        await this.page.bringToFront();

        //ensure the newly assigned tab is fully maximized
        await this.page.setViewportSize({ width: config.width, height: config.height });

         //wait for network to be idle
        await this.page.waitForLoadState('networkidle');

    }

        

}