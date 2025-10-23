import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { LoginPage } from '../page-objects/LoginPage';

// Getter function to create LoginPage instance when needed
const getLoginPage = () => new LoginPage(pageFixture.page);

Given('I navigate to the Opus application', async () => {
    await getLoginPage().navigateToOpusLoginPage();
});

When('I enter a valid username {string} and password {string}', async (email: string, pwd: string) => {
    const loginPage = getLoginPage();
    await loginPage.enterUsername(email);
    await loginPage.enterPassword(pwd);
});

And('I click on the login button', async () => {   
    await getLoginPage().clickLoginButton();
});

Then('I should be logged in successfully', async () => {
    await getLoginPage().verifyLoginSuccess();
}); 