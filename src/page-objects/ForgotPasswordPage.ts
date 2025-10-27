import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ForgotPasswordPage extends BasePage {
    readonly forgotPasswordPageHeader: Locator;
    readonly emailInput: Locator;
    readonly emailButton: Locator;

    constructor(page: Page) {
        super();
        this.forgotPasswordPageHeader = page.locator("h4");
        this.emailInput = page.locator("input#Email");
        this.emailButton = page.locator("input[type='submit");
    }

    public async verifyForgotPasswordPageHeader(): Promise<void> {
        await expect(this.forgotPasswordPageHeader, 'Forgot Password page header is visible!').toBeVisible();
        await expect(this.forgotPasswordPageHeader).toHaveText('Enter your email.');
    }


}