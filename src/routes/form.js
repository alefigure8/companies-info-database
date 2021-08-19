const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../helper/helper');
const Empresa = require('../models/empresas')


router.get('/list', isAuthenticated, async(req, res) => {

    let sort = {};
    let query = '';

    //Sort by name
    if (req.query.name === 'name') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { name: 'desc' }
        query = 'name=name'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by name
    if (req.query.name === 'name') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { name: 'desc' }
        query = 'name=name'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by Suscribe
    if (req.query.name === 'construar') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { construar: 'asc' }
        query = 'name=construar'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by notes
    if (req.query.name === 'construar_note') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { construar_note: 'asc' }
        query = 'name=construar_note'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by suscribe OP
    if (req.query.name === 'op_suscript') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { op_suscript: 'asc' }
        query = 'name=op_suscript'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by ex suscribe
    if (req.query.name === 'op_exsuscript') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { op_exsuscript: 'asc' }
        query = 'name=op_exsuscript'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by mail
    if (req.query.name === 'send_mail') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { send_mail: 'desc' }
        query = 'name=send_mail'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Sort by mail
    if (req.query.name === 'call') {
        const { page = 1 } = req.query
        const limit = 10
        sort = { call: 'desc' }
        query = 'name=call'
        const result = await Empresa.paginate({}, { page, limit, sort })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs, query })
        return;
    }

    //Si no hay filtro
    const { page = 1 } = req.query
    const limit = 10
    const result = await Empresa.paginate({}, { page, limit, sort })
    query = 'Hola'
    const empresas = result.docs
    const nextPage = result.nextPage
    const prevPage = result.prevPage
    const totalDocs = result.totalDocs

    res.render('list', { empresas, nextPage, prevPage, totalDocs, query })

})



//Buscador por empresa
router.post('/list', isAuthenticated, async(req, res) => {

    //Searching by name
    if (req.body.name) {
        const { page = 1 } = req.query
        const limit = 10
        const result = await Empresa.paginate({ name: req.body.name }, { page, limit })
        const empresas = result.docs
        const nextPage = result.nextPage
        const prevPage = result.prevPage
        const totalDocs = result.totalDocs
        res.render('list', { empresas, nextPage, prevPage, totalDocs })
        return
    }

    //Si no hay resultados
    const { page = 1 } = req.query
    const limit = 10
    const result = await Empresa.paginate({}, { page, limit })
    const empresas = result.docs
    const nextPage = result.nextPage
    const prevPage = result.prevPage
    const totalDocs = result.totalDocs
    res.render('list', { empresas, nextPage, prevPage, totalDocs })

})

//Buscador por nombre de empresa
/*
router.get('/name', isAuthenticated, async(req, res) => {
    const { page = 1 } = req.query
    const limit = 10
    const sort = { name: 'desc' }
    const result = await Empresa.paginate({}, { page, limit, sort })
    const empresas = result.docs
    const nextPage = result.nextPage
    const prevPage = result.prevPage
    const totalDocs = result.totalDocs
    res.render('./sort/name', { empresas, nextPage, prevPage, totalDocs })
})
*/

//Add New
router.get('/add', isAuthenticated, (req, res) => {
    res.render('add')
})

router.post('/add', isAuthenticated, async(req, res) => {

    const { name, cuit, url, construar, construar_note, op_suscript, op_exsuscript, send_mail, call } = req.body;
    const newEmpresa = new Empresa({ name, cuit, url, construar, construar_note, op_suscript, op_exsuscript, send_mail, call });
    await newEmpresa.save()
    req.flash('success', 'La empresa fue agregada')
    res.redirect('/list')

})

//Update

router.get('/update/:id', isAuthenticated, async(req, res) => {
    const empresa = await Empresa.findById(req.params.id)
    res.render('update', { empresa })
})

router.put('/update/:id', isAuthenticated, async(req, res) => {

    let { name, cuit, url, construar, construar_note, op_suscript, op_exsuscript, send_mail, call } = req.body;

    if (construar === undefined) {
        construar = 'off'
    }

    if (construar_note === undefined) {
        construar_note = 'off'
    }

    if (op_suscript === undefined) {
        op_suscript = 'off'
    }

    if (op_exsuscript === undefined) {
        op_exsuscript = 'off'
    }

    if (send_mail === undefined) {
        send_mail = 'off'
    }

    if (call === undefined) {
        call = 'off'
    }

    await Empresa.findByIdAndUpdate(req.params.id, { name, cuit, url, construar, construar_note, op_suscript, op_exsuscript, send_mail, call })
    req.flash('success', 'La empresa fue actualizada')
    res.redirect('/list')
})

//Delete
router.delete('/delete/:id', isAuthenticated, async(req, res) => {
    await Empresa.findByIdAndDelete(req.params.id)
    req.flash('success', 'La empresa fue eliminada')
    res.redirect('/list')
})

router.post('/getEmpresas', async(req, res) => {
    let payload = req.body.payload.trim();
    let search = await Empresa.find({ name: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();

    //Limit Search Result to 10
    search = search.slice(0, 10);

    //Enviar resultado
    res.send({ payload: search });
});
module.exports = router;