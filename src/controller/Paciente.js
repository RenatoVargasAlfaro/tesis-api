//importamos la conexion
const { getPacienteClient, dbName } = require("../connection/db-Paciente");
const assert = require("assert");
const { ObjectID } = require("mongodb");

module.exports = {
  getPacients: async (req, res) => {
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    //var docs = await db.collection('paciente').find().toArray();
    //res.json(docs);
    db.collection("paciente").find().toArray((err, result) => {
        client.close();
        if (err) throw err;
        console.log("datos obtenidos");
        res.json(result);
      });
  },
  addPacients: async (req, res) => {
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    //await db.collection('cultura').save(cultura);
    //await db.collection('paciente').insertOne(cultura);
    //await db.collection('cultura').insertMany(cultura);
    //console.log("dato agregado");

    let dni = req.body.dni;
    const dniModel = dni;
    //validar si ya existe
    const pacienteGuardado = await db.collection("paciente").findOne({
      dni: dniModel,
    });
    if (!pacienteGuardado) {
      await db.collection("paciente").insertOne(paciente, (err, result) => {
        client.close();
        if (err) throw err;
        console.log("dato agregado");
        res.json(paciente);
      });
    } else {
      client.close();

      res.json({
        message: "El paciente ya existe",
      });
    }

    /*await db.collection('paciente').insertOne(paciente, (err, res) => {
            if (err) throw err;
            console.log("dato agregado");
        });*/
  },
  deletePacients: async (req, res) => {
    const dato = req.params.id;
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    /*await db.collection('cultura').remove({
            _id: id
        });*/
    /*await db.collection('paciente').deleteOne({
            _id: ObjectID(dato)
        });
        console.log("Dato borrado");*/
    await db.collection("paciente").deleteOne(
      {
        _id: ObjectID(dato),
      },
      (err, obj) => {
        client.close();
        if (err) throw err;
        console.log("Dato borrado");
        res.json("Borrado");
      }
    );
  },
  updatePacients: async (req, res) => {
    const dato = req.params.id;
    //obtiene los datos a actualizar
    //const nuevoDato = req.body;
    const nuevoDato = { $set: req.body };
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    /*await db.collection('paciente').updateOne({
            _id: ObjectID(dato)
        }, nuevoDato);
        console.log("Dato actualizado");*/

    await db.collection("paciente").updateOne(
      {
        _id: ObjectID(dato),
      },
      nuevoDato,
      async (err, result) => {
        client.close();
        if (err) throw err;
        console.log("Dato actualizado");
        const actualizado = await db
          .collection("paciente")
          .find({ _id: ObjectID(dato) })
          .toArray();
        res.json(actualizado);
      }
    );
  },
  getPacientsbyId: async (req, res) => {
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    const dato = req.params.id;
    //const cultura = await db.collection('paciente').find({_id: ObjectID(dato)}).toArray();
    //res.json(cultura);
    //console.log("Dato por id obtenido");
    await db
      .collection("paciente")
      .find({ _id: ObjectID(dato) })
      .toArray((err, result) => {
        client.close();
        if (err) throw err;
        console.log("Dato por id obtenido");
        res.json(result);
      });
  },
  getPacientsString: async (req, res) => {
    const nombre = req.query.name;
    const tokens = nombre.split("$20");
    const frase = tokens.join(" ");

    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    
    //const db = await connection(); // obtenemos la conexión
    //var docs = await db.collection('paciente').find().toArray();
    //res.json(docs);
    await db
      .collection("paciente")
      .find({ receta: frase })
      .toArray((err, result) => {
        if (err) throw err;
        client.close();
        console.log("datos obtenidos");
        res.json(result);
      });
  },

  getPacientsbyEmail: async (req, res) => {
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    
    //const db = await connection(); // obtenemos la conexión
    const email = req.params.email;
    console.log(email);
    //const cultura = await db.collection('paciente').find({_id: ObjectID(dato)}).toArray();
    //res.json(cultura);
    //console.log("Dato por id obtenido");
    await db
      .collection("paciente")
      .find({ correo: email })
      .toArray((err, result) => {
        client.close();
        if (err) throw err;
        console.log("Dato por email obtenido");
        res.json(result);
      });
  },
  getPacientsbyDni: async (req, res) => {
    const client = await getPacienteClient();
    const db = client.db(dbName); // obtenemos la conexión
    
    //const db = await connection(); // obtenemos la conexión
    const dato = req.params.dni;
    //const cultura = await db.collection('paciente').find({_id: ObjectID(dato)}).toArray();
    //res.json(cultura);
    //console.log("Dato por id obtenido");
    await db
      .collection("paciente")
      .find({ dni: dato })
      .toArray((err, result) => {
        client.close();
        if (err) throw err;
        console.log("Dato por dni obtenido");
        res.json(result);
      });
  },
};
