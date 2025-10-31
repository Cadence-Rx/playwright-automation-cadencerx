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
    // await this.page.waitForTimeout(5000);
    await this.patientMemberID.waitFor({ state: 'visible', timeout: 30000 });
    await expect(this.patientMemberID, 'Member ID is visible!').toBeVisible({ timeout: 30000 }); 
    
    const rawMemberID = await this.patientMemberID.innerText();
    let actualMemberID = rawMemberID.split('ID')[1].trim();
    console.log(`Actual Member ID: ${actualMemberID}`);
    await expect(actualMemberID).toEqual(expectedMemberID);
  }

  async verifyPatientTabDemographicsTabIsActive() {
    await expect(this.patientTabDemographics, 'Patient Demographics tab is visible!').toBeVisible({ timeout: 30000 });
    await expect(this.patientTabDemographics).toHaveClass(/active/);
  }
}
