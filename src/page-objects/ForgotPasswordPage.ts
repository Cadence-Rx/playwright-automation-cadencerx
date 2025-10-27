import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';
import { pageFixture } from '../step-definitions/hooks/browserContextFixture';

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
    }

    public async verifyEmailInput(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await expect(this.emailInput).toHaveValue(email);
    }

    public async verifyEmailLinkButton(buttonValue: string): Promise<void> {
        await expect(this.emailButton, 'Email button is visible!').toBeVisible();
        await expect(this.emailButton).toHaveValue(buttonValue);   
    }
} 