import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './../hooks/browserContextFixture';
import { PriorAuthorizationPage } from '../../page-objects/patient-profile/PriorAuthorizationPage';
import { CucumberWorld } from '../world/CucumberWorld';
import { ScreenshotUtils } from '../../utils/screenshot-utils';


const getPriorAuthorizationPage = () =>  new PriorAuthorizationPage(pageFixture.page);

When('I click on the Authorization tab', async () => {
    await getPriorAuthorizationPage().clickPriorAuthorizationTab();
});

And('I click on the Add Prior Auth button', async () => {
    await getPriorAuthorizationPage().clickAddPriorAuthButton();
});

And('I enter valid {string} in the search medication field', async (gpi: string) => {
    await getPriorAuthorizationPage().enterMedicationInSearchField(gpi);
});

And('I select {string} from the action dropdown', async function (this: CucumberWorld, action: string) {
    await getPriorAuthorizationPage().selectActionFromDropdown(action);
    this.setActionSelected(action);
});

And('I click the Save Prior Auth button', async () => {
    await getPriorAuthorizationPage().clickSavePriorAuthButton();
});

Then('the prior authorization modal displays the auth was successfully created', async function (this: CucumberWorld) {
    await getPriorAuthorizationPage().verifySuccessMessage('Success');
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'prior-authorization-success-message');
    await this.attach(screenshot, 'image/png');
});


When('I click OK on the Add Prior Auth modal', async () => {
    await getPriorAuthorizationPage().clickOkOnAddPriorAuthModal();
});

And ('I click on the first Auth Id in prior authorization history list', async () => {
    await getPriorAuthorizationPage().clickFirstAuthIdInHistoryList();
});

Then('I should see the newly added prior authorization with the same {string} and {string} on the edit Prior Authorizations modal', async function (this: CucumberWorld, gpi: string, drugName: string) {
    const actionSelected = this.getActionSelected();
    await getPriorAuthorizationPage().verifyPriorAuthorizationDetails(gpi, drugName, actionSelected);
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'prior-authorization-details');
    await this.attach(screenshot, 'image/png');
});