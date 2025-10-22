import { Page } from "@playwright/test";

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const env = loadEnv({path: './env/.env'});

export function setGlobalTimeouts(page: Page) {
    const navigationTimeout = parseInt(env.parsed?.UI_AUTOMATION_NAVIGATION_TIMEOUT || '50000');
    const commandTimeout = parseInt(env.parsed?.UI_AUTOMATION_COMMAND_TIMEOUT || '30000');

    //Set Global 'navigation' timeout 
    page.setDefaultNavigationTimeout(navigationTimeout); // 50 seconds

    //Set Global 'command' timeout 
    page.setDefaultTimeout(commandTimeout); // 30 seconds
}