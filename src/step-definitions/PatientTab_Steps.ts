import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { PatientTabOpusDashboardPage } from '../page-objects/PatientTabOpusDashboardPage';
import { CucumberWorld } from './world/CucumberWorld';

const getPatientTabOpusDashboardPage = () => new PatientTabOpusDashboardPage(pageFixture.page);

When('I click on the Patient tab of the OPUS Dashboard', async () => {
    await getPatientTabOpusDashboardPage().clickPatientTab();
});

And('I enter Member ID obtained in the search field', async function (this: CucumberWorld) {
    let memberID: any = this.getMemberID();
    await getPatientTabOpusDashboardPage().typePatientInfoInSearchFieldAndHitEnter(memberID);
}); 


And('I click on the view Patient button', async () => {
    await getPatientTabOpusDashboardPage().clickViewPatientButton();
});