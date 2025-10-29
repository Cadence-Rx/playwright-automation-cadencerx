import { Page } from "@playwright/test";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

export class ScreenshotUtils {
    /**
     * Take a screenshot and save it to the reports/screenshots directory
     * @param page - The Playwright page instance
     * @param name - Custom name for the screenshot (optional)
     * @returns Promise<Buffer> - The screenshot buffer
     */
    static async takeScreenshot(page: Page = pageFixture.page, name?: string): Promise<Buffer> {
        if (!page) {
            throw new Error('Page is not available for screenshot');
        }

        try {
            const fs = require('fs');
            const screenshotDir = './reports/screenshots';
            
            // Create directory if it doesn't exist
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = name ? `${name.replace(/[^a-z0-9]/gi, '_')}-${timestamp}.png` : `screenshot-${timestamp}.png`;
            const screenshotPath = `${screenshotDir}/${fileName}`;

            const screenshot = await page.screenshot({
                path: screenshotPath,
                type: 'png',
                fullPage: true
            });

            console.log(`Manual screenshot saved: ${screenshotPath}`);
            return screenshot;
        } catch (error) {
            console.error('Failed to take manual screenshot:', error);
            throw error;
        }
    }

    /**
     * Take a screenshot of a specific element
     * @param page - The Playwright page instance
     * @param selector - CSS selector for the element
     * @param name - Custom name for the screenshot (optional)
     * @returns Promise<Buffer> - The screenshot buffer
     */
    static async takeElementScreenshot(page: Page = pageFixture.page, selector: string, name?: string): Promise<Buffer> {
        if (!page) {
            throw new Error('Page is not available for screenshot');
        }

        try {
            const element = page.locator(selector);
            await element.waitFor({ state: 'visible', timeout: 10000 });

            const fs = require('fs');
            const screenshotDir = './reports/screenshots';
            
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = name ? `${name.replace(/[^a-z0-9]/gi, '_')}-element-${timestamp}.png` : `element-screenshot-${timestamp}.png`;
            const screenshotPath = `${screenshotDir}/${fileName}`;

            const screenshot = await element.screenshot({
                path: screenshotPath,
                type: 'png'
            });

            console.log(`Element screenshot saved: ${screenshotPath}`);
            return screenshot;
        } catch (error) {
            console.error('Failed to take element screenshot:', error);
            throw error;
        }
    }

    /**
     * Attach a screenshot to the current Cucumber scenario
     * @param cucumberWorld - The Cucumber world context (use 'this' in step definitions)
     * @param screenshot - The screenshot buffer
     * @param name - Custom name for attachment (optional)
     */
    static async attachToCucumberReport(cucumberWorld: any, screenshot: Buffer, name?: string): Promise<void> {
        try {
            await cucumberWorld.attach(screenshot, 'image/png', name || 'Screenshot');
        } catch (error) {
            console.error('Failed to attach screenshot to Cucumber report:', error);
        }
    }
}