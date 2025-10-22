import { Page } from "@playwright/test";

export function setGlobalTimeouts(page: Page) {
    //Set Global 'navigation' timeout 
    page.setDefaultNavigationTimeout(50000); // 50 seconds

    //Set Global 'command' timeout 
    page.setDefaultTimeout(30000); // 30 seconds
}