import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class PARequestSummaryPage extends BasePage {
  readonly patientMemberID: Locator;
  readonly patientTabDemographics: Locator;
  readonly paRequestSummaryHeader: Locator;

  constructor(page: Page) {
    super();
    this.patientMemberID = page.locator("span.patient-numberd");
    this.patientTabDemographics = page.locator("a[href='#patient-details-panel']");
    this.paRequestSummaryHeader = page.locator("div.summary > strong");
  }

  async verifyMemberIDOnPARequestSummaryPage(expectedMemberID: string) {
    await this.waitForVisible(this.patientMemberID);
    await expect(this.patientMemberID, 'Member ID is visible!').toBeVisible(); 
    
    const rawMemberID = await this.patientMemberID.innerText();
    let actualMemberID = rawMemberID.split('ID')[1].trim();
    console.log(`Actual Member ID: ${actualMemberID}`);
    await expect(actualMemberID).toEqual(expectedMemberID);
  }

  async verifyPatientTabDemographicsTabIsActive() {
    await this.waitForVisible(this.patientTabDemographics);
    await expect(this.patientTabDemographics).toHaveClass(/active/);
  }

  async verifyPARequestSummaryHeader(summaryText: string) {
    await this.waitForVisible(this.paRequestSummaryHeader);
    await expect(this.paRequestSummaryHeader).toHaveText(summaryText);
  }
}
