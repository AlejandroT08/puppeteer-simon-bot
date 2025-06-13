"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simonLoginAndNavigate = simonLoginAndNavigate;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function simonLoginAndNavigate({ tipoDoc, numeroDoc, password, }) {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://simon.inder.gov.co/login/', { waitUntil: 'networkidle2' });
    // 👉 1. Seleccionar tipo de documento
    await page.waitForSelector('input[role="combobox"]');
    await page.click('input[role="combobox"]');
    await page.keyboard.type(tipoDoc);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate(() => {
        const opciones = Array.from(document.querySelectorAll('li'));
        const cedula = opciones.find((el) => el.textContent?.trim() === 'Cédula de ciudadanía');
        if (cedula) {
            cedula.click();
        }
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    // 👉 2. Ingresar número de documento con selector estable
    await page.waitForSelector('input[placeholder*="Número de documento"]');
    await page.type('input[placeholder*="Número de documento"]', numeroDoc.toString());
    await new Promise(resolve => setTimeout(resolve, 500));
    // 👉 3. Ingresar contraseña
    await page.type('#auth-login-v2-password', password);
    // 👉 4. Clic en botón INGRESAR
    await page.click('button[type="submit"]');
    // 👉 5. Esperar navegación
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    const html = await page.content();
    await browser.close();
    return html.includes('Reservas');
}
