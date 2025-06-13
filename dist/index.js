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
const simonBot_1 = require("./simonBot");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(body_parser_1.default.json());
app.post('/bot', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipoDoc, numeroDoc, password } = req.body;
    try {
        const success = yield (0, simonBot_1.simonLoginAndNavigate)({ tipoDoc, numeroDoc, password });
        res.status(200).json({ login: success });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
}));
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
