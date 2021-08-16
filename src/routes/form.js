const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../helper/helper');
const Empresa = require('../models/empresas')


router.get('/list', isAuthenticated, async(req, res) => {
    const empresas = await Empresa.find()
    res.render('list', { empresas })
})

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
module.exports = router;