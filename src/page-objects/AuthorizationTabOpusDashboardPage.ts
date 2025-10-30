import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class AuthorizationTabOpusDashboardPage extends BasePage {
    readonly authorizationTab: Locator;
    readonly myAuthorizationTab: Locator;
    readonly allTab: Locator;
    readonly columnButton: Locator;
    readonly lstColumnOptions: Locator;
    readonly lstMemberIDs: Locator;

    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a[href='#transaction-details']");
        this.myAuthorizationTab = page.locator("a.btn.btn-white.border.btn-sm.authRefreshButton.authRefreshButtonMy");
        this.allTab = page.locator("a.btn.btn-primary.btn-sm.authRefreshButton.authRefreshButtonAll");
        this.columnButton = page.locator("button#priorAuthGrid_columnchooser");
        this.lstColumnOptions = page.locator("span.e-label");
        this.lstMemberIDs = page.locator("td.e-rowcell");
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

    public async clickAllTab(): Promise<void> {
        await this.allTab.waitFor({ state: 'visible', timeout: 30000 });
        await this.allTab.click();
    }

    public async clickColumnButton(): Promise<void> {
        await this.columnButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.columnButton.click();
    }

    public async selectFromColumnDowndown(columnName: string): Promise<void> {
       await this.lstColumnOptions.filter({ hasText: columnName }).first().click();
    }

    public async getMemberIDFromAuthorizationTab(): Promise<string> {
        const memberIDs = await this.lstMemberIDs.nth(5).innerText();
        return memberIDs;
    }


}