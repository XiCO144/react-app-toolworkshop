import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user : 'root',
  password : '',
  database: 'db_oficina'
}).promise();

export async function getUsers(){
  const [rows] = await pool.query("SELECT * FROM utilizadores;");
  return rows;
}
export async function getClients(){
  const [rows] = await pool.query("SELECT * FROM clientes;");
  return rows;
}
export async function getVehicles(){
  const [rows] = await pool.query("SELECT * FROM veiculos;");
  return rows;
}

export async function getInvoices(){
  const [rows] = await pool.query("SELECT reparacoes.ID, clientes.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN clientes ON reparacoes.cliente= clientes.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id;");
  return rows;
}

export async function getLastReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes ORDER BY id DESC LIMIT 1;");
  return rows;
}

export async function getPenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 1);");
  return rows;
}

export async function getAntepenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 2);");
  return rows;
}

export async function getAntantepenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 3);");
  return rows;
} 

export async function getCarPlate(nomeCliente) {
  const query =  await pool.query("SELECT matricula FROM veiculos JOIN clientes ON veiculos.cliente = clientes.id WHERE clientes.nome LIKE ?;");
  const [rows] = await pool.query(query, [nomeCliente]);
  return rows;
}

export async function getRepairs(searchRepairs) {
  const query = ("SELECT reparacoes.ID, clientes.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN clientes ON reparacoes.cliente= clientes.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id WHERE clientes.nome = ?");
  const [rows] = await pool.query(query, [searchRepairs]);
  return rows;
}

export async function getClientsByName(searchClients) {
  const query =  await pool.query("SELECT * FROM clientes WHERE clientes.nome = ?");
  const [rows] = await pool.query(query, [searchClients]);
  return rows;
}

export async function getCarsByClient(clientID) {
  const query =  await pool.query("SELECT marca, modelo, matricula FROM veiculos JOIN clientes ON veiculos.cliente = clientes.id WHERE clientes.id = ?");
  const [rows] = await pool.query(query, [clientID]);
  return rows;
}

export async function getUsersByEmail(email) {
  const query =  await pool.query("SELECT * FROM utilizadores WHERE utilizadores.email LIKE ?;");
  const [rows] = await pool.query(query, [email]);
  return rows;
}

export async function getUsersRole(user, password) {
  const query =  await pool.query("SELECT utilizadores.cargo FROM utilizadores WHERE utilizadores.user = ? AND utilizadores.password = ?;");
  const [rows] = await pool.query(query, [user, password]);
  return rows.length > 0 ? rows[0].cargo : null;
}

export async function createCarRepair(plate, description, value, date) {
  try {
    console.log("Parameters:", { plate, description, value, date });

    const [clientResult] = await pool.query(
      "SELECT clientes.id FROM clientes JOIN veiculos ON clientes.id = veiculos.cliente WHERE veiculos.matricula = ?",
      [plate]
    );
    const [vehicleResult] = await pool.query(
      "SELECT veiculos.id FROM veiculos WHERE veiculos.matricula = ?",
      [plate]
    );

    if (clientResult.length === 0 || vehicleResult.length === 0) {
      throw new Error("Cliente ou veículo não encontrado");
    }

    const clientId = clientResult[0].id;
    const vehicleId = vehicleResult[0].id;

    const query = `
      INSERT INTO reparacoes (
        cliente, veiculo, descricao, valor, data
      ) VALUES (?, ?, ?, ?, ?);
    `;
    const values = [clientId, vehicleId, description, value, date];
    await pool.query(query, values);

  } catch (error) {
    console.error("Erro ao criar reparação:", error);
    throw error;
  }
}

export async function createCarCheck(name, phone, car, plate, checkDate) {
  const query =  await pool.query("INSERT INTO revisoes (nome, numero_tele, carro, matricula, data_agendada) VALUES (?,?,?,?,?);");
  const values = [name, phone, car, plate, checkDate];
  await pool.query(query, values);
}

export async function createReview(name, email, description, rating) {
  const query =  await pool.query("INSERT INTO avaliacoes (nome, email, descricao, estrelas) VALUES (?,?,?,?);");
  const values = [name, email, description, rating];
  await pool.query(query, values);
}

export async function createUser(user, password, email) {
  const query =  await pool.query("INSERT INTO utilizadores (user, password, email, cargo) VALUES (?, ?, ?, 'client');");
  const values = [user, password, email];
  await pool.query(query, values);
}

export async function createClient(clientName, phoneNumber, email) {
  const query = await pool.query("INSERT INTO clientes (nome, telemovel, email) VALUES (?, ?, ?);");
  const values = [clientName, phoneNumber, email];
  await pool.query(query, values);
}

export async function createCarByClient(carBrand, carModel, carPlate, clientID) {
  const query =  await pool.query("INSERT INTO veiculos (marca, modelo, matricula, cliente) VALUES (?, ?, ?, (SELECT id FROM clientes WHERE nome = ?));");
  const values = [carBrand, carModel, carPlate, clientID];
  await pool.query(query, values);
}