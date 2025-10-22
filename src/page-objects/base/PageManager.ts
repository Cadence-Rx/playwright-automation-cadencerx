import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

export class PageManager {
  get page(): Page {
    return pageFixture.page;
  }

  createBasePage(): BasePage {
    return new BasePage();
  }
}