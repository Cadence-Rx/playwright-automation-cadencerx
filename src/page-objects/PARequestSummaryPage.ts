import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class PARequestSummaryPage extends BasePage {
  readonly patientMemberID: Locator;
  readonly patientTabDemographics: Locator;

  constructor(page: Page) {
    super();
    this.patientMemberID = page.locator("span.patient-numberd");
    this.patientTabDemographics = page.locator("a[href='#patient-details-panel']");
  }

  async verifyMemberIDOnPARequestSummaryPage(expectedMemberID: string) {
    await expect(this.patientMemberID, 'Member ID is visible!').toBeVisible(); 
    await expect(this.patientMemberID).toHaveText(expectedMemberID);
  }

  async verifyPatientTabDemographicsTabIsActive() {
    await expect(this.patientTabDemographics, 'Patient Demographics tab is visible!').toBeVisible();
    await expect(this.patientTabDemographics).toHaveClass(/active/);
  }
}
