//importamos la conexion
const { getNuevasClient, dbName } = require('../connection/db-NuevasPreguntas');
const { getPreguntaClient, dbName2 } = require('../connection/db-PreguntasRespuestas');
const assert = require('assert');
const { ObjectID } = require('mongodb');

const chatbotController = require('./chatbotController');

module.exports = {
    getNewQuestion: async (req, res) => {
        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión

        
        //const db = await connection(); // obtenemos la conexión
        //var docs = await db.collection('nuevaspreguntas').find().toArray();
        //res.json(docs);
        await db.collection('nuevaspreguntas').find().toArray((err, result) => {
            client.close();
            if (err) throw err;
            console.log("datos obtenidos");
            res.json(result);
        });
    },
    //agrega la pregunta nueva a la bd de nuevas preguntas
    addNewQuestion: async (req, res) => {
        const npregunta = req.body; //creamos una nueva tarea
        
        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        //await db.collection('cultura').save(cultura);
        //await db.collection('nuevaspreguntas').insertOne(cultura);
        //await db.collection('cultura').insertMany(cultura);
        //console.log("dato agregado");
        await db.collection('nuevaspreguntas').insertOne(npregunta, (err, result) => {
            client.close();
            if (err) throw err;
            console.log("dato agregado");
            res.json("Agregado");
        });
    },
    //agrega las preguntas ya resueltas a la bd de datos de preguntas-respuestas y la elimina de nuevas-preguntas
   addQuestions: async (req, res) => {

        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión

        const client2 = await getPreguntaClient();
        const db2 = client2.db(dbName2); // obtenemos la conexión
    
    
    
        //const db = await connection(); // obtenemos la conexión de nuevas preguntas
        //const db2 = await connection2(); // obtenemos la conexión de preguntas respuestas
        var respuestas = Array.from(req.body); //obtenemos las preguntas resueltas enviadas

        //OJOOOOOO: Para colocar un id incremental
        var result = await db2.collection('PregRpta').find().limit(1).sort({id:-1}).toArray(); 

        var arreglo =[]
        respuestas.forEach((elemento, index) => {
            if(elemento.estado!='Entrenado'){
                modelopregunta = {
                    consulta: elemento.consulta,
                    enfermedad: elemento.enfermedad,
                    intencion: elemento.intencion,
                    estado: elemento.estado,
                    respuestas: elemento.respuestas
                }
                arreglo.push(modelopregunta)
            }
        });
        respuestas=arreglo


        var consultas = []
        var respuestas1 = []
        var respuestas2 = []

        //aca guardamos las preguntas
        respuestas.forEach((e, i) => {
            if(e.intencion=="Consulta Malestares"){
                consultas.push(e.consulta)
            }
        })
        console.log(consultas)


        //aca guardaremos las respuestas
        respuestas.forEach((e, i) => {
            if(e.intencion=="Consulta Malestares"){
                respuestas1.push(e.respuestas)
            }
        })
        console.log(respuestas1)
        respuestas1.forEach((e, i) => {
            e.forEach((x, i) => {
                respuestas2.push(x.text)
            })
        })
        console.log(respuestas2)

        
        //var a = ["a", "b", "c"]
        //var b= ["Ra", "Rb", "Rc"]
        chatbotController.testUpdateTraining("f2203c32-3243-4ad4-96d7-25b0091891af", consultas, respuestas2);



        

        let n=0;

        if(result[0]!=null){
            console.log("se hace el proceso");
            n = result[0].id+1;
        }

        respuestas.forEach((elemento, index) => {
            elemento.id=index+n;
            elemento.estado='Entrenado';
        });


        //obtenemos las preguntas respondidas y luego lo guardo en la bd de preguntas respuestas
            //await db2.collection('PregRpta').insertMany(respuestas); 
        await db2.collection('PregRpta').insertMany(respuestas, async (err, result) => {
            if (err) throw err;
            console.log("Datos insertados");
            const pgtas = await db2.collection('PregRpta').find().toArray();
            client2.close();
            res.json(pgtas);
        }); 


        //elimino todo el contenido de la bd nuevas preguntas
            //await db.collection('nuevaspreguntas').deleteMany(); 
        await db.collection('nuevaspreguntas').deleteMany((err, obj) => {
            client.close();
            if (err) throw err;
            console.log("Datos borrados")
            //res.json("Borrados");
        });
        console.log("datos respondidos y eliminados");
    },
    deleteNewQuestion: async (req, res) => {
        const dato = req.params.id;
        
        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        /*await db.collection('cultura').remove({
            _id: id
        });*/
        /*await db.collection('nuevaspreguntas').deleteOne({
            _id: ObjectID(dato)
        });
        console.log("Dato borrado");*/
        await db.collection('nuevaspreguntas').deleteOne({
            _id: ObjectID(dato)
        }, (err, obj) => {
            client.close();
            if (err) throw err;
            console.log("Dato borrado");
            res.json("Borrado");
        });
    },
    updateNewQuestion: async (req, res) => {
        const dato = req.params.id;
        //obtiene los datos a actualizar
        //const nuevoDato = req.body;
        const nuevoDato = { $set: req.body };
        
        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        /*await db.collection('nuevaspreguntas').updateOne({
            _id: ObjectID(dato)
        }, nuevoDato);
        console.log("Dato actualizado");*/
        await db.collection('nuevaspreguntas').updateOne({
            _id: ObjectID(dato)
        }, nuevoDato, (err, result) => {
            client.close();
            if (err) throw err;
            console.log("Dato actualizado");
            res.json("Actualizado");
        });
    },
    getNewQuestionbyId: async (req, res) => {
        const client = await getNuevasClient();
        const db = client.db(dbName); // obtenemos la conexión
        
        //const db = await connection(); // obtenemos la conexión
        const dato = req.params.id; 
        //const cultura = await db.collection('nuevaspreguntas').find({_id: ObjectID(dato)}).toArray();
        //res.json(cultura);
        //console.log("Dato por id obtenido");
        await db.collection('nuevaspreguntas').find({_id: ObjectID(dato)}).toArray((err, result) => {
            client.close();
            if (err) throw err;
            console.log("Dato por id obtenido");
            res.json(result);
        });
    }
}