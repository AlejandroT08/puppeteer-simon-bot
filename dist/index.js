"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simonBot_1 = require("./simonBot");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(body_parser_1.default.json());
app.post('/bot', async (req, res) => {
    const { tipoDoc, numeroDoc, password } = req.body;
    try {
        const success = await (0, simonBot_1.simonLoginAndNavigate)({
            tipoDoc,
            numeroDoc: String(numeroDoc), // Asegura que es string
            password,
        });
        res.json({ success });
    }
    catch (error) {
        console.error('❌ Error en login Puppeteer:', error); // 👈 clave
        res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
});
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
