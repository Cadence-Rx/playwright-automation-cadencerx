import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { Browser } from 'playwright';
import { Page } from 'playwright';
import { LoginPage } from '../page-objects/LoginPage';

let browser: Browser;
let contexts: any;
let page: Page; 

const loginPage = new LoginPage();

Given('I navigate to the Opus application', async () => {
    await loginPage.navigateToOpusLoginPage();
});

When('I enter a valid username {string} and password {string}', async () => {
    await loginPage.enterUsername('valid_username');
    await loginPage.enterPassword('valid_password');
});

And('I click on the login button', async () => {   
    await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async () => {
    await loginPage.verifyLoginSuccess();
}); 