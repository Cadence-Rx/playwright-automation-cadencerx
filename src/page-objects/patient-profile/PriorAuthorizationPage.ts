import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./../base/BasePage";

export class PriorAuthorizationPage extends BasePage {
    readonly authorizationTab: Locator;
    readonly addPriorAuthButton: Locator;
    readonly addPriorAuthMedSearch: Locator;

    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a#authTab.tab]").first();
        this.addPriorAuthButton = page.locator("button#createPAButton");
        this.addPriorAuthMedSearch = page.locator("input#med-search");
    }

    public async clickPriorAuthorizationTab(): Promise<void> {
        await this.waitForVisible(this.authorizationTab);
        await this.authorizationTab.click({ force: true });
    }

    public async clickAddPriorAuthButton(): Promise<void> {
        await this.waitForVisible(this.addPriorAuthButton);
        await this.addPriorAuthButton.click({ force: true });
    }

    public async enterMedicationInSearchField(medication: number): Promise<void> {
        await this.waitForVisible(this.addPriorAuthMedSearch);
        await this.addPriorAuthMedSearch.fill(medication.toString());
    }
}