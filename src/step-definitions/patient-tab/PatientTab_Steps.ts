import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../hooks/browserContextFixture';  
import { PatientTabOpusDashboardPage } from '../../page-objects/patient-tab/PatientTabOpusDashboardPage';
import { CucumberWorld } from '../world/CucumberWorld';
import { ScreenshotUtils } from '../../utils/screenshot-utils';

const getPatientTabOpusDashboardPage = () => new PatientTabOpusDashboardPage(pageFixture.page);

When('I click on the Patient tab of the OPUS Dashboard', async () => {
    await getPatientTabOpusDashboardPage().clickPatientTab();
});

And('I enter Member ID obtained in the search field', async function (this: CucumberWorld) {
    let memberID: any = this.getMemberID();
    await getPatientTabOpusDashboardPage().typePatientInfoInSearchFieldAndHitEnter(memberID);
}); 

Then('I should see a list of patients with matching Member ID', async function (this: CucumberWorld) {
    let memberID: any = this.getMemberID();
    await getPatientTabOpusDashboardPage().verifyPatientListContainsMemberID(memberID);
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'patient-search-results');
    await this.attach(screenshot, 'image/png');
});

And('I click on the view Patient button', async () => {
    await getPatientTabOpusDashboardPage().clickViewPatientButton();
});