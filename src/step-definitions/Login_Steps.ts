import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFigure';  
import { LoginPage } from '../page-objects/LoginPage';

const loginPage = new LoginPage(pageFixture.page);

Given('I navigate to the Opus application', async () => {
    await loginPage.navigateToOpusLoginPage();
});

When('I enter a valid username {string} and password {string}', async (email: string, pwd: string) => {
    await loginPage.enterUsername(email);
    await loginPage.enterPassword(pwd);
});

And('I click on the login button', async () => {   
    await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async () => {
    await loginPage.verifyLoginSuccess();
}); 