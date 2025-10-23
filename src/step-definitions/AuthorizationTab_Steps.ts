import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { LoginPage } from '../page-objects/LoginPage';
import { AuthorizationTabOpusDashboardPage } from '../page-objects/AuthorizationTabOpusDashboardPage';
import { CucumberWorld } from './world/CucumberWorld';

//Getter function to create authorization tab instance when needed
const getLoginPage = () => new LoginPage(pageFixture.page);
const getAuthorizationTabOpusDashboardPage = () => new AuthorizationTabOpusDashboardPage(pageFixture.page);



Then('I should be successfully logged in and navigated to the Authorization tab of the OPUS Dashboard', async () => {
    await getLoginPage().verifyLoginSuccess();
    await getAuthorizationTabOpusDashboardPage().verifyAuthorizationTab();
}); 