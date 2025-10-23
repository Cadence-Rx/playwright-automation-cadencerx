import {expect, type Locator, type Page} from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly myAuthorizationBtn: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super();
        this.usernameInput = page.locator("input#Email");
        this.passwordInput = page.locator("input#Password");
        this.loginButton = page.locator("input#loginButton");
        this.myAuthorizationBtn = page.locator("a.btn.btn-primary.btn-sm.authRefreshButton.authRefreshButtonMy");
        this.loginErrorMessage = page.locator("div.text-danger.validation-summary-errorss");
    }


    public async navigateToOpusLoginPage(): Promise<void> {
        await this.navigateToURL('https://opus-uat.cadencerx.com/');
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
        // await this.page.pause();
        await this.loginButton.click();
    }   

    public async verifyLoginSuccess(): Promise<void> {
        await this.page.pause();
        expect(this.myAuthorizationBtn, 'should see My Authorization button!').toBeVisible();

        // expect(this.loginErrorMessage, 'should see error message!').toHaveCount(0);
        // expect(this.loginErrorMessage, 'should NOT see error message!').toBeHidden();
    }


    // get usernameInput(): Locator {
    //     return this.page.locator('input[name="username"]');
    // }

    // get passwordInput(): Locator {
    //     return this.page.locator('input[name="password"]');
    // }

    // get loginButton(): Locator {
    //     return this.page.locator('button[type="submit"]');
    // }

    // async login(username: string, password: string): Promise<void> {
    //     await this.usernameInput.fill(username);
    //     await this.passwordInput.fill(password);
    //     await this.loginButton.click();
    // }

    // async assertLoginSuccess(): Promise<void> {
    //     await expect(this.page.locator('text=Welcome')).toBeVisible();
    // }

    // async assertLoginFailure(): Promise<void> {
    //     await expect(this.page.locator('text=Invalid credentials')).toBeVisible();
    // }
}
