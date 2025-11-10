import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./../base/BasePage";

export class PriorAuthorizationPage extends BasePage {
    readonly authorizationTab: Locator;
    readonly addPriorAuthButton: Locator;
    readonly addPriorAuthModal: Locator;
    readonly addPriorAuthMedSearch: Locator;
    readonly actionDropDown: Locator;
    readonly lstActionItem: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a#authTab.tab").first();
        this.addPriorAuthButton = page.locator("button#createPAButton");
        this.addPriorAuthModal = page.locator("div.modal-header.ui-draggable-handle");
        this.addPriorAuthMedSearch = page.locator("input#med-search");
        this.actionDropDown = page.locator("#addPaActions");
        this.lstActionItem = page.locator("li.e-list-item");
        this.saveButton = page.locator("button.btn.btn-info.bootbox-accept");
        this.successMessage = page.locator("div.messages");
    }

    public async clickPriorAuthorizationTab(): Promise<void> {
        await this.waitForVisible(this.authorizationTab);
        await this.authorizationTab.click({ force: true });
    }

    public async clickAddPriorAuthButton(): Promise<void> {
        await this.addPriorAuthButton.scrollIntoViewIfNeeded();
        await this.waitForVisible(this.addPriorAuthButton);
        await this.addPriorAuthButton.click({ force: true });
    }

    public async enterMedicationInSearchField(medication: string): Promise<void> {
        await this.addPriorAuthModal.isEnabled();
        await this.waitForVisible(this.addPriorAuthMedSearch);
        await this.addPriorAuthMedSearch.fill(medication);
    }

    public async selectActionFromDropdown(action: string): Promise<void> {
        await this.page.waitForTimeout(1000); 
        await this.waitForVisible(this.actionDropDown);
        await this.actionDropDown.click({ force: true });
        await this.lstActionItem.filter({ hasText: action }).first().click();
        // await this.actionDropDown.selectOption({ label: action });
    }

    public async clickSavePriorAuthButton(): Promise<void> {    
        // await this.waitForVisible(this.saveButton);
        await this.saveButton.click({ force: true });
    }

    public async verifySuccessMessage(expectedMessage: string): Promise<void> {
        await this.waitForVisible(this.successMessage);
        const messageText = await this.successMessage.innerText();
        expect(messageText).toContain(expectedMessage);
}