import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class AuthorizationTabOpusDashboardPage extends BasePage {
  readonly authorizationTab: Locator;
  readonly myAuthorizationTab: Locator;
  readonly allTab: Locator;
  readonly columnButton: Locator;
  readonly lstColumnOptions: Locator;
  readonly lstMemberIDs: Locator;
  readonly lstPARequestStatusBtn: Locator;
  readonly lstPagination: Locator;

  constructor(page: Page) {
    super();
    this.authorizationTab = page.locator("a[href='#transaction-details']");
    this.myAuthorizationTab = page.locator("a.btn.btn-primary.btn-sm.authRefreshButton.authRefreshButtonMy, a.btn.btn-white.border.btn-sm.authRefreshButton.authRefreshButtonMy");
    this.allTab = page.locator("a.btn.btn-white.border.btn-sm.authRefreshButton.authRefreshButtonAll, a.btn.btn-primary.btn-sm.authRefreshButton.authRefreshButtonAll");
    this.columnButton = page.locator("button#priorAuthGrid_columnchooser");
    this.lstColumnOptions = page.locator("span.e-label");
    this.lstMemberIDs = page.locator("td.e-rowcell");
    this.lstPARequestStatusBtn = page.locator("a[href*='PriorAuthorizationRequest']");
    this.lstPagination = page.locator("a.e-link.e-numericitem.e-spacing.e-pager-default");
  }

  public async verifyAuthorizationTab(): Promise<void> {
    await expect(
      this.authorizationTab,
      "My Authorization button is visible!"
    ).toBeVisible();
    await expect(this.authorizationTab).toHaveClass("tab active");
    await expect(this.authorizationTab).toHaveText("Authorizations");
  }

  public async verifyMyAuthorizationTab(): Promise<void> {
    await expect(
      this.myAuthorizationTab,
      "My Authorization button is visible!"
    ).toBeVisible();
    await expect(this.myAuthorizationTab).toHaveText("My Authorizations");
  }

  public async clickAllTab(): Promise<void> {
    await this.allTab.waitFor({ state: "visible", timeout: 30000 });
    await this.allTab.click();
  }

  public async clickColumnButton(): Promise<void> {
    await this.columnButton.waitFor({ state: "visible", timeout: 30000 });
    await this.columnButton.click();
  }

  public async selectFromColumnDowndown(columnName: string): Promise<void> {
    await this.lstColumnOptions.filter({ hasText: columnName }).first().click();
  }

  public async getMemberIDFromAuthorizationTab(): Promise<string> {
    let lastNumber: number = 5 - 15;
    function getRandomArithmetic(limit: number): number {
      const start = 5;
      const increment = 15;
      const possibleNumbers: number[] = [];

      // Populate the array with numbers in the sequence.
      for (let n = start; n <= limit; n += increment) {
        possibleNumbers.push(n);
      }

      if (possibleNumbers.length === 0) {
        throw new Error("No numbers found within the specified limit.");
      }

      // Get a random index within the bounds of the array.
      const randomIndex = Math.floor(Math.random() * possibleNumbers.length);

      // Return the number at the random index.
      return possibleNumbers[randomIndex];
    }

    // Get a random number from the sequence, up to a limit of 150.
    // The possible numbers are 5, 20, 35, 50, 65, 80, 95.
    const randomNumber = getRandomArithmetic(150);
    console.log(`randomNumber: ${randomNumber}`); // e.g., 5, 20,
    const memberIDs = await this.lstMemberIDs.nth(randomNumber).innerText();
    return memberIDs;
  }

  public async clickRandomPARequestStatusBtn(): Promise<void> {
    await this.lstPagination.last().waitFor({ state: "visible", timeout: 30000 });
    const randomPageIndex = Math.floor(Math.random() * await this.lstPagination.count());
    console.log(`Random pagination button: ${randomPageIndex}`);
    await this.lstPagination.nth(randomPageIndex).click();

    await this.lstPARequestStatusBtn.last().waitFor({ state: "visible", timeout: 30000 });
    const randomIndex = Math.floor(Math.random() * await this.lstPARequestStatusBtn.count());
    console.log(`Random PA Request Status button: ${randomIndex}`);
    await this.lstPARequestStatusBtn.nth(randomIndex).evaluate(el => el.removeAttribute('target'))
    await this.lstPARequestStatusBtn.nth(randomIndex).click();
  }

}
