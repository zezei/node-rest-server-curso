const express = require('express')
const app = express();
const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');

const _ = require('underscore')
app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    Usuario.find( { estado: true}, 'nombre email role google estado img' ) //{ google: true} 'lo que queremos mostrar'
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        else{
            Usuario.count({ estado: true}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                })
            })
        }
    } )
    });


app.post('/usuario', function (req, res) {
    let body = req.body;

    const saltRounds = 10;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        role: body.role
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(404).json({
                ok: false,
                err
            });
        }
        else {
            // usuarioDB.password = null;
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            });
        }
    })

});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ['nombre','email','img','role','estado']);
    if (body.google) {

    }

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            res.status(404).json({
                ok: false,
                err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            })
        }
    })
});

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, {estado:false},{ new: true },(err, usuarioBorradoDB) => {
        if (!usuarioBorradoDB){
            res.status(404).json({
                ok: false,
                err: {
                    message: "El usuario no existe en la BD"
                }
            })
        }
        if (err) {
            res.status(404).json({
                ok: false,
                err
            });
        }
        if (usuarioBorradoDB){
            res.json({
                ok: true,
                usuarioBorradoDB
            })
        }
    })
});

module.exports = app;