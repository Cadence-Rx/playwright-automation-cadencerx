import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class PatientTabOpusDashboardPage extends BasePage {
  readonly patientTab: Locator;
  readonly inputPatientSearch: Locator;
  readonly viewPatientButton: Locator;
  readonly lstMemberIDs: Locator;

    constructor(page: Page) {
        super();
        this.patientTab = page.locator("a[href='#patient-details']");
        this.inputPatientSearch = page.locator("input#searchPatientsGrid_searchbar");
        this.viewPatientButton = page.locator("a[href*='Patient']");
        this.lstMemberIDs = page.locator("#searchPatientsGrid_content_table tbody tr td.e-rowcell");
    }

    public async clickPatientTab(): Promise<void> {
        await this.patientTab.waitFor({ state: "visible", timeout: 30000 });
        // await this.patientTab.evaluate(el => el.removeAttribute('target'));
        await this.patientTab.click({ force: true });
    }

    public async typePatientInfoInSearchFieldAndHitEnter(patientInfo: string): Promise<void> {
        await this.inputPatientSearch.waitFor({ state: "visible", timeout: 30000 });
        await this.inputPatientSearch.fill(patientInfo);
        await this.page.keyboard.press("Enter");
    }
    
    public async clickViewPatientButton(): Promise<void> {
        await this.viewPatientButton.waitFor({ state: "visible", timeout: 30000 });
        await this.viewPatientButton.click();
    }

    public async verifyPatientListContainsMemberID(expectedMemberID: string): Promise<void> {
        const actualMemberIDs = await this.lstMemberIDs.nth(1).innerText();
        expect(actualMemberIDs).toEqual(expectedMemberID);
    }
 }      