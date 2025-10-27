import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
// import forgotPasswordPage from '../page-objects/ForgotPasswordPage';
import { faker } from '@faker-js/faker';
import { ForgotPasswordPage } from '../page-objects/ForgotPasswordPage';

// Getter function to create ForgotPasswordPage instance when needed
const getForgotPasswordPage = () => new ForgotPasswordPage(pageFixture.page);

Then('I should be navigated to the password recovery page', async () => {
    await getForgotPasswordPage().verifyForgotPasswordPageHeader();
});


Then('I should be able to enter in my email address to reset password', async () => {
    const testEmail = faker.internet.email();
    await getForgotPasswordPage().verifyEmailInput(testEmail);
    await getForgotPasswordPage().verifyEmailLinkButton('Email Link');
});
