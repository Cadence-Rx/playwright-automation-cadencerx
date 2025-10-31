import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { AuthorizationTabOpusDashboardPage } from "../../page-objects/AuthorizationTabOpusDashboardPage";
import { ForgotPasswordPage } from "../../page-objects/ForgotPasswordPage";

export class CucumberWorld extends World {
  public pageManager: PageManager;
  // Remove basePage from constructor - create it lazily instead
  // public basePage: BasePage;
  // public loginPage: LoginPage;
  // public authorizationTabOpusDashboardPage: AuthorizationTabOpusDashboardPage;

  // Lazy getter for basePage
  get basePage(): BasePage {
    return this.pageManager.createBasePage();
  }

  get loginPage(): LoginPage {
    return this.pageManager.createLoginPage();
  }

  get authorizationTabOpusDashboardPage(): AuthorizationTabOpusDashboardPage {
    return this.pageManager.createAuthorizationTabOpusDashboardPage();
  }

  get forgotPasswordPage(): ForgotPasswordPage {
    return this.pageManager.createForgotPasswordPage();
  }

  //Base URL
  private url?: string;

  //Patient
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;
  private memberID?: string;

  //{ attach, log, link, parameters}: IWorldOptions are required in constructor of your CucumberWorld class to
  //Inherit functionalities from the base World class and initialize your PageManger and BasePage.
  constructor({ attach, log, link, parameters }: IWorldOptions) {
    super({ attach, log, link, parameters }); //Pass the options to the world constructor
    this.pageManager = new PageManager(); //Initialze Page Manager
    // Page objects are now created lazily via getters - no need to initialize here
    // this.basePage = this.pageManager.createBasePage(); //Initial base pages and other pages that we will create
    // this.loginPage = this.pageManager.createLoginPage();
    // this.authorizationTabOpusDashboardPage = this.pageManager.createAuthorizationTabOpusDashboardPage();  
  }

  //Setter methods
  setURL(url: string) {
    this.url = url;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setEmailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }

  setMemberID(memberID: string) {
    this.memberID = memberID;
  }

  //Getter methods
  getURL(): string | undefined {
    return this.url;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmailAddress() {
    return this.emailAddress;
  }

  getMemberID() {
    return this.memberID;
  }
}

//Tells Cucumber to use this custom World
setWorldConstructor(CucumberWorld);
