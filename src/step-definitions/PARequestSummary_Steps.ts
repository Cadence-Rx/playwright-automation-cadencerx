import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture'; 
import { ScreenshotUtils } from '../utils/screenshot-utils';
import { CucumberWorld } from './world/CucumberWorld';
import { PARequestSummaryPage } from '../page-objects/PARequestSummaryPage';


const getPARequestSummaryPage = () => new PARequestSummaryPage(pageFixture.page);


Then('I am redirected to the PA Request Summary page with the Patient Demographics tab active', async function (this: CucumberWorld) {
    let memberID: any = this.getMemberID();
    await getPARequestSummaryPage().verifyMemberIDOnPARequestSummaryPage(memberID);
    await getPARequestSummaryPage().verifyPatientTabDemographicsTabIsActive();
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'pa-request-summary-page');
    await this.attach(screenshot, 'image/png');
});

Then('I am redirected to the PA {string} page for that Pending Authorization', async function (this: CucumberWorld, paSummary: string) {
    await getPARequestSummaryPage().verifyPARequestSummaryHeader(paSummary);
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'pa-request-summary-page');
    await this.attach(screenshot, 'image/png');
});