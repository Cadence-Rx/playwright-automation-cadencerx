import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./../base/BasePage";


export class PatientNotesPage extends BasePage {
    readonly patientNotesTab: Locator;
    readonly addNoteButton: Locator;
    readonly noteTextArea: Locator;
    readonly saveNoteButton: Locator;

    constructor(page: Page) {
        super();
        this.patientNotesTab = page.locator("a[href='#notes']").first();
        this.addNoteButton = page.locator("//*[@id='#addNotesAction']");
        this.noteTextArea = page.locator("textarea[name='Note']");
        this.saveNoteButton = page.locator("button#saveNotesButton");
    }

    public async clickPatientNotesTab(): Promise<void> {
        await this.patientNotesTab.waitFor({ state: "visible", timeout: 30000 });
        await this.patientNotesTab.click({ force: true });
    }

    public async clickAddNoteButton(): Promise<void> {
        await this.addNoteButton.waitFor({ state: "visible", timeout: 30000 });
        await this.addNoteButton.click({ force: true });
    }

    public async enterNoteText(note: string): Promise<void> {
        await this.noteTextArea.waitFor({ state: "visible", timeout: 30000 });
        await this.noteTextArea.fill(note);
    }

    public async clickSaveNoteButton(): Promise<void> {
        await this.saveNoteButton.click({ force: true });
    }   
} 
