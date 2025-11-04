import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { LoginPage } from '../page-objects/LoginPage';
import { AuthorizationTabOpusDashboardPage } from '../page-objects/AuthorizationTabOpusDashboardPage';
import { CucumberWorld } from './world/CucumberWorld';
import { ScreenshotUtils } from '../utils/screenshot-utils';

//Getter function to create authorization tab instance when needed
const getLoginPage = () => new LoginPage(pageFixture.page);
const getAuthorizationTabOpusDashboardPage = () => new AuthorizationTabOpusDashboardPage(pageFixture.page);



Then('I should be successfully logged in and navigated to the Authorization tab of the OPUS Dashboard', async function (this: CucumberWorld) {
    await getLoginPage().verifyLoginSuccess();
    await getAuthorizationTabOpusDashboardPage().verifyAuthorizationTab();
    await getAuthorizationTabOpusDashboardPage().verifyMyAuthorizationTab();
    // Take screenshot at the step level (not in After hook)
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'successful-login-authorization-tab');
    await this.attach(screenshot, 'image/png');
});

And('I click the All Tab on the OPUS Dashboard', async () => {
    await getAuthorizationTabOpusDashboardPage().clickAllTab();
});

And('I select {string} from the Column chooser dropdown', async (columnName: string) => {
    await getAuthorizationTabOpusDashboardPage().clickColumnButton();
    await getAuthorizationTabOpusDashboardPage().selectFromColumnDowndown(columnName); 
});

And('I obtain Member ID from Authorization tab of the OPUS Dashboard', async function (this: CucumberWorld) {
    const memberID = await getAuthorizationTabOpusDashboardPage().getMemberIDFromAuthorizationTab();
    console.log(`Member ID obtained in step definition: ${memberID}`);
    this.setMemberID(memberID);
}); 

When('I click on a random PA Request status button on the Authorization tab of the OPUS Dashboard', async () => {
    
});