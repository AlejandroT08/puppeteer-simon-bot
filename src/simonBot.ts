import puppeteer from 'puppeteer-core';

const BROWSERLESS_ENDPOINT = 'wss://chrome.browserless.io?token=2SUc6gaLOicUSVk4099e06e49944afbb504222100899d5151';

export async function simonLoginAndNavigate({
  tipoDoc,
  numeroDoc,
  password,
}: {
  tipoDoc: string;
  numeroDoc: string;
  password: string;
}) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSERLESS_ENDPOINT,
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://simon.inder.gov.co/login/', { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('input[role="combobox"]', { timeout: 10000 });
    await page.click('input[role="combobox"]');
    await page.keyboard.type(tipoDoc);
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.evaluate((tipoDoc) => {
      const listItems = Array.from(document.querySelectorAll('li'));
      const option = listItems.find((el) => el.textContent?.trim() === tipoDoc);
      if (option) (option as HTMLElement).click();
    }, tipoDoc);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.waitForSelector('input[placeholder*="documento"]', { timeout: 10000 });
    await page.type('input[placeholder*="documento"]', numeroDoc.toString());

    await page.waitForSelector('#auth-login-v2-password', { timeout: 10000 });
    await page.type('#auth-login-v2-password', password);

    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});

    const html = await page.content();
    return html.includes('Reservas');
  } catch (error) {
    console.error('❌ Error en login Browserless Puppeteer:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
