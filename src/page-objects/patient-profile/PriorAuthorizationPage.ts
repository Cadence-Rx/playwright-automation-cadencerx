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
    readonly okButton: Locator;
    readonly lstAuthIdLink: Locator;
    readonly drugName: Locator;
    readonly gpiLabel: Locator;
    readonly paActionSelected: Locator;



    constructor(page: Page) {
        super();
        this.authorizationTab = page.locator("a#authTab.tab").first();
        this.addPriorAuthButton = page.locator("button#createPAButton i");
        this.addPriorAuthModal = page.locator("div.modal-header.ui-draggable-handle");
        this.addPriorAuthMedSearch = page.locator("input#med-search");
        this.actionDropDown = page.locator("#addPaActions");
        this.lstActionItem = page.locator("li.e-list-item");
        this.saveButton = page.locator("button.btn.btn-info.bootbox-accept");
        this.successMessage = page.locator("div.messages");
        this.okButton = page.locator("button.btn").filter({ hasText: 'OK' });
        this.lstAuthIdLink = page.locator("a.authorizationEditLink");
        this.drugName = page.locator("input.form-control.gpilabel");
        this.gpiLabel = page.locator("label.gpi");
        this.paActionSelected = page.locator("#editPaAction_hidden");
    }

    public async clickPriorAuthorizationTab(): Promise<void> {
        //scroll to the bottom of the page to make the Authorization tab visible
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await this.waitForVisible(this.authorizationTab);
        await this.authorizationTab.click({ force: true });
    }

    public async clickAddPriorAuthButton(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.waitForVisible(this.addPriorAuthButton);
        await this.waitForClickable(this.addPriorAuthButton);
        await this.addPriorAuthButton.click({ force: true });
    }

    public async enterMedicationInSearchField(medication: string): Promise<void> {
        await this.addPriorAuthModal.isVisible();
        await this.waitForVisible(this.addPriorAuthMedSearch);
        await this.addPriorAuthMedSearch.fill(medication);
        await this.page.waitForTimeout(1000);
        await this.addPriorAuthMedSearch.pressSequentially(' ')
    }

    public async selectActionFromDropdown(action: string): Promise<void> {
        await this.page.waitForTimeout(1000); 
        await this.waitForVisible(this.actionDropDown);
        await this.actionDropDown.click({ force: true });
        await this.page.waitForTimeout(1000);
        await this.lstActionItem.filter({ hasText: action }).first().click();
    }

    public async clickSavePriorAuthButton(): Promise<void> {    
        // await this.waitForVisible(this.saveButton);
        await this.saveButton.click({ force: true });
    }

    public async verifySuccessMessage(expectedMessage: string): Promise<void> {
        await this.waitForVisible(this.successMessage);
        const messageText = await this.successMessage.innerText();
        expect(messageText).toEqual(expectedMessage);
    }

    public async clickOkOnAddPriorAuthModal(): Promise<void> {
        // await this.waitForVisible(this.okButton);
        await this.okButton.click({ force: true });
    } 
    
    public async clickFirstAuthIdInHistoryList(): Promise<void> {
        await this.waitForVisible(this.lstAuthIdLink.last());
        await this.lstAuthIdLink.first().click({ force: true });
    }

    public async verifyPriorAuthorizationDetails(gpi: string, drugName: string, action: any): Promise<void> {
        await this.waitForVisible(this.drugName);
        const actualDrugName = await this.drugName.inputValue();
        expect(actualDrugName.toLocaleLowerCase()).toContain(drugName.toLocaleLowerCase());

        // await this.waitForVisible(this.gpiLabel);
        const actualGpi = await this.gpiLabel.innerText();
        expect(actualGpi).toEqual(gpi);

        // await this.waitForVisible(this.paActionSelected);
        const actionSelected = await this.paActionSelected.inputValue();
        expect(actionSelected).toEqual(action);
    }


}