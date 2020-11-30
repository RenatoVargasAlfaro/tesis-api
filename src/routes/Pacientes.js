const express = require('express');
const router = express.Router();
//importamos las funciones controller
const authentication = require('../middlewares/auth');
const controller = require('../controller/Paciente');

//router.get('/obtener', controller.getProducts);

router.get('/', authentication.isAuth, controller.getPacients);

router.post('/add', authentication.isAuth, controller.addPacients);

router.delete('/delete/:id', authentication.isAuth, controller.deletePacients);

router.put('/update/:id', authentication.isAuth, controller.updatePacients);

router.get('/edit/:id', authentication.isAuth, controller.getPacientsbyId);

router.get('/email/:email', authentication.isAuth, controller.getPacientsbyEmail);

router.get('/title', authentication.isAuth, controller.getPacientsString);

router.get('/dni/:dni', authentication.isAuth, controller.getPacientsbyDni);


/*
router.get('/', async (req, res) => {
    //permite retornar los elementos de la coleccion(es un comando de mongo)
    const paciente = await Paciente.find();
    //console.log(paciente);
    res.json(paciente);
    /*res.render('index', { //se le pasa el dato a la vista para mostrarlos
        tasks
    });*/
//});


/*
router.post('/add', async (req, res) => {
    const cultura = new Cultura(req.body); 

    await cultura.save();
    //console.log(paciente);
    res.json({
        rpta: "Informacion agregada"
    });
    //res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    
    const id = req.params.id; 
    
    await Cultura.remove({
        _id: id
    });
    res.json({
        rpta: "Informacion eliminada"
    });
    //res.redirect('/');
});

/*router.get('/turn/:id', async (req, res) => {
    //obtiene el id de la tarea a cambiar el status
    const id = req.params.id; 
    //busca y almacena la tarea encontrada en base al id
    const cultura = await Cultura.findById(id);
    //cambia el status de la tarea
    cultura.status = !cultura.status;
    //se vuelve a almacenar en la bd
    await paciente.save();
    
    //res.redirect('/');
});*/

/*
router.get('/edit/:id', async (req, res) => {
    
    const id = req.params.id; 
    const cultura = await Cultura.findById(id); 
    res.json(cultura);
    /*res.render('edit', { //se le pasa el dato a la vista para mostrarlos
        task
    });*/
//});


/*
router.post('/edit/:id', async (req, res) => {
    
    const id = req.params.id; 
    
    const cultura = req.body;

    await Cultura.update({
        _id: id
    }, cultura);

    res.json({
        rpta: "Informacion actualizada"
    });
    
    //res.redirect('/');
});

*/

module.exports = router;