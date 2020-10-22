import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './database/database';
import Grupo from './database/models/Grupo';
import config from './config';

const app = express();
app.use(bodyParser.json());

app.get('/grupos', async (req, res) => {
  const doc = await Grupo.find(req.body);

  res.send(doc);
});

app.post('/grupos', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).send('Invalid payload');
  }
});

app.put('/grupos/:id', async (req, res) => {
  try {
    const doc = await Grupo.find({ _id: req.params.id });

    if (doc.length === 0) {
      res.status(404).send('Grupo not found');
      return;
    }

    const updateConditions = { _id: req.params.id };
    const update = req.body;
    const opts = { runValidators: true };

    await Grupo.updateOne(updateConditions, update, opts);
    res.send(await Grupo.find({ _id: req.params.id }));
  } catch (e) {
    res.status(500).send('Invalid payload');
  }
});

app.delete('/grupos/:id', async (req, res) => {
  try {
    const docId = req.params.id;
    const doc = await Grupo.find({ _id: docId });

    if (doc.length === 0) {
      res.status(404).send('Grupo not found');
      return;
    }

    await Grupo.deleteOne({ _id: docId });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

function startServer() {
  connect();

  app.listen(config.port, () => {
    console.log('Servidor rodando na porta: ', config.port);
  });
}

export default startServer;
