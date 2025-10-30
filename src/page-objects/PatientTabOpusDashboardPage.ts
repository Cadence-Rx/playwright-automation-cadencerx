import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class PatientTabOpusDashboardPage extends BasePage {
  readonly patientTab: Locator;

    constructor(page: Page) {
        super();
        this.patientTab = page.locator("a[href='#patient-details']");
    }

    public async clickPatientTab(): Promise<void> {
        await this.patientTab.waitFor({ state: "visible", timeout: 30000 });
        await this.patientTab.click();
    }
 }   