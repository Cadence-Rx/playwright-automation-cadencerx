import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';  
import { PatientTabOpusDashboardPage } from '../page-objects/PatientTabOpusDashboardPage';

const getPatientTabOpusDashboardPage = () => new PatientTabOpusDashboardPage(pageFixture.page);

When('I click on the Patient tab of the OPUS Dashboard', async () => {
    await getPatientTabOpusDashboardPage().clickPatientTab();
});