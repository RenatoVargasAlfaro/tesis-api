const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
//const ioServer = require('./server/index')(app);
const restFul = require('express-method-override')('_method');
//const bodyParser= require('body-parser')
const app = express();

const multer = require('multer');
//const uuid = require('uuid/v4');



/*
//----------------------------------------//
//requerimos el modulo de mongoose
const mongoose = require('mongoose');
//conectamos a la bd
mongoose.connect('mongodb://localhost/Pacientes')
    .then(db => console.log('bd conectada')) //se usa una promesa para ver si se conecto
    .catch(err => console.log(err));
//----------------------------------------//
*/
    
//settings
app.set('port', process.env.PORT || 8000);
//app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //permite entender los datos que se envia desde un formulario html
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(restFul);


const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
      console.log(file);
      cb(null, file.originalname);
  }
}) 
app.use(multer({storage}).single('image'));



//routes
const authRouter = require('./routes/authRouter');
const route = require('./routes/Pacientes');
const route2 = require('./routes/Cultura');
const route3 = require('./routes/PreguntasRespuestas');
const route4 = require('./routes/NuevasPreguntas');
const route5 = require('./routes/Recetas');
const route6 = require('./routes/Calendario');
const route7 = require('./routes/Enfermedad');
const chatbot = require('./routes/chatbotRouter');
app.use('/auth', authRouter);
app.use('/Paciente', route);
app.use('/Cultura', route2);
app.use('/Pregunta', route3);
app.use('/NPregunta', route4);
app.use('/Receta', route5);
app.use('/Calendario', route6);
app.use('/Enfermedad', route7);
app.use('/chatbot', chatbot);

// static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    return res.status(404).send({
      message: 'Route ' + req.url + ' Not found.'
    });
  });
  

app.listen(app.get('port'), () => {
    console.log('Servidor funcionando');
});