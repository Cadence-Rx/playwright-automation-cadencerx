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
        this.emailButton = page.locator("input[type='submit']");
    }

    public async verifyForgotPasswordPageHeader(): Promise<void> {
        await expect(this.forgotPasswordPageHeader, 'Forgot Password page header is visible!').toBeVisible();
        await expect(this.forgotPasswordPageHeader).toHaveText('Enter your email.');
        await this.forgotPasswordPageHeader.screenshot({ path: `reports/screenshots/ForgotPasswordPageHeader.png` });
    }

    public async verifyEmailInput(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await expect(this.emailInput).toHaveValue(email);
        await this.emailInput.screenshot({ path: `reports/screenshots/ForgotPasswordEmailInput.png` });
    }

    public async verifyEmailLinkButton(buttonValue: string): Promise<void> {
        await expect(this.emailButton, 'Email button is visible!').toBeVisible();
        await expect(this.emailButton).toHaveValue(buttonValue);   
    }
} 