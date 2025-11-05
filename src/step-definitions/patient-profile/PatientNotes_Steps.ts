import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './../hooks/browserContextFixture';
import { PatientNotesPage } from '../../page-objects/patient-profile/PatientNotesPage';
import { CucumberWorld } from '../world/CucumberWorld';
import { ScreenshotUtils } from '../../utils/screenshot-utils';

const getPatientNotesPage = () => new PatientNotesPage(pageFixture.page);

When('I click on the Patient Notes tab', async () => {
    await getPatientNotesPage().clickPatientNotesTab();

});

And('I click on the Add Note button', async () => {
    await getPatientNotesPage().clickAddNoteButton();
});

And('I enter a note in the note text area {string}', async (note: string) => {
    await getPatientNotesPage().enterNoteText(note);
});

And('I click on the Save Note button', async () => {
    await getPatientNotesPage().clickSaveNoteButton();
});

Then('I should see the newly added note in the Patient Notes tab', async function (this: CucumberWorld) {
    await getPatientNotesPage().verifyNewlyAddedNoteIsVisible("Entering a test note for automation");
    const screenshot = await ScreenshotUtils.takeScreenshot(pageFixture.page, 'newly-added-patient-note');
    await this.attach(screenshot, 'image/png');
});