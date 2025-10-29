import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { LoginPage } from '../page-objects/LoginPage';
import { CucumberWorld } from './world/CucumberWorld';
import { faker } from '@faker-js/faker';
import { error } from 'console';
import { ScreenshotUtils } from '../utils/screenshot-utils';

// Getter function to create LoginPage instance when needed
const getLoginPage = () => new LoginPage(pageFixture.page);

Given('I navigate to the Opus application', async () => {
    await getLoginPage().navigateToOpusLoginPage();
});

When('I enter a valid username {string} and password {string}', async (email: string, pwd: string) => {
    await getLoginPage().enterUsername(email);
    await getLoginPage().enterPassword();
});

And('I enter with valid credentials', async () => {
    await getLoginPage().enterUsername('TRENT_LINVILLE@PMAGROUP.COM');
    await getLoginPage().enterPassword();
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

When('I enter an invalid username or password', async () => {
    const testEmail = faker.internet.email();
    await getLoginPage().enterInvalidUsernameOrPassword(testEmail);
});

Then('I should see an error message indicating {string}', async function (this: CucumberWorld, errorMessage: string) {
    await getLoginPage().verifyInvalidLoginErrorMessage(errorMessage);
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'failed-login-error-message');
    await this.attach(screenshot, 'image/png');
}); 
