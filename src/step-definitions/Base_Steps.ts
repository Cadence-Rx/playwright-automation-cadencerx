import { When, Given } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const env = loadEnv({path: './env/.env'});

//Create a configuration object for easy access to env variables
const config = {
    width: parseInt(env.parsed?.WIDTH || '1920'),
    height: parseInt(env.parsed?.HEIGHT || '1080'), 
};

When('I switch to the new browser tab', async () => {
    await pageFixture.context.waitForEvent('page'); //reinitialize page to the new tab

    //retrieve all open pages (tabs) in the browser context
    const allPage = await pageFixture.context.pages();

    //assign the most recent tab to pageFixture.page
    pageFixture.page = allPage[allPage.length - 1];

    //Bring the newly assigned tab to the front and make it active
    await pageFixture.page.bringToFront();

    //ensure the newly assigned tab is fully maximized
    await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
}); 

Given('I pause playwright test for debugging', async () => {
    await pageFixture.page.pause(); // Pause for debugging
}); 