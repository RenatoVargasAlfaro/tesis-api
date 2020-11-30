const express = require('express');
const router = express.Router();
//importamos las funciones controller
const authentication = require('../middlewares/auth');
const controller = require('../controller/PreguntasRespuestas');

//router.get('/obtener', controller.getProducts);

router.get('/', authentication.isAuth, controller.getQuestion);

router.post('/add', authentication.isAuth, controller.addQuestion);

router.delete('/delete/:id', authentication.isAuth, controller.deleteQuestion);

router.delete('/newdelete/:id', authentication.isAuth, controller.deleteNewQuestion);

router.put('/update/:id', authentication.isAuth, controller.updateQuestion);

router.get('/edit/:id', authentication.isAuth, controller.getQuestionbyId);


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