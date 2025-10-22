import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

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
    
    public async waitAndClickSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }
}