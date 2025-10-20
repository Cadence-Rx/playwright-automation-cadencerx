import { When } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFigure';

When('I switch to the new browser tab', async () => {
    await pageFixture.context.waitForEvent('page'); //reinitialize page to the new tab

    //retrieve all open pages (tabs) in the browser context
    const allPage = await pageFixture.context.pages();

    //assign the most recent tab to pageFixture.page
    pageFixture.page = allPage[allPage.length - 1];

    //Bring the newly assigned tab to the front and make it active
    await pageFixture.page.bringToFront();

    //ensure the newly assigned tab is fully maximized
    await pageFixture.page.setViewportSize({ width: 1920, height: 1080});
}); 