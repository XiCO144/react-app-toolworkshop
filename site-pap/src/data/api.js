import express from 'express';
import bodyParser from 'body-parser';
import { getEmployees, getInvoices , getClients, GetVehicles, createReview, getLastReview}  from './database.js';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/employees", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

app.get("/invoices", async (req, res) => {
  const invoices = await getInvoices();
  res.send(invoices);
});

app.post("/createReviews", async (req, res) => {
  const { name, email, description } = req.body;
  try {
    await createReview(name, email, description);
    res.send({ message: "Review criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar review" });
  }
});

app.post("/lastReview", async (req, res) => {
  const reviews = await getLastReview();
  res.send(reviews);
});

app.use((err, req, res, nextTick) => {
    console.error(err.stack);
    res.status(500).send('A API não está conectada.');    
})

app.listen(3000, () => {
  console.log('API a rodar na porta 3000.');
});