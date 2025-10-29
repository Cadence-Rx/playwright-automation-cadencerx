import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class AuthorizationTabOpusDashboardPage extends BasePage {
    readonly authorizationTab: Locator;
    readonly myAuthorizationTab: Locator;

    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a[href='#transaction-details']");
        this.myAuthorizationTab = page.locator("a.btn.btn-white.border.btn-sm.authRefreshButton.authRefreshButtonMy");
    }

    public async verifyAuthorizationTab(): Promise<void> {
        await expect(this.authorizationTab, 'My Authorization button is visible!').toBeVisible();
        await expect(this.authorizationTab).toHaveClass('tab active');
        await expect(this.authorizationTab).toHaveText('Authorizations');
    }

    public async verifyMyAuthorizationTab(): Promise<void> {
        await expect(this.myAuthorizationTab, 'My Authorization button is visible!').toBeVisible();
        await expect(this.myAuthorizationTab).toHaveText('My Authorizations');
    }   
}