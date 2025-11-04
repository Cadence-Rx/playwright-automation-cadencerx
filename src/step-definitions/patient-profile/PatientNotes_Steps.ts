import { defineStep as And, Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from './../hooks/browserContextFixture';
import { PatientNotesPage } from '../../page-objects/patient-profile/PatientNotesPage';

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

Then('I should see the newly added note in the Patient Notes tab', async () => {
});