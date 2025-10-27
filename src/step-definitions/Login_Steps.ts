import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { LoginPage } from '../page-objects/LoginPage';
import { CucumberWorld } from './world/CucumberWorld';

// Getter function to create LoginPage instance when needed
const getLoginPage = () => new LoginPage(pageFixture.page);

Given('I navigate to the Opus application', async () => {
    await getLoginPage().navigateToOpusLoginPage();
});

When('I enter a valid username {string} and password {string}', async (email: string, pwd: string) => {
    await getLoginPage().enterUsername(email);
    await getLoginPage().enterPassword(pwd);
});

And('I click on the login button', async function (this: CucumberWorld) {   
    await this.loginPage.clickLoginButton();
    // await getLoginPage().clickLoginButton();
});

When('I click on the {string} link', async (linkText: string) => {
    if (linkText === 'Forgot Password?') {
        await getLoginPage().clickForgotPasswordLink();
    }
});

Then('I should be navigated to the password recovery page', async () => {
    // You can add verification steps here to confirm navigation to the Forgot Password page
    // For example, check for the presence of a specific element on that page
});

Then('I should be able to enter in my email address to reset password', async () => {
    // await getLoginPage().enterEmailForPasswordReset('user@example.com');
});