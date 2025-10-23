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
    get page() {
        return pageFixture.page;
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
        }

}