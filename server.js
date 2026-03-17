const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');


const app = express();
const path = require('path');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const client = new MercadoPagoConfig({
  accessToken: 'SEU_ACCESS_TOKEN_AQUI'
});

app.post('/criar-pagamento', async (req, res) => {
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: req.body.items
      }
    });

    res.json({
      id: response.id,
      init_point: response.init_point
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar pagamento');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});