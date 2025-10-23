import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { AuthorizationTabOpusDashboardPage } from "../../page-objects/AuthorizationTabOpusDashboardPage";

export class CucumberWorld extends World {
  public pageManager: PageManager;
  public basePage: BasePage;
  public loginPage: LoginPage;
  public authorizationTabOpusDashboardPage: AuthorizationTabOpusDashboardPage;

  //Base URL
  private url?: string;

  //Person
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  //{ attach, log, link, parameters}: IWorldOptions are required in constructor of your CucumberWorld class to
  //Inherit functionalities from the base World class and initialize your PageManger and BasePage.
  constructor({ attach, log, link, parameters }: IWorldOptions) {
    super({ attach, log, link, parameters }); //Pass the options to the world constructor
    this.pageManager = new PageManager(); //Initialze Page Manager
    this.basePage = this.pageManager.createBasePage(); //Initial base pages and other pages that we will create
    this.loginPage = this.pageManager.createLoginPage();
    this.authorizationTabOpusDashboardPage = this.pageManager.createAuthorizationTabOpusDashboardPage();  
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
}

//Tells Cucumber to use this custom World
setWorldConstructor(CucumberWorld);
