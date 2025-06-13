import { simonLoginAndNavigate } from './simonBot';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());


app.post('/bot', async (req, res) => {
  const { tipoDoc, numeroDoc, password } = req.body;

  try {
    const success = await simonLoginAndNavigate({ tipoDoc, numeroDoc, password });
    res.status(200).json({ login: success });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al intentar iniciar sesión' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
