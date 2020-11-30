const { MongoClient } = require('mongodb');

// Nombre de bd
const dbName2 = 'PreguntasRespuestaaaas';
// Conexión URL (estas corriendo en local)
//const url = 'mongodb://localhost:27017';

const config = require('../config/config');

let client = null

const getPreguntaClient = async () => {
  try {
    if(client && client.isConnected()) return client
    client = await MongoClient.connect(config.URL, {
      useUnifiedTopology: true,
    });
    
    // const db = calendarioClient.db(dbName);
    return client
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getPreguntaClient,
  dbName2
}



/*const client = new MongoClient(config.URL, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();

  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};*/