import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './../hooks/browserContextFixture';
import { PriorAuthorizationPage } from '../../page-objects/patient-profile/PriorAuthorizationPage';


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

And('I select {string} from the action dropdown', async (action: string) => {

});

And('I click the Save Prior Auth button', async () => {

});

Then('I should see the newly added prior authorization {number} and {string} in the Prior Authorizations section', async (gpi: number, drugName: string) => {

});