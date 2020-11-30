//importamos la conexion
const { getCulturaClient, dbName } = require('../connection/db-Cultura');
const assert = require('assert');
const { ObjectID } = require('mongodb');

module.exports = {
    getCulture: async (req, res) => {
        const client = await getCulturaClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        //var docs = await db.collection('cultura').find().toArray();
        //res.json(docs);
        await db.collection('cultura').find().toArray((err, result) => {
            client.close();
            if (err) throw err;
            console.log("datos obtenidos");
            res.json(result);
        });
    },
    addCulture: async (req, res) => {
        const cultura = req.body; //creamos una nueva tarea
        
        const client = await getCulturaClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        //await db.collection('cultura').save(cultura);
        //await db.collection('cultura').insertOne(cultura);
        //await db.collection('cultura').insertMany(cultura);
        //console.log("dato agregado");
        await db.collection('cultura').insertOne(cultura, (err, result) => {
            client.close();
            if (err) throw err;
            console.log("dato agregado");
            res.json("Agregado");
        });
    },
    deleteCulture: async (req, res) => {
        const dato = req.params.id;
        
        const client = await getCulturaClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        
        //const db = await connection(); // obtenemos la conexión
        /*await db.collection('cultura').remove({
            _id: id
        });*/
        /*await db.collection('cultura').deleteOne({
            _id: ObjectID(dato)
        });
        console.log("Dato borrado");*/
        await db.collection('cultura').deleteOne({
            _id: ObjectID(dato)
        }, (err, obj) => {
            client.close();
            if (err) throw err;
            console.log("Dato borrado");
            res.json("Borrado");
        });
    },
    updateCulture: async (req, res) => {
        const dato = req.params.id;
        //obtiene los datos a actualizar
        //const nuevoDato = req.body;
        const nuevoDato = { $set: req.body };
        
        const client = await getCulturaClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        /*await db.collection('cultura').updateOne({
            _id: ObjectID(dato)
        }, nuevoDato);
        console.log("Dato actualizado");*/
        await db.collection('cultura').updateOne({
            _id: ObjectID(dato)
        }, nuevoDato, (err, result) => {
            client.close();
            if (err) throw err;
            console.log("Dato actualizado");
            res.json("Actualizado");
        });
        
    },
    getCulturebyId: async (req, res) => {
        const client = await getCulturaClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        const dato = req.params.id; 
        //const cultura = await db.collection('cultura').find({_id: ObjectID(dato)}).toArray();
        //res.json(cultura);
        //console.log("Dato por id obtenido");
        await db.collection('cultura').find({_id: ObjectID(dato)}).toArray((err, result) => {
            client.close();
            if (err) throw err;
            console.log("Dato por id obtenido");
            res.json(result);
        });
    }
}