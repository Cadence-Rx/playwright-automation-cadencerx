import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        super();
        this.usernameInput = page.locator("input#Email");
        this.passwordInput = page.locator("input#Password");
        this.loginButton = page.locator("input#loginButton");
        this.loginErrorMessage = page.locator("div.text-danger.validation-summary-errors");
        this.forgotPasswordLink = page.locator("a[href='/Account/ForgotPassword']");
    }


    public async navigateToOpusLoginPage(): Promise<void> {
        await this.navigateToURL('https://opus-uat.cadencerx.com/');
    }
    
    public async navigateToHestiaCommandCenter(): Promise<void> {
        await this.navigateToURL('https://hestia-uat.azurewebsites.net/Administration/CommandCenter');
    }

    public async enterUsername(username: string): Promise<void> {
        // await this.waitAndClick(this.usernameInput);
        await this.usernameInput.fill(username);
    }

    public async enterPassword(password: string): Promise<void> {
        let today: Date = new Date();
        // let dateString: string = today.getDate().toString().padStart(2, '0');
        let dateString: string = today.toDateString();
        console.log(`Date String: ${dateString}`);

        let month: string = dateString.split(' ')[1];
        let day: string = dateString.split(' ')[2];
        let dynamicPassword: string = `Cinnadust${month}${day}@Anthony`;
        console.log(`Dynamic Password: ${dynamicPassword}`);
        
        await this.passwordInput.fill(dynamicPassword);
    }   

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.loginButton.click();
    }   

    public async verifyLoginSuccess(): Promise<void> {
        // await expect(this.authorizationTab, 'My Authorization button is visible!').toBeVisible();
        await expect(this.loginErrorMessage, 'should NOT see error message!').toHaveCount(0);

        // Alternative: Use .not.toBeVisible() instead of .toBeHidden() for non-existent elements
        await expect(this.loginErrorMessage, 'should NOT see error message!').not.toBeVisible();
    }

    public async clickForgotPasswordLink(): Promise<void> {
        await this.forgotPasswordLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.forgotPasswordLink.click();
    }

    public async enterInvalidUsernameOrPassword(invalidEmail: string): Promise<void> {
        await this.usernameInput.fill(invalidEmail); 
        await this.passwordInput.fill('wrongPassword123');
    }

    public async verifyInvalidLoginErrorMessage(errorMessage: string): Promise<void> {
        await expect(this.loginErrorMessage, 'Error message is visible!').toBeVisible();
        await expect(this.loginErrorMessage).toHaveText(errorMessage);
    }
}