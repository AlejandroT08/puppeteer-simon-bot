import puppeteer from 'puppeteer';

export async function simonLoginAndNavigate({
  tipoDoc,
  numeroDoc,
  password,
}: {
  tipoDoc: string;
  numeroDoc: string;
  password: string;
}) {
  const browser = await puppeteer.launch({ headless: false }); // headless: false para debug visual
  const page = await browser.newPage();

  await page.goto('https://simon.inder.gov.co/login/', { waitUntil: 'networkidle2' });

  // 👉 1. Seleccionar tipo de documento
  await page.waitForSelector('input[role="combobox"]');
  await page.click('input[role="combobox"]');
  await page.keyboard.type(tipoDoc); // Escribe 'Cédula de ciudadanía'
  await new Promise(res => setTimeout(res, 1000));

  // 👉 2. Hacer clic real sobre la opción visible
  await page.evaluate(() => {
    const listItems = Array.from(document.querySelectorAll('li'));
    const option = listItems.find((el) =>
      el.textContent?.trim() === 'Cédula de ciudadanía'
    );
    if (option) {
      (option as HTMLElement).click();
    }
  });

  await new Promise(res => setTimeout(res, 500));

  // 👉 3. Ingresar número de documento (id dinámico ':r2:')
  await page.evaluate((numeroDoc) => {
    const input = document.getElementById(':r2:') as HTMLInputElement;
    if (input) {
      input.focus();
      input.value = numeroDoc;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, numeroDoc);

  await new Promise(res => setTimeout(res, 500));

  // 👉 4. Ingresar contraseña
  await page.type('#auth-login-v2-password', password);

  // 👉 5. Clic en INGRESAR
  await page.click('button[type="submit"]');

  // 👉 6. Esperar navegación
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  const html = await page.content();
  await browser.close();

  return html.includes('Reservas');
}
