"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simonLoginAndNavigate = simonLoginAndNavigate;
const puppeteer_1 = __importDefault(require("puppeteer"));
function simonLoginAndNavigate(_a) {
    return __awaiter(this, arguments, void 0, function* ({ tipoDoc, numeroDoc, password, }) {
        const browser = yield puppeteer_1.default.launch({ headless: false }); // headless: false para debug visual
        const page = yield browser.newPage();
        yield page.goto('https://simon.inder.gov.co/login/', { waitUntil: 'networkidle2' });
        // 👉 1. Seleccionar tipo de documento
        yield page.waitForSelector('input[role="combobox"]');
        yield page.click('input[role="combobox"]');
        yield page.keyboard.type(tipoDoc); // Escribe 'Cédula de ciudadanía'
        yield new Promise(res => setTimeout(res, 1000));
        // 👉 2. Hacer clic real sobre la opción visible
        yield page.evaluate(() => {
            const listItems = Array.from(document.querySelectorAll('li'));
            const option = listItems.find((el) => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === 'Cédula de ciudadanía'; });
            if (option) {
                option.click();
            }
        });
        yield new Promise(res => setTimeout(res, 500));
        // 👉 3. Ingresar número de documento (id dinámico ':r2:')
        yield page.evaluate((numeroDoc) => {
            const input = document.getElementById(':r2:');
            if (input) {
                input.focus();
                input.value = numeroDoc;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }, numeroDoc);
        yield new Promise(res => setTimeout(res, 500));
        // 👉 4. Ingresar contraseña
        yield page.type('#auth-login-v2-password', password);
        // 👉 5. Clic en INGRESAR
        yield page.click('button[type="submit"]');
        // 👉 6. Esperar navegación
        yield page.waitForNavigation({ waitUntil: 'networkidle2' });
        const html = yield page.content();
        yield browser.close();
        return html.includes('Reservas');
    });
}
