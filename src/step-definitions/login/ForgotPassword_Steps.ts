import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../hooks/browserContextFixture';  
import { faker } from '@faker-js/faker';
import { ForgotPasswordPage } from '../../page-objects/login/ForgotPasswordPage';
import { CucumberWorld } from '../world/CucumberWorld';
import { ScreenshotUtils } from '../../utils/screenshot-utils';

// Getter function to create ForgotPasswordPage instance when needed
const getForgotPasswordPage = () => new ForgotPasswordPage(pageFixture.page);

Then('I should be navigated to the password recovery page', async function (this: CucumberWorld) {
    await getForgotPasswordPage().verifyForgotPasswordPageHeader();
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'password-recovery-page');
    await this.attach(screenshot, 'image/png');
});

Then('I should be able to enter in my email address to reset password', async function (this: CucumberWorld) {
    const testEmail = faker.internet.email();
    await getForgotPasswordPage().verifyEmailInput(testEmail);
    await getForgotPasswordPage().verifyEmailLinkButton('Email Link');
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'forgot-password-email-entry');
    await this.attach(screenshot, 'image/png');
});
