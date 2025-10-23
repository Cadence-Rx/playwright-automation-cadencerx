import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class AuthorizationTabOpusDashboardPage extends BasePage {
    readonly authorizationTab: Locator;

    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a.btn.btn-primary.btn-sm.authRefreshButton.authRefreshButtonMy");
    }

    public async verifyAuthorizationTab(): Promise<void> {
        expect(this.authorizationTab, 'Authorization tab is visible!').toBeVisible();
    }


}